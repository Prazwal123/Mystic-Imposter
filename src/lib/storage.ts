import type { GameStatistics, AppSettings, GameResult, WordEntry } from '@/types/game';

// ============================================
// LocalStorage Keys
// ============================================

const KEYS = {
  STATISTICS: 'mystic_statistics',
  SETTINGS: 'mystic_settings',
  RECENT_WORDS: 'mystic_recent_words',
  CUSTOM_PACKS: 'mystic_custom_packs',
  ADMIN_AUTH: 'mystic_admin_auth',
};

// ============================================
// Statistics
// ============================================

export function getStatistics(): GameStatistics {
  try {
    const data = localStorage.getItem(KEYS.STATISTICS);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return {
    totalGames: 0,
    citizenWins: 0,
    imposterWins: 0,
    totalDuration: 0,
    mostPlayedCategory: '',
    mostFrequentWord: '',
    gameHistory: [],
    playerStats: {},
  };
}

export function saveStatistics(stats: GameStatistics): void {
  localStorage.setItem(KEYS.STATISTICS, JSON.stringify(stats));
}

export function resetStatistics(): void {
  localStorage.removeItem(KEYS.STATISTICS);
}

// ============================================
// Settings
// ============================================

export function getSettings(): AppSettings {
  try {
    const data = localStorage.getItem(KEYS.SETTINGS);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return {
    darkMode: true,
    animations: true,
    soundEffects: true,
    defaultDiscussionTimer: 180,
    defaultVotingTimer: 60,
    defaultImposterCount: 1,
    recentWordProtectionCount: 10,
    privacyMode: false,
  };
}

export function saveSettings(settings: AppSettings): void {
  localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
}

// ============================================
// Recent Words (for word protection)
// ============================================

export function getRecentWords(): string[] {
  try {
    const data = localStorage.getItem(KEYS.RECENT_WORDS);
    if (data) return JSON.parse(data);
  } catch { /* ignore */ }
  return [];
}

export function addRecentWord(word: string): void {
  const words = getRecentWords();
  const settings = getSettings();
  words.unshift(word);
  const maxCount = settings.recentWordProtectionCount || 10;
  if (words.length > maxCount) {
    words.pop();
  }
  localStorage.setItem(KEYS.RECENT_WORDS, JSON.stringify(words));
}

export function clearRecentWords(): void {
  localStorage.removeItem(KEYS.RECENT_WORDS);
}

// ============================================
// Custom Word Packs
// ============================================

export interface StoredCustomPack {
  id: string;
  name: string;
  category: string;
  words: WordEntry[];
  createdAt: string;
}

interface LegacyWordEntry {
  word?: string;
  hint?: string;
  hintEasy?: string;
  hintMedium?: string;
  hintHard?: string;
  hintExtreme?: string;
}

type LegacyStoredCustomPack = Partial<Omit<StoredCustomPack, 'words'>> & {
  words?: LegacyWordEntry[];
};

function normalizeWord(word: LegacyWordEntry): WordEntry {
  return {
    word: word.word || '',
    hint: word.hint
      || word.hintHard
      || word.hintMedium
      || word.hintEasy
      || word.hintExtreme
      || '',
  };
}

function normalizeCustomPack(pack: LegacyStoredCustomPack, index: number): StoredCustomPack {
  const name = pack.name || pack.category || `Custom Pack ${index + 1}`;
  const stableName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  return {
    id: pack.id || `legacy-${index}-${stableName || 'pack'}`,
    name,
    category: pack.category || name,
    words: Array.isArray(pack.words) ? pack.words.map(normalizeWord) : [],
    createdAt: pack.createdAt || new Date(0).toISOString(),
  };
}

export function getCustomPacks(): StoredCustomPack[] {
  try {
    const data = localStorage.getItem(KEYS.CUSTOM_PACKS);
    if (data) {
      const parsed: unknown = JSON.parse(data);
      if (!Array.isArray(parsed)) return [];

      const packs = parsed
        .filter((pack): pack is LegacyStoredCustomPack => Boolean(pack) && typeof pack === 'object')
        .map(normalizeCustomPack);

      // Persist the migration so legacy difficulty-specific hints are removed.
      const normalizedData = JSON.stringify(packs);
      if (normalizedData !== data) {
        localStorage.setItem(KEYS.CUSTOM_PACKS, normalizedData);
      }

      return packs;
    }
  } catch { /* ignore */ }
  return [];
}

export function saveCustomPack(pack: StoredCustomPack): void {
  const packs = getCustomPacks();
  const existing = packs.findIndex(p => p.id === pack.id);
  const normalizedPack = normalizeCustomPack(pack, existing >= 0 ? existing : packs.length);
  if (existing >= 0) {
    packs[existing] = normalizedPack;
  } else {
    packs.push(normalizedPack);
  }
  localStorage.setItem(KEYS.CUSTOM_PACKS, JSON.stringify(packs));
}

export function deleteCustomPack(id: string): void {
  const packs = getCustomPacks().filter(p => p.id !== id);
  localStorage.setItem(KEYS.CUSTOM_PACKS, JSON.stringify(packs));
}

// ============================================
// Admin Auth
// ============================================

const DEFAULT_ADMIN_PASSWORD = 'mysticadmin2024';

export function verifyAdminPassword(password: string): boolean {
  return password === DEFAULT_ADMIN_PASSWORD;
}

export function isAdminAuthenticated(): boolean {
  try {
    const data = localStorage.getItem(KEYS.ADMIN_AUTH);
    if (data) {
      const { timestamp } = JSON.parse(data);
      // Session expires after 24 hours
      if (Date.now() - timestamp < 24 * 60 * 60 * 1000) {
        return true;
      }
    }
  } catch { /* ignore */ }
  return false;
}

export function setAdminAuthenticated(): void {
  localStorage.setItem(KEYS.ADMIN_AUTH, JSON.stringify({ timestamp: Date.now() }));
}

export function clearAdminAuth(): void {
  localStorage.removeItem(KEYS.ADMIN_AUTH);
}

// ============================================
// Game History
// ============================================

export function getGameHistory(): GameResult[] {
  const stats = getStatistics();
  return stats.gameHistory;
}

export function clearGameHistory(): void {
  const stats = getStatistics();
  stats.gameHistory = [];
  saveStatistics(stats);
}

// ============================================
// Utilities
// ============================================

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
