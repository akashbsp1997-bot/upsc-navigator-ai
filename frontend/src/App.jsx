import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Common/Navbar'
import Sidebar from './components/Common/Sidebar'
import Dashboard from './pages/Home'
import SyllabusPlanner from './components/SyllabusPlanner/SyllabusPlanner'
import NewsTab from './components/NewsTab/NewsTab'
import NoteKeeping from './components/NoteKeeping/NoteKeeping'
import RecommendationPanel from './components/RecommendationEngine/RecommendationPanel'
import PYQViewer from './components/PYQViewer/PYQViewer'
import RealityCheck from './components/RealityCheck/RealityCheck'
import './App.css'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-layout">
          <Sidebar />
          <div className="content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/modules" element={<SyllabusPlanner />} />
              <Route path="/news" element={<NewsTab />} />
              <Route path="/notes" element={<NoteKeeping />} />
              <Route path="/recommendations" element={<RecommendationPanel />} />
              <Route path="/pyqs" element={<PYQViewer />} />
              <Route path="/reality-check" element={<RealityCheck />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
