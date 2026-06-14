import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playButtonClick, playError } from '@/lib/sounds';
import { Vote, UserCheck, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function VotingScreen() {
  const { state, submitGroupVote } = useGame();
  const [selectedPlayer, setSelectedPlayer] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSelect = useCallback((playerName: string) => {
    playButtonClick();
    setSelectedPlayer(playerName);
    setError('');
  }, []);

  const handleConfirmVote = useCallback(() => {
    if (!selectedPlayer) {
      playError();
      setError('Select one player as the group vote.');
      return;
    }

    playButtonClick();
    setIsSubmitting(true);

    submitGroupVote(selectedPlayer);
  }, [selectedPlayer, submitGroupVote]);

  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <Vote className="w-8 h-8 text-[#00F0FF] mx-auto mb-3" />
        <h1 className="text-xl font-bold uppercase tracking-wider mb-1">
          Group Vote
        </h1>
        <p className="text-sm text-[#A89BC2]">
          Discuss together, then select one player
        </p>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-2 bg-[#FF0055]/20 border border-[#FF0055]/40
                       rounded-lg px-4 py-2 text-[#FF0055] text-sm mb-4 max-w-sm mx-auto w-full"
          >
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 w-full max-w-sm mx-auto space-y-2"
      >
        {state.players.map((player, index) => {
          const isSelected = selectedPlayer === player.name;

          return (
            <motion.button
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleSelect(player.name)}
              className={`w-full py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all
                         ${isSelected
                  ? 'bg-[#00F0FF]/20 border border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'bg-[#2D1B69]/50 border border-[#00F0FF]/10 hover:border-[#00F0FF]/40 hover:bg-[#2D1B69]/80'
                } active:scale-[0.98]`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                             ${isSelected ? 'bg-[#00F0FF]/20' : 'bg-[#00F0FF]/10'}`}>
                <UserCheck className="w-5 h-5 text-[#00F0FF]" />
              </div>
              <span className="font-medium flex-1 text-left text-white">
                {player.name}
              </span>
              {isSelected && <CheckCircle2 className="w-5 h-5 text-[#00F0FF]" />}
            </motion.button>
          );
        })}
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={handleConfirmVote}
        disabled={isSubmitting}
        className="w-full max-w-sm mx-auto mt-6 py-4 rounded-xl font-bold text-lg
                   bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                   shadow-[0_0_20px_rgba(0,240,255,0.4)]
                   disabled:opacity-60 disabled:cursor-not-allowed
                   transform hover:scale-[1.02] active:scale-95 transition-all"
      >
        {isSubmitting ? 'Submitting Vote...' : 'Confirm Group Vote'}
      </motion.button>
    </div>
  );
}
