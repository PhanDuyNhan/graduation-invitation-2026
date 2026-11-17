import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function Envelope({ guest, event, onOpen }) {
  const [opening, setOpening] = useState(false)
  const timerRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => () => window.clearTimeout(timerRef.current), [])

  function startOpening() {
    if (opening) return
    setOpening(true)

    if (reduceMotion) {
      onOpen()
      return
    }

    timerRef.current = window.setTimeout(onOpen, 1250)
  }

  return (
    <motion.main
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.015 }}
      transition={{ duration: 0.55 }}
    >
      <div className="cover-masthead" aria-hidden="true">
        <span>PRIVATE CORRESPONDENCE</span>
        <i />
        <span>CLASS OF {event.graduationYear}</span>
      </div>

      <div className="cover-intro">
        <p>A note for the next chapter</p>
        <span>01 — VIET NAM</span>
      </div>

      <button
        className={`envelope ${opening ? 'is-opening' : ''}`}
        type="button"
        onClick={startOpening}
        aria-label={`Mở thiệp mời dành cho ${guest.name}`}
        aria-busy={opening}
      >
        <span className="envelope-back" aria-hidden="true" />
        <span className="invitation-slip" aria-hidden="true">
          <span>GRADUATION INVITATION</span>
          <strong>{event.graduationYear}</strong>
        </span>
        <span className="envelope-flap" aria-hidden="true" />
        <span className="envelope-front" aria-hidden="true" />
        <span className="recipient-panel">
          <span className="recipient-label">DÀNH RIÊNG CHO</span>
          <strong>{guest.name}</strong>
          <span className="recipient-route">A PERSONAL INVITATION · {event.fieldOfStudy || event.title}</span>
        </span>
        <span className="wax-seal" aria-hidden="true">26</span>
      </button>

      <button className="open-invitation" type="button" onClick={startOpening} disabled={opening}>
        <span>{opening ? 'Đang mở thiệp' : 'Mở lời mời'}</span>
        <span aria-hidden="true">↗</span>
      </button>
      <p className="cover-note" aria-live="polite">
        {opening ? 'Một chương mới đang mở ra…' : 'Chạm để mở · Enter hoặc phím cách'}
      </p>
    </motion.main>
  )
}
