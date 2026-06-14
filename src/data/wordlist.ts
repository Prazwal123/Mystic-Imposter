import type { Category, WordEntry } from '@/types/game';

// ============================================
// Built-in Word Categories for Mystic Imposter
// ============================================

const animals: WordEntry[] = [
  { word: 'Elephant', hintEasy: 'Large animal with a trunk', hintMedium: 'Found in herds', hintHard: 'Massive herbivore', hintExtreme: 'Tusks' },
  { word: 'Tiger', hintEasy: 'Large cat with orange stripes', hintMedium: 'Apex predator', hintHard: 'Striped feline', hintExtreme: 'Claws' },
  { word: 'Lion', hintEasy: 'Big cat known for its loud roar', hintMedium: 'Lives in packs', hintHard: 'African predator', hintExtreme: 'Mane' },
  { word: 'Penguin', hintEasy: 'Black and white bird that cannot fly', hintMedium: 'Lives in Antarctica', hintHard: 'Waddling swimmer', hintExtreme: 'Ice' },
  { word: 'Dolphin', hintEasy: 'Smart sea mammal that jumps', hintMedium: 'Echolocation user', hintHard: 'Ocean acrobat', hintExtreme: 'Pod' },
  { word: 'Eagle', hintEasy: 'Large bird of prey', hintMedium: 'National bird of USA', hintHard: 'Soaring hunter', hintExtreme: 'Talons' },
  { word: 'Shark', hintEasy: 'Predatory fish with many teeth', hintMedium: 'Ocean apex hunter', hintHard: 'Cartilaginous fish', hintExtreme: 'Fins' },
  { word: 'Giraffe', hintEasy: 'Tallest animal with a long neck', hintMedium: 'Spotted African animal', hintHard: 'Tree leaf eater', hintExtreme: 'Spots' },
  { word: 'Panda', hintEasy: 'Black and white bear from China', hintMedium: 'Bamboo eater', hintHard: 'Endangered bear', hintExtreme: 'Bamboo' },
  { word: 'Kangaroo', hintEasy: 'Australian animal that hops', hintMedium: 'Has a pouch', hintHard: 'Marsupial jumper', hintExtreme: 'Pouch' },
  { word: 'Octopus', hintEasy: 'Sea creature with eight arms', hintMedium: 'Master of camouflage', hintHard: 'Intelligent cephalopod', hintExtreme: 'Ink' },
  { word: 'Wolf', hintEasy: 'Wild dog that howls at moon', hintMedium: 'Pack hunter', hintHard: 'Canine predator', hintExtreme: 'Howl' },
  { word: 'Owl', hintEasy: 'Night bird with big eyes', hintMedium: 'Silent flyer', hintHard: 'Nocturnal hunter', hintExtreme: 'Hoot' },
  { word: 'Snake', hintEasy: 'Legless reptile', hintMedium: 'Sheds its skin', hintHard: 'Slithering reptile', hintExtreme: 'Venom' },
  { word: 'Bear', hintEasy: 'Large furry mammal', hintMedium: 'Hibernates in winter', hintHard: 'Omnivorous giant', hintExtreme: 'Hibernate' },
];

const movies: WordEntry[] = [
  { word: 'Inception', hintEasy: 'Dream within a dream movie', hintMedium: 'Leonardo DiCaprio heist', hintHard: 'Subconscious theft', hintExtreme: 'Spinning top' },
  { word: 'Titanic', hintEasy: 'Famous sinking ship romance', hintMedium: 'Jack and Rose story', hintHard: '1912 disaster', hintExtreme: 'Iceberg' },
  { word: 'Avatar', hintEasy: 'Blue aliens on Pandora', hintMedium: 'James Cameron sci-fi', hintHard: 'Na vi tribe', hintExtreme: 'Unobtanium' },
  { word: 'Jaws', hintEasy: 'Shark terrorizes beach town', hintMedium: 'Spielberg thriller', hintHard: 'Amity Island', hintExtreme: 'Dun dun' },
  { word: 'Frozen', hintEasy: 'Disney movie with ice queen', hintMedium: 'Let It Go song', hintHard: 'Arendelle sisters', hintExtreme: 'Elsa' },
  { word: 'Batman', hintEasy: 'Dark knight superhero', hintMedium: 'Gotham protector', hintHard: 'Caped crusader', hintExtreme: 'Bruce' },
  { word: 'Jurassic Park', hintEasy: 'Dinosaur theme park', hintMedium: 'T-Rex breakout', hintHard: 'Isla Nublar', hintExtreme: 'Dino DNA' },
  { word: 'The Matrix', hintEasy: 'Red pill blue pill movie', hintMedium: 'Simulation reality', hintHard: 'Neo awakens', hintExtreme: 'Keanu' },
  { word: 'Star Wars', hintEasy: 'Space opera with lightsabers', hintMedium: 'The Force awakens', hintHard: 'Galactic empire', hintExtreme: 'Vader' },
  { word: 'Gladiator', hintEasy: 'Roman arena fighter', hintMedium: 'Russell Crowe epic', hintHard: 'Maximus revenge', hintExtreme: 'Arena' },
];

const food: WordEntry[] = [
  { word: 'Pizza', hintEasy: 'Round Italian dish with cheese', hintMedium: 'Slice of heaven', hintHard: 'Neapolitan flatbread', hintExtreme: 'Slice' },
  { word: 'Sushi', hintEasy: 'Japanese rice and fish rolls', hintMedium: 'Raw fish delicacy', hintHard: 'Vinegared rice', hintExtreme: 'Rice' },
  { word: 'Burger', hintEasy: 'Meat patty in a bun', hintMedium: 'Fast food classic', hintHard: 'Grilled sandwich', hintExtreme: 'Patty' },
  { word: 'Pasta', hintEasy: 'Italian noodles with sauce', hintMedium: 'Boiled wheat dough', hintHard: 'Mediterranean staple', hintExtreme: 'Noodles' },
  { word: 'Taco', hintEasy: 'Mexican folded tortilla', hintMedium: 'Shell with filling', hintHard: 'Corn tortilla wrap', hintExtreme: 'Shell' },
  { word: 'Chocolate', hintEasy: 'Sweet brown candy', hintMedium: 'Cocoa bean treat', hintHard: 'Confectionery delight', hintExtreme: 'Cocoa' },
  { word: 'Ice Cream', hintEasy: 'Frozen sweet dessert', hintMedium: 'Cold creamy treat', hintHard: 'Dairy frozen dish', hintExtreme: 'Cone' },
  { word: 'Steak', hintEasy: 'Grilled beef cut', hintMedium: 'Prime rib meat', hintHard: 'Seared protein', hintExtreme: 'Rare' },
  { word: 'Salad', hintEasy: 'Mixed vegetables dish', hintMedium: 'Leafy greens bowl', hintHard: 'Raw vegetable mix', hintExtreme: 'Lettuce' },
  { word: 'Curry', hintEasy: 'Spicy saucy dish', hintMedium: 'Indian spiced stew', hintHard: 'Aromatic gravy', hintExtreme: 'Spice' },
];

const countries: WordEntry[] = [
  { word: 'Japan', hintEasy: 'Land of the rising sun', hintMedium: 'Island nation in Asia', hintHard: 'Archipelago of temples', hintExtreme: 'Tokyo' },
  { word: 'Brazil', hintEasy: 'South American carnival country', hintMedium: 'Amazon rainforest home', hintHard: 'Portuguese speaking giant', hintExtreme: 'Samba' },
  { word: 'Egypt', hintEasy: 'Country with pyramids', hintMedium: 'Nile river civilization', hintHard: 'Ancient pharaoh land', hintExtreme: 'Pyramids' },
  { word: 'France', hintEasy: 'Country known for Eiffel Tower', hintMedium: 'Wine and cheese land', hintHard: 'Hexagonal republic', hintExtreme: 'Paris' },
  { word: 'Australia', hintEasy: 'Country with kangaroos', hintMedium: 'Smallest continent', hintHard: 'Down under nation', hintExtreme: 'Kangaroo' },
  { word: 'Italy', hintEasy: 'Shaped like a boot', hintMedium: 'Rome and pizza', hintHard: 'Peninsula of art', hintExtreme: 'Rome' },
  { word: 'India', hintEasy: 'Country with Taj Mahal', hintMedium: 'Bollywood and spices', hintHard: 'Subcontinental republic', hintExtreme: 'Taj' },
  { word: 'Canada', hintEasy: 'Country with maple leaf flag', hintMedium: 'Northern neighbor of USA', hintHard: 'True north wilderness', hintExtreme: 'Maple' },
  { word: 'Germany', hintEasy: 'Country known for cars and beer', hintMedium: 'Engineering powerhouse', hintHard: 'Central European state', hintExtreme: 'Autobahn' },
  { word: 'Mexico', hintEasy: 'Country with tacos and mariachi', hintMedium: 'Aztec heritage land', hintHard: 'Mesoamerican nation', hintExtreme: 'Aztec' },
];

const sports: WordEntry[] = [
  { word: 'Soccer', hintEasy: 'Kick ball into net game', hintMedium: 'World cup sport', hintHard: 'Association football', hintExtreme: 'Goal' },
  { word: 'Basketball', hintEasy: 'Shoot ball through hoop', hintMedium: 'NBA sport', hintHard: 'Court team game', hintExtreme: 'Hoop' },
  { word: 'Tennis', hintEasy: 'Hit ball over net with racket', hintMedium: 'Wimbledon sport', hintHard: 'Court racquet game', hintExtreme: 'Racket' },
  { word: 'Swimming', hintEasy: 'Move through water', hintMedium: 'Olympic pool sport', hintHard: 'Aquatic propulsion', hintExtreme: 'Pool' },
  { word: 'Baseball', hintEasy: 'Hit ball with bat and run bases', hintMedium: 'America pastime', hintHard: 'Diamond field game', hintExtreme: 'Bases' },
  { word: 'Golf', hintEasy: 'Hit ball into holes on course', hintMedium: 'Club and ball sport', hintHard: 'Green fairway game', hintExtreme: 'Putt' },
  { word: 'Boxing', hintEasy: 'Fight with padded gloves', hintMedium: 'Ring combat sport', hintHard: 'Pugilism match', hintExtreme: 'Knockout' },
  { word: 'Hockey', hintEasy: 'Hit puck with stick on ice', hintMedium: 'Ice rink sport', hintHard: 'Stick puck game', hintExtreme: 'Puck' },
  { word: 'Cycling', hintEasy: 'Ride two-wheeled vehicle', hintMedium: 'Tour de France sport', hintHard: 'Pedal-powered race', hintExtreme: 'Pedal' },
  { word: 'Skiing', hintEasy: 'Slide down snow on planks', hintMedium: 'Alpine winter sport', hintHard: 'Snow slope glide', hintExtreme: 'Slopes' },
];

const nature: WordEntry[] = [
  { word: 'Volcano', hintEasy: 'Mountain that erupts lava', hintMedium: 'Magma explosion peak', hintHard: 'Tectonic vent mountain', hintExtreme: 'Lava' },
  { word: 'Rainbow', hintEasy: 'Colorful arc in the sky', hintMedium: 'After rain colors', hintHard: 'Prismatic light bow', hintExtreme: 'Colors' },
  { word: 'Thunderstorm', hintEasy: 'Storm with lightning and thunder', hintMedium: 'Electrical weather event', hintHard: 'Cumulonimbus discharge', hintExtreme: 'Lightning' },
  { word: 'Waterfall', hintEasy: 'Water falling from height', hintMedium: 'Cascading river drop', hintHard: 'Vertical water flow', hintExtreme: 'Cascade' },
  { word: 'Desert', hintEasy: 'Dry sandy landscape', hintMedium: 'Arid wasteland biome', hintHard: 'Sahara environment', hintExtreme: 'Sand' },
  { word: 'Forest', hintEasy: 'Area with many trees', hintMedium: 'Woodland ecosystem', hintHard: 'Dense tree biome', hintExtreme: 'Trees' },
  { word: 'Ocean', hintEasy: 'Large body of salt water', hintMedium: 'Deep blue sea', hintHard: 'Marine expanse', hintExtreme: 'Waves' },
  { word: 'Mountain', hintEasy: 'Tall natural elevation', hintMedium: 'Peak summit climb', hintHard: 'Alpine elevation', hintExtreme: 'Peak' },
  { word: 'Glacier', hintEasy: 'Slow moving ice mass', hintMedium: 'Frozen river of ice', hintHard: 'Alpine ice sheet', hintExtreme: 'Ice' },
  { word: 'Canyon', hintEasy: 'Deep valley with steep sides', hintMedium: 'River-carved gorge', hintHard: 'Eroded ravine', hintExtreme: 'Gorge' },
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

export function getRandomWord(categoryName: string, _difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME', recentWords: string[] = []): WordEntry | null {
  const category = getCategoryByName(categoryName);
  if (!category) return null;

  let available = category.words;
  if (recentWords.length > 0) {
    available = category.words.filter(w => !recentWords.includes(w.word));
    if (available.length === 0) available = category.words;
  }

  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
}

export function getHint(wordEntry: WordEntry, difficulty: 'EASY' | 'MEDIUM' | 'HARD' | 'EXTREME'): string {
  switch (difficulty) {
    case 'EASY': return wordEntry.hintEasy;
    case 'MEDIUM': return wordEntry.hintMedium;
    case 'HARD': return wordEntry.hintHard;
    case 'EXTREME': return wordEntry.hintExtreme;
    default: return wordEntry.hintMedium;
  }
}

// Custom Word Pack Management (localStorage)
export function getCustomWordPacks(): Category[] {
  try {
    const packs = localStorage.getItem('mystic_custom_packs');
    if (packs) {
      const parsed = JSON.parse(packs) as Array<{ name: string; words: WordEntry[]; createdAt: string }>;
      return parsed.map(p => ({ ...p, isCustom: true }));
    }
  } catch { /* ignore */ }
  return [];
}

export function saveCustomWordPack(pack: Category): void {
  const packs = getCustomWordPacks();
  const existingIndex = packs.findIndex(p => p.name === pack.name);
  if (existingIndex >= 0) {
    packs[existingIndex] = pack;
  } else {
    packs.push(pack);
  }
  localStorage.setItem('mystic_custom_packs', JSON.stringify(packs));
}

export function deleteCustomWordPack(name: string): void {
  const packs = getCustomWordPacks().filter(p => p.name !== name);
  localStorage.setItem('mystic_custom_packs', JSON.stringify(packs));
}
