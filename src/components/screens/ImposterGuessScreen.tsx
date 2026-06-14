import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { playButtonClick, playError } from '@/lib/sounds';
import { Send, AlertTriangle } from 'lucide-react';

export default function ImposterGuessScreen() {
  const { state, submitImposterGuess } = useGame();
  const [guess, setGuess] = useState('');
  const [error, setError] = useState('');

  const eliminatedImposter = state.players.find(p => p.role === 'IMPOSTER');

  const handleSubmit = () => {
    if (!guess.trim()) {
      playError();
      setError('Enter a guess!');
      return;
    }

    playButtonClick();
    submitImposterGuess(guess.trim());
  };

  const handleSkip = () => {
    playButtonClick();
    submitImposterGuess('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="w-full max-w-sm flex flex-col items-center"
      >
        {/* Header */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-[#FF0055]/10 border-2 border-[#FF0055]/30
                          flex items-center justify-center shadow-[0_0_30px_rgba(255,0,85,0.2)]">
            <AlertTriangle className="w-12 h-12 text-[#FF0055]" />
          </div>
        </motion.div>

        <h1
          className="text-2xl font-black text-center mb-2"
          style={{ textShadow: '0 0 15px rgba(255,0,85,0.4)' }}
        >
          Guess the Secret Word
        </h1>
        <p className="text-[#A89BC2] text-center mb-8 text-sm">
          {eliminatedImposter?.name || 'The Imposter'} has one chance to steal the win!
        </p>

        {/* Input */}
        <div className="w-full mb-4">
          <input
            type="text"
            value={guess}
            onChange={(e) => { setGuess(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your guess..."
            autoFocus
            className="w-full px-4 py-4 rounded-xl bg-[#2D1B69]/60 border border-[#FF0055]/20
                       focus:border-[#FF0055]/50 focus:outline-none focus:ring-1 focus:ring-[#FF0055]/30
                       text-lg text-center text-white placeholder:text-[#A89BC2]/40 transition-all"
          />
          {error && (
            <p className="text-[#FF0055] text-sm mt-2 text-center">{error}</p>
          )}
        </div>

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                     bg-gradient-to-r from-[#FF0055] to-[#FF4080] text-white
                     shadow-[0_0_20px_rgba(255,0,85,0.4)] hover:shadow-[0_0_30px_rgba(255,0,85,0.6)]
                     transform hover:scale-[1.02] active:scale-95 transition-all mb-3"
        >
          <Send className="w-5 h-5" />
          Submit Guess
        </button>

        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="px-6 py-2 rounded-lg text-sm text-[#A89BC2]
                     hover:text-white transition-colors"
        >
          Give Up
        </button>
      </motion.div>
    </div>
  );
}
