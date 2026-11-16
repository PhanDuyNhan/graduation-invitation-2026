import { Link } from 'react-router-dom'
import event from '../data/event.json'
import guests from '../data/guests.json'

export default function LandingPage() {
  const sampleGuest = guests.find((guest) => guest.slug === 'khach-moi-mau')
  return (
    <main className="landing-page">
      <div className="landing-mark" aria-hidden="true">✳</div>
      <p className="eyebrow">{event.eyebrow}</p>
      <h1>{event.title}<br /><em>{event.graduationYear}</em></h1>
      <div className="gold-line" />
      <p>Một tấm bưu thiếp nhỏ, gửi đến những người đã cùng mình đi qua chặng đường này.</p>
      {sampleGuest && <Link className="button button-gold" to={`/invitation/${sampleGuest.slug}`}>Xem thiệp mẫu <span aria-hidden="true">↗</span></Link>}
      <small>{sampleGuest ? 'Đây là trang xem trước. Link khách mời sẽ dùng dạng /invitation/ten-khach.' : 'Hãy mở đường dẫn thiệp được gửi riêng cho bạn.'}</small>
    </main>
  )
}
