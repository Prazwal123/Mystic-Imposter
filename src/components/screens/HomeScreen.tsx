import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getStatistics } from '@/lib/storage';
import { playButtonClick } from '@/lib/sounds';
import { Play, BarChart3, History, Package, Settings, Shield, Sparkles } from 'lucide-react';

export default function HomeScreen() {
  const { setPhase } = useGame();
  const stats = getStatistics();

  const handleNavigate = (phase: 'SETUP' | 'STATISTICS' | 'GAME_HISTORY' | 'WORD_PACKS' | 'SETTINGS' | 'ADMIN') => {
    playButtonClick();
    setPhase(phase);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#2D1B69]/40 via-[#1A0B2E] to-[#1A0B2E]" />
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="mb-4"
        >
          <img
            src="/assets/logo.png"
            alt="Mystic Imposter"
            className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(0,240,255,0.4)]"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-black text-center mb-2 tracking-wider"
          style={{
            textShadow: '0 0 20px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2)',
          }}
        >
          MYSTIC IMPOSTER
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-[#A89BC2] text-center mb-8 text-sm font-medium"
        >
          Can You Spot The Imposter Before It&apos;s Too Late?
        </motion.p>

        {/* Stats Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 mb-8 bg-[#2D1B69]/60 backdrop-blur-sm rounded-full px-6 py-2 border border-[#00F0FF]/20"
        >
          <Sparkles className="w-4 h-4 text-[#00F0FF]" />
          <span className="text-sm text-[#A89BC2]">
            <span className="text-white font-bold">{stats.totalGames}</span> games played
          </span>
          <span className="text-[#A89BC2]">|</span>
          <span className="text-sm text-[#A89BC2]">
            Citizens: <span className="text-[#00FF99] font-bold">{stats.citizenWins}</span>
          </span>
          <span className="text-sm text-[#A89BC2]">
            Imposters: <span className="text-[#FF0055] font-bold">{stats.imposterWins}</span>
          </span>
        </motion.div>

        {/* Main Menu Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-3"
        >
          {/* Play Game - Primary */}
          <button
            onClick={() => handleNavigate('SETUP')}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)]
                       transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Play className="w-6 h-6" />
            PLAY GAME
          </button>

          {/* Secondary Buttons Grid */}
          <div className="grid grid-cols-2 gap-3">
            <MenuButton
              icon={<BarChart3 className="w-5 h-5" />}
              label="Statistics"
              onClick={() => handleNavigate('STATISTICS')}
              delay={0.6}
            />
            <MenuButton
              icon={<History className="w-5 h-5" />}
              label="History"
              onClick={() => handleNavigate('GAME_HISTORY')}
              delay={0.7}
            />
            <MenuButton
              icon={<Package className="w-5 h-5" />}
              label="Word Packs"
              onClick={() => handleNavigate('WORD_PACKS')}
              delay={0.8}
            />
            <MenuButton
              icon={<Settings className="w-5 h-5" />}
              label="Settings"
              onClick={() => handleNavigate('SETTINGS')}
              delay={0.9}
            />
          </div>

          {/* Admin Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            onClick={() => handleNavigate('ADMIN')}
            className="w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2
                       bg-[#2D1B69]/40 border border-[#A89BC2]/20 text-[#A89BC2]
                       hover:bg-[#2D1B69]/60 hover:border-[#A89BC2]/40
                       transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
          >
            <Shield className="w-4 h-4" />
            Admin Panel
          </motion.button>
        </motion.div>

        {/* Version */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-8 text-xs text-[#A89BC2]/50"
        >
          v1.0.0 — Pass the device party game
        </motion.p>
      </div>
    </div>
  );
}

function MenuButton({
  icon,
  label,
  onClick,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      onClick={onClick}
      className="py-3 rounded-xl font-medium text-sm flex flex-col items-center justify-center gap-1.5
                 bg-[#2D1B69]/50 border border-[#00F0FF]/10 text-[#A89BC2]
                 hover:bg-[#2D1B69]/80 hover:border-[#00F0FF]/30 hover:text-white
                 transform hover:scale-[1.02] active:scale-95 transition-all duration-200"
    >
      {icon}
      {label}
    </motion.button>
  );
}
