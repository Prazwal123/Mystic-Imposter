import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playButtonClick } from '@/lib/sounds';
import { ArrowRight, UserX, Users, Crown } from 'lucide-react';

export default function VoteResultsScreen() {
  const { state, setPhase } = useGame();
  const [showDetails, setShowDetails] = useState(false);
  const [isTie, setIsTie] = useState(false);

  const eliminated = state.eliminatedPlayer;
  const voteResults = state.voteResults;

  // Check for tie
  useEffect(() => {
    if (!eliminated) {
      setIsTie(true);
    }
  }, [eliminated]);

  // Auto-show details after delay
  useEffect(() => {
    const timeout = setTimeout(() => setShowDetails(true), 1500);
    return () => clearTimeout(timeout);
  }, []);

  const handleContinue = () => {
    playButtonClick();
    if (eliminated?.role === 'IMPOSTER') {
      // Imposter caught - go to guess phase anyway (as per design doc)
      setPhase('IMPOSTER_GUESS');
    } else if (eliminated?.role === 'SPY') {
      // Spy caught - citizens win
      // Actually let them guess
      setPhase('IMPOSTER_GUESS');
    } else {
      // Wrong person voted out - imposter might still win
      setPhase('IMPOSTER_GUESS');
    }
  };

  const maxVotes = Math.max(...Object.values(voteResults));

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center mb-6">
          <h1
            className="text-2xl font-black uppercase tracking-wider mb-1"
            style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}
          >
            Vote Results
          </h1>
          <p className="text-sm text-[#A89BC2]">The group has spoken</p>
        </div>

        {/* Results list */}
        <div className="space-y-2 mb-6">
          {state.players.map((player, i) => {
            const votes = voteResults[player.name] || 0;
            const isEliminated = player.name === eliminated?.name;
            const isMax = votes === maxVotes && votes > 0;
            const barWidth = maxVotes > 0 ? (votes / maxVotes) * 100 : 0;

            return (
              <motion.div
                key={player.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-3 rounded-xl border transition-all ${
                  isEliminated
                    ? 'bg-[#FF0055]/10 border-[#FF0055]/40'
                    : isMax
                      ? 'bg-[#FFD700]/10 border-[#FFD700]/30'
                      : 'bg-[#2D1B69]/40 border-[#00F0FF]/5'
                }`}
              >
                {/* Vote bar */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${barWidth}%` }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                  className={`absolute left-0 top-0 bottom-0 rounded-xl opacity-20 ${
                    isEliminated ? 'bg-[#FF0055]' : isMax ? 'bg-[#FFD700]' : 'bg-[#00F0FF]'
                  }`}
                />

                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${isEliminated ? 'text-[#FF0055]' : 'text-white'}`}>
                      {player.name}
                    </span>
                    {isEliminated && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 1, type: 'spring' }}
                        className="px-2 py-0.5 rounded-full bg-[#FF0055]/20 text-[#FF0055] text-xs font-bold"
                      >
                        ELIMINATED
                      </motion.span>
                    )}
                  </div>
                  <span className={`font-bold ${isEliminated ? 'text-[#FF0055]' : 'text-[#A89BC2]'}`}>
                    {votes} {votes === 1 ? 'vote' : 'votes'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Elimination reveal */}
        <AnimatePresence>
          {showDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              {isTie ? (
                <div className="p-4 rounded-xl bg-[#FFD700]/10 border border-[#FFD700]/30 text-center">
                  <Users className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                  <p className="text-[#FFD700] font-bold">It&apos;s a Tie!</p>
                  <p className="text-sm text-[#A89BC2]">No one was eliminated</p>
                </div>
              ) : eliminated ? (
                <div className={`p-4 rounded-xl border text-center ${
                  eliminated.role === 'IMPOSTER'
                    ? 'bg-[#00FF99]/10 border-[#00FF99]/30'
                    : eliminated.role === 'SPY'
                      ? 'bg-[#FFD700]/10 border-[#FFD700]/30'
                      : 'bg-[#FF0055]/10 border-[#FF0055]/30'
                }`}>
                  {eliminated.role === 'IMPOSTER' ? (
                    <>
                      <Crown className="w-8 h-8 text-[#00FF99] mx-auto mb-2" />
                      <p className="text-[#00FF99] font-bold">Imposter Caught!</p>
                      <p className="text-sm text-[#A89BC2]">
                        {eliminated.name} was the Imposter
                      </p>
                      <p className="text-xs text-[#A89BC2]/60 mt-1">
                        But they still get one chance to guess...
                      </p>
                    </>
                  ) : eliminated.role === 'SPY' ? (
                    <>
                      <UserX className="w-8 h-8 text-[#FFD700] mx-auto mb-2" />
                      <p className="text-[#FFD700] font-bold">Spy Revealed!</p>
                      <p className="text-sm text-[#A89BC2]">
                        {eliminated.name} was the Spy
                      </p>
                    </>
                  ) : (
                    <>
                      <UserX className="w-8 h-8 text-[#FF0055] mx-auto mb-2" />
                      <p className="text-[#FF0055] font-bold">Wrong!</p>
                      <p className="text-sm text-[#A89BC2]">
                        {eliminated.name} was a Citizen
                      </p>
                      <p className="text-xs text-[#A89BC2]/60 mt-1">
                        The Imposter still lurks among you...
                      </p>
                    </>
                  )}
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Continue button */}
        {showDetails && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleContinue}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}


