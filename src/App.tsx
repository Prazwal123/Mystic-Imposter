import { GameProvider, useGame } from '@/context/GameContext';
import { OnlineProvider } from '@/context/OnlineContext';
import { AnimatePresence, motion } from 'framer-motion';
import HomeScreen from '@/components/screens/HomeScreen';
import SetupScreen from '@/components/screens/SetupScreen';
import OnlineMenuScreen from '@/components/screens/OnlineMenuScreen';
import OnlineLobbyScreen from '@/components/screens/OnlineLobbyScreen';
import RoleRevealScreen from '@/components/screens/RoleRevealScreen';
import DiscussionScreen from '@/components/screens/DiscussionScreen';
import VotingScreen from '@/components/screens/VotingScreen';
import VoteResultsScreen from '@/components/screens/VoteResultsScreen';
import ImposterGuessScreen from '@/components/screens/ImposterGuessScreen';
import GameOverScreen from '@/components/screens/GameOverScreen';
import StatisticsScreen from '@/components/screens/StatisticsScreen';
import GameHistoryScreen from '@/components/screens/GameHistoryScreen';
import SettingsScreen from '@/components/screens/SettingsScreen';
import AdminScreen from '@/components/screens/AdminScreen';
import WordPacksScreen from '@/components/screens/WordPacksScreen';
import './App.css';

function GameRouter() {
  const { state } = useGame();

  const renderScreen = () => {
    switch (state.phase) {
      case 'MENU':
        return <HomeScreen key="home" />;
      case 'SETUP':
        return <SetupScreen key="setup" />;
      case 'ROLE_REVEAL':
        return <RoleRevealScreen key="reveal" />;
      case 'DISCUSSION':
        return <DiscussionScreen key="discussion" />;
      case 'VOTING':
        return <VotingScreen key="voting" />;
      case 'VOTE_RESULTS':
        return <VoteResultsScreen key="results" />;
      case 'IMPOSTER_GUESS':
        return <ImposterGuessScreen key="guess" />;
      case 'GAME_OVER':
        return <GameOverScreen key="over" />;
      case 'STATISTICS':
        return <StatisticsScreen key="stats" />;
      case 'GAME_HISTORY':
        return <GameHistoryScreen key="history" />;
      case 'SETTINGS':
        return <SettingsScreen key="settings" />;
      case 'ADMIN':
        return <AdminScreen key="admin" />;
      case 'WORD_PACKS':
        return <WordPacksScreen key="packs" />;
      case 'ONLINE_MENU':
        return <OnlineMenuScreen key="online-menu" />;
      case 'ONLINE_LOBBY':
        return <OnlineLobbyScreen key="online-lobby" />;
      default:
        return <HomeScreen key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0B2E] text-white overflow-x-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={state.phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="min-h-screen"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <GameProvider>
      <OnlineProvider>
        <GameRouter />
      </OnlineProvider>
    </GameProvider>
  );
}

export default App;
