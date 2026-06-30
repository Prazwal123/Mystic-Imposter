import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { useOnline } from '@/context/OnlineContext';
import { getAllCategories, getWordsForCategories } from '@/data/wordlist';
import { playButtonClick, playError } from '@/lib/sounds';
import type { GameMode } from '@/types/game';
import { GAME_MODE_CONFIG, TIMER_OPTIONS } from '@/types/game';
import {
  ArrowLeft, Check, Clock, Copy, Crown, Minus, Play, Plus,
  Share2, Skull, UserMinus, Users, Wifi, WifiOff
} from 'lucide-react';

export default function OnlineLobbyScreen() {
  const { setPhase } = useGame();
  const {
    room,
    status,
    error,
    updateRoomSettings,
    startOnlineGame,
    kickPlayer,
    leaveRoom,
  } = useOnline();

  const categories = useMemo(() => getAllCategories(), []);
  const selectedCategories = useMemo(() => (
    room?.settings.categories?.length
      ? room.settings.categories
      : room?.settings.category
        ? [room.settings.category]
        : ['Animals']
  ), [room]);
  const isHost = Boolean(room?.you.isHost);
  const targetPlayerCount = room?.settings.targetPlayerCount || Math.max(3, room?.players.length || 3);
  const connectedPlayers = room?.players.filter(player => player.connected).length || 0;
  const canStart = Boolean(room && isHost && room.players.length >= Math.max(3, targetPlayerCount));
  const startLabel = canStart
    ? 'Start Online Game'
    : `Need ${Math.max(3, targetPlayerCount)} players`;

  const wordCount = useMemo(
    () => getWordsForCategories(selectedCategories).length,
    [selectedCategories]
  );

  if (!room) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <p className="text-[#A89BC2] mb-4">No active room.</p>
        <button
          onClick={() => setPhase('ONLINE_MENU')}
          className="px-6 py-3 rounded-xl bg-[#00F0FF] text-[#1A0B2E] font-bold"
        >
          Back to Online
        </button>
      </div>
    );
  }

  const updateTargetCount = (delta: number) => {
    playButtonClick();
    updateRoomSettings({ targetPlayerCount: Math.max(3, targetPlayerCount + delta) });
  };

  const updateImposterCount = (delta: number) => {
    playButtonClick();
    const next = Math.max(1, Math.min(Math.floor(targetPlayerCount / 2), room.settings.imposterCount + delta));
    updateRoomSettings({ imposterCount: next });
  };

  const toggleCategory = (name: string) => {
    playButtonClick();
    const next = selectedCategories.includes(name)
      ? selectedCategories.filter(category => category !== name)
      : [...selectedCategories, name];
    if (next.length === 0) return;
    updateRoomSettings({ categories: next, category: next.join(', ') });
  };

  const handleCopy = async () => {
    playButtonClick();
    await navigator.clipboard?.writeText(room.code);
  };

  const handleShare = async () => {
    playButtonClick();
    if (navigator.share) {
      await navigator.share({
        title: 'Mystic Imposter Room',
        text: `Join my Mystic Imposter room: ${room.code}`,
      });
    } else {
      await navigator.clipboard?.writeText(room.code);
    }
  };

  const handleStart = () => {
    if (!canStart) {
      playError();
      return;
    }
    const wordPool = getWordsForCategories(selectedCategories);
    if (wordPool.length === 0) {
      playError();
      return;
    }
    playButtonClick();
    startOnlineGame(wordPool);
  };

  const handleLeave = () => {
    playButtonClick();
    leaveRoom();
  };

  return (
    <div className="min-h-screen px-4 py-6 overflow-y-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={handleLeave}
          className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
        </button>
        <h1 className="text-2xl font-bold ml-4" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
          ONLINE LOBBY
        </h1>
      </div>

      <div className="max-w-lg mx-auto space-y-5 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl bg-[#2D1B69]/40 border border-[#00F0FF]/10 p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-[#A89BC2] uppercase tracking-wider">Room Code</p>
              <p className="text-4xl font-black tracking-[0.18em] text-[#00F0FF] font-mono">{room.code}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={handleCopy} className="p-3 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF]">
                <Copy className="w-5 h-5" />
              </button>
              <button onClick={handleShare} className="p-3 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF]">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-[#A89BC2]">
            {status === 'connected' ? <Wifi className="w-4 h-4 text-[#00FF99]" /> : <WifiOff className="w-4 h-4 text-[#FF0055]" />}
            <span>{connectedPlayers} connected</span>
            <span className="text-[#A89BC2]/40">|</span>
            <span>{isHost ? 'You are host' : 'Waiting for host'}</span>
          </div>
          {error && <p className="mt-3 text-sm text-[#FF80A8]">{error}</p>}
        </motion.div>

        <Section icon={<Users className="w-5 h-5 text-[#00F0FF]" />} title="Players">
          <div className="space-y-2">
            {room.players.map(player => (
              <div
                key={player.id}
                className="flex items-center justify-between gap-3 rounded-lg bg-[#2D1B69]/50 border border-[#00F0FF]/10 px-3 py-2"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{player.name}</span>
                    {player.isHost && <Crown className="w-4 h-4 text-[#FFD700]" />}
                  </div>
                  <p className={`text-xs ${player.connected ? 'text-[#00FF99]' : 'text-[#FF80A8]'}`}>
                    {player.connected ? 'Connected' : 'Disconnected'}
                  </p>
                </div>
                {isHost && !player.isHost && (
                  <button
                    onClick={() => { playButtonClick(); kickPlayer(player.id); }}
                    className="p-2 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/30 text-[#FF80A8]"
                  >
                    <UserMinus className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </Section>

        <Section icon={<Users className="w-5 h-5 text-[#00F0FF]" />} title="Target Players">
          <Stepper
            value={targetPlayerCount}
            onMinus={() => updateTargetCount(-1)}
            onPlus={() => updateTargetCount(1)}
            disabled={!isHost}
          />
        </Section>

        <Section icon={<Skull className="w-5 h-5 text-[#FF0055]" />} title="Imposters">
          <Stepper
            value={room.settings.imposterCount}
            onMinus={() => updateImposterCount(-1)}
            onPlus={() => updateImposterCount(1)}
            disabled={!isHost}
          />
        </Section>

        <Section icon={<Clock className="w-5 h-5 text-[#00F0FF]" />} title="Timers">
          <TimerPicker
            label="Discussion"
            value={room.settings.discussionTimer}
            disabled={!isHost}
            onChange={value => updateRoomSettings({ discussionTimer: value })}
          />
          <TimerPicker
            label="Voting"
            value={room.settings.votingTimer}
            disabled={!isHost}
            onChange={value => updateRoomSettings({ votingTimer: value })}
          />
        </Section>

        <Section icon={<Crown className="w-5 h-5 text-[#FFD700]" />} title="Game Mode">
          <div className="space-y-2">
            {(Object.keys(GAME_MODE_CONFIG) as GameMode[]).map(mode => (
              <button
                key={mode}
                disabled={!isHost}
                onClick={() => { playButtonClick(); updateRoomSettings({ gameMode: mode }); }}
                className={`w-full py-3 px-4 rounded-lg text-left border transition-all disabled:opacity-70
                           ${room.settings.gameMode === mode
                  ? 'bg-[#00F0FF]/15 border-[#00F0FF]/50'
                  : 'bg-[#2D1B69]/40 border-[#00F0FF]/10'}`}
              >
                <div className="font-medium text-sm">{GAME_MODE_CONFIG[mode].name}</div>
                <div className="text-xs text-[#A89BC2]">{GAME_MODE_CONFIG[mode].description}</div>
              </button>
            ))}
          </div>
        </Section>

        <Section icon={<Check className="w-5 h-5 text-[#00F0FF]" />} title="Categories">
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => {
              const selected = selectedCategories.includes(category.name);
              return (
                <button
                  key={category.name}
                  disabled={!isHost}
                  onClick={() => toggleCategory(category.name)}
                  className={`p-3 rounded-lg border text-left transition-all disabled:opacity-70 ${
                    selected
                      ? 'bg-[#00F0FF]/15 border-[#00F0FF]/60 text-white'
                      : 'bg-[#2D1B69]/40 border-[#00F0FF]/10 text-[#A89BC2]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-medium">{category.name}</span>
                    {selected && <Check className="w-4 h-4 text-[#00F0FF]" />}
                  </div>
                  <span className="text-xs text-[#A89BC2]/60">{category.words.length} words</span>
                </button>
              );
            })}
          </div>
          <p className="text-xs text-[#A89BC2]/60 mt-3">{wordCount} words available</p>
        </Section>

        {isHost ? (
          <button
            onClick={handleStart}
            className="w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Play className="w-6 h-6" />
            {startLabel}
          </button>
        ) : (
          <div className="rounded-xl bg-[#2D1B69]/40 border border-[#00F0FF]/10 p-4 text-center text-[#A89BC2]">
            Waiting for the host to start the game.
          </div>
        )}
      </div>
    </div>
  );
}

function Section({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon}
        <h3 className="font-semibold text-sm text-[#A89BC2]">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

function Stepper({ value, onMinus, onPlus, disabled }: { value: number; onMinus: () => void; onPlus: () => void; disabled: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <button disabled={disabled} onClick={onMinus} className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center disabled:opacity-40">
        <Minus className="w-5 h-5" />
      </button>
      <span className="text-3xl font-bold">{value}</span>
      <button disabled={disabled} onClick={onPlus} className="w-10 h-10 rounded-lg bg-[#2D1B69] flex items-center justify-center disabled:opacity-40">
        <Plus className="w-5 h-5" />
      </button>
    </div>
  );
}

function TimerPicker({ label, value, disabled, onChange }: { label: string; value: number; disabled: boolean; onChange: (value: number) => void }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="text-sm text-[#A89BC2] mb-2 block">{label}</label>
      <div className="grid grid-cols-3 gap-2">
        {TIMER_OPTIONS.map(option => (
          <button
            key={`${label}-${option.value}`}
            disabled={disabled}
            onClick={() => { playButtonClick(); onChange(option.value); }}
            className={`py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50
                       ${value === option.value
              ? 'bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF]'
              : 'bg-[#2D1B69]/40 border border-[#00F0FF]/5 text-[#A89BC2]'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
