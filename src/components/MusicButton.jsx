import { useEffect, useRef, useState } from 'react'

export default function MusicButton({ source, startSignal }) {
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    if (!source) return undefined
    const audio = new Audio(source)
    audio.loop = true
    audio.volume = 0.4
    audioRef.current = audio
    const handlePause = () => setPlaying(false)
    audio.addEventListener('pause', handlePause)
    return () => {
      audio.pause()
      audio.removeEventListener('pause', handlePause)
      audioRef.current = null
    }
  }, [source])

  useEffect(() => {
    if (!startSignal || !audioRef.current) return
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
  }, [startSignal])

  if (!source) return null

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    else audio.pause()
  }

  return (
    <button className={`music-button ${playing ? 'is-playing' : ''}`} onClick={toggle} aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'} title={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}>
      <span aria-hidden="true">{playing ? '♫' : '♪'}</span>
    </button>
  )
}
