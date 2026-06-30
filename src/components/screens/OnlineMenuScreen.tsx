import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useOnline } from '@/context/OnlineContext';
import { playButtonClick, playError } from '@/lib/sounds';
import { ArrowLeft, LogIn, Plus, Wifi } from 'lucide-react';

export default function OnlineMenuScreen() {
  const { setPhase } = useGame();
  const { createRoom, joinRoom, status, error, clearError } = useOnline();
  const [mode, setMode] = useState<'create' | 'join'>('create');
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [localError, setLocalError] = useState('');

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  const handleSubmit = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      playError();
      setLocalError('Enter your display name.');
      return;
    }
    if (mode === 'join' && roomCode.trim().length < 6) {
      playError();
      setLocalError('Enter a valid room code.');
      return;
    }

    playButtonClick();
    setLocalError('');
    clearError();
    if (mode === 'create') {
      createRoom({ name: trimmedName });
    } else {
      joinRoom({ roomCode, name: trimmedName });
    }
  };

  return (
    <div className="min-h-screen px-4 py-6">
      <div className="flex items-center mb-8">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
        </button>
        <h1 className="text-2xl font-bold ml-4" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
          ONLINE GAME
        </h1>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-5"
      >
        <div className="flex items-center justify-center gap-2 text-sm text-[#A89BC2]">
          <Wifi className={`w-4 h-4 ${status === 'connected' ? 'text-[#00FF99]' : 'text-[#00F0FF]'}`} />
          <span>{status === 'idle' ? 'Ready to connect' : status}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 rounded-xl bg-[#2D1B69]/40 p-1 border border-[#00F0FF]/10">
          <button
            onClick={() => { playButtonClick(); setMode('create'); }}
            className={`py-3 rounded-lg font-semibold transition-all ${mode === 'create' ? 'bg-[#00F0FF] text-[#1A0B2E]' : 'text-[#A89BC2]'}`}
          >
            Create Room
          </button>
          <button
            onClick={() => { playButtonClick(); setMode('join'); }}
            className={`py-3 rounded-lg font-semibold transition-all ${mode === 'join' ? 'bg-[#00F0FF] text-[#1A0B2E]' : 'text-[#A89BC2]'}`}
          >
            Join Room
          </button>
        </div>

        <div className="space-y-3">
          <input
            value={name}
            onChange={event => { setName(event.target.value); setLocalError(''); }}
            maxLength={20}
            placeholder="Display name"
            className="w-full px-4 py-4 rounded-xl bg-[#2D1B69]/60 border border-[#00F0FF]/10
                       focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30
                       text-white placeholder:text-[#A89BC2]/40"
          />

          {mode === 'join' && (
            <input
              value={roomCode}
              onChange={event => { setRoomCode(event.target.value.toUpperCase()); setLocalError(''); }}
              maxLength={8}
              placeholder="Room code"
              className="w-full px-4 py-4 rounded-xl bg-[#2D1B69]/60 border border-[#00F0FF]/10
                         focus:border-[#00F0FF]/50 focus:outline-none focus:ring-1 focus:ring-[#00F0FF]/30
                         text-white placeholder:text-[#A89BC2]/40 uppercase tracking-[0.3em] text-center font-mono"
            />
          )}
        </div>

        <AnimatePresence>
          {(localError || error) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="rounded-lg bg-[#FF0055]/20 border border-[#FF0055]/40 px-4 py-3 text-sm text-[#FF80A8]"
            >
              {localError || error}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                     bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                     shadow-[0_0_20px_rgba(0,240,255,0.4)]
                     transform hover:scale-[1.02] active:scale-95 transition-all"
        >
          {mode === 'create' ? <Plus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          {mode === 'create' ? 'Create Room' : 'Join Room'}
        </button>
      </motion.div>
    </div>
  );
}
