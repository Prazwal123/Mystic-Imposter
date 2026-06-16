import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getAllCategories } from '@/data/wordlist';
import { getSessionGameSettings, getSettings, saveSessionGameSettings } from '@/lib/storage';
import { playButtonClick, playError } from '@/lib/sounds';
import type { GameMode } from '@/types/game';
import { GAME_MODE_CONFIG, TIMER_OPTIONS } from '@/types/game';
import {
  ArrowLeft, Plus, Minus, Users, Clock, Brain, Skull,
  Sparkles, AlertCircle, Play, Check
} from 'lucide-react';

export default function SetupScreen() {
  const { state, setPhase, updateSettings, startGame } = useGame();
  const appSettings = getSettings();
  const savedGameSettings = getSessionGameSettings();
  const initialPlayerNames = savedGameSettings?.playerNames?.length
    ? savedGameSettings.playerNames
    : state.settings.playerNames.length
      ? state.settings.playerNames
      : ['', '', '', ''];
  const initialCategories = savedGameSettings?.categories?.length
    ? savedGameSettings.categories
    : state.settings.categories?.length
      ? state.settings.categories
      : state.settings.category
        ? state.settings.category.split(',').map(category => category.trim()).filter(Boolean)
        : ['Animals'];

  const [playerCount, setPlayerCount] = useState(initialPlayerNames.length);
  const [playerNames, setPlayerNames] = useState<string[]>(initialPlayerNames);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategories);
  const [imposterCount, setImposterCount] = useState(savedGameSettings?.imposterCount ?? state.settings.imposterCount ?? appSettings.defaultImposterCount);
  const [discussionTimer, setDiscussionTimer] = useState(savedGameSettings?.discussionTimer ?? state.settings.discussionTimer ?? appSettings.defaultDiscussionTimer);
  const [votingTimer] = useState(savedGameSettings?.votingTimer ?? state.settings.votingTimer ?? appSettings.defaultVotingTimer);
  const [gameMode, setGameMode] = useState<GameMode>(savedGameSettings?.gameMode ?? state.settings.gameMode ?? 'CLASSIC');
  const [errors, setErrors] = useState<string[]>([]);
  const [showModeInfo, setShowModeInfo] = useState<string | null>(null);

  const categories = getAllCategories();

  const handlePlayerCountChange = (delta: number) => {
    playButtonClick();
    const newCount = Math.max(3, playerCount + delta);
    setPlayerCount(newCount);
    setPlayerNames(prev => {
      const newNames = [...prev];
      if (newCount > prev.length) {
        return [...newNames, ...Array(newCount - prev.length).fill('')];
      }
      return newNames.slice(0, newCount);
    });
    setErrors([]);
  };

  const handleNameChange = (index: number, value: string) => {
    setPlayerNames(prev => {
      const newNames = [...prev];
      newNames[index] = value;
      return newNames;
    });
    setErrors([]);
  };

  const handleCategoryToggle = (categoryName: string) => {
    playButtonClick();
    setSelectedCategories(current =>
      current.includes(categoryName)
        ? current.filter(name => name !== categoryName)
        : [...current, categoryName]
    );
    setErrors([]);
  };

  const handleStartGame = () => {
    const newErrors: string[] = [];

    // Validate player names
    const filledNames = playerNames.map(n => n.trim()).filter(Boolean);
    if (filledNames.length < 3) {
      newErrors.push('At least 3 players are required');
    }
    const uniqueNames = new Set(filledNames.map(n => n.trim().toLowerCase()));
    if (uniqueNames.size !== filledNames.length) {
      newErrors.push('All player names must be unique');
    }
    if (selectedCategories.length === 0) {
      newErrors.push('Select at least one category');
    }

    // Validate imposter count
    const maxImposters = Math.floor(filledNames.length / 2);
    if (imposterCount > maxImposters) {
      newErrors.push(`Maximum ${maxImposters} imposter(s) for ${filledNames.length} players`);
    }

    if (newErrors.length > 0) {
      playError();
      setErrors(newErrors);
      return;
    }

    playButtonClick();
    const nextSettings = {
      playerNames: filledNames,
      category: selectedCategories.join(', '),
      categories: selectedCategories,
      imposterCount,
      discussionTimer,
      votingTimer,
      gameMode,
    };
    saveSessionGameSettings(nextSettings);
    updateSettings(nextSettings);
    startGame();
  };

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  const maxImposters = Math.floor(playerCount / 2);

  return (
    <div className="min-h-screen px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
        </button>
        <h1 className="text-2xl font-bold ml-4" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
          CREATE GAME
        </h1>
      </div>

      {/* Errors */}
      <AnimatePresence>
        {errors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4 space-y-2"
          >
            {errors.map((error, i) => (
              <div key={i} className="flex items-center gap-2 bg-[#FF0055]/20 border border-[#FF0055]/40 rounded-lg px-4 py-2 text-[#FF0055] text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {error}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto space-y-6 pb-8">
        {/* Player Count */}
        <Section icon={<Users className="w-5 h-5 text-[#00F0FF]" />} title="Players">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => handlePlayerCountChange(-1)}
              className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center
                         hover:bg-[#3D2B79] active:scale-90 transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-3xl font-bold">{playerCount}</span>
            <button
              onClick={() => handlePlayerCountChange(1)}
              className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center
                         hover:bg-[#3D2B79] active:scale-90 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Player Name Inputs */}
          <div className="grid grid-cols-2 gap-2">
            {playerNames.map((name, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
              >
                <input
                  type="text"
                  value={name}
                  onChange={(e) => handleNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  maxLength={20}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#2D1B69]/60 border border-[#00F0FF]/10
                             focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30
                             text-sm placeholder:text-[#A89BC2]/40 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Categories */}
        <Section icon={<Brain className="w-5 h-5 text-[#00F0FF]" />} title="Categories">
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => {
              const isSelected = selectedCategories.includes(category.name);
              return (
                <button
                  key={category.name}
                  onClick={() => handleCategoryToggle(category.name)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    isSelected
                      ? 'bg-[#00F0FF]/15 border-[#00F0FF]/60 text-white'
                      : 'bg-[#2D1B69]/40 border-[#00F0FF]/10 text-[#A89BC2] hover:border-[#00F0FF]/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    {isSelected && <Check className="w-4 h-4 text-[#00F0FF]" />}
                  </div>
                  <span className="text-xs text-[#A89BC2]/60">
                    {category.words.length} words
                  </span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#A89BC2]/60 mt-3">
            {selectedCategories.length} selected
          </p>
        </Section>

        {/* Game Mode */}
        <Section icon={<Sparkles className="w-5 h-5 text-[#00F0FF]" />} title="Game Mode">
          <div className="space-y-2">
            {(Object.keys(GAME_MODE_CONFIG) as GameMode[]).map((mode) => {
              const config = GAME_MODE_CONFIG[mode];
              return (
                <div key={mode} className="relative">
                  <button
                    onClick={() => { playButtonClick(); setGameMode(mode); }}
                    onMouseEnter={() => setShowModeInfo(mode)}
                    onMouseLeave={() => setShowModeInfo(null)}
                    className={`w-full py-3 px-4 rounded-lg flex items-center justify-between transition-all
                               ${gameMode === mode
                        ? 'bg-gradient-to-r from-[#00F0FF]/20 to-[#00B8FF]/20 border border-[#00F0FF]/40'
                        : 'bg-[#2D1B69]/40 border border-[#00F0FF]/5 hover:border-[#00F0FF]/20'
                      }`}
                  >
                    <div className="text-left">
                      <div className="font-medium text-sm">{config.name}</div>
                      <div className="text-xs text-[#A89BC2]">{config.description}</div>
                    </div>
                    {gameMode === mode && (
                      <div className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
                    )}
                  </button>
                  <AnimatePresence>
                    {showModeInfo === mode && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute top-full left-0 right-0 mt-1 p-2 rounded-lg bg-[#2D1B69] border border-[#A89BC2]/20
                                   text-xs text-[#A89BC2] z-20"
                      >
                        Unlock: {config.unlockRequirement}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Imposter Count */}
        <Section icon={<Skull className="w-5 h-5 text-[#FF0055]" />} title="Imposters">
          <div className="flex items-center justify-between">
            <button
              onClick={() => { playButtonClick(); setImposterCount(Math.max(1, imposterCount - 1)); }}
              className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center
                         hover:bg-[#3D2B79] active:scale-90 transition-all"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-3xl font-bold text-[#FF0055]">{imposterCount}</span>
            <button
              onClick={() => { playButtonClick(); setImposterCount(Math.min(maxImposters, imposterCount + 1)); }}
              className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center
                         hover:bg-[#3D2B79] active:scale-90 transition-all"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-[#A89BC2]/60 mt-2 text-center">Max {maxImposters} for {playerCount} players</p>
        </Section>

        {/* Timers */}
        <Section icon={<Clock className="w-5 h-5 text-[#00F0FF]" />} title="Timers">
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#A89BC2] mb-2 block">Discussion Time</label>
              <div className="grid grid-cols-3 gap-2">
                {TIMER_OPTIONS.map((opt) => (
                  <button
                    key={`disc-${opt.value}`}
                    onClick={() => { playButtonClick(); setDiscussionTimer(opt.value); }}
                    className={`py-2 rounded-lg text-sm font-medium transition-all
                               ${discussionTimer === opt.value
                        ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]'
                        : 'bg-[#2D1B69]/40 border border-[#00F0FF]/5 text-[#A89BC2] hover:bg-[#2D1B69]'
                      }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={handleStartGame}
          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                     bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                     shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]
                     transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
        >
          <Play className="w-6 h-6" />
          START GAME
        </motion.button>
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-sm text-[#A89BC2]">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}
