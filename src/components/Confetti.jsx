const pieces = Array.from({ length: 28 }, (_, index) => ({
  left: `${(index * 37) % 100}%`,
  delay: `${(index % 8) * 0.08}s`,
  duration: `${1.9 + (index % 5) * 0.16}s`,
  drift: `${((index % 7) - 3) * 32}px`,
  color: ['#c99a60', '#f2ddad', '#d7e0ce', '#a5c2bf'][index % 4],
}))

export default function Confetti() {
  return <div className="confetti-layer" aria-hidden="true">{pieces.map((piece, index) => <i key={index} style={{ left: piece.left, animationDelay: piece.delay, animationDuration: piece.duration, '--drift': piece.drift, backgroundColor: piece.color }} />)}</div>
}
