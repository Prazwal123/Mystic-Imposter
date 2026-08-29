'use client'

import { GameProvider, useGame } from '@/game/context/GameContext'
import { OnlineProvider } from '@/game/context/OnlineContext'
import { AnimatePresence, motion } from 'framer-motion'
import HomeScreen from '@/game/components/screens/HomeScreen'
import SetupScreen from '@/game/components/screens/SetupScreen'
import OnlineMenuScreen from '@/game/components/screens/OnlineMenuScreen'
import OnlineLobbyScreen from '@/game/components/screens/OnlineLobbyScreen'
import RoleRevealScreen from '@/game/components/screens/RoleRevealScreen'
import DiscussionScreen from '@/game/components/screens/DiscussionScreen'
import VotingScreen from '@/game/components/screens/VotingScreen'
import VoteResultsScreen from '@/game/components/screens/VoteResultsScreen'
import ImposterGuessScreen from '@/game/components/screens/ImposterGuessScreen'
import GameOverScreen from '@/game/components/screens/GameOverScreen'
import StatisticsScreen from '@/game/components/screens/StatisticsScreen'
import GameHistoryScreen from '@/game/components/screens/GameHistoryScreen'
import SettingsScreen from '@/game/components/screens/SettingsScreen'
import AdminScreen from '@/game/components/screens/AdminScreen'
import WordPacksScreen from '@/game/components/screens/WordPacksScreen'
import './game.css'

function GameRouter() {
  const { state } = useGame()

  const renderScreen = () => {
    switch (state.phase) {
      case 'MENU':        return <HomeScreen key="home" />
      case 'SETUP':       return <SetupScreen key="setup" />
      case 'ROLE_REVEAL': return <RoleRevealScreen key="reveal" />
      case 'DISCUSSION':  return <DiscussionScreen key="discussion" />
      case 'VOTING':      return <VotingScreen key="voting" />
      case 'VOTE_RESULTS':return <VoteResultsScreen key="results" />
      case 'IMPOSTER_GUESS': return <ImposterGuessScreen key="guess" />
      case 'GAME_OVER':   return <GameOverScreen key="over" />
      case 'STATISTICS':  return <StatisticsScreen key="stats" />
      case 'GAME_HISTORY':return <GameHistoryScreen key="history" />
      case 'SETTINGS':    return <SettingsScreen key="settings" />
      case 'ADMIN':       return <AdminScreen key="admin" />
      case 'WORD_PACKS':  return <WordPacksScreen key="packs" />
      case 'ONLINE_MENU': return <OnlineMenuScreen key="online-menu" />
      case 'ONLINE_LOBBY':return <OnlineLobbyScreen key="online-lobby" />
      default:            return <HomeScreen key="home" />
    }
  }

  return (
    <div className="mystic-game-root min-h-screen bg-[#1A0B2E] text-white overflow-x-hidden">
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
  )
}

export default function GameApp() {
  return (
    <GameProvider>
      <OnlineProvider>
        <GameRouter />
      </OnlineProvider>
    </GameProvider>
  )
}
