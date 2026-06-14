import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playCardFlip, playButtonClick } from '@/lib/sounds';
import { Eye, EyeOff, User, ArrowRight } from 'lucide-react';

export default function RoleRevealScreen() {
  const { state, nextReveal, startDiscussion } = useGame();
  const [revealed, setRevealed] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(true);

  const currentPlayer = state.players[state.currentPlayerIndex];
  const isLastPlayer = state.revealIndex >= state.players.length - 1;

  const handlePrivacyContinue = useCallback(() => {
    playButtonClick();
    setShowPrivacy(false);
    setRevealed(false);
    setHidden(false);
  }, []);

  const handleReveal = useCallback(() => {
    playCardFlip();
    setRevealed(true);
  }, []);

  const handleHide = useCallback(() => {
    playButtonClick();
    setHidden(true);
  }, []);

  const handleNext = useCallback(() => {
    playButtonClick();
    if (isLastPlayer) {
      startDiscussion();
    } else {
      setShowPrivacy(true);
      setRevealed(false);
      setHidden(false);
      nextReveal();
    }
  }, [isLastPlayer, startDiscussion, nextReveal]);

  // Privacy Pass Screen
  if (showPrivacy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Animated privacy icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-[#2D1B69] border-2 border-[#00F0FF]/30
                            flex items-center justify-center shadow-[0_0_30px_rgba(0,240,255,0.2)]">
              <User className="w-12 h-12 text-[#00F0FF]" />
            </div>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#A89BC2] text-sm font-medium uppercase tracking-widest mb-2"
          >
            Pass the phone to
          </motion.h2>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-4xl font-black text-center mb-12"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            {currentPlayer?.name}
          </motion.h1>

          <motion.button
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handlePrivacyContinue}
            className="px-12 py-4 rounded-xl font-bold text-lg
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            Continue
          </motion.button>

          {/* Progress indicator */}
          <div className="mt-8 flex items-center gap-2">
            {state.players.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  i < state.revealIndex ? 'bg-[#00FF99]' :
                  i === state.revealIndex ? 'bg-[#00F0FF] scale-125' :
                  'bg-[#2D1B69]'
                }`}
              />
            ))}
          </div>
          <p className="text-xs text-[#A89BC2]/50 mt-2">
            {state.revealIndex + 1} / {state.players.length}
          </p>
        </motion.div>
      </div>
    );
  }

  // Card Reveal Screen
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <AnimatePresence mode="wait">
        {!revealed ? (
          // Hidden Card
          <motion.div
            key="hidden"
            initial={{ rotateY: 0, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-4">
              <p className="text-[#A89BC2] text-sm">{currentPlayer?.name}&apos;s Turn</p>
            </div>

            <motion.button
              onClick={handleReveal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full aspect-[3/4] rounded-2xl relative overflow-hidden
                         bg-gradient-to-b from-[#2D1B69] to-[#1A0B2E]
                         border-2 border-[#00F0FF]/30
                         shadow-[0_0_30px_rgba(0,240,255,0.2)]
                         flex flex-col items-center justify-center gap-4
                         hover:border-[#00F0FF]/60 hover:shadow-[0_0_40px_rgba(0,240,255,0.3)]
                         transition-all duration-300"
            >
              {/* Card back pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `repeating-linear-gradient(
                    45deg,
                    transparent,
                    transparent 10px,
                    rgba(0,240,255,0.1) 10px,
                    rgba(0,240,255,0.1) 20px
                  )`,
                }} />
              </div>

              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-16 h-16 text-[#00F0FF]/60" />
              </motion.div>

              <p className="text-xl font-bold text-[#A89BC2]">TAP TO REVEAL</p>
            </motion.button>
          </motion.div>
        ) : !hidden ? (
          // Revealed Card
          <motion.div
            key="revealed"
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
            className="w-full max-w-sm"
          >
            <div className="text-center mb-4">
              <p className="text-[#A89BC2] text-sm">{currentPlayer?.name}&apos;s Role</p>
            </div>

            <div
              className={`w-full aspect-[3/4] rounded-2xl relative overflow-hidden
                         border-2 flex flex-col items-center justify-center gap-4 p-6
                         ${currentPlayer?.role === 'CITIZEN'
                  ? 'border-[#00FF99] shadow-[0_0_30px_rgba(0,255,153,0.3)]'
                  : currentPlayer?.role === 'SPY'
                    ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.3)]'
                    : 'border-[#FF0055] shadow-[0_0_30px_rgba(255,0,85,0.3)]'
                }`}
              style={{
                background: currentPlayer?.role === 'CITIZEN'
                  ? 'linear-gradient(135deg, rgba(0,255,153,0.1) 0%, #2D1B69 50%, #1A0B2E 100%)'
                  : currentPlayer?.role === 'SPY'
                    ? 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, #2D1B69 50%, #1A0B2E 100%)'
                    : 'linear-gradient(135deg, rgba(255,0,85,0.1) 0%, #2D1B69 50%, #1A0B2E 100%)',
              }}
            >
              {/* Role badge */}
              <div className={`px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider
                             ${currentPlayer?.role === 'CITIZEN'
                  ? 'bg-[#00FF99]/20 text-[#00FF99]'
                  : currentPlayer?.role === 'SPY'
                    ? 'bg-[#FFD700]/20 text-[#FFD700]'
                    : 'bg-[#FF0055]/20 text-[#FF0055]'
                }`}>
                {currentPlayer?.role}
              </div>

              {/* Card image */}
              <img
                src={currentPlayer?.role === 'CITIZEN' ? '/assets/card-citizen.png' : '/assets/card-imposter.png'}
                alt={currentPlayer?.role}
                className="w-32 h-40 object-contain opacity-80"
              />

              {/* Word or Hint */}
              <div className="text-center">
                <p className="text-xs text-[#A89BC2] uppercase tracking-wider mb-1">
                  {currentPlayer?.role === 'IMPOSTER' ? 'Your Hint' :
                   currentPlayer?.role === 'SPY' ? 'Your Word' : 'Secret Word'}
                </p>
                <p className={`text-2xl font-black ${
                  currentPlayer?.role === 'CITIZEN' ? 'text-[#00FF99]' :
                  currentPlayer?.role === 'SPY' ? 'text-[#FFD700]' :
                  'text-[#FF0055]'
                }`} style={{ textShadow: '0 0 10px currentColor' }}>
                  {currentPlayer?.role === 'CITIZEN' ? currentPlayer?.word :
                   currentPlayer?.role === 'SPY' ? currentPlayer?.word :
                   currentPlayer?.hint}
                </p>
              </div>

              {/* Spy warning */}
              {currentPlayer?.role === 'SPY' && (
                <p className="text-xs text-[#FFD700]/70 text-center">
                  This is NOT the secret word. Blend in!
                </p>
              )}
            </div>

            {/* Hide Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={handleHide}
              className="w-full mt-4 py-3 rounded-xl font-medium
                         bg-[#2D1B69] border border-[#00F0FF]/20 text-[#A89BC2]
                         hover:bg-[#3D2B79] hover:border-[#00F0FF]/40
                         flex items-center justify-center gap-2
                         transform active:scale-95 transition-all"
            >
              <EyeOff className="w-5 h-5" />
              Hide Card
            </motion.button>
          </motion.div>
        ) : (
          // Hidden state - show next button
          <motion.div
            key="hidden-state"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="mb-6"
            >
              <div className="w-20 h-20 rounded-full bg-[#2D1B69] border-2 border-[#00F0FF]/30
                              flex items-center justify-center">
                <EyeOff className="w-10 h-10 text-[#00F0FF]/60" />
              </div>
            </motion.div>

            <p className="text-[#A89BC2] mb-6">Card hidden. Ready for next player.</p>

            <button
              onClick={handleNext}
              className="px-10 py-4 rounded-xl font-bold text-lg flex items-center gap-3
                         bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                         shadow-[0_0_20px_rgba(0,240,255,0.4)]
                         transform hover:scale-[1.02] active:scale-95 transition-all"
            >
              {isLastPlayer ? 'Start Discussion' : 'Next Player'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
