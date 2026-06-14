// ============================================
// Sound Effect Manager
// ============================================

import { getSettings } from './storage';

const soundCache: Record<string, HTMLAudioElement> = {};

function getAudio(path: string): HTMLAudioElement {
  if (!soundCache[path]) {
    soundCache[path] = new Audio(path);
  }
  return soundCache[path];
}

export function playSound(soundName: 'card-flip' | 'button-click' | 'timer-tick' | 'buzzer' | 'vote-lock' | 'win-citizens' | 'win-imposter' | 'error'): void {
  const settings = getSettings();
  if (!settings.soundEffects) return;

  const soundMap: Record<string, string> = {
    'card-flip': '/sounds/card-flip.mp3',
    'button-click': '/sounds/button-click.mp3',
    'timer-tick': '/sounds/button-click.mp3',
    'buzzer': '/sounds/button-click.mp3',
    'vote-lock': '/sounds/button-click.mp3',
    'win-citizens': '/sounds/card-flip.mp3',
    'win-imposter': '/sounds/card-flip.mp3',
    'error': '/sounds/button-click.mp3',
  };

  const path = soundMap[soundName];
  if (!path) return;

  try {
    const audio = getAudio(path);
    audio.currentTime = 0;
    audio.volume = 0.5;
    audio.play().catch(() => {}); // Ignore autoplay restrictions
  } catch {
    // Ignore sound errors
  }
}

export function playCardFlip(): void {
  playSound('card-flip');
}

export function playButtonClick(): void {
  playSound('button-click');
}

export function playBuzzer(): void {
  playSound('buzzer');
}

export function playWinSound(winner: 'CITIZENS' | 'IMPOSTER'): void {
  playSound(winner === 'CITIZENS' ? 'win-citizens' : 'win-imposter');
}

export function playError(): void {
  playSound('error');
}
