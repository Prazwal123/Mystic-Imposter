import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playButtonClick, playError } from '@/lib/sounds';
import { Vote, SkipForward, UserCheck, AlertCircle, Lock } from 'lucide-react';

export default function VotingScreen() {
  const { state, castVote, calculateVotes } = useGame();
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [hasVoted, setHasVoted] = useState<Record<number, boolean>>({});
  const [showResults, setShowResults] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(true);
  const [error, setError] = useState('');

  const currentVoter = state.players[currentVoterIndex];
  const totalPlayers = state.players.length;
  const votesCast = Object.keys(hasVoted).length;

  // Check if all votes are cast
  useEffect(() => {
    if (votesCast >= totalPlayers && !showResults) {
      const timeout = setTimeout(() => {
        calculateVotes();
        setShowResults(true);
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [votesCast, totalPlayers, showResults, calculateVotes]);

  const handlePrivacyContinue = useCallback(() => {
    playButtonClick();
    setShowPrivacy(false);
    setError('');
  }, []);

  const handleVote = useCallback((targetName: string | null) => {
    if (!currentVoter) return;

    // Can't vote for self
    if (targetName === currentVoter.name) {
      playError();
      setError('You cannot vote for yourself!');
      return;
    }

    playButtonClick();
    setError('');

    castVote({
      voter: currentVoter.name,
      target: targetName,
    });

    setHasVoted(prev => ({ ...prev, [currentVoterIndex]: true }));

    // Move to next voter
    if (currentVoterIndex < totalPlayers - 1) {
      setCurrentVoterIndex(prev => prev + 1);
      setShowPrivacy(true);
    }
  }, [currentVoter, currentVoterIndex, totalPlayers, castVote]);

  // Privacy pass before each vote
  if (showPrivacy && !showResults) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center"
        >
          {/* Progress */}
          <div className="mb-6 flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00F0FF]" />
            <span className="text-xs text-[#A89BC2]">
              {votesCast} / {totalPlayers} votes cast
            </span>
          </div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="w-20 h-20 rounded-full bg-[#2D1B69] border-2 border-[#00F0FF]/30
                            flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              <Vote className="w-10 h-10 text-[#00F0FF]" />
            </div>
          </motion.div>

          <h2 className="text-[#A89BC2] text-sm font-medium uppercase tracking-widest mb-2">
            Pass the phone to
          </h2>
          <h1
            className="text-4xl font-black text-center mb-2"
            style={{ textShadow: '0 0 20px rgba(0,240,255,0.4)' }}
          >
            {currentVoter?.name}
          </h1>
          <p className="text-[#A89BC2]/60 text-sm mb-8">Cast your vote in secret</p>

          <button
            onClick={handlePrivacyContinue}
            className="px-10 py-3 rounded-xl font-bold
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            Cast Vote
          </button>
        </motion.div>
      </div>
    );
  }

  // Voting interface
  return (
    <div className="min-h-screen flex flex-col px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-4"
      >
        <h1 className="text-xl font-bold uppercase tracking-wider mb-1">Who is the Imposter?</h1>
        <p className="text-sm text-[#A89BC2]">
          {currentVoter?.name}&apos;s turn to vote
        </p>
      </motion.div>

      {/* Progress bar */}
      <div className="w-full max-w-sm mx-auto mb-6">
        <div className="h-1.5 bg-[#2D1B69] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00F0FF] to-[#00B8FF]"
            initial={{ width: 0 }}
            animate={{ width: `${(votesCast / totalPlayers) * 100}%` }}
          />
        </div>
        <p className="text-xs text-[#A89BC2]/60 mt-1 text-center">
          {votesCast} of {totalPlayers} voted
        </p>
      </div>

      {/* Error */}
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

      {/* Player voting buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex-1 w-full max-w-sm mx-auto space-y-2"
      >
        {state.players.map((player, i) => {
          const isSelf = player.name === currentVoter?.name;
          return (
            <motion.button
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => !isSelf && handleVote(player.name)}
              disabled={isSelf}
              className={`w-full py-3.5 px-4 rounded-xl flex items-center gap-3 transition-all
                         ${isSelf
                  ? 'bg-[#2D1B69]/20 border border-[#A89BC2]/10 opacity-50 cursor-not-allowed'
                  : 'bg-[#2D1B69]/50 border border-[#00F0FF]/10 hover:border-[#00F0FF]/40 hover:bg-[#2D1B69]/80 active:scale-[0.98]'
                }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center
                             ${isSelf ? 'bg-[#A89BC2]/10' : 'bg-[#00F0FF]/10'}`}>
                <UserCheck className={`w-5 h-5 ${isSelf ? 'text-[#A89BC2]/40' : 'text-[#00F0FF]'}`} />
              </div>
              <span className={`font-medium flex-1 text-left ${isSelf ? 'text-[#A89BC2]/40' : 'text-white'}`}>
                {player.name}
                {isSelf && <span className="text-xs ml-2 text-[#A89BC2]/40">(You)</span>}
              </span>
              {!isSelf && (
                <Vote className="w-4 h-4 text-[#A89BC2]/40" />
              )}
            </motion.button>
          );
        })}

        {/* Skip Vote option */}
        {state.settings.allowSkipVote && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: state.players.length * 0.05 }}
            onClick={() => handleVote(null)}
            className="w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2
                       bg-[#2D1B69]/20 border border-dashed border-[#A89BC2]/20
                       text-[#A89BC2] hover:bg-[#2D1B69]/40 hover:border-[#A89BC2]/40
                       transition-all active:scale-[0.98]"
          >
            <SkipForward className="w-4 h-4" />
            <span className="text-sm">Skip Vote</span>
          </motion.button>
        )}
      </motion.div>

      {/* All votes cast - transition */}
      <AnimatePresence>
        {votesCast >= totalPlayers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-[#1A0B2E]/90 flex flex-col items-center justify-center z-50"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="mb-4"
            >
              <Lock className="w-10 h-10 text-[#00F0FF]" />
            </motion.div>
            <p className="text-[#A89BC2]">All votes cast. Revealing results...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
