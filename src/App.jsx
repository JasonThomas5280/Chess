import { Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell.jsx'
import Home from './modes/Home.jsx'
import PlayMode from './modes/PlayMode.jsx'
import PuzzleMode from './modes/PuzzleMode.jsx'
import EndgameMode from './modes/EndgameMode.jsx'
import OpeningMode from './modes/OpeningMode.jsx'
import SetsMode from './modes/SetsMode.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="play" element={<PlayMode />} />
        <Route path="puzzles" element={<PuzzleMode />} />
        <Route path="endgames" element={<EndgameMode />} />
        <Route path="openings" element={<OpeningMode />} />
        <Route path="sets" element={<SetsMode />} />
      </Route>
    </Routes>
  )
}
