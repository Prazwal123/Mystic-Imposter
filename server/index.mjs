import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { randomInt, randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { Server } from 'socket.io';

const PORT = Number(process.env.PORT || 3001);
const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const ROOM_IDLE_TIMEOUT_MS = 30 * 60 * 1000;
const EMPTY_ROOM_TIMEOUT_MS = 5 * 60 * 1000;
const rooms = new Map();

const defaultWordPool = [
  { word: 'Elephant', hint: 'Big ears' },
  { word: 'Tiger', hint: 'Orange pattern' },
  { word: 'Momo', hint: 'Folds' },
  { word: 'Football', hint: 'Offside' },
  { word: 'Mountain', hint: 'Summit' },
  { word: 'Moon', hint: 'Phases' },
];

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'mystic-imposter-online',
    rooms: rooms.size,
  });
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');
app.use(express.static(distPath));
app.use((req, res, next) => {
  if (req.method === 'GET' && req.accepts('html')) {
    res.sendFile(path.join(distPath, 'index.html'));
    return;
  }
  next();
});

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

function createRoomCode() {
  const length = randomInt(6, 9);
  let code = '';
  for (let index = 0; index < length; index += 1) {
    code += ROOM_CODE_ALPHABET[randomInt(ROOM_CODE_ALPHABET.length)];
  }
  return rooms.has(code) ? createRoomCode() : code;
}

function publicSettings(room) {
  return {
    ...room.settings,
    playerNames: room.players.map(player => player.name),
    category: room.settings.categories.join(', '),
  };
}

function connectedPlayers(room) {
  return room.players.filter(player => player.connected);
}

function alivePlayers(room) {
  return room.players.filter(player => !player.isEliminated);
}

function connectedAlivePlayers(room) {
  return room.players.filter(player => player.connected && !player.isEliminated);
}

function isHost(room, socket) {
  const player = room.players.find(candidate => candidate.socketId === socket.id);
  return Boolean(player && player.id === room.hostId);
}

function getPlayerBySocket(room, socket) {
  return room.players.find(player => player.socketId === socket.id);
}

function touch(room) {
  room.lastActivityAt = Date.now();
}

function currentTimer(room) {
  if (!room.timer) {
    return { duration: 0, remaining: 0, isPaused: false };
  }
  if (room.timer.isPaused) {
    return {
      duration: room.timer.duration,
      remaining: room.timer.remaining,
      isPaused: true,
    };
  }
  const elapsed = Math.floor((Date.now() - room.timer.startedAt) / 1000);
  return {
    duration: room.timer.duration,
    remaining: Math.max(0, room.timer.duration - elapsed),
    isPaused: false,
  };
}

function publicPlayer(player, phase) {
  return {
    id: player.id,
    name: player.name,
    connected: player.connected,
    isHost: player.isHost,
    isEliminated: player.isEliminated,
    hasVoted: player.hasVoted,
    roleReady: player.roleReady,
    finalRole: phase === 'GAME_OVER' ? player.role : undefined,
  };
}

function snapshotFor(room, player) {
  const timer = currentTimer(room);
  const eliminatedPlayer = room.eliminatedPlayerId
    ? room.players.find(candidate => candidate.id === room.eliminatedPlayerId)
    : null;

  return {
    code: room.code,
    phase: room.phase,
    settings: publicSettings(room),
    players: room.players.map(candidate => publicPlayer(candidate, room.phase)),
    you: {
      id: player.id,
      name: player.name,
      role: room.phase !== 'ONLINE_LOBBY' ? player.role : undefined,
      word: room.phase !== 'ONLINE_LOBBY' ? player.word : undefined,
      hint: room.phase !== 'ONLINE_LOBBY' ? player.hint : undefined,
      isHost: player.id === room.hostId,
      token: player.token,
    },
    timer,
    voteResults: ['VOTE_RESULTS', 'GAME_OVER'].includes(room.phase) ? room.voteResults : undefined,
    eliminatedPlayer: eliminatedPlayer ? {
      id: eliminatedPlayer.id,
      name: eliminatedPlayer.name,
      roleLabel: room.phase === 'VOTE_RESULTS' || room.phase === 'GAME_OVER'
        ? (eliminatedPlayer.role === 'IMPOSTER' ? 'IMPOSTER' : 'NOT_IMPOSTER')
        : undefined,
    } : null,
    imposterGuess: ['GAME_OVER'].includes(room.phase) ? room.imposterGuess : undefined,
    winner: room.winner,
    secretWord: room.phase === 'GAME_OVER' ? room.secretWord : undefined,
    chaosRule: room.chaosRule,
    guessingPlayerId: room.guessingPlayerId,
  };
}

function emitRoom(room) {
  touch(room);
  for (const player of room.players) {
    if (!player.socketId) continue;
    io.to(player.socketId).emit('room:state', snapshotFor(room, player));
  }
}

function emitError(socket, message) {
  socket.emit('online:error', { message });
}

function normalizeName(name) {
  return String(name || '').trim().slice(0, 20);
}

function normalizeWordPool(wordPool) {
  if (!Array.isArray(wordPool)) return defaultWordPool;
  const normalized = wordPool
    .map(entry => ({
      word: String(entry?.word || '').trim(),
      hint: String(entry?.hint || '').trim(),
    }))
    .filter(entry => entry.word && entry.hint)
    .slice(0, 1000);
  return normalized.length > 0 ? normalized : defaultWordPool;
}

function normalizeSettings(input, current) {
  const next = { ...current };
  if (Array.isArray(input?.categories) && input.categories.length > 0) {
    next.categories = input.categories.map(category => String(category).trim()).filter(Boolean).slice(0, 30);
  }
  if (Number.isFinite(input?.targetPlayerCount)) {
    next.targetPlayerCount = Math.max(3, Math.min(50, Math.floor(input.targetPlayerCount)));
  }
  if (Number.isFinite(input?.imposterCount)) {
    next.imposterCount = Math.max(1, Math.min(12, Math.floor(input.imposterCount)));
  }
  if (Number.isFinite(input?.discussionTimer)) {
    next.discussionTimer = Math.max(30, Math.min(600, Math.floor(input.discussionTimer)));
  }
  if (Number.isFinite(input?.votingTimer)) {
    next.votingTimer = Math.max(30, Math.min(600, Math.floor(input.votingTimer)));
  }
  if (typeof input?.allowSkipVote === 'boolean') {
    next.allowSkipVote = input.allowSkipVote;
  }
  if (typeof input?.gameMode === 'string') {
    next.gameMode = input.gameMode;
  }
  next.imposterCount = Math.min(next.imposterCount, Math.max(1, Math.floor(next.targetPlayerCount / 2)));
  return next;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function selectImposters(players, imposterCount, previousImposterIds = []) {
  const previousIds = new Set(previousImposterIds);
  const selectionCount = Math.min(Math.max(0, imposterCount), players.length);
  const eligiblePlayers = players.filter(player => !previousIds.has(player.id));

  if (eligiblePlayers.length >= selectionCount) {
    return shuffle(eligiblePlayers).slice(0, selectionCount);
  }

  const repeatPlayers = players.filter(player => previousIds.has(player.id));
  return [
    ...eligiblePlayers,
    ...shuffle(repeatPlayers).slice(0, selectionCount - eligiblePlayers.length),
  ];
}

function choose(items) {
  return items[randomInt(items.length)];
}

function startTimer(room, phase, duration) {
  room.timer = {
    phase,
    duration,
    remaining: duration,
    startedAt: Date.now(),
    isPaused: false,
  };
}

function clearRoundVotes(room) {
  room.votes = new Map();
  room.voteResults = {};
  room.players.forEach(player => {
    player.hasVoted = false;
  });
}

function startDiscussion(room) {
  room.phase = 'DISCUSSION';
  clearRoundVotes(room);
  startTimer(room, 'DISCUSSION', room.settings.discussionTimer);
  emitRoom(room);
}

function startVoting(room) {
  room.phase = 'VOTING';
  room.voteResults = {};
  room.eliminatedPlayerId = null;
  room.players.forEach(player => {
    player.hasVoted = false;
  });
  startTimer(room, 'VOTING', room.settings.votingTimer);
  emitRoom(room);
}

function calculateVotes(room) {
  const results = {};
  for (const player of alivePlayers(room)) {
    results[player.name] = 0;
  }
  for (const targetId of room.votes.values()) {
    if (!targetId) continue;
    const target = room.players.find(player => player.id === targetId && !player.isEliminated);
    if (target) results[target.name] = (results[target.name] || 0) + 1;
  }

  let maxVotes = 0;
  for (const count of Object.values(results)) {
    maxVotes = Math.max(maxVotes, count);
  }
  const leaders = Object.entries(results).filter(([, count]) => count === maxVotes);
  room.voteResults = results;
  room.eliminatedPlayerId = maxVotes > 0 && leaders.length === 1
    ? room.players.find(player => player.name === leaders[0][0])?.id || null
    : null;
  room.phase = 'VOTE_RESULTS';
  room.timer = null;
  emitRoom(room);
}

function continueFromResults(room) {
  const eliminated = room.eliminatedPlayerId
    ? room.players.find(player => player.id === room.eliminatedPlayerId)
    : null;
  if (eliminated) {
    eliminated.isEliminated = true;
  }

  const alive = alivePlayers(room);
  const aliveImposters = alive.filter(player => player.role === 'IMPOSTER');
  const aliveNonImposters = alive.filter(player => player.role !== 'IMPOSTER');

  if (aliveImposters.length >= aliveNonImposters.length) {
    room.winner = 'IMPOSTER';
    room.phase = 'GAME_OVER';
    room.timer = null;
    emitRoom(room);
    return;
  }

  if (aliveImposters.length === 0) {
    room.phase = 'IMPOSTER_GUESS';
    room.guessingPlayerId = eliminated?.role === 'IMPOSTER'
      ? eliminated.id
      : room.players.find(player => player.role === 'IMPOSTER')?.id || null;
    room.timer = null;
    emitRoom(room);
    return;
  }

  startDiscussion(room);
}

function transferHost(room) {
  const nextHost = connectedPlayers(room)[0];
  room.hostId = nextHost?.id || room.hostId;
  room.players.forEach(player => {
    player.isHost = player.id === room.hostId;
  });
}

function createPlayer({ name, socket }) {
  return {
    id: randomUUID(),
    token: randomUUID(),
    name,
    socketId: socket.id,
    connected: true,
    isHost: false,
    isEliminated: false,
    hasVoted: false,
    roleReady: false,
    role: 'CITIZEN',
    word: undefined,
    hint: undefined,
    lastSeenAt: Date.now(),
  };
}

function startGame(room, wordPool) {
  const players = room.players;
  const selectedWord = choose(wordPool);
  const mode = room.settings.gameMode;
  let imposterCount = room.settings.imposterCount;
  const hasSpy = mode === 'SPY_MODE';
  const blind = mode === 'BLIND_IMPOSTER';
  if (hasSpy) imposterCount = 1;

  const selectedImposters = selectImposters(players, imposterCount, room.previousImposterIds);
  const imposters = new Set(selectedImposters.map(player => player.id));
  const shuffledPlayers = shuffle(players);
  let spyId = null;
  if (hasSpy) {
    const spyCandidate = shuffledPlayers.find(player => !imposters.has(player.id));
    spyId = spyCandidate?.id || null;
  }
  const fakeWords = wordPool.filter(entry => entry.word !== selectedWord.word);
  const fakeWord = fakeWords.length > 0 ? choose(fakeWords).word : selectedWord.word;

  room.secretWord = selectedWord.word;
  room.hint = selectedWord.hint;
  room.winner = 'NONE';
  room.imposterGuess = '';
  room.voteResults = {};
  room.eliminatedPlayerId = null;
  room.guessingPlayerId = null;
  room.previousImposterIds = selectedImposters.map(player => player.id);
  room.chaosRule = mode === 'CHAOS_MODE' ? choose([
    'One-word clues only',
    'Speak in questions only',
    'Clues must rhyme',
    'Whisper clues only',
  ]) : undefined;

  room.players = players.map(player => {
    const role = imposters.has(player.id) ? 'IMPOSTER' : spyId === player.id ? 'SPY' : 'CITIZEN';
    return {
      ...player,
      isEliminated: false,
      hasVoted: false,
      roleReady: false,
      role,
      word: role === 'CITIZEN' ? selectedWord.word : role === 'SPY' ? fakeWord : undefined,
      hint: role === 'IMPOSTER' ? (blind ? 'No hint. You are completely blind!' : selectedWord.hint) : undefined,
    };
  });

  room.phase = 'ROLE_REVEAL';
  room.timer = null;
  emitRoom(room);
}

io.on('connection', socket => {
  socket.on('room:create', ({ name }) => {
    const normalizedName = normalizeName(name);
    if (!normalizedName) {
      emitError(socket, 'Enter a display name.');
      return;
    }

    const code = createRoomCode();
    const host = createPlayer({ name: normalizedName, socket });
    host.isHost = true;
    const room = {
      code,
      phase: 'ONLINE_LOBBY',
      hostId: host.id,
      players: [host],
      settings: {
        playerNames: [],
        category: 'Animals',
        categories: ['Animals'],
        targetPlayerCount: 3,
        imposterCount: 1,
        discussionTimer: 180,
        votingTimer: 60,
        soundEffects: true,
        animations: true,
        darkMode: true,
        allowSkipVote: true,
        gameMode: 'CLASSIC',
      },
      secretWord: '',
      hint: '',
      votes: new Map(),
      voteResults: {},
      eliminatedPlayerId: null,
      guessingPlayerId: null,
      imposterGuess: '',
      winner: 'NONE',
      timer: null,
      createdAt: Date.now(),
      lastActivityAt: Date.now(),
      previousImposterIds: [],
    };
    rooms.set(code, room);
    socket.join(code);
    emitRoom(room);
  });

  socket.on('room:join', ({ roomCode, name, token }) => {
    const code = String(roomCode || '').trim().toUpperCase();
    const room = rooms.get(code);
    if (!room) {
      emitError(socket, 'Room not found.');
      return;
    }

    const reconnectingPlayer = token
      ? room.players.find(player => player.token === token)
      : null;
    if (reconnectingPlayer) {
      reconnectingPlayer.socketId = socket.id;
      reconnectingPlayer.connected = true;
      reconnectingPlayer.lastSeenAt = Date.now();
      socket.join(code);
      emitRoom(room);
      return;
    }

    if (room.phase !== 'ONLINE_LOBBY') {
      emitError(socket, 'Game already started. Rejoin with the same device.');
      return;
    }

    const normalizedName = normalizeName(name);
    if (!normalizedName) {
      emitError(socket, 'Enter a display name.');
      return;
    }
    if (room.players.some(player => player.name.toLowerCase() === normalizedName.toLowerCase())) {
      emitError(socket, 'That name is already in the room.');
      return;
    }

    const player = createPlayer({ name: normalizedName, socket });
    room.players.push(player);
    socket.join(code);
    emitRoom(room);
  });

  socket.on('room:reconnect', ({ roomCode, token }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    const player = room?.players.find(candidate => candidate.token === token);
    if (!room || !player) return;
    player.socketId = socket.id;
    player.connected = true;
    player.lastSeenAt = Date.now();
    socket.join(room.code);
    emitRoom(room);
  });

  socket.on('room:updateSettings', ({ roomCode, settings }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket)) return;
    if (room.phase !== 'ONLINE_LOBBY') return;
    room.settings = normalizeSettings(settings, room.settings);
    emitRoom(room);
  });

  socket.on('room:kick', ({ roomCode, playerId }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || room.phase !== 'ONLINE_LOBBY') return;
    const target = room.players.find(player => player.id === playerId);
    if (!target || target.id === room.hostId) return;
    if (target.socketId) io.to(target.socketId).emit('room:closed', { message: 'You were removed from the room.' });
    room.players = room.players.filter(player => player.id !== playerId);
    emitRoom(room);
  });

  socket.on('room:leave', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    const player = room ? getPlayerBySocket(room, socket) : null;
    if (!room || !player) return;
    if (room.phase === 'ONLINE_LOBBY') {
      room.players = room.players.filter(candidate => candidate.id !== player.id);
      if (room.players.length === 0) {
        rooms.delete(room.code);
        return;
      }
    } else {
      player.connected = false;
      player.socketId = null;
      player.lastSeenAt = Date.now();
    }
    if (player.id === room.hostId) transferHost(room);
    emitRoom(room);
  });

  socket.on('game:start', ({ roomCode, wordPool }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || room.phase !== 'ONLINE_LOBBY') return;
    const minimumPlayers = Math.max(3, room.settings.targetPlayerCount || 3);
    if (room.players.length < minimumPlayers) {
      emitError(socket, `Need ${minimumPlayers} players to start.`);
      return;
    }
    const maxImposters = Math.max(1, Math.floor(room.players.length / 2));
    room.settings.imposterCount = Math.min(room.settings.imposterCount, maxImposters);
    startGame(room, normalizeWordPool(wordPool));
  });

  socket.on('game:roleReady', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    const player = room ? getPlayerBySocket(room, socket) : null;
    if (!room || !player || room.phase !== 'ROLE_REVEAL') return;
    player.roleReady = true;
    if (room.players.every(candidate => candidate.roleReady || !candidate.connected)) {
      startDiscussion(room);
    } else {
      emitRoom(room);
    }
  });

  socket.on('game:pause', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || !room.timer || room.timer.isPaused) return;
    room.timer.remaining = currentTimer(room).remaining;
    room.timer.isPaused = true;
    emitRoom(room);
  });

  socket.on('game:resume', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || !room.timer || !room.timer.isPaused) return;
    room.timer.startedAt = Date.now();
    room.timer.duration = room.timer.remaining;
    room.timer.isPaused = false;
    emitRoom(room);
  });

  socket.on('game:startVoting', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || room.phase !== 'DISCUSSION') return;
    startVoting(room);
  });

  socket.on('game:vote', ({ roomCode, targetPlayerId }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    const voter = room ? getPlayerBySocket(room, socket) : null;
    if (!room || !voter || room.phase !== 'VOTING') return;
    if (voter.isEliminated || room.votes.has(voter.id) || currentTimer(room).remaining <= 0) return;
    if (targetPlayerId === null && !room.settings.allowSkipVote) return;
    if (targetPlayerId && !alivePlayers(room).some(player => player.id === targetPlayerId)) return;

    room.votes.set(voter.id, targetPlayerId || null);
    voter.hasVoted = true;
    if (connectedAlivePlayers(room).every(player => room.votes.has(player.id))) {
      calculateVotes(room);
    } else {
      emitRoom(room);
    }
  });

  socket.on('game:continueFromResults', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket) || room.phase !== 'VOTE_RESULTS') return;
    continueFromResults(room);
  });

  socket.on('game:guess', ({ roomCode, guess }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    const player = room ? getPlayerBySocket(room, socket) : null;
    if (!room || !player || room.phase !== 'IMPOSTER_GUESS') return;
    if (room.guessingPlayerId && player.id !== room.guessingPlayerId) return;
    const normalizedGuess = String(guess || '').trim();
    room.imposterGuess = normalizedGuess;
    room.winner = normalizedGuess.toLowerCase() === room.secretWord.toLowerCase() ? 'IMPOSTER' : 'CITIZENS';
    room.phase = 'GAME_OVER';
    emitRoom(room);
  });

  socket.on('game:returnToLobby', ({ roomCode }) => {
    const room = rooms.get(String(roomCode || '').trim().toUpperCase());
    if (!room || !isHost(room, socket)) return;
    room.phase = 'ONLINE_LOBBY';
    room.timer = null;
    room.secretWord = '';
    room.hint = '';
    room.votes = new Map();
    room.voteResults = {};
    room.eliminatedPlayerId = null;
    room.guessingPlayerId = null;
    room.imposterGuess = '';
    room.winner = 'NONE';
    room.players = room.players.map(player => ({
      ...player,
      isEliminated: false,
      hasVoted: false,
      roleReady: false,
      role: 'CITIZEN',
      word: undefined,
      hint: undefined,
    }));
    emitRoom(room);
  });

  socket.on('disconnect', () => {
    for (const room of rooms.values()) {
      const player = room.players.find(candidate => candidate.socketId === socket.id);
      if (!player) continue;

      if (room.phase === 'ONLINE_LOBBY') {
        room.players = room.players.filter(candidate => candidate.id !== player.id);
      } else {
        player.connected = false;
        player.socketId = null;
        player.lastSeenAt = Date.now();
      }

      if (player.id === room.hostId) transferHost(room);
      if (room.players.length === 0) {
        touch(room);
      } else {
        emitRoom(room);
      }
    }
  });
});

setInterval(() => {
  const now = Date.now();
  for (const room of rooms.values()) {
    if (room.timer && !room.timer.isPaused) {
      const timer = currentTimer(room);
      if (timer.remaining <= 0) {
        if (room.phase === 'DISCUSSION') startVoting(room);
        else if (room.phase === 'VOTING') calculateVotes(room);
      } else {
        emitRoom(room);
      }
    }

    const allDisconnected = room.players.every(player => !player.connected);
    const timeout = allDisconnected ? EMPTY_ROOM_TIMEOUT_MS : ROOM_IDLE_TIMEOUT_MS;
    if (now - room.lastActivityAt > timeout) {
      rooms.delete(room.code);
    }
  }
}, 1000);

httpServer.listen(PORT, () => {
  console.log(`Mystic Imposter online server listening on http://localhost:${PORT}`);
});
