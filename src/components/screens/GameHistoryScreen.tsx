import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getGameHistory, formatDate, formatDuration, clearGameHistory } from '@/lib/storage';
import { playButtonClick } from '@/lib/sounds';
import { ArrowLeft, Trash2, ChevronDown, Users, Target, Clock, Award } from 'lucide-react';

export default function GameHistoryScreen() {
  const { setPhase } = useGame();
  const history = getGameHistory();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  const handleClear = () => {
    playButtonClick();
    clearGameHistory();
    setShowConfirm(false);
  };

  const toggleExpand = (id: string) => {
    playButtonClick();
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
          </button>
          <h1 className="text-2xl font-bold ml-4" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
            Game History
          </h1>
        </div>
        {history.length > 0 && (
          <button
            onClick={() => setShowConfirm(true)}
            className="p-2 rounded-lg bg-[#FF0055]/10 hover:bg-[#FF0055]/20 text-[#FF0055] transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Confirm Clear Dialog */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#2D1B69] rounded-2xl p-6 max-w-sm w-full border border-[#FF0055]/20"
            >
              <h3 className="text-lg font-bold mb-2">Clear History?</h3>
              <p className="text-sm text-[#A89BC2] mb-4">
                This will permanently delete all game history records. This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2D1B69] border border-[#00F0FF]/20 text-[#A89BC2]
                             hover:bg-[#3D2B79] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055]
                             hover:bg-[#FF0055]/30 transition-colors"
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-lg mx-auto space-y-3 pb-8">
        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Clock className="w-12 h-12 text-[#A89BC2]/30 mx-auto mb-4" />
            <p className="text-[#A89BC2]">No games played yet</p>
            <p className="text-sm text-[#A89BC2]/50 mt-1">Play your first game to see history here</p>
          </motion.div>
        ) : (
          history.map((game, i) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className="bg-[#2D1B69]/30 rounded-xl border border-[#00F0FF]/5 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(game.id)}
                className="w-full p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    game.winner === 'CITIZENS' ? 'bg-[#00FF99]/10' : 'bg-[#FF0055]/10'
                  }`}>
                    <Award className={`w-5 h-5 ${
                      game.winner === 'CITIZENS' ? 'text-[#00FF99]' : 'text-[#FF0055]'
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-sm">
                      {game.winner === 'CITIZENS' ? 'Citizens Win' : 'Imposter Wins'}
                    </p>
                    <p className="text-xs text-[#A89BC2]">
                      {formatDate(game.date)} • {game.category}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-[#A89BC2] transition-transform ${
                  expandedId === game.id ? 'rotate-180' : ''
                }`} />
              </button>

              <AnimatePresence>
                {expandedId === game.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-4 pt-0 space-y-2 border-t border-[#00F0FF]/5">
                      <div className="flex items-center gap-2 text-sm text-[#A89BC2] pt-3">
                        <Target className="w-4 h-4" />
                        <span>Word: <span className="text-white font-medium">{game.secretWord}</span></span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#A89BC2]">
                        <Users className="w-4 h-4" />
                        <span>{game.players.join(', ')}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#A89BC2]">
                        <Clock className="w-4 h-4" />
                        <span>Duration: {formatDuration(game.duration)}</span>
                      </div>
                      {game.imposterGuess && (
                        <div className="text-sm text-[#A89BC2]">
                          Imposter guessed: <span className="text-[#FF0055]">{game.imposterGuess}</span>
                        </div>
                      )}
                      {game.eliminatedPlayer && (
                        <div className="text-sm text-[#A89BC2]">
                          Voted out: <span className="text-white">{game.eliminatedPlayer}</span>
                          {game.eliminatedRole && (
                            <span className={`ml-1 text-xs ${
                              game.eliminatedRole === 'IMPOSTER' ? 'text-[#00FF99]' : 'text-[#FF0055]'
                            }`}>
                              ({game.eliminatedRole})
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
