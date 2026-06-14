import { motion } from 'framer-motion';
import { useGame } from '@/context/GameContext';
import { getStatistics, formatDuration } from '@/lib/storage';
import { playButtonClick } from '@/lib/sounds';
import { ArrowLeft, Trophy, Users, Clock, TrendingUp, Target } from 'lucide-react';

export default function StatisticsScreen() {
  const { setPhase } = useGame();
  const stats = getStatistics();

  const totalGames = stats.totalGames || 0;
  const citizenWinRate = totalGames > 0 ? Math.round((stats.citizenWins / totalGames) * 100) : 0;
  const imposterWinRate = totalGames > 0 ? Math.round((stats.imposterWins / totalGames) * 100) : 0;
  const avgDuration = totalGames > 0 ? Math.round(stats.totalDuration / totalGames) : 0;

  const handleBack = () => {
    playButtonClick();
    setPhase('MENU');
  };

  return (
    <div className="min-h-screen px-4 py-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBack}
          className="p-2 rounded-lg bg-[#2D1B69]/50 hover:bg-[#2D1B69] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-[#00F0FF]" />
        </button>
        <h1 className="text-2xl font-bold ml-4" style={{ textShadow: '0 0 10px rgba(0,240,255,0.3)' }}>
          Statistics
        </h1>
      </div>

      <div className="max-w-lg mx-auto space-y-4 pb-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={<Trophy className="w-5 h-5 text-[#00F0FF]" />}
            label="Total Games"
            value={totalGames.toString()}
            delay={0}
          />
          <StatCard
            icon={<Clock className="w-5 h-5 text-[#00F0FF]" />}
            label="Avg Duration"
            value={formatDuration(avgDuration)}
            delay={0.1}
          />
        </div>

        {/* Win Rates */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#00F0FF]" />
            <h3 className="font-semibold text-sm text-[#A89BC2]">Win Rates</h3>
          </div>

          <div className="space-y-4">
            {/* Citizens */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#00FF99]">Citizens</span>
                <span className="text-sm font-bold text-[#00FF99]">{citizenWinRate}%</span>
              </div>
              <div className="h-2.5 bg-[#2D1B69] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${citizenWinRate}%` }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#00FF99] to-[#00F0FF] rounded-full"
                />
              </div>
              <p className="text-xs text-[#A89BC2]/60 mt-1">{stats.citizenWins} wins</p>
            </div>

            {/* Imposters */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-[#FF0055]">Imposters</span>
                <span className="text-sm font-bold text-[#FF0055]">{imposterWinRate}%</span>
              </div>
              <div className="h-2.5 bg-[#2D1B69] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${imposterWinRate}%` }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-[#FF0055] to-[#FF4080] rounded-full"
                />
              </div>
              <p className="text-xs text-[#A89BC2]/60 mt-1">{stats.imposterWins} wins</p>
            </div>
          </div>
        </motion.div>

        {/* Player Stats */}
        {Object.keys(stats.playerStats).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="font-semibold text-sm text-[#A89BC2]">Player Stats</h3>
            </div>

            <div className="space-y-2">
              {Object.values(stats.playerStats)
                .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
                .slice(0, 10)
                .map((player, i) => (
                  <motion.div
                    key={player.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className="flex items-center justify-between py-2 px-3 rounded-lg bg-[#2D1B69]/40"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#A89BC2] w-5">#{i + 1}</span>
                      <span className="text-sm font-medium">{player.name}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#A89BC2]">
                      <span className="text-[#00FF99]">{player.gamesWon}W</span>
                      <span className="text-[#FF0055]">{player.gamesLost}L</span>
                      <span>{player.gamesPlayed} games</span>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}

        {/* Category Stats */}
        {stats.gameHistory.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-5 h-5 text-[#00F0FF]" />
              <h3 className="font-semibold text-sm text-[#A89BC2]">Most Played Categories</h3>
            </div>

            {(() => {
              const categoryCounts: Record<string, number> = {};
              stats.gameHistory.forEach(g => {
                categoryCounts[g.category] = (categoryCounts[g.category] || 0) + 1;
              });
              const sorted = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
              const max = sorted[0]?.[1] || 1;

              return sorted.map(([cat, count], i) => (
                <div key={cat} className="mb-2">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">{cat}</span>
                    <span className="text-xs text-[#A89BC2]">{count} games</span>
                  </div>
                  <div className="h-1.5 bg-[#2D1B69] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / max) * 100}%` }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                      className="h-full bg-[#00F0FF] rounded-full"
                    />
                  </div>
                </div>
              ));
            })()}
          </motion.div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, delay }: { icon: React.ReactNode; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-[#2D1B69]/30 rounded-xl p-4 border border-[#00F0FF]/5"
    >
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-[#A89BC2]">{label}</span>
      </div>
      <p className="text-2xl font-black">{value}</p>
    </motion.div>
  );
}
