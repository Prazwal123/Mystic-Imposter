import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io, type Socket } from 'socket.io-client';
import { useGame } from '@/context/GameContext';
import type { GameAction } from '@/context/GameContext';
import type { GameSettings, Player } from '@/types/game';
import type { ConnectionStatus, OnlineErrorPayload, OnlineRoomSnapshot } from '@/types/online';
import { getStoredPlayerToken, removeStoredPlayerToken, storePlayerToken } from '@/lib/onlineIdentity';

interface CreateRoomPayload {
  name: string;
}

interface JoinRoomPayload {
  roomCode: string;
  name: string;
}

interface OnlineContextValue {
  room: OnlineRoomSnapshot | null;
  status: ConnectionStatus;
  error: string;
  isOnline: boolean;
  createRoom: (payload: CreateRoomPayload) => void;
  joinRoom: (payload: JoinRoomPayload) => void;
  updateRoomSettings: (settings: Partial<GameSettings>) => void;
  startOnlineGame: (wordPool: Array<{ word: string; hint: string }>) => void;
  kickPlayer: (playerId: string) => void;
  markRoleReady: () => void;
  pauseOnlineGame: () => void;
  resumeOnlineGame: () => void;
  startOnlineVoting: () => void;
  castOnlineVote: (targetPlayerId: string | null) => void;
  continueOnlineFromResults: () => void;
  submitOnlineGuess: (guess: string) => void;
  returnOnlineToLobby: () => void;
  leaveRoom: () => void;
  clearError: () => void;
}

const OnlineContext = createContext<OnlineContextValue | null>(null);

function getSocketUrl() {
  const configured = import.meta.env.VITE_SOCKET_URL as string | undefined;
  if (configured) return configured;
  if (import.meta.env.DEV) return 'http://localhost:3001';
  return window.location.origin;
}

function buildPlayers(snapshot: OnlineRoomSnapshot): Player[] {
  return snapshot.players.map(player => {
    const isSelf = player.id === snapshot.you.id;
    const isEliminated = snapshot.eliminatedPlayer?.id === player.id;
    const revealedRole = player.finalRole
      || (isSelf ? snapshot.you.role : undefined)
      || (isEliminated && snapshot.eliminatedPlayer?.roleLabel === 'IMPOSTER' ? 'IMPOSTER' : undefined);

    return {
      id: player.id,
      name: player.name,
      role: revealedRole || 'CITIZEN',
      word: isSelf ? snapshot.you.word : undefined,
      hint: isSelf ? snapshot.you.hint : undefined,
      isEliminated: player.isEliminated,
      isDisconnected: !player.connected,
      hasVoted: player.hasVoted,
    };
  });
}

function syncSnapshotToGameState(snapshot: OnlineRoomSnapshot, dispatch: React.Dispatch<GameAction>) {
  const players = buildPlayers(snapshot);
  const selfIndex = Math.max(0, players.findIndex(player => player.id === snapshot.you.id));
  const eliminatedPlayer = snapshot.eliminatedPlayer
    ? players.find(player => player.id === snapshot.eliminatedPlayer?.id) || null
    : null;

  dispatch({
    type: 'LOAD_SAVED_STATE',
    payload: {
      phase: snapshot.phase,
      settings: snapshot.settings,
      players,
      secretWord: snapshot.phase === 'GAME_OVER' ? snapshot.secretWord || '' : '',
      currentPlayerIndex: selfIndex,
      revealIndex: selfIndex,
      votes: [],
      currentVoterIndex: 0,
      voteResults: snapshot.voteResults || {},
      eliminatedPlayer,
      imposterGuess: snapshot.imposterGuess || '',
      winner: snapshot.winner,
      discussionTimeLeft: snapshot.phase === 'DISCUSSION' ? snapshot.timer.remaining : snapshot.settings.discussionTimer,
      votingTimeLeft: snapshot.phase === 'VOTING' ? snapshot.timer.remaining : snapshot.settings.votingTimer,
      chaosRule: snapshot.chaosRule,
      isPaused: snapshot.timer.isPaused,
      isOnline: true,
      myPlayerId: snapshot.you.id,
      roomCode: snapshot.code,
      isHost: snapshot.you.isHost,
      connectedPlayersCount: snapshot.players.filter(player => player.connected).length,
    },
  });
}

export function OnlineProvider({ children }: { children: React.ReactNode }) {
  const { dispatch, resetToMenu } = useGame();
  const socketRef = useRef<Socket | null>(null);
  const roomRef = useRef<OnlineRoomSnapshot | null>(null);
  const [room, setRoom] = useState<OnlineRoomSnapshot | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>('idle');
  const [error, setError] = useState('');

  const ensureSocket = useCallback(() => {
    if (socketRef.current) return socketRef.current;

    const socket = io(getSocketUrl(), {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 700,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      setStatus('connected');
      const activeRoom = roomRef.current;
      if (activeRoom) {
        socket.emit('room:reconnect', {
          roomCode: activeRoom.code,
          token: activeRoom.you.token,
        });
      }
    });
    socket.on('disconnect', () => setStatus('disconnected'));
    socket.io.on('reconnect_attempt', () => setStatus('reconnecting'));
    socket.io.on('reconnect', () => setStatus('connected'));

    socket.on('room:state', (snapshot: OnlineRoomSnapshot) => {
      storePlayerToken(snapshot.code, snapshot.you.token);
      roomRef.current = snapshot;
      setRoom(snapshot);
      setError('');
      syncSnapshotToGameState(snapshot, dispatch);
    });

    socket.on('room:closed', ({ message }: OnlineErrorPayload) => {
      setError(message);
      roomRef.current = null;
      setRoom(null);
      resetToMenu();
    });

    socket.on('online:error', ({ message }: OnlineErrorPayload) => {
      setError(message);
    });

    socketRef.current = socket;
    return socket;
  }, [dispatch, resetToMenu]);

  const emit = useCallback((event: string, payload?: unknown) => {
    const socket = ensureSocket();
    if (!socket.connected) {
      setStatus(status === 'idle' ? 'connecting' : 'reconnecting');
      socket.connect();
    }
    socket.emit(event, payload);
  }, [ensureSocket, status]);

  const createRoom = useCallback(({ name }: CreateRoomPayload) => {
    const socket = ensureSocket();
    setStatus('connecting');
    if (!socket.connected) socket.connect();
    socket.emit('room:create', { name: name.trim() });
  }, [ensureSocket]);

  const joinRoom = useCallback(({ roomCode, name }: JoinRoomPayload) => {
    const code = roomCode.trim().toUpperCase();
    const socket = ensureSocket();
    setStatus('connecting');
    if (!socket.connected) socket.connect();
    socket.emit('room:join', {
      roomCode: code,
      name: name.trim(),
      token: getStoredPlayerToken(code),
    });
  }, [ensureSocket]);

  const leaveRoom = useCallback(() => {
    if (room) {
      emit('room:leave', { roomCode: room.code });
      removeStoredPlayerToken(room.code);
    }
    setRoom(null);
    roomRef.current = null;
    resetToMenu();
  }, [emit, resetToMenu, room]);

  const value = useMemo<OnlineContextValue>(() => ({
    room,
    status,
    error,
    isOnline: Boolean(room),
    createRoom,
    joinRoom,
    updateRoomSettings: settings => emit('room:updateSettings', { roomCode: room?.code, settings }),
    startOnlineGame: wordPool => emit('game:start', { roomCode: room?.code, wordPool }),
    kickPlayer: playerId => emit('room:kick', { roomCode: room?.code, playerId }),
    markRoleReady: () => emit('game:roleReady', { roomCode: room?.code }),
    pauseOnlineGame: () => emit('game:pause', { roomCode: room?.code }),
    resumeOnlineGame: () => emit('game:resume', { roomCode: room?.code }),
    startOnlineVoting: () => emit('game:startVoting', { roomCode: room?.code }),
    castOnlineVote: targetPlayerId => emit('game:vote', { roomCode: room?.code, targetPlayerId }),
    continueOnlineFromResults: () => emit('game:continueFromResults', { roomCode: room?.code }),
    submitOnlineGuess: guess => emit('game:guess', { roomCode: room?.code, guess }),
    returnOnlineToLobby: () => emit('game:returnToLobby', { roomCode: room?.code }),
    leaveRoom,
    clearError: () => setError(''),
  }), [createRoom, emit, error, joinRoom, leaveRoom, room, status]);

  useEffect(() => {
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  return (
    <OnlineContext.Provider value={value}>
      {children}
    </OnlineContext.Provider>
  );
}

export function useOnline() {
  const context = useContext(OnlineContext);
  if (!context) {
    throw new Error('useOnline must be used within an OnlineProvider');
  }
  return context;
}
