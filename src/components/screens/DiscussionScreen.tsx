import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useOnline } from '@/context/OnlineContext';
import { playButtonClick, playBuzzer } from '@/lib/sounds';
import { Pause, Play, SkipForward, MessageCircle, AlertTriangle } from 'lucide-react';

export default function DiscussionScreen() {
  const { state, startVoting, pauseGame, resumeGame } = useGame();
  const { pauseOnlineGame, resumeOnlineGame, startOnlineVoting } = useOnline();
  const [timeLeft, setTimeLeft] = useState(state.discussionTimeLeft);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalTime = state.settings.discussionTimer;
  const displayedTimeLeft = state.isOnline ? state.discussionTimeLeft : timeLeft;
  const displayedPaused = state.isOnline ? state.isPaused : isPaused;
  const progress = displayedTimeLeft / totalTime;
  const isLowTime = displayedTimeLeft <= 10;

  useEffect(() => {
    if (state.isOnline) return;
    if (!isPaused && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            playBuzzer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, timeLeft, state.isOnline]);

  useEffect(() => {
    if (state.isOnline) return;
    if (timeLeft === 0) {
      // Auto-transition to voting after a short delay
      const timeout = setTimeout(() => {
        startVoting();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [timeLeft, startVoting, state.isOnline]);

  const handlePause = () => {
    playButtonClick();
    if (state.isOnline) {
      pauseOnlineGame();
      return;
    }
    setIsPaused(true);
    pauseGame();
  };

  const handleResume = () => {
    playButtonClick();
    if (state.isOnline) {
      resumeOnlineGame();
      return;
    }
    setIsPaused(false);
    resumeGame();
  };

  const handleEndEarly = () => {
    playButtonClick();
    if (state.isOnline) {
      startOnlineVoting();
      return;
    }
    startVoting();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // SVG circle params
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-6">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-6"
      >
        <div className="flex items-center justify-center gap-2 mb-1">
          <MessageCircle className="w-5 h-5 text-[#00F0FF]" />
          <h1 className="text-xl font-bold text-[#00F0FF] uppercase tracking-wider">Discussion Phase</h1>
        </div>
        <p className="text-sm text-[#A89BC2]">Give clues about the secret word</p>
      </motion.div>

      {/* Chaos Rule Banner */}
      {state.chaosRule && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm mb-4 p-3 rounded-lg bg-[#FFD700]/10 border border-[#FFD700]/30 flex items-center gap-2"
        >
          <AlertTriangle className="w-5 h-5 text-[#FFD700] flex-shrink-0" />
          <p className="text-sm text-[#FFD700]">{state.chaosRule}</p>
        </motion.div>
      )}

      {/* Timer */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8"
      >
        <svg width="200" height="200" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#2D1B69"
            strokeWidth="10"
          />
          {/* Progress circle */}
          <motion.circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={isLowTime ? '#FF0055' : '#00F0FF'}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={{
              filter: isLowTime ? 'drop-shadow(0 0 8px rgba(255,0,85,0.5))' : 'drop-shadow(0 0 8px rgba(0,240,255,0.5))',
            }}
          />
        </svg>

        {/* Timer text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            animate={isLowTime ? { scale: [1, 1.1, 1] } : {}}
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`text-4xl font-black font-mono ${isLowTime ? 'text-[#FF0055]' : 'text-white'}`}
            style={isLowTime ? { textShadow: '0 0 10px rgba(255,0,85,0.5)' } : {}}
          >
            {formatTime(displayedTimeLeft)}
          </motion.span>
          <span className="text-xs text-[#A89BC2] mt-1">remaining</span>
        </div>
      </motion.div>

      {/* Rules reminder */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full max-w-sm bg-[#2D1B69]/40 rounded-xl p-4 border border-[#00F0FF]/10 mb-6"
      >
        <h3 className="text-sm font-semibold text-[#A89BC2] mb-2">Rules</h3>
        <ul className="space-y-1.5 text-sm text-[#A89BC2]/80">
          <li className="flex items-start gap-2">
            <span className="text-[#00F0FF] mt-0.5">1.</span>
            Players take turns giving one clue at a time
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00F0FF] mt-0.5">2.</span>
            Do NOT say or spell the secret word
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#00F0FF] mt-0.5">3.</span>
            Imposters must blend in using their hint
          </li>
        </ul>

        {/* Example */}
        <div className="mt-3 pt-3 border-t border-[#00F0FF]/10">
          <p className="text-xs text-[#A89BC2]/60 mb-1">Example clues for &quot;Elephant&quot;:</p>
          <p className="text-xs text-[#00F0FF]/70 italic">
            &quot;It&apos;s enormous&quot; • &quot;You&apos;d find it in Africa&quot; • &quot;It never forgets&quot;
          </p>
        </div>
      </motion.div>

      {/* Player list */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full max-w-sm mb-6"
      >
        <p className="text-xs text-[#A89BC2] mb-2 uppercase tracking-wider">Players</p>
        <div className="flex flex-wrap gap-2">
          {state.players.filter(p => !p.isEliminated).map((player) => (
            <div
              key={player.id}
              className="px-3 py-1.5 rounded-full bg-[#2D1B69]/60 border border-[#00F0FF]/10 text-sm text-[#A89BC2]"
            >
              {player.name}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-3"
      >
        {displayedPaused ? (
          <button
            onClick={handleResume}
            disabled={state.isOnline && !state.isHost}
            className="px-6 py-3 rounded-xl font-medium flex items-center gap-2
                       bg-[#00FF99]/20 border border-[#00FF99]/40 text-[#00FF99]
                       hover:bg-[#00FF99]/30 transform active:scale-95 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play className="w-5 h-5" />
            Resume
          </button>
        ) : (
          <button
            onClick={handlePause}
            disabled={state.isOnline && !state.isHost}
            className="px-6 py-3 rounded-xl font-medium flex items-center gap-2
                       bg-[#2D1B69] border border-[#00F0FF]/20 text-[#A89BC2]
                       hover:bg-[#3D2B79] transform active:scale-95 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Pause className="w-5 h-5" />
            Pause
          </button>
        )}

        <button
          onClick={handleEndEarly}
          disabled={state.isOnline && !state.isHost}
          className="px-6 py-3 rounded-xl font-medium flex items-center gap-2
                     bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055]
                     hover:bg-[#FF0055]/30 transform active:scale-95 transition-all
                     disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SkipForward className="w-5 h-5" />
          Vote Now
        </button>
      </motion.div>

      {/* Time up overlay */}
      {displayedTimeLeft === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-[#1A0B2E]/90 flex flex-col items-center justify-center z-50"
        >
          <motion.h1
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-black text-[#FF0055] mb-4"
            style={{ textShadow: '0 0 20px rgba(255,0,85,0.5)' }}
          >
            TIME&apos;S UP!
          </motion.h1>
          <p className="text-[#A89BC2]">Moving to voting phase...</p>
        </motion.div>
      )}
    </div>
  );
}
