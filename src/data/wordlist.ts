import type { Category, WordEntry } from '@/types/game';
import { getCustomPacks } from '@/lib/storage';

// ============================================
// Built-in Word Categories for Mystic Imposter
// ============================================

const animals: WordEntry[] = [
  { word: 'Elephant', hint: 'Massive herbivore' },
  { word: 'Tiger', hint: 'Striped feline' },
  { word: 'Lion', hint: 'African predator' },
  { word: 'Penguin', hint: 'Waddling swimmer' },
  { word: 'Dolphin', hint: 'Ocean acrobat' },
  { word: 'Eagle', hint: 'Soaring hunter' },
  { word: 'Shark', hint: 'Cartilaginous fish' },
  { word: 'Giraffe', hint: 'Tree leaf eater' },
  { word: 'Panda', hint: 'Endangered bear' },
  { word: 'Kangaroo', hint: 'Marsupial jumper' },
  { word: 'Octopus', hint: 'Intelligent cephalopod' },
  { word: 'Wolf', hint: 'Canine predator' },
  { word: 'Owl', hint: 'Nocturnal hunter' },
  { word: 'Snake', hint: 'Slithering reptile' },
  { word: 'Bear', hint: 'Omnivorous giant' },
];

const movies: WordEntry[] = [
  { word: 'Inception', hint: 'Subconscious theft' },
  { word: 'Titanic', hint: '1912 disaster' },
  { word: 'Avatar', hint: 'Na vi tribe' },
  { word: 'Jaws', hint: 'Amity Island' },
  { word: 'Frozen', hint: 'Arendelle sisters' },
  { word: 'Batman', hint: 'Caped crusader' },
  { word: 'Jurassic Park', hint: 'Isla Nublar' },
  { word: 'The Matrix', hint: 'Neo awakens' },
  { word: 'Star Wars', hint: 'Galactic empire' },
  { word: 'Gladiator', hint: 'Maximus revenge' },
];

const food: WordEntry[] = [
  { word: 'Pizza', hint: 'Neapolitan flatbread' },
  { word: 'Sushi', hint: 'Vinegared rice' },
  { word: 'Burger', hint: 'Grilled sandwich' },
  { word: 'Pasta', hint: 'Mediterranean staple' },
  { word: 'Taco', hint: 'Corn tortilla wrap' },
  { word: 'Chocolate', hint: 'Confectionery delight' },
  { word: 'Ice Cream', hint: 'Dairy frozen dish' },
  { word: 'Steak', hint: 'Seared protein' },
  { word: 'Salad', hint: 'Raw vegetable mix' },
  { word: 'Curry', hint: 'Aromatic gravy' },
];

const countries: WordEntry[] = [
  { word: 'Japan', hint: 'Archipelago of temples' },
  { word: 'Brazil', hint: 'Portuguese speaking giant' },
  { word: 'Egypt', hint: 'Ancient pharaoh land' },
  { word: 'France', hint: 'Hexagonal republic' },
  { word: 'Australia', hint: 'Down under nation' },
  { word: 'Italy', hint: 'Peninsula of art' },
  { word: 'India', hint: 'Subcontinental republic' },
  { word: 'Canada', hint: 'True north wilderness' },
  { word: 'Germany', hint: 'Central European state' },
  { word: 'Mexico', hint: 'Mesoamerican nation' },
];

const sports: WordEntry[] = [
  { word: 'Soccer', hint: 'Association football' },
  { word: 'Basketball', hint: 'Court team game' },
  { word: 'Tennis', hint: 'Court racquet game' },
  { word: 'Swimming', hint: 'Aquatic propulsion' },
  { word: 'Baseball', hint: 'Diamond field game' },
  { word: 'Golf', hint: 'Green fairway game' },
  { word: 'Boxing', hint: 'Pugilism match' },
  { word: 'Hockey', hint: 'Stick puck game' },
  { word: 'Cycling', hint: 'Pedal-powered race' },
  { word: 'Skiing', hint: 'Snow slope glide' },
];

const nature: WordEntry[] = [
  { word: 'Volcano', hint: 'Tectonic vent mountain' },
  { word: 'Rainbow', hint: 'Prismatic light bow' },
  { word: 'Thunderstorm', hint: 'Cumulonimbus discharge' },
  { word: 'Waterfall', hint: 'Vertical water flow' },
  { word: 'Desert', hint: 'Sahara environment' },
  { word: 'Forest', hint: 'Dense tree biome' },
  { word: 'Ocean', hint: 'Marine expanse' },
  { word: 'Mountain', hint: 'Alpine elevation' },
  { word: 'Glacier', hint: 'Alpine ice sheet' },
  { word: 'Canyon', hint: 'Eroded ravine' },
];

export const builtInCategories: Category[] = [
  { name: 'Animals', words: animals },
  { name: 'Movies', words: movies },
  { name: 'Food', words: food },
  { name: 'Countries', words: countries },
  { name: 'Sports', words: sports },
  { name: 'Nature', words: nature },
];

export function getAllCategories(): Category[] {
  const customPacks = getCustomWordPacks();
  return [...builtInCategories, ...customPacks];
}

export function getCategoryByName(name: string): Category | undefined {
  return getAllCategories().find(c => c.name === name);
}

export function getWordsForCategories(categoryNames: string[]): WordEntry[] {
  const selectedNames = new Set(categoryNames);
  return getAllCategories()
    .filter(category => selectedNames.has(category.name))
    .flatMap(category => category.words);
}

function getSecureRandomIndex(length: number): number {
  if (length <= 1) return 0;

  const maxUint32 = 0x100000000;
  const limit = maxUint32 - (maxUint32 % length);
  const randomValue = new Uint32Array(1);

  do {
    crypto.getRandomValues(randomValue);
  } while (randomValue[0] >= limit);

  return randomValue[0] % length;
}

export function getSecureRandomItem<T>(items: T[]): T | null {
  if (items.length === 0) return null;
  return items[getSecureRandomIndex(items.length)];
}

export function getSecureRandomItems<T>(items: T[], count: number): T[] {
  const available = [...items];
  const selected: T[] = [];
  const selectionCount = Math.min(Math.max(0, count), available.length);

  while (selected.length < selectionCount) {
    const index = getSecureRandomIndex(available.length);
    selected.push(available[index]);
    available.splice(index, 1);
  }

  return selected;
}

export function getRandomWord(categoryNames: string[], recentWords: string[] = []): WordEntry | null {
  const words = getWordsForCategories(categoryNames);
  if (words.length === 0) return null;

  let available = words;
  if (recentWords.length > 0) {
    available = words.filter(word => !recentWords.includes(word.word));
    if (available.length === 0) available = words;
  }

  return getSecureRandomItem(available);
}

export function getHint(wordEntry: WordEntry): string {
  return wordEntry.hint;
}

// Custom Word Pack Management (localStorage)
export function getCustomWordPacks(): Category[] {
  return getCustomPacks().map(pack => ({
    name: pack.category,
    words: pack.words,
    isCustom: true,
    createdAt: pack.createdAt,
  }));
}
