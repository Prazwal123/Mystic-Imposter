import type { GamePhase, GameSettings, Role, Winner } from '@/types/game';

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'disconnected';

export interface PublicOnlinePlayer {
  id: string;
  name: string;
  connected: boolean;
  isHost: boolean;
  isEliminated: boolean;
  hasVoted?: boolean;
  roleReady?: boolean;
  finalRole?: Role;
}

export interface OnlineSelf {
  id: string;
  name: string;
  role?: Role;
  word?: string;
  hint?: string;
  isHost: boolean;
  token: string;
}

export interface OnlineEliminatedPlayer {
  id: string;
  name: string;
  roleLabel?: 'IMPOSTER' | 'NOT_IMPOSTER';
}

export interface OnlineTimerState {
  duration: number;
  remaining: number;
  isPaused: boolean;
}

export interface OnlineRoomSnapshot {
  code: string;
  phase: GamePhase;
  settings: GameSettings;
  players: PublicOnlinePlayer[];
  you: OnlineSelf;
  timer: OnlineTimerState;
  voteResults?: Record<string, number>;
  eliminatedPlayer?: OnlineEliminatedPlayer | null;
  imposterGuess?: string;
  winner: Winner;
  secretWord?: string;
  chaosRule?: string;
  guessingPlayerId?: string | null;
}

export interface OnlineErrorPayload {
  message: string;
}
