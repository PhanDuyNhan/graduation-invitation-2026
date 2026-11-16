import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import LandingPage from './pages/LandingPage.jsx'
import InvitationPage from './pages/InvitationPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/invitation/:slug" element={<InvitationPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MotionConfig>
  )
}
