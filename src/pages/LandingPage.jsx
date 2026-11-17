import { Link } from 'react-router-dom'
import event from '../data/event.json'
import guests from '../data/guests.json'

export default function LandingPage() {
  const sampleGuest = guests.find((guest) => guest.slug === 'khach-moi-mau')

  return (
    <main className="landing-page">
      <header className="landing-masthead">
        <span>PRIVATE CORRESPONDENCE</span>
        <span>CLASS OF {event.graduationYear}</span>
      </header>
      <div className="landing-layout">
        <div className="landing-copy">
          <p className="eyebrow">{event.eyebrow}</p>
          <h1>{event.title}<em>{event.graduationYear}</em></h1>
          <p>Một lời mời riêng tư, gửi đến những người đã cùng mình đi qua một chặng đường đáng nhớ.</p>
          {sampleGuest && <Link className="button" to={`/invitation/${sampleGuest.slug}`}>Xem thiệp mẫu <span aria-hidden="true">↗</span></Link>}
        </div>
        <figure className="landing-portrait">
          {event.portrait ? <img src={event.portrait} alt="Chân dung người tốt nghiệp" /> : <div aria-label="Ảnh chân dung sẽ được cập nhật">’26</div>}
          <figcaption>THE PERSON BEHIND THE INVITATION</figcaption>
        </figure>
      </div>
      <small className="landing-note">{sampleGuest ? 'Trang xem trước · Thiệp khách mời dùng đường dẫn riêng.' : 'Hãy mở đường dẫn thiệp được gửi riêng cho bạn.'}</small>
    </main>
  )
}
