import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const sprite = '/images/envelope/opening-sequence.png'
const cropX = [44, 620, 1192]
const cropY = [-80, 420, 905, 1370, 1815]
const topMask = [0, 25, 38, 58, 80]
const frameDuration = 95

export default function Envelope({ guest, onOpen }) {
  const [frame, setFrame] = useState(0)
  const [opening, setOpening] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    const image = new Image()
    image.src = sprite
    const loaded = image.decode ? image.decode().catch(() => undefined) : Promise.resolve()
    loaded.then(() => {
      if (active) setReady(true)
    })
    return () => { active = false }
  }, [])

  useEffect(() => {
    if (!opening || !ready) return undefined
    const frameTimers = Array.from({ length: 14 }, (_, index) =>
      window.setTimeout(() => setFrame(index + 1), (index + 1) * frameDuration)
    )
    const finishTimer = window.setTimeout(onOpen, 1410)
    return () => {
      frameTimers.forEach(window.clearTimeout)
      window.clearTimeout(finishTimer)
    }
  }, [opening, ready, onOpen])

  const column = frame % 3
  const row = Math.floor(frame / 3)

  return (
    <motion.main
      className="envelope-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.16 }}
    >
      <button
        className={`envelope ${opening ? 'is-opening' : ''}`}
        type="button"
        onClick={() => setOpening(true)}
        aria-label={`Mở thiệp mời dành cho ${guest.name}`}
        aria-busy={opening}
        disabled={opening}
      >
        <span className="envelope-art" aria-hidden="true">
          <img
            className="envelope-sprite"
            src={sprite}
            alt=""
            decoding="async"
            fetchPriority="high"
            style={{ left: `${-cropX[column] / 560 * 100}%`, top: `${-cropY[row] / 520 * 100}%` }}
          />
          <span className="envelope-top-mask" style={{ height: `${topMask[row] / 520 * 100}%` }} />
        </span>
      </button>
    </motion.main>
  )
}
