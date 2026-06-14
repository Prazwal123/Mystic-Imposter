import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getCustomPacks, saveCustomPack, deleteCustomPack } from '@/lib/storage';
import { playButtonClick, playError } from '@/lib/sounds';
import { ArrowLeft, Plus, Trash2, Edit2, Save, X, Package, AlertTriangle } from 'lucide-react';
import type { WordEntry } from '@/types/game';
import { generateId } from '@/lib/storage';

export default function WordPacksScreen() {
  const { setPhase } = useGame();
  const [packs, setPacks] = useState(getCustomPacks());
  const [showCreate, setShowCreate] = useState(false);
  const [editingPack, setEditingPack] = useState<string | null>(null);
  const [newPackName, setNewPackName] = useState('');
  const [newWords, setNewWords] = useState<WordEntry[]>([
    { word: '', hint: '' },
  ]);
  const [error, setError] = useState('');

  const refreshPacks = () => setPacks(getCustomPacks());

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  const handleAddWord = () => {
    playButtonClick();
    setNewWords(prev => [...prev, { word: '', hint: '' }]);
  };

  const handleRemoveWord = (index: number) => {
    playButtonClick();
    setNewWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleWordChange = (index: number, field: keyof WordEntry, value: string) => {
    setNewWords(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setError('');
  };

  const handleSavePack = () => {
    // Validate
    const validWords = newWords.filter(w => w.word.trim() && w.hint?.trim());
    if (validWords.length === 0) {
      playError();
      setError('Add at least one complete word with a hint');
      return;
    }

    const name = newPackName.trim() || 'Custom Pack';
    const existing = editingPack ? packs.find(p => p.id === editingPack) : null;

    const pack = {
      id: existing?.id || generateId(),
      name,
      category: name,
      words: validWords,
      createdAt: existing?.createdAt || new Date().toISOString(),
    };

    saveCustomPack(pack);
    refreshPacks();
    setShowCreate(false);
    setEditingPack(null);
    setNewPackName('');
    setNewWords([{ word: '', hint: '' }]);
    playButtonClick();
  };

  const handleEdit = (packId: string) => {
    playButtonClick();
    const pack = packs.find(p => p.id === packId);
    if (pack) {
      setNewPackName(pack.name);
      setNewWords(pack.words.length > 0 ? [...pack.words] : [{ word: '', hint: '' }]);
      setEditingPack(packId);
      setShowCreate(true);
    }
  };

  const handleDelete = (packId: string) => {
    playButtonClick();
    deleteCustomPack(packId);
    refreshPacks();
  };

  const handleStartCreate = () => {
    playButtonClick();
    setShowCreate(true);
    setEditingPack(null);
    setNewPackName('');
    setNewWords([{ word: '', hint: '' }]);
    setError('');
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
          <div className="ml-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-[#00F0FF]" />
            <h1 className="text-2xl font-bold" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
              Word Packs
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto pb-8 space-y-4">
        {/* Create Button */}
        {!showCreate && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={handleStartCreate}
            className="w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2
                       bg-[#00F0FF]/10 border border-dashed border-[#00F0FF]/30 text-[#00F0FF]
                       hover:bg-[#00F0FF]/20 transition-all"
          >
            <Plus className="w-5 h-5" />
            Create New Word Pack
          </motion.button>
        )}

        {/* Create/Edit Form */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/10"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">{editingPack ? 'Edit Pack' : 'New Word Pack'}</h3>
                <button
                  onClick={() => { setShowCreate(false); setEditingPack(null); }}
                  className="p-1.5 rounded-lg hover:bg-[#FF0055]/10 text-[#A89BC2] hover:text-[#FF0055]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Pack Name */}
              <input
                type="text"
                value={newPackName}
                onChange={(e) => setNewPackName(e.target.value)}
                placeholder="Pack Name"
                className="w-full px-3 py-2.5 rounded-lg bg-[#2D1B69]/60 border border-[#00F0FF]/10
                           focus:border-[#00F0FF]/40 focus:outline-none mb-4"
              />

              {/* Error */}
              {error && (
                <div className="flex items-center gap-2 bg-[#FF0055]/20 border border-[#FF0055]/40 rounded-lg px-3 py-2 text-[#FF0055] text-xs mb-3">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              {/* Words */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {newWords.map((word, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="bg-[#2D1B69]/40 rounded-lg p-3 border border-[#00F0FF]/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#A89BC2]">Word #{i + 1}</span>
                      {newWords.length > 1 && (
                        <button
                          onClick={() => handleRemoveWord(i)}
                          className="p-1 rounded hover:bg-[#FF0055]/10 text-[#A89BC2] hover:text-[#FF0055]"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        value={word.word}
                        onChange={(e) => handleWordChange(i, 'word', e.target.value)}
                        placeholder="Word"
                        className="w-full px-2.5 py-1.5 rounded bg-[#1A0B2E]/60 border border-[#00F0FF]/5
                                   focus:border-[#00F0FF]/30 focus:outline-none text-sm"
                      />
                      <input
                        type="text"
                        value={word.hint || ''}
                        onChange={(e) => handleWordChange(i, 'hint', e.target.value)}
                        placeholder="Hint"
                        className="w-full px-2.5 py-1.5 rounded bg-[#1A0B2E]/60 border border-[#00F0FF]/5
                                   focus:border-[#00F0FF]/30 focus:outline-none text-sm"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Add Word Button */}
              <button
                onClick={handleAddWord}
                className="w-full mt-3 py-2 rounded-lg border border-dashed border-[#00F0FF]/20
                           text-[#00F0FF] text-sm hover:bg-[#00F0FF]/10 transition-all
                           flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Another Word
              </button>

              {/* Save Button */}
              <button
                onClick={handleSavePack}
                className="w-full mt-3 py-3 rounded-xl font-bold flex items-center justify-center gap-2
                           bg-gradient-to-r from-[#00F0FF] to-[#00B8FF] text-[#1A0B2E]
                           shadow-[0_0_15px_rgba(0,240,255,0.3)]
                           transform hover:scale-[1.02] active:scale-95 transition-all"
              >
                <Save className="w-5 h-5" />
                Save Pack
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Existing Packs */}
        {packs.length === 0 && !showCreate ? (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-[#A89BC2]/30 mx-auto mb-4" />
            <p className="text-[#A89BC2]">No custom word packs yet</p>
            <p className="text-sm text-[#A89BC2]/50 mt-1">Create your first custom pack above</p>
          </div>
        ) : (
          packs.map((pack, i) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5 flex items-center justify-between"
            >
              <div>
                <p className="font-medium">{pack.name}</p>
                <p className="text-xs text-[#A89BC2]">{pack.words.length} words</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEdit(pack.id)}
                  className="p-2 rounded-lg hover:bg-[#00F0FF]/10 text-[#A89BC2] hover:text-[#00F0FF] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(pack.id)}
                  className="p-2 rounded-lg hover:bg-[#FF0055]/10 text-[#A89BC2] hover:text-[#FF0055] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
