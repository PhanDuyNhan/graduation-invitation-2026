import { useCountdown } from '../hooks/useCountdown.js'

export default function Countdown({ datetime }) {
  const countdown = useCountdown(datetime)
  if (!countdown) return null
  if (countdown.complete) return <p className="countdown-complete">Ngày đặc biệt đã đến rồi! ✦</p>

  return (
    <div className="countdown" aria-label="Thời gian còn lại đến lễ tốt nghiệp">
      {[
        ['days', 'Ngày'],
        ['hours', 'Giờ'],
        ['minutes', 'Phút'],
        ['seconds', 'Giây'],
      ].map(([key, label]) => (
        <div className="countdown-unit" key={key}>
          <strong>{String(countdown[key]).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  )
}
