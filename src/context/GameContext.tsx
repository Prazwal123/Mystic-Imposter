import React, { createContext, useContext, useReducer, useCallback, useEffect, useRef } from 'react';
import type { GameState, GamePhase, GameSettings, Player, Vote, Winner, Role, GameResult } from '@/types/game';
import { CHAOS_RULES, GAME_MODE_CONFIG } from '@/types/game';
import { getRandomWord, getHint, getSecureRandomItem, getSecureRandomItems, getWordsForCategories } from '@/data/wordlist';
import { getRecentWords, addRecentWord, getStatistics, saveStatistics, generateId } from '@/lib/storage';

// ============================================
// Initial State
// ============================================

const defaultSettings: GameSettings = {
  playerNames: [],
  category: 'Animals',
  imposterCount: 1,
  discussionTimer: 180,
  votingTimer: 60,
  soundEffects: true,
  animations: true,
  darkMode: true,
  allowSkipVote: true,
  gameMode: 'CLASSIC',
};

const initialState: GameState = {
  phase: 'MENU',
  settings: { ...defaultSettings },
  players: [],
  secretWord: '',
  currentPlayerIndex: 0,
  revealIndex: 0,
  votes: [],
  currentVoterIndex: 0,
  voteResults: {},
  eliminatedPlayer: null,
  imposterGuess: '',
  winner: 'NONE',
  gameStartTime: 0,
  discussionTimeLeft: 180,
  votingTimeLeft: 60,
  isPaused: false,
};

// ============================================
// Action Types
// ============================================

export type GameAction =
  | { type: 'SET_PHASE'; payload: GamePhase }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<GameSettings> }
  | { type: 'START_GAME' }
  | { type: 'NEXT_REVEAL' }
  | { type: 'REVEAL_ROLE'; payload: { playerIndex: number } }
  | { type: 'START_DISCUSSION' }
  | { type: 'UPDATE_DISCUSSION_TIMER'; payload: number }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESUME_GAME' }
  | { type: 'START_VOTING' }
  | { type: 'CAST_VOTE'; payload: Vote }
  | { type: 'UPDATE_VOTING_TIMER'; payload: number }
  | { type: 'CALCULATE_VOTES' }
  | { type: 'SUBMIT_GROUP_VOTE'; payload: string }
  | { type: 'SUBMIT_IMPOSTER_GUESS'; payload: string }
  | { type: 'END_GAME'; payload: Winner }
  | { type: 'RESET_TO_MENU' }
  | { type: 'LOAD_SAVED_STATE'; payload: Partial<GameState> }
  | { type: 'CONTINUE_FROM_VOTE_RESULTS' };

// ============================================
// Reducer
// ============================================

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PHASE':
      return { ...state, phase: action.payload };

    case 'UPDATE_SETTINGS':
      return { ...state, settings: { ...state.settings, ...action.payload } };

    case 'START_GAME': {
      const { settings } = state;
      const selectedCategories = settings.categories?.length
        ? settings.categories
        : settings.category.split(',').map(category => category.trim()).filter(Boolean);
      const wordPool = getWordsForCategories(selectedCategories);
      if (wordPool.length === 0) return state;

      const recentWords = getRecentWords();
      const wordEntry = getRandomWord(selectedCategories, recentWords);
      if (!wordEntry) return state;

      const secretWord = wordEntry.word;
      const hint = getHint(wordEntry);

      // Assign roles
      const playerCount = settings.playerNames.length;
      const roles: Role[] = new Array(playerCount).fill('CITIZEN');

      // Assign imposters
      let imposterCount = settings.imposterCount;
      const modeConfig = GAME_MODE_CONFIG[settings.gameMode];
      if (modeConfig.blind) {
        // Blind mode: still has imposter but no hint
      }
      if (modeConfig.hasSpy) {
        imposterCount = 1; // Spy mode has 1 imposter + 1 spy
      }

      const playerIndices = roles.map((_, index) => index);
      const imposterIndices = getSecureRandomItems(playerIndices, imposterCount);
      imposterIndices.forEach(index => {
        roles[index] = 'IMPOSTER';
      });

      // Assign spy if spy mode
      let spyIndex = -1;
      if (modeConfig.hasSpy) {
        const availableForSpy = roles.map((_, i) => i).filter(i => roles[i] === 'CITIZEN');
        const selectedSpy = getSecureRandomItem(availableForSpy);
        if (selectedSpy !== null) {
          spyIndex = selectedSpy;
          roles[spyIndex] = 'SPY';
        }
      }

      // Get a fake word for spy (different from secret)
      let fakeWord = '';
      if (spyIndex >= 0) {
        const otherWords = wordPool.filter(w => w.word !== secretWord);
        fakeWord = getSecureRandomItem(otherWords)?.word || '';
      }

      const players: Player[] = settings.playerNames.map((name, i) => ({
        id: `player-${i}`,
        name,
        role: roles[i],
        word: roles[i] === 'CITIZEN' ? secretWord : roles[i] === 'SPY' ? fakeWord : undefined,
        hint: roles[i] === 'IMPOSTER' && !modeConfig.blind ? hint : roles[i] === 'IMPOSTER' && modeConfig.blind ? 'No hint. You are completely blind!' : undefined,
        isEliminated: false,
      }));

      // Pick chaos rule if chaos mode
      let chaosRule: string | undefined;
      if (settings.gameMode === 'CHAOS_MODE') {
        chaosRule = getSecureRandomItem(CHAOS_RULES) || undefined;
      }

      // Add to recent words
      addRecentWord(secretWord);

      return {
        ...state,
        phase: 'ROLE_REVEAL',
        players,
        secretWord,
        currentPlayerIndex: 0,
        revealIndex: 0,
        votes: [],
        currentVoterIndex: 0,
        voteResults: {},
        eliminatedPlayer: null,
        imposterGuess: '',
        winner: 'NONE',
        gameStartTime: Date.now(),
        discussionTimeLeft: settings.discussionTimer,
        votingTimeLeft: settings.votingTimer,
        chaosRule,
        isPaused: false,
      };
    }

    case 'NEXT_REVEAL': {
      const nextIndex = state.revealIndex + 1;
      if (nextIndex >= state.players.length) {
        return { ...state, phase: 'DISCUSSION', revealIndex: nextIndex };
      }
      return {
        ...state,
        currentPlayerIndex: nextIndex,
        revealIndex: nextIndex,
      };
    }

    case 'START_DISCUSSION':
      return {
        ...state,
        phase: 'DISCUSSION',
        discussionTimeLeft: state.settings.discussionTimer,
      };

    case 'UPDATE_DISCUSSION_TIMER':
      return { ...state, discussionTimeLeft: action.payload };

    case 'PAUSE_GAME':
      return { ...state, isPaused: true };

    case 'RESUME_GAME':
      return { ...state, isPaused: false };

    case 'START_VOTING':
      return {
        ...state,
        phase: 'VOTING',
        currentVoterIndex: 0,
        votingTimeLeft: state.settings.votingTimer,
      };

    case 'CAST_VOTE': {
      const newVotes = [...state.votes, action.payload];
      const nextVoter = state.currentVoterIndex + 1;
      if (nextVoter >= state.players.length) {
        return { ...state, votes: newVotes };
      }
      return { ...state, votes: newVotes, currentVoterIndex: nextVoter };
    }

    case 'UPDATE_VOTING_TIMER':
      return { ...state, votingTimeLeft: action.payload };

    case 'CALCULATE_VOTES': {
      const results: Record<string, number> = {};
      state.players.forEach(p => { results[p.name] = 0; });
      state.votes.forEach(v => {
        if (v.target) {
          results[v.target] = (results[v.target] || 0) + 1;
        }
      });

      // Find player with most votes
      let maxVotes = -1;
      let eliminated: Player | null = null;
      Object.entries(results).forEach(([name, count]) => {
        if (count > maxVotes) {
          maxVotes = count;
          eliminated = state.players.find(p => p.name === name) || null;
        }
      });

      // Check for tie
      const tiedPlayers = Object.entries(results).filter(([, count]) => count === maxVotes);
      const hasTie = tiedPlayers.length > 1 && maxVotes > 0;

      if (hasTie || maxVotes === 0) {
        // No elimination on tie or no votes
        return {
          ...state,
          phase: 'VOTE_RESULTS',
          voteResults: results,
          eliminatedPlayer: null,
        };
      }

      return {
        ...state,
        phase: 'VOTE_RESULTS',
        voteResults: results,
        eliminatedPlayer: eliminated,
      };
    }

    case 'SUBMIT_GROUP_VOTE': {
      const results: Record<string, number> = {};
      state.players.forEach(player => {
        results[player.name] = player.name === action.payload ? 1 : 0;
      });

      return {
        ...state,
        phase: 'VOTE_RESULTS',
        votes: [{ voter: 'Group', target: action.payload }],
        voteResults: results,
        eliminatedPlayer: state.players.find(player => player.name === action.payload) || null,
      };
    }

    case 'SUBMIT_IMPOSTER_GUESS': {
      const guess = action.payload.toLowerCase().trim();
      const correct = guess === state.secretWord.toLowerCase().trim();
      const winner: Winner = correct ? 'IMPOSTER' : 'CITIZENS';

      return {
        ...state,
        imposterGuess: action.payload,
        winner,
        phase: 'GAME_OVER',
      };
    }

    case 'END_GAME':
      return { ...state, winner: action.payload, phase: 'GAME_OVER' };

    case 'RESET_TO_MENU':
      return {
        ...initialState,
        settings: state.settings,
      };

    case 'LOAD_SAVED_STATE':
      return { ...state, ...action.payload };

    case 'CONTINUE_FROM_VOTE_RESULTS': {
      let updatedPlayers = state.players;
      if (state.eliminatedPlayer) {
        updatedPlayers = state.players.map(p =>
          p.id === state.eliminatedPlayer?.id ? { ...p, isEliminated: true } : p
        );
      }

      // Check win conditions
      const aliveImposters = updatedPlayers.filter(p => p.role === 'IMPOSTER' && !p.isEliminated);
      const aliveNonImposters = updatedPlayers.filter(p => p.role !== 'IMPOSTER' && !p.isEliminated);

      if (aliveImposters.length >= aliveNonImposters.length) {
        // Imposters win!
        return {
          ...state,
          players: updatedPlayers,
          winner: 'IMPOSTER',
          phase: 'GAME_OVER',
        };
      }

      if (aliveImposters.length === 0) {
        // All imposters eliminated! Citizens win but Imposter gets one last guess
        return {
          ...state,
          players: updatedPlayers,
          phase: 'IMPOSTER_GUESS',
        };
      }

      // Game continues! Go to next round
      return {
        ...state,
        players: updatedPlayers,
        phase: 'DISCUSSION',
        votes: [],
        voteResults: {},
        eliminatedPlayer: null,
        discussionTimeLeft: state.settings.discussionTimer,
        votingTimeLeft: state.settings.votingTimer,
        currentVoterIndex: 0,
      };
    }

    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  startGame: () => void;
  nextReveal: () => void;
  startDiscussion: () => void;
  startVoting: () => void;
  castVote: (vote: Vote) => void;
  calculateVotes: () => void;
  submitGroupVote: (target: string) => void;
  submitImposterGuess: (guess: string) => void;
  endGame: (winner: Winner) => void;
  resetToMenu: () => void;
  setPhase: (phase: GamePhase) => void;
  updateSettings: (settings: Partial<GameSettings>) => void;
  pauseGame: () => void;
  resumeGame: () => void;
  continueFromVoteResults: () => void;
}

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const savedGameResultKey = useRef<string | null>(null);

  const startGame = useCallback(() => {
    dispatch({ type: 'START_GAME' });
  }, []);

  const nextReveal = useCallback(() => {
    dispatch({ type: 'NEXT_REVEAL' });
  }, []);

  const startDiscussion = useCallback(() => {
    dispatch({ type: 'START_DISCUSSION' });
  }, []);

  const startVoting = useCallback(() => {
    dispatch({ type: 'START_VOTING' });
  }, []);

  const castVote = useCallback((vote: Vote) => {
    dispatch({ type: 'CAST_VOTE', payload: vote });
  }, []);

  const calculateVotes = useCallback(() => {
    dispatch({ type: 'CALCULATE_VOTES' });
  }, []);

  const submitGroupVote = useCallback((target: string) => {
    dispatch({ type: 'SUBMIT_GROUP_VOTE', payload: target });
  }, []);

  const submitImposterGuess = useCallback((guess: string) => {
    dispatch({ type: 'SUBMIT_IMPOSTER_GUESS', payload: guess });
  }, []);

  const endGame = useCallback((winner: Winner) => {
    dispatch({ type: 'END_GAME', payload: winner });
  }, []);

  const resetToMenu = useCallback(() => {
    dispatch({ type: 'RESET_TO_MENU' });
  }, []);

  const setPhase = useCallback((phase: GamePhase) => {
    dispatch({ type: 'SET_PHASE', payload: phase });
  }, []);

  const updateSettings = useCallback((settings: Partial<GameSettings>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  }, []);

  const pauseGame = useCallback(() => {
    dispatch({ type: 'PAUSE_GAME' });
  }, []);

  const resumeGame = useCallback(() => {
    dispatch({ type: 'RESUME_GAME' });
  }, []);

  const continueFromVoteResults = useCallback(() => {
    dispatch({ type: 'CONTINUE_FROM_VOTE_RESULTS' });
  }, []);

  // Save game result to statistics when game ends
  useEffect(() => {
    if (state.phase !== 'GAME_OVER') {
      savedGameResultKey.current = null;
      return;
    }

    if (!state.isOnline && state.winner !== 'NONE') {
      const resultKey = `${state.gameStartTime}:${state.winner}:${state.secretWord}`;
      if (savedGameResultKey.current === resultKey) return;
      savedGameResultKey.current = resultKey;

      const duration = Math.floor((Date.now() - state.gameStartTime) / 1000);
      const result: GameResult = {
        id: generateId(),
        date: new Date().toISOString(),
        players: state.players.map(p => p.name),
        category: state.settings.category,
        gameMode: state.settings.gameMode,
        secretWord: state.secretWord,
        winner: state.winner,
        imposterCount: state.settings.imposterCount,
        duration,
        votes: state.votes,
        imposterGuess: state.imposterGuess || undefined,
        eliminatedPlayer: state.eliminatedPlayer?.name,
        eliminatedRole: state.eliminatedPlayer?.role,
      };

      const stats = getStatistics();
      stats.totalGames += 1;
      if (state.winner === 'CITIZENS') {
        stats.citizenWins += 1;
      } else {
        stats.imposterWins += 1;
      }
      stats.totalDuration += duration;
      stats.gameHistory.unshift(result);
      if (stats.gameHistory.length > 100) {
        stats.gameHistory = stats.gameHistory.slice(0, 100);
      }

      // Update player stats
      state.players.forEach(player => {
        const isWinner = state.winner === 'CITIZENS' && player.role !== 'IMPOSTER' ||
                        state.winner === 'IMPOSTER' && player.role === 'IMPOSTER';
        const existing = stats.playerStats[player.name] || {
          name: player.name,
          gamesPlayed: 0,
          gamesWon: 0,
          gamesLost: 0,
          imposterWins: 0,
          citizenWins: 0,
          longestStreak: 0,
          currentStreak: 0,
          lastPlayed: '',
        };

        existing.gamesPlayed += 1;
        if (isWinner) {
          existing.gamesWon += 1;
          existing.currentStreak += 1;
          if (existing.currentStreak > existing.longestStreak) {
            existing.longestStreak = existing.currentStreak;
          }
          if (player.role === 'IMPOSTER') existing.imposterWins += 1;
          else existing.citizenWins += 1;
        } else {
          existing.gamesLost += 1;
          existing.currentStreak = 0;
        }
        existing.lastPlayed = new Date().toISOString();
        stats.playerStats[player.name] = existing;
      });

      saveStatistics(stats);
    }
  }, [state]);

  return (
    <GameContext.Provider value={{
      state, dispatch, startGame, nextReveal, startDiscussion,
      startVoting, castVote, calculateVotes, submitImposterGuess,
      submitGroupVote, endGame, resetToMenu, setPhase, updateSettings, pauseGame, resumeGame,
      continueFromVoteResults,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
