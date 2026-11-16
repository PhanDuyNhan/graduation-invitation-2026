import { motion } from 'framer-motion'

export default function Envelope({ guest, event, onOpen }) {
  return (
    <motion.main className="postcard-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, rotate: -2, y: -25 }} transition={{ duration: 0.45 }}>
      <div className="cover-route" aria-hidden="true"><span>01</span><i></i><span>∞</span></div>
      <p className="cover-kicker">A little note from my journey</p>
      <button className="postcard-cover" onClick={onOpen} aria-label={`Mở thiệp mời dành cho ${guest.name}`}>
        <span className="cover-topline"><span>POSTCARD / {event.graduationYear}</span><span>VIET NAM → EVERYWHERE</span></span>
        <span className="cover-stamp" aria-hidden="true"><span>NEW<br />CHAPTER</span><small>{event.graduationYear}</small></span>
        <span className="cover-postmark" aria-hidden="true">BON<br />VOYAGE<span>✳</span></span>
        <span className="cover-main">
          <span className="cover-small">TO: SOMEONE SPECIAL</span>
          <span className="cover-name">{guest.name}</span>
          <span className="cover-line" aria-hidden="true"></span>
          <span className="cover-copy">Một hành trình khép lại.<br />Một hành trình mới bắt đầu.</span>
        </span>
        <span className="cover-bottomline"><span>{event.title}</span><span>✳ &nbsp; WITH LOVE</span></span>
      </button>
      <button className="open-postcard" onClick={onOpen}>Mở tấm thiệp này <span aria-hidden="true">↗</span></button>
      <p className="cover-footnote">A note to keep · A day to remember</p>
    </motion.main>
  )
}
