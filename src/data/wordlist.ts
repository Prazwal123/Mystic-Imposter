import type { Category, WordEntry } from '@/types/game';
import { getCustomPacks } from '@/lib/storage';

// ============================================
// Built-in Word Categories for Mystic Imposter
// ============================================

const animals: WordEntry[] = [
   { word: 'Elephant', hint: 'Big ears' },
  { word: 'Tiger', hint: 'Orange pattern' },
  { word: 'Lion', hint: 'Golden mane' },
  { word: 'Bear', hint: 'Honey lover' },
  { word: 'Wolf', hint: 'Pack member' },
  { word: 'Fox', hint: 'Clever reputation' },
  { word: 'Rabbit', hint: 'Long ears' },
  { word: 'Deer', hint: 'Forest antlers' },
  { word: 'Monkey', hint: 'Tree acrobat' },
  { word: 'Gorilla', hint: 'Chest beating' },
  { word: 'Panda', hint: 'Black white' },
  { word: 'Koala', hint: 'Sleepy climber' },
  { word: 'Kangaroo', hint: 'Front pouch' },
  { word: 'Horse', hint: 'Stable resident' },
  { word: 'Donkey', hint: 'Heavy loads' },
  { word: 'Cow', hint: 'Pasture grazer' },
  { word: 'Goat', hint: 'Hill climber' },
  { word: 'Sheep', hint: 'Wool source' },
  { word: 'Pig', hint: 'Mud bath' },
  { word: 'Camel', hint: 'Desert journey' },
  { word: 'Dog', hint: 'Loyal companion' },
  { word: 'Cat', hint: 'Night purr' },
  { word: 'Mouse', hint: 'Tiny intruder' },
  { word: 'Rat', hint: 'City survivor' },
  { word: 'Squirrel', hint: 'Nut collector' },
  { word: 'Otter', hint: 'River play' },
  { word: 'Dolphin', hint: 'Ocean whistles' },
  { word: 'Whale', hint: 'Sea giant' },
  { word: 'Shark', hint: 'Many teeth' },
  { word: 'Octopus', hint: 'Eight arms' },
  { word: 'Crab', hint: 'Sideways walk' },
  { word: 'Penguin', hint: 'Formal outfit' },
  { word: 'Duck', hint: 'Pond visitor' },
  { word: 'Goose', hint: 'Loud traveler' },
  { word: 'Swan', hint: 'Lake elegance' },
  { word: 'Chicken', hint: 'Farmyard bird' },
  { word: 'Rooster', hint: 'Morning alarm' },
  { word: 'Turkey', hint: 'Holiday table' },
  { word: 'Parrot', hint: 'Repeats sounds' },
  { word: 'Owl', hint: 'Night watcher' },
  { word: 'Eagle', hint: 'High circles' },
  { word: 'Crow', hint: 'Black observer' },
  { word: 'Peacock', hint: 'Color display' },
  { word: 'Flamingo', hint: 'Pink legs' },
  { word: 'Snake', hint: 'No legs' },
  { word: 'Crocodile', hint: 'River ambush' },
  { word: 'Turtle', hint: 'Portable shelter' },
  { word: 'Frog', hint: 'Rain singer' },
  { word: 'Lizard', hint: 'Sunny rocks' },
  { word: 'Bee', hint: 'Flower worker' },
  { word: 'Butterfly', hint: 'Wing artwork' },
  { word: 'Spider', hint: 'Silk builder' },
  { word: 'Ant', hint: 'Tiny worker' },
  { word: 'Mosquito', hint: 'Buzzing visitor' },
  { word: 'Firefly', hint: 'Living light' },
];

const movies: WordEntry[] = [
 { word: 'Sholay', hint: 'Friendship' },
  { word: 'Dangal', hint: 'Discipline' },
  { word: 'Lagaan', hint: 'Taxation' },
  { word: 'PK', hint: 'Questions' },
  { word: '3Idiots', hint: 'Education' },
  { word: 'Drishyam', hint: 'Perception' },
  { word: 'Bahubali', hint: 'Legacy' },
  { word: 'Pathaan', hint: 'Patriotism' },
  { word: 'Jawan', hint: 'Responsibility' },
  { word: 'Animal', hint: 'Inheritance' },
  { word: 'Gadar', hint: 'Borders' },
  { word: 'Border', hint: 'Duty' },
  { word: 'Krrish', hint: 'Mutation' },
  { word: 'RaOne', hint: 'Virtuality' },
  { word: 'Don', hint: 'Identity' },
  { word: 'Dhoom', hint: 'Speed' },
  { word: 'Ghajini', hint: 'Memory' },
  { word: 'TaareZameenPar', hint: 'Potential' },
  { word: 'ChakDeIndia', hint: 'Unity' },
  { word: 'Swades', hint: 'Belonging' },
  { word: 'RangDeBasanti', hint: 'Awakening' },
  { word: 'Barfi', hint: 'Expression' },
  { word: 'ZindagiNaMilegiDobara', hint: 'Freedom' },
  { word: 'YehJawaaniHaiDeewani', hint: 'Adventure' },
  { word: 'BajrangiBhaijaan', hint: 'Compassion' },
  { word: 'Sultan', hint: 'Perseverance' },
  { word: 'War', hint: 'Deception' },
  { word: 'Andhadhun', hint: 'Blindness' },
  { word: 'Article15', hint: 'Equality' },
  { word: 'Uri', hint: 'Retaliation' },
  { word: 'Pushpa', hint: 'Smuggling' },
  { word: 'KGF', hint: 'Gold' },
  { word: 'Stree', hint: 'Folklore' },
  { word: 'Queen', hint: 'Independence' },
  { word: 'Pink', hint: 'Consent' },
  { word: 'Rockstar', hint: 'Passion' },
  { word: 'Aashiqui', hint: 'Romance' },
  { word: 'KabirSingh', hint: 'Obsession' },
  { word: 'MunnaBhai', hint: 'Humanity' },
  { word: 'HeraPheri', hint: 'Confusion' },
  { word: 'Kabaddi', hint: 'Rivalry' },
  { word: 'KabaddiKabaddi', hint: 'Persistence' },
  { word: 'KabaddiKabaddiKabaddi', hint: 'Obsession' },
  { word: 'Loot', hint: 'Fortune' },
  { word: 'Loot2', hint: 'Consequences' },
  { word: 'Jatra', hint: 'Mishap' },
  { word: 'JatraiJatra', hint: 'Coincidence' },
  { word: 'PashupatiPrasad', hint: 'Devotion' },
  { word: 'PashupatiPrasad2', hint: 'Ambition' },
  { word: 'ChhakkaPanja', hint: 'Migration' },
  { word: 'ChhakkaPanja2', hint: 'Politics' },
  { word: 'ChhakkaPanja3', hint: 'Identity' },
  { word: 'PremGeet', hint: 'Affection' },
  { word: 'PremGeet2', hint: 'Longing' },
  { word: 'MunaMadan', hint: 'Separation' },
  { word: 'Hostel', hint: 'Youth' },
  { word: 'HostelReturns', hint: 'Friendship' },
  { word: 'Bulbul', hint: 'Resilience' },
  { word: 'NaiNabhannuLa', hint: 'Promises' },
  { word: 'NaiNabhannuLa2', hint: 'Emotion' },
  { word: 'NovemberRain', hint: 'Memories' },
  { word: 'Classic', hint: 'Admiration' },
  { word: 'Dreams', hint: 'Aspirations' },
  { word: 'Aama', hint: 'Sacrifice' },
  { word: 'Prasad', hint: 'Dignity' },
  { word: 'Prakash', hint: 'Purpose' },
  { word: 'Mahapurush', hint: 'Belief' },
  { word: 'DuiNumbari', hint: 'Deception' },
  { word: 'Fulbari', hint: 'Family' },
  { word: 'GhamadShere', hint: 'Pride' },
  { word: 'SetoSurya', hint: 'Change' },
  { word: 'TalakjungVsTulke', hint: 'Status' },
  { word: 'Kagbeni', hint: 'Destiny' },
  { word: 'KaloPothi', hint: 'Conflict' },
  { word: 'Jhola', hint: 'Tradition' },
  { word: 'Shambala', hint: 'Quest' },
  { word: 'Basain', hint: 'Displacement' },
  { word: 'PapiManche', hint: 'Redemption' },
  { word: 'DarpanChhaya', hint: 'Reflection' },
  { word: 'BirBikram', hint: 'Loyalty' },

];

const food: WordEntry[] = [
  { word: 'Momo', hint: 'Folds' },
  { word: 'DalBhat', hint: 'Refill' },
  { word: 'SelRoti', hint: 'Festival' },
  { word: 'Chatamari', hint: 'Newar' },
  { word: 'Yomari', hint: 'Harvest' },
  { word: 'Gundruk', hint: 'Fermented' },
  { word: 'Dhido', hint: 'Traditional' },
  { word: 'Sekuwa', hint: 'Skewers' },
  { word: 'Choila', hint: 'Smoky' },
  { word: 'Bara', hint: 'Lentils' },
  { word: 'Kachila', hint: 'Spiced' },
  { word: 'Thukpa', hint: 'Noodles' },
  { word: 'Tongba', hint: 'Millet' },
  { word: 'JujuDhau', hint: 'Royalty' },
  { word: 'AlooTama', hint: 'Bamboo' },
  { word: 'Biryani', hint: 'Layers' },
  { word: 'Samosa', hint: 'Triangle' },
  { word: 'Tandoori', hint: 'Clay' },
  { word: 'ButterChicken', hint: 'Creamy' },
  { word: 'Naan', hint: 'Tandoor' },
  { word: 'PaniPuri', hint: 'Burst' },
  { word: 'Sushi', hint: 'Wasabi' },
  { word: 'Ramen', hint: 'Broth' },
  { word: 'Tempura', hint: 'Batter' },
  { word: 'Kimchi', hint: 'Fermentation' },
  { word: 'Bibimbap', hint: 'Mixed' },
  { word: 'Pho', hint: 'Vietnam' },
  { word: 'DimSum', hint: 'Steam' },
  { word: 'PadThai', hint: 'Peanuts' },
  { word: 'Pizza', hint: 'Slices' },
  { word: 'Pasta', hint: 'Italy' },
  { word: 'Lasagna', hint: 'Layers' },
  { word: 'Risotto', hint: 'Arborio' },
  { word: 'Croissant', hint: 'Butter' },
  { word: 'Paella', hint: 'Saffron' },
  { word: 'Goulash', hint: 'Hungary' },
  { word: 'Pierogi', hint: 'Poland' },
  { word: 'Burger', hint: 'Patty' },
  { word: 'Hotdog', hint: 'Bun' },
  { word: 'Taco', hint: 'Shell' },
  { word: 'Burrito', hint: 'Wrapped' },
  { word: 'Nachos', hint: 'Chips' },
  { word: 'Steak', hint: 'Grill' },
  { word: 'Pancake', hint: 'Syrup' },
  { word: 'Donut', hint: 'Ring' },
  { word: 'Brownie', hint: 'Fudge' },
  { word: 'Cheesecake', hint: 'Creamcheese' },
  { word: 'Chowmein', hint: 'Wok' },
  { word: 'Frankie', hint: 'Roll' },
  { word: 'Kebab', hint: 'Skewer' },
  { word: 'Falafel', hint: 'Chickpeas' },
  { word: 'Shawarma', hint: 'Rotisserie' },
  { word: 'Poutine', hint: 'Gravy' },
  { word: 'Dumpling', hint: 'Pocket' },
  { word: 'SpringRoll', hint: 'Wrapper' },
];

const countries: WordEntry[] = [
    { word: 'Nepal', hint: 'Himalayas' },
  { word: 'India', hint: 'Diversity' },
  { word: 'China', hint: 'Dynasties' },
  { word: 'Japan', hint: 'Samurai' },
  { word: 'SouthKorea', hint: 'Kpop' },
  { word: 'Thailand', hint: 'Temples' },
  { word: 'Singapore', hint: 'Merlion' },
  { word: 'Malaysia', hint: 'TwinTowers' },
  { word: 'Indonesia', hint: 'Archipelago' },
  { word: 'Vietnam', hint: 'Scooters' },
  { word: 'Pakistan', hint: 'Indus' },
  { word: 'Bangladesh', hint: 'Delta' },
  { word: 'SriLanka', hint: 'Tea' },
  { word: 'Bhutan', hint: 'Happiness' },
  { word: 'Maldives', hint: 'Atolls' },
  { word: 'Australia', hint: 'Outback' },
  { word: 'NewZealand', hint: 'Kiwi' },
  { word: 'UnitedStates', hint: 'Hollywood' },
  { word: 'Canada', hint: 'Maple' },
  { word: 'Mexico', hint: 'Tacos' },
  { word: 'Brazil', hint: 'Carnival' },
  { word: 'Argentina', hint: 'Tango' },
  { word: 'Chile', hint: 'Andes' },
  { word: 'Peru', hint: 'Inca' },
  { word: 'Colombia', hint: 'Coffee' },
  { word: 'UnitedKingdom', hint: 'Monarchy' },
  { word: 'France', hint: 'Eiffel' },
  { word: 'Germany', hint: 'Engineering' },
  { word: 'Italy', hint: 'Pizza' },
  { word: 'Spain', hint: 'Flamenco' },
  { word: 'Portugal', hint: 'Explorers' },
  { word: 'Netherlands', hint: 'Windmills' },
  { word: 'Belgium', hint: 'Chocolate' },
  { word: 'Switzerland', hint: 'Alps' },
  { word: 'Austria', hint: 'Mozart' },
  { word: 'Sweden', hint: 'Ikea' },
  { word: 'Norway', hint: 'Fjords' },
  { word: 'Denmark', hint: 'Vikings' },
  { word: 'Finland', hint: 'Sauna' },
  { word: 'Ireland', hint: 'Clover' },
  { word: 'Greece', hint: 'Mythology' },
  { word: 'Russia', hint: 'Siberia' },
  { word: 'Ukraine', hint: 'Sunflowers' },
  { word: 'Turkey', hint: 'Bosphorus' },
  { word: 'SaudiArabia', hint: 'Desert' },
  { word: 'UnitedArabEmirates', hint: 'Skyscrapers' },
  { word: 'Qatar', hint: 'WorldCup' },
  { word: 'Israel', hint: 'Jerusalem' },
  { word: 'Egypt', hint: 'Pyramids' },
  { word: 'Morocco', hint: 'Marrakesh' },
  { word: 'SouthAfrica', hint: 'Safari' },
  { word: 'Kenya', hint: 'Migration' },
  { word: 'Nigeria', hint: 'Nollywood' },
];

const sports: WordEntry[] = [
  { word: 'Football', hint: 'Offside' },
  { word: 'Cricket', hint: 'Appeal' },
  { word: 'Basketball', hint: 'Backboard' },
  { word: 'Volleyball', hint: 'Rotation' },
  { word: 'Tennis', hint: 'Deuce' },
  { word: 'Badminton', hint: 'Feathers' },
  { word: 'TableTennis', hint: 'Spin' },
  { word: 'Baseball', hint: 'Homeplate' },
  { word: 'Rugby', hint: 'Conversion' },
  { word: 'Hockey', hint: 'Penalty' },
  { word: 'Golf', hint: 'Birdie' },
  { word: 'Boxing', hint: 'Bell' },
  { word: 'Wrestling', hint: 'Mat' },
  { word: 'Karate', hint: 'Belt' },
  { word: 'Taekwondo', hint: 'Dobok' },
  { word: 'Judo', hint: 'Gi' },
  { word: 'Fencing', hint: 'Salute' },
  { word: 'Archery', hint: 'Quiver' },
  { word: 'Shooting', hint: 'Sight' },
  { word: 'Weightlifting', hint: 'Clean' },
  { word: 'Swimming', hint: 'Freestyle' },
  { word: 'Cycling', hint: 'Peloton' },
  { word: 'Running', hint: 'Pace' },
  { word: 'Athletics', hint: 'Relay' },
  { word: 'Gymnastics', hint: 'Vault' },
  { word: 'Skateboarding', hint: 'Ollie' },
  { word: 'Surfing', hint: 'Barrel' },
  { word: 'Rowing', hint: 'Coxswain' },
  { word: 'Skiing', hint: 'Slalom' },
  { word: 'Snowboarding', hint: 'Halfpipe' },
  { word: 'Kabaddi', hint: 'Breath' },
  { word: 'KhoKho', hint: 'Pole' },
  { word: 'Polo', hint: 'Mallet' },
  { word: 'Handball', hint: 'Fastbreak' },
  { word: 'Softball', hint: 'Pitcher' },
  { word: 'Squash', hint: 'Nick' },
  { word: 'Snooker', hint: 'Century' },
  { word: 'Billiards', hint: 'Cushion' },
  { word: 'Darts', hint: 'Treble' },
  { word: 'Bowling', hint: 'Strike' },
  { word: 'Chess', hint: 'Fork' },
  { word: 'Esports', hint: 'LAN' },
  { word: 'FormulaOne', hint: 'Pitstop' },
  { word: 'Motocross', hint: 'Jump' },
  { word: 'Triathlon', hint: 'Transition' },
  { word: 'Biathlon', hint: 'Range' },
  { word: 'Climbing', hint: 'Crimp' },
  { word: 'Paragliding', hint: 'Thermal' },
  { word: 'BungeeJumping', hint: 'Rebound' },
  { word: 'Mountaineering', hint: 'Acclimatization' },
];

const nature: WordEntry[] = [
  { word: 'Mountain', hint: 'Summit' },
  { word: 'River', hint: 'Current' },
  { word: 'Ocean', hint: 'Tides' },
  { word: 'Lake', hint: 'Reflection' },
  { word: 'Waterfall', hint: 'Cascade' },
  { word: 'Forest', hint: 'Canopy' },
  { word: 'Desert', hint: 'Dunes' },
  { word: 'Valley', hint: 'Lowlands' },
  { word: 'Canyon', hint: 'Erosion' },
  { word: 'Glacier', hint: 'Crevasse' },
  { word: 'Volcano', hint: 'Magma' },
  { word: 'Island', hint: 'Isolation' },
  { word: 'Beach', hint: 'Shoreline' },
  { word: 'Cliff', hint: 'Precipice' },
  { word: 'Cave', hint: 'Stalactite' },
  { word: 'Meadow', hint: 'Wildflowers' },
  { word: 'Jungle', hint: 'Undergrowth' },
  { word: 'Swamp', hint: 'Wetlands' },
  { word: 'Prairie', hint: 'Grasslands' },
  { word: 'Reef', hint: 'Coral' },
  { word: 'Rain', hint: 'Drizzle' },
  { word: 'Snow', hint: 'Flurries' },
  { word: 'Storm', hint: 'Thunder' },
  { word: 'Lightning', hint: 'Voltage' },
  { word: 'Rainbow', hint: 'Spectrum' },
  { word: 'Cloud', hint: 'Vapor' },
  { word: 'Wind', hint: 'Gust' },
  { word: 'Fog', hint: 'Visibility' },
  { word: 'Hail', hint: 'Pellets' },
  { word: 'Tornado', hint: 'Funnel' },
  { word: 'Tree', hint: 'Rings' },
  { word: 'Flower', hint: 'Petals' },
  { word: 'Rose', hint: 'Thorns' },
  { word: 'Sunflower', hint: 'Heliotropism' },
  { word: 'Bamboo', hint: 'Hollow' },
  { word: 'Mushroom', hint: 'Spores' },
  { word: 'Leaf', hint: 'Chlorophyll' },
  { word: 'Seed', hint: 'Germination' },
  { word: 'Vine', hint: 'Climber' },
  { word: 'Cactus', hint: 'Succulent' },
  { word: 'Sun', hint: 'Fusion' },
  { word: 'Moon', hint: 'Phases' },
  { word: 'Star', hint: 'Constellation' },
  { word: 'Planet', hint: 'Orbit' },
  { word: 'Earth', hint: 'Biosphere' },
  { word: 'Aurora', hint: 'Magnetosphere' },
  { word: 'Eclipse', hint: 'Alignment' },
  { word: 'Comet', hint: 'Tail' },
  { word: 'Meteor', hint: 'Streak' },
  { word: 'Galaxy', hint: 'Spiral' },
];

const fifa: WordEntry[] = [
  { word: 'Messi', hint: 'Rosario' },
  { word: 'Ronaldo', hint: 'Madeira' },
  { word: 'Neymar', hint: 'Santos' },
  { word: 'Mbappe', hint: 'Bondy' },
  { word: 'Haaland', hint: 'Norway' },
  { word: 'Modric', hint: 'Zadar' },
  { word: 'Benzema', hint: 'Lyon' },
  { word: 'Salah', hint: 'Liverpool' },
  { word: 'Kane', hint: 'Captain' },
  { word: 'Vinicius', hint: 'Winger' },
  { word: 'Argentina', hint: 'Albiceleste' },
  { word: 'Brazil', hint: 'Samba' },
  { word: 'France', hint: 'LesBleus' },
  { word: 'Germany', hint: 'Mannschaft' },
  { word: 'Spain', hint: 'TikiTaka' },
  { word: 'Portugal', hint: 'Iberia' },
  { word: 'England', hint: 'ThreeLions' },
  { word: 'Croatia', hint: 'Checkers' },
  { word: 'Netherlands', hint: 'Orange' },
  { word: 'Belgium', hint: 'RedDevils' },
  { word: 'Barcelona', hint: 'Catalonia' },
  { word: 'RealMadrid', hint: 'Bernabeu' },
  { word: 'Liverpool', hint: 'Anfield' },
  { word: 'Chelsea', hint: 'Bridge' },
  { word: 'Arsenal', hint: 'Gunners' },
  { word: 'ManchesterCity', hint: 'Treble' },
  { word: 'ManchesterUnited', hint: 'Reds' },
  { word: 'BayernMunich', hint: 'Bavaria' },
  { word: 'PSG', hint: 'Paris' },
  { word: 'Juventus', hint: 'Turin' },
  { word: 'WorldCup', hint: 'Qatar' },
  { word: 'FIFA', hint: 'Zurich' },
  { word: 'UEFA', hint: 'Europe' },
  { word: 'ChampionsLeague', hint: 'Anthem' },
  { word: 'BallonDor', hint: 'Golden' },
  { word: 'GoldenBoot', hint: 'Scorer' },
  { word: 'HatTrick', hint: 'Three' },
  { word: 'Offside', hint: 'Positioning' },
  { word: 'Penalty', hint: 'Spot' },
  { word: 'Goalkeeper', hint: 'Gloves' },
  { word: 'Maradona', hint: 'Napoli' },
  { word: 'Pele', hint: 'King' },
  { word: 'Zidane', hint: 'Volley' },
  { word: 'Ronaldinho', hint: 'Smile' },
  { word: 'Beckham', hint: 'Bend' },
  { word: 'Iniesta', hint: 'Johannesburg' },
  { word: 'Xavi', hint: 'Control' },
  { word: 'Suarez', hint: 'Uruguay' },
  { word: 'Lewandowski', hint: 'Poland' },
  { word: 'Buffon', hint: 'Longevity' }
];

export const builtInCategories: Category[] = [
  { name: 'Animals', words: animals },
  { name: 'Movies', words: movies },
  { name: 'Food', words: food },
  { name: 'Countries', words: countries },
  { name: 'Sports', words: sports },
  { name: 'Nature', words: nature },
  { name: 'FIFA', words: fifa },
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
