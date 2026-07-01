// ============================================
// Mystic Imposter - Core Type Definitions
// ============================================

export type GamePhase =
  | 'MENU'
  | 'SETUP'
  | 'ROLE_REVEAL'
  | 'DISCUSSION'
  | 'VOTING'
  | 'VOTE_RESULTS'
  | 'IMPOSTER_GUESS'
  | 'GAME_OVER'
  | 'STATISTICS'
  | 'GAME_HISTORY'
  | 'SETTINGS'
  | 'ADMIN'
  | 'WORD_PACKS'
  | 'ONLINE_MENU'
  | 'ONLINE_LOBBY';

export type GameMode =
  | 'CLASSIC'
  | 'DOUBLE_IMPOSTER'
  | 'MULTIPLE_IMPOSTER'
  | 'BLIND_IMPOSTER'
  | 'SPY_MODE'
  | 'CHAOS_MODE';

export type Role = 'CITIZEN' | 'IMPOSTER' | 'SPY';

export type Winner = 'CITIZENS' | 'IMPOSTER' | 'NONE';

export interface WordEntry {
  word: string;
  hint: string;
}

export interface Category {
  name: string;
  words: WordEntry[];
  isCustom?: boolean;
  createdAt?: string;
}

export interface Player {
  id: string;
  name: string;
  role: Role;
  word?: string;
  hint?: string;
  isEliminated: boolean;
  isDisconnected?: boolean;
  hasVoted?: boolean;
}

export interface GameSettings {
  playerNames: string[];
  category: string;
  categories?: string[];
  targetPlayerCount?: number;
  imposterCount: number;
  discussionTimer: number;
  votingTimer: number;
  soundEffects: boolean;
  animations: boolean;
  darkMode: boolean;
  allowSkipVote: boolean;
  gameMode: GameMode;
}

export interface Vote {
  voter: string;
  target: string | null; // null = skip vote
}

export interface GameResult {
  id: string;
  date: string;
  players: string[];
  category: string;
  difficulty?: string;
  gameMode: GameMode;
  secretWord: string;
  winner: Winner;
  imposterCount: number;
  duration: number; // seconds
  votes: Vote[];
  imposterGuess?: string;
  eliminatedPlayer?: string;
  eliminatedRole?: Role;
}

export interface PlayerStats {
  name: string;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  imposterWins: number;
  citizenWins: number;
  longestStreak: number;
  currentStreak: number;
  lastPlayed: string;
}

export interface GameStatistics {
  totalGames: number;
  citizenWins: number;
  imposterWins: number;
  totalDuration: number;
  mostPlayedCategory: string;
  mostFrequentWord: string;
  gameHistory: GameResult[];
  playerStats: Record<string, PlayerStats>;
}

export interface AppSettings {
  darkMode: boolean;
  animations: boolean;
  soundEffects: boolean;
  defaultDiscussionTimer: number;
  defaultVotingTimer: number;
  defaultImposterCount: number;
  recentWordProtectionCount: number;
  privacyMode: boolean;
}

export interface CustomWordPack {
  id: string;
  name: string;
  category: string;
  words: WordEntry[];
  createdAt: string;
}

export interface GameState {
  phase: GamePhase;
  settings: GameSettings;
  players: Player[];
  previousImposterIds: string[];
  secretWord: string;
  currentPlayerIndex: number;
  revealIndex: number;
  votes: Vote[];
  currentVoterIndex: number;
  voteResults: Record<string, number>;
  eliminatedPlayer: Player | null;
  imposterGuess: string;
  winner: Winner;
  gameStartTime: number;
  discussionTimeLeft: number;
  votingTimeLeft: number;
  chaosRule?: string;
  isPaused: boolean;
  isOnline?: boolean;
  myPlayerId?: string;
  roomCode?: string;
  isHost?: boolean;
  connectedPlayersCount?: number;
}

export const GAME_MODE_CONFIG: Record<GameMode, { name: string; description: string; maxImposters: number; hasSpy: boolean; blind: boolean; unlockRequirement: string }> = {
  CLASSIC: { name: 'Classic', description: 'One Imposter. Standard rules.', maxImposters: 1, hasSpy: false, blind: false, unlockRequirement: 'Available from start' },
  DOUBLE_IMPOSTER: { name: 'Double Trouble', description: 'Two Imposters. Neither knows the other.', maxImposters: 2, hasSpy: false, blind: false, unlockRequirement: 'Play 3 Classic games' },
  MULTIPLE_IMPOSTER: { name: 'The Trio', description: 'Up to three Imposters. None know each other.', maxImposters: 3, hasSpy: false, blind: false, unlockRequirement: 'Play 5 total games' },
  BLIND_IMPOSTER: { name: 'Blind Imposter', description: 'Imposter receives no hint at all.', maxImposters: 1, hasSpy: false, blind: true, unlockRequirement: 'Win 1 game as Imposter' },
  SPY_MODE: { name: 'Spy Infiltration', description: 'One player gets a misleading fake word.', maxImposters: 1, hasSpy: true, blind: false, unlockRequirement: 'Play 8 total games' },
  CHAOS_MODE: { name: 'Chaos Mode', description: 'A random rule modifier each game.', maxImposters: 2, hasSpy: false, blind: false, unlockRequirement: 'Play 12 total games' },
};

export const CHAOS_RULES = [
  'Whisper clues only - no normal speaking!',
  'One-word clues only!',
  'You must gesture before giving your clue!',
  'Clues must rhyme!',
  'Speak in questions only!',
  'No using words starting with S!',
  'Clues must be shorter than 5 words!',
  'Everyone closes eyes while giving clues!',
];

export const TIMER_OPTIONS = [
  { label: '30s', value: 30 },
  { label: '1m', value: 60 },
  { label: '2m', value: 120 },
  { label: '3m', value: 180 },
  { label: '5m', value: 300 },
  { label: '10m', value: 600 },
];
