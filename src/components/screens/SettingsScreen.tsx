import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getSettings, saveSettings, resetStatistics, clearGameHistory, clearRecentWords } from '@/lib/storage';
import { playButtonClick } from '@/lib/sounds';
import type { AppSettings } from '@/types/game';
import { ArrowLeft, Moon, Volume2, Sparkles, Clock, RotateCcw, AlertTriangle, Trash2, Shield } from 'lucide-react';

export default function SettingsScreen() {
  const { setPhase } = useGame();
  const [settings, setLocalSettings] = useState<AppSettings>(getSettings());
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showClearHistoryConfirm, setShowClearHistoryConfirm] = useState(false);
  const [savedMessage, setSavedMessage] = useState('');

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  const updateSetting = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    const newSettings = { ...settings, [key]: value };
    setLocalSettings(newSettings);
    saveSettings(newSettings);
    setSavedMessage('Saved!');
    setTimeout(() => setSavedMessage(''), 1500);
  };

  const handleResetStats = () => {
    playButtonClick();
    resetStatistics();
    setShowResetConfirm(false);
    setSavedMessage('Statistics reset!');
    setTimeout(() => setSavedMessage(''), 1500);
  };

  const handleClearHistory = () => {
    playButtonClick();
    clearGameHistory();
    setShowClearHistoryConfirm(false);
    setSavedMessage('History cleared!');
    setTimeout(() => setSavedMessage(''), 1500);
  };

  const handleClearRecentWords = () => {
    playButtonClick();
    clearRecentWords();
    setSavedMessage('Recent words cleared!');
    setTimeout(() => setSavedMessage(''), 1500);
  };

  const toggleSwitch = (key: keyof AppSettings) => {
    playButtonClick();
    updateSetting(key, !settings[key]);
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
            Settings
          </h1>
        </div>
        <AnimatePresence>
          {savedMessage && (
            <motion.span
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs text-[#00FF99] bg-[#00FF99]/10 px-3 py-1 rounded-full"
            >
              {savedMessage}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-lg mx-auto space-y-4 pb-8">
        {/* Appearance */}
        <SettingsSection icon={<Moon className="w-5 h-5 text-[#00F0FF]" />} title="Appearance">
          <ToggleRow
            label="Dark Mode"
            value={settings.darkMode}
            onChange={() => toggleSwitch('darkMode')}
          />
          <ToggleRow
            label="Animations"
            value={settings.animations}
            onChange={() => toggleSwitch('animations')}
          />
        </SettingsSection>

        {/* Audio */}
        <SettingsSection icon={<Volume2 className="w-5 h-5 text-[#00F0FF]" />} title="Audio">
          <ToggleRow
            label="Sound Effects"
            value={settings.soundEffects}
            onChange={() => toggleSwitch('soundEffects')}
          />
        </SettingsSection>

        {/* Game Defaults */}
        <SettingsSection icon={<Clock className="w-5 h-5 text-[#00F0FF]" />} title="Game Defaults">
          <NumberRow
            label="Default Discussion Timer"
            value={settings.defaultDiscussionTimer}
            options={[
              { label: '30s', value: 30 },
              { label: '1m', value: 60 },
              { label: '2m', value: 120 },
              { label: '3m', value: 180 },
              { label: '5m', value: 300 },
              { label: '10m', value: 600 },
            ]}
            onChange={(v) => updateSetting('defaultDiscussionTimer', v)}
          />
          <NumberRow
            label="Recent Word Protection"
            value={settings.recentWordProtectionCount}
            options={[
              { label: '5', value: 5 },
              { label: '10', value: 10 },
              { label: '15', value: 15 },
              { label: '20', value: 20 },
              { label: 'Off', value: 0 },
            ]}
            onChange={(v) => updateSetting('recentWordProtectionCount', v)}
          />
          <ToggleRow
            label="Privacy Mode"
            value={settings.privacyMode}
            onChange={() => toggleSwitch('privacyMode')}
            description="Hide word data until tapped"
          />
        </SettingsSection>

        {/* Data Management */}
        <SettingsSection icon={<Sparkles className="w-5 h-5 text-[#00F0FF]" />} title="Data Management">
          <button
            onClick={handleClearRecentWords}
            className="w-full py-3 px-4 rounded-lg bg-[#2D1B69]/40 border border-[#00F0FF]/10
                       text-left text-sm text-[#A89BC2] hover:bg-[#2D1B69]/60 transition-colors
                       flex items-center justify-between"
          >
            <span>Clear Recent Word History</span>
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowResetConfirm(true)}
            className="w-full py-3 px-4 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/20
                       text-left text-sm text-[#FF0055] hover:bg-[#FF0055]/20 transition-colors
                       flex items-center justify-between mt-2"
          >
            <span>Reset All Statistics</span>
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowClearHistoryConfirm(true)}
            className="w-full py-3 px-4 rounded-lg bg-[#FF0055]/10 border border-[#FF0055]/20
                       text-left text-sm text-[#FF0055] hover:bg-[#FF0055]/20 transition-colors
                       flex items-center justify-between mt-2"
          >
            <span>Clear Game History</span>
            <Trash2 className="w-4 h-4" />
          </button>
        </SettingsSection>

        {/* Admin */}
        <SettingsSection icon={<Shield className="w-5 h-5 text-[#00F0FF]" />} title="Admin">
          <button
            onClick={() => { playButtonClick(); setPhase('ADMIN'); }}
            className="w-full py-3 px-4 rounded-lg bg-[#2D1B69]/40 border border-[#00F0FF]/10
                       text-left text-sm text-[#A89BC2] hover:bg-[#2D1B69]/60 transition-colors
                       flex items-center justify-between"
          >
            <span>Open Admin Panel</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </SettingsSection>
      </div>

      {/* Reset Confirm Dialog */}
      <AnimatePresence>
        {showResetConfirm && (
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
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#FF0055]" />
                <h3 className="text-lg font-bold">Reset Statistics?</h3>
              </div>
              <p className="text-sm text-[#A89BC2] mb-4">
                This will permanently delete all statistics including player stats and win rates.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2D1B69] border border-[#00F0FF]/20 text-[#A89BC2]
                             hover:bg-[#3D2B79] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleResetStats}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055]
                             hover:bg-[#FF0055]/30 transition-colors"
                >
                  Reset
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear History Confirm Dialog */}
      <AnimatePresence>
        {showClearHistoryConfirm && (
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
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-[#FF0055]" />
                <h3 className="text-lg font-bold">Clear Game History?</h3>
              </div>
              <p className="text-sm text-[#A89BC2] mb-4">
                This will permanently delete all game history records.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearHistoryConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl bg-[#2D1B69] border border-[#00F0FF]/20 text-[#A89BC2]
                             hover:bg-[#3D2B79] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearHistory}
                  className="flex-1 py-2.5 rounded-xl bg-[#FF0055]/20 border border-[#FF0055]/40 text-[#FF0055]
                             hover:bg-[#FF0055]/30 transition-colors"
                >
                  Clear
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Sub-components
function SettingsSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
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
      <div className="space-y-2">{children}</div>
    </motion.div>
  );
}

function ToggleRow({ label, value, onChange, description }: { label: string; value: boolean; onChange: () => void; description?: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-sm">{label}</p>
        {description && <p className="text-xs text-[#A89BC2]/60">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-6 rounded-full transition-all relative ${
          value ? 'bg-[#00F0FF]' : 'bg-[#2D1B69] border border-[#A89BC2]/20'
        }`}
      >
        <motion.div
          animate={{ x: value ? 24 : 2 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`w-5 h-5 rounded-full absolute top-0.5 ${
            value ? 'bg-white' : 'bg-[#A89BC2]'
          }`}
        />
      </button>
    </div>
  );
}

function NumberRow({ label, value, options, onChange }: { label: string; value: number; options: { label: string; value: number }[]; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-sm">{label}</p>
      <div className="flex gap-1">
        {options.map(opt => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              value === opt.value
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                : 'bg-[#2D1B69]/40 text-[#A89BC2] border border-transparent hover:bg-[#2D1B69]'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
