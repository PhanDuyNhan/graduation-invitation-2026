import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Envelope from '../components/Envelope.jsx'
import Confetti from '../components/Confetti.jsx'
import InvitationTemplate from '../templates/InvitationTemplate.jsx'
import event from '../data/event.json'
import { getGuestBySlug } from '../utils/guests.js'
import NotFoundPage from './NotFoundPage.jsx'

export default function InvitationPage() {
  const { slug } = useParams()
  const guest = getGuestBySlug(slug)
  if (!guest) return <NotFoundPage />
  return <InvitationExperience key={slug} guest={guest} />
}

function InvitationExperience({ guest }) {
  const [opened, setOpened] = useState(false)
  const [musicSignal, setMusicSignal] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    document.title = `${guest.name} · ${event.title}`
    return () => { document.title = 'Thiệp mời lễ tốt nghiệp' }
  }, [guest])

  useEffect(() => {
    if (!showConfetti) return undefined
    const timeout = window.setTimeout(() => setShowConfetti(false), 3000)
    return () => window.clearTimeout(timeout)
  }, [showConfetti])

  function openInvitation() {
    setOpened(true)
    setMusicSignal((value) => value + 1)
    setShowConfetti(true)
  }

  return <><AnimatePresence mode="wait">{opened ? <InvitationTemplate key="opened" event={event} guest={guest} musicSignal={musicSignal} /> : <Envelope key="closed" event={event} guest={guest} onOpen={openInvitation} />}</AnimatePresence>{showConfetti && <Confetti />}</>
}
