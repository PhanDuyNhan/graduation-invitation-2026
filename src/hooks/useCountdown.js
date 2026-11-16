import { useEffect, useState } from 'react'

function calculate(datetime) {
  if (!datetime || Number.isNaN(new Date(datetime).getTime())) return null
  const remaining = Math.max(0, new Date(datetime).getTime() - Date.now())
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining / 3600000) % 24),
    minutes: Math.floor((remaining / 60000) % 60),
    seconds: Math.floor((remaining / 1000) % 60),
    complete: remaining === 0,
  }
}

export function useCountdown(datetime) {
  const [countdown, setCountdown] = useState(() => calculate(datetime))

  useEffect(() => {
    const update = () => setCountdown(calculate(datetime))
    update()
    if (!datetime) return undefined
    const interval = window.setInterval(update, 1000)
    return () => window.clearInterval(interval)
  }, [datetime])

  return countdown
}
