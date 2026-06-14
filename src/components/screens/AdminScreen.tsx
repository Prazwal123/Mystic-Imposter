import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getAllCategories } from '@/data/wordlist';
import { getStatistics, getCustomPacks, saveCustomPack, deleteCustomPack, verifyAdminPassword, isAdminAuthenticated, setAdminAuthenticated, clearAdminAuth } from '@/lib/storage';
import { playButtonClick, playError } from '@/lib/sounds';
import { ArrowLeft, Lock, Eye, Trash2, Upload, FileSpreadsheet, Shield, AlertTriangle } from 'lucide-react';
import type { WordEntry } from '@/types/game';

export default function AdminScreen() {
  const { setPhase } = useGame();
  const [authenticated, setAuthenticated] = useState(isAdminAuthenticated());
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'words' | 'upload'>('overview');
  const [previewCategory, setPreviewCategory] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');

  const stats = getStatistics();
  const categories = getAllCategories();
  const customPacks = getCustomPacks();

  const handleLogin = () => {
    if (verifyAdminPassword(password)) {
      playButtonClick();
      setAdminAuthenticated();
      setAuthenticated(true);
      setLoginError('');
    } else {
      playError();
      setLoginError('Invalid password');
    }
  };

  const handleLogout = () => {
    playButtonClick();
    clearAdminAuth();
    setAuthenticated(false);
    setPassword('');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError('');
    setUploadSuccess('');
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.csv') && !file.name.endsWith('.json')) {
      setUploadError('Please upload a .xlsx, .csv, or .json file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        let words: WordEntry[] = [];

        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) {
            words = parsed.map((item: any) => ({
              word: item.word || item.Word || '',
              hintEasy: item.hintEasy || item.Hint_Easy || item.hint_easy || '',
              hintMedium: item.hintMedium || item.Hint_Medium || item.hint_medium || '',
              hintHard: item.hintHard || item.Hint_Hard || item.hint_hard || '',
              hintExtreme: item.hintExtreme || item.Hint_Extreme || item.hint_extreme || '',
            }));
          }
        } else {
          // Simple CSV parser
          const lines = content.split('\n').filter(l => l.trim());
          const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
          const wordIdx = headers.findIndex(h => h === 'word');
          const easyIdx = headers.findIndex(h => h.includes('easy') || h.includes('hint_easy'));
          const medIdx = headers.findIndex(h => h.includes('medium') || h.includes('hint_medium'));
          const hardIdx = headers.findIndex(h => h.includes('hard') || h.includes('hint_hard'));
          const extremeIdx = headers.findIndex(h => h.includes('extreme') || h.includes('hint_extreme'));

          for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            if (cols[wordIdx || 0]) {
              words.push({
                word: cols[wordIdx || 0],
                hintEasy: cols[easyIdx >= 0 ? easyIdx : 1] || '',
                hintMedium: cols[medIdx >= 0 ? medIdx : 2] || '',
                hintHard: cols[hardIdx >= 0 ? hardIdx : 3] || '',
                hintExtreme: cols[extremeIdx >= 0 ? extremeIdx : 4] || '',
              });
            }
          }
        }

        // Validate
        const validWords = words.filter(w => w.word && w.hintEasy && w.hintMedium && w.hintHard && w.hintExtreme);
        if (validWords.length === 0) {
          setUploadError('No valid word entries found. Ensure your file has Word, Hint_Easy, Hint_Medium, Hint_Hard, Hint_Extreme columns.');
          return;
        }

        // Check for duplicates in existing categories
        const categoryName = file.name.replace(/\.[^/.]+$/, '');
        const existing = categories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
        if (existing) {
          setUploadError(`Category "${categoryName}" already exists. Delete it first or rename your file.`);
          return;
        }

        const newPack = {
          id: `pack-${Date.now()}`,
          name: categoryName,
          category: categoryName,
          words: validWords,
          createdAt: new Date().toISOString(),
        };

        saveCustomPack(newPack);
        setUploadSuccess(`Successfully imported "${categoryName}" with ${validWords.length} words!`);
        playButtonClick();
      } catch (err) {
        setUploadError('Failed to parse file. Please check the format.');
      }
    };

    if (file.name.endsWith('.xlsx')) {
      setUploadError('XLSX files need to be converted to CSV or JSON for browser upload. Please export as CSV and try again.');
      return;
    }

    reader.readAsText(file);
  };

  const handleDeletePack = (id: string) => {
    playButtonClick();
    deleteCustomPack(id);
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-sm flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-[#2D1B69] border-2 border-[#00F0FF]/30
                          flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(0,240,255,0.2)]">
            <Lock className="w-10 h-10 text-[#00F0FF]" />
          </div>

          <h1 className="text-2xl font-bold mb-2">Admin Panel</h1>
          <p className="text-[#A89BC2] text-sm mb-6 text-center">Enter the admin password to continue</p>

          <input
            type="password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setLoginError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl bg-[#2D1B69]/60 border border-[#00F0FF]/20
                       focus:border-[#00F0FF]/50 focus:outline-none text-center mb-3"
          />

          {loginError && (
            <p className="text-[#FF0055] text-sm mb-3">{loginError}</p>
          )}

          <button
            onClick={handleLogin}
            className="w-full py-3 rounded-xl font-bold
                       bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                       shadow-[0_0_20px_rgba(0,240,255,0.4)]
                       transform hover:scale-[1.02] active:scale-95 transition-all"
          >
            Login
          </button>

          <button
            onClick={() => setPhase('MENU')}
            className="mt-4 text-sm text-[#A89BC2] hover:text-white transition-colors"
          >
            Back to Menu
          </button>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button
            onClick={() => setPhase('MENU')}
            className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
          </button>
          <div className="ml-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00F0FF]" />
            <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
              Admin
            </h1>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-[#A89BC2] hover:text-[#FF0055] transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        {(['overview', 'words', 'upload'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === tab
                ? 'bg-[#00F0FF]/20 text-[#00F0FF] border border-[#00F0FF]/40'
                : 'bg-[#2D1B69]/40 text-[#A89BC2] border border-transparent hover:bg-[#2D1B69]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="max-w-lg mx-auto pb-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            <AdminStat label="Total Games" value={stats.totalGames.toString()} />
            <AdminStat label="Citizen Wins" value={stats.citizenWins.toString()} />
            <AdminStat label="Imposter Wins" value={stats.imposterWins.toString()} />
            <AdminStat label="Total Categories" value={categories.length.toString()} />
            <AdminStat label="Custom Packs" value={customPacks.length.toString()} />
            <AdminStat label="Total Words" value={categories.reduce((acc, c) => acc + c.words.length, 0).toString()} />
          </motion.div>
        )}

        {/* Words Tab */}
        {activeTab === 'words' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-3"
          >
            {categories.map(cat => (
              <div
                key={cat.name}
                className="bg-[#2D1B69]/30 rounded-xl border border-[#00F0FF]/5 overflow-hidden"
              >
                <button
                  onClick={() => setPreviewCategory(previewCategory === cat.name ? null : cat.name)}
                  className="w-full p-4 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-5 h-5 text-[#00F0FF]" />
                    <div className="text-left">
                      <p className="font-medium text-sm">{cat.name}</p>
                      <p className="text-xs text-[#A89BC2]">{cat.words.length} words</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {cat.isCustom && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePack(cat.name);
                        }}
                        className="p-1.5 rounded-lg bg-[#FF0055]/10 text-[#FF0055] hover:bg-[#FF0055]/20"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <Eye className="w-4 h-4 text-[#A89BC2]" />
                  </div>
                </button>

                <AnimatePresence>
                  {previewCategory === cat.name && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-3 border-t border-[#00F0FF]/5 pt-2 max-h-60 overflow-y-auto">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="text-[#A89BC2]">
                              <th className="text-left py-1">Word</th>
                              <th className="text-left py-1">Easy</th>
                              <th className="text-left py-1">Hard</th>
                            </tr>
                          </thead>
                          <tbody>
                            {cat.words.map((w, i) => (
                              <tr key={i} className="border-t border-[#00F0FF]/5">
                                <td className="py-1 text-white">{w.word}</td>
                                <td className="py-1 text-[#A89BC2]">{w.hintEasy}</td>
                                <td className="py-1 text-[#A89BC2]">{w.hintHard}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}

        {/* Upload Tab */}
        {activeTab === 'upload' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <div className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5">
              <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Upload className="w-4 h-4 text-[#00F0FF]" />
                Upload Word Pack
              </h3>
              <p className="text-xs text-[#A89BC2] mb-3">
                Upload a CSV or JSON file with columns: Word, Hint_Easy, Hint_Medium, Hint_Hard, Hint_Extreme
              </p>

              <label className="block w-full py-3 px-4 rounded-xl border-2 border-dashed border-[#00F0FF]/20
                               text-center text-sm text-[#A89BC2] hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/5
                               transition-all cursor-pointer">
                <Upload className="w-6 h-6 mx-auto mb-1 text-[#00F0FF]" />
                Click to select file
                <input
                  type="file"
                  accept=".csv,.json,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              {uploadError && (
                <div className="mt-3 flex items-center gap-2 bg-[#FF0055]/20 border border-[#FF0055]/40 rounded-lg px-3 py-2 text-[#FF0055] text-xs">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {uploadError}
                </div>
              )}

              {uploadSuccess && (
                <div className="mt-3 bg-[#00FF99]/20 border border-[#00FF99]/40 rounded-lg px-3 py-2 text-[#00FF99] text-xs">
                  {uploadSuccess}
                </div>
              )}
            </div>

            <div className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5">
              <h3 className="font-medium text-sm mb-2">File Format Example (CSV)</h3>
              <pre className="text-xs text-[#A89BC2] bg-[#1A0B2E] rounded-lg p-3 overflow-x-auto">
{`Word,Hint_Easy,Hint_Medium,Hint_Hard,Hint_Extreme
Elephant,Large animal with a trunk,Found in herds,Massive herbivore,Tusks
Tiger,Large cat with stripes,Apex predator,Striped feline,Claws`}
              </pre>
            </div>

            <div className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5">
              <h3 className="font-medium text-sm mb-2">File Format Example (JSON)</h3>
              <pre className="text-xs text-[#A89BC2] bg-[#1A0B2E] rounded-lg p-3 overflow-x-auto">
{`[
  {
    "word": "Elephant",
    "hintEasy": "Large animal with a trunk",
    "hintMedium": "Found in herds",
    "hintHard": "Massive herbivore",
    "hintExtreme": "Tusks"
  }
]`}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AdminStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5 flex items-center justify-between">
      <span className="text-sm text-[#A89BC2]">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
}
