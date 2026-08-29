const PLAYER_TOKEN_PREFIX = 'mystic_online_player_token_';

export function getStoredPlayerToken(roomCode: string): string | null {
  try {
    return localStorage.getItem(`${PLAYER_TOKEN_PREFIX}${roomCode.toUpperCase()}`);
  } catch {
    return null;
  }
}

export function storePlayerToken(roomCode: string, token: string): void {
  try {
    localStorage.setItem(`${PLAYER_TOKEN_PREFIX}${roomCode.toUpperCase()}`, token);
  } catch {
    /* ignore */
  }
}

export function removeStoredPlayerToken(roomCode: string): void {
  try {
    localStorage.removeItem(`${PLAYER_TOKEN_PREFIX}${roomCode.toUpperCase()}`);
  } catch {
    /* ignore */
  }
}
