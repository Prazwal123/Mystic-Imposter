import { useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playButtonClick, playWinSound } from '@/lib/sounds';
import { Home, RotateCcw, Trophy, Skull } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GameOverScreen() {
  const { state, resetToMenu, setPhase, updateSettings } = useGame();

  const citizensWin = state.winner === 'CITIZENS';
  const imposters = state.players.filter(p => p.role === 'IMPOSTER');
  const eliminated = state.eliminatedPlayer;

  useEffect(() => {
    playWinSound(state.winner as 'CITIZENS' | 'IMPOSTER');

    if (citizensWin) {
      // Green confetti for citizens
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#00FF99', '#00F0FF', '#FFFFFF'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#00FF99', '#00F0FF', '#FFFFFF'],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } else {
      // Red/magenta firework for imposter
      const duration = 3000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FF0055', '#FF4080', '#FFD700'],
          shapes: ['circle'],
          scalar: 1.2,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [citizensWin, state.winner]);

  const handlePlayAgain = useCallback(() => {
    playButtonClick();
    // Keep same settings and restart
    updateSettings({
      playerNames: state.settings.playerNames,
      category: state.settings.category,
      imposterCount: state.settings.imposterCount,
      discussionTimer: state.settings.discussionTimer,
      votingTimer: state.settings.votingTimer,
      gameMode: state.settings.gameMode,
    });
    // Need to go to setup first to reconfigure
    resetToMenu();
    setPhase('SETUP');
  }, [state.settings, updateSettings, resetToMenu, setPhase]);

  const handleMainMenu = useCallback(() => {
    playButtonClick();
    resetToMenu();
  }, [resetToMenu]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Win/Lose Icon */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="mb-4"
        >
          {citizensWin ? (
            <div className="w-24 h-24 rounded-full bg-[#00FF99]/10 border-2 border-[#00FF99]/30
                            flex items-center justify-center shadow-[0_0_30px_rgba(0,255,153,0.3)]">
              <Trophy className="w-12 h-12 text-[#00FF99]" />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-full bg-[#FF0055]/10 border-2 border-[#FF0055]/30
                            flex items-center justify-center shadow-[0_0_30px_rgba(255,0,85,0.3)]">
              <Skull className="w-12 h-12 text-[#FF0055]" />
            </div>
          )}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-4xl font-black text-center mb-2 ${
            citizensWin ? 'text-[#00FF99]' : 'text-[#FF0055]'
          }`}
          style={{
            textShadow: citizensWin
              ? '0 0 20px rgba(0,255,153,0.5)'
              : '0 0 20px rgba(255,0,85,0.5)',
          }}
        >
          {citizensWin ? 'CITIZENS WIN!' : 'IMPOSTER WINS!'}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[#A89BC2] text-center mb-6"
        >
          {citizensWin
            ? 'The Imposter has been exposed!'
            : state.imposterGuess
              ? `The Imposter guessed correctly!`
              : 'The Imposter fooled everyone!'}
        </motion.p>

        {/* Game details card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="w-full bg-[#2D1B69]/40 rounded-xl p-4 border border-[#00F0FF]/10 mb-6"
        >
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#A89BC2]">Secret Word</span>
              <span className="font-bold text-[#00F0FF]">{state.secretWord}</span>
            </div>
            {state.imposterGuess && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A89BC2]">Imposter Guess</span>
                <span className={`font-bold ${citizensWin ? 'text-[#FF0055]' : 'text-[#00FF99]'}`}>
                  {state.imposterGuess}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#A89BC2]">Category</span>
              <span className="text-white">{state.settings.category}</span>
            </div>
            {eliminated && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A89BC2]">Voted Out</span>
                <span className={`font-bold ${eliminated.role === 'IMPOSTER' ? 'text-[#FF0055]' : 'text-[#A89BC2]'}`}>
                  {eliminated.name} ({eliminated.role})
                </span>
              </div>
            )}
            <div className="pt-2 border-t border-[#00F0FF]/10">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#A89BC2]">Imposters</span>
                <div className="flex gap-1">
                  {imposters.map(imp => (
                    <span key={imp.id} className="text-sm text-[#FF0055]">{imp.name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Player results */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full mb-6"
        >
          <p className="text-xs text-[#A89BC2] mb-2 uppercase tracking-wider">All Players</p>
          <div className="space-y-1">
            {state.players.map(player => (
              <div
                key={player.id}
                className={`flex items-center justify-between py-1.5 px-3 rounded-lg ${
                  player.role === 'IMPOSTER' ? 'bg-[#FF0055]/10' :
                  player.role === 'SPY' ? 'bg-[#FFD700]/10' :
                  'bg-[#00FF99]/5'
                }`}
              >
                <span className="text-sm">{player.name}</span>
                <span className={`text-xs font-bold ${
                  player.role === 'IMPOSTER' ? 'text-[#FF0055]' :
                  player.role === 'SPY' ? 'text-[#FFD700]' :
                  'text-[#00FF99]'
                }`}>
                  {player.role}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full space-y-3"
        >
          <button
            onClick={handlePlayAgain}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
            Play Again
          </button>

          <button
            onClick={handleMainMenu}
            className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
                       bg-[#2D1B69]/50 border border-[#00F0FF]/10 text-[#A89BC2]
                       hover:bg-[#2D1B69] hover:border-[#00F0FF]/30 hover:text-white
                       transform active:scale-95 transition-all"
          >
            <Home className="w-5 h-5" />
            Main Menu
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}
