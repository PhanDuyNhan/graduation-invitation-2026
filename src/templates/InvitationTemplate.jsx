import { motion } from 'framer-motion'
import Countdown from '../components/Countdown.jsx'
import MusicButton from '../components/MusicButton.jsx'

function dateParts(datetime, timezone) {
  if (!datetime || Number.isNaN(new Date(datetime).getTime())) return null
  const date = new Date(datetime)
  return {
    day: new Intl.DateTimeFormat('vi-VN', { day: '2-digit', timeZone: timezone }).format(date),
    month: new Intl.DateTimeFormat('vi-VN', { month: 'long', timeZone: timezone }).format(date),
    year: new Intl.DateTimeFormat('vi-VN', { year: 'numeric', timeZone: timezone }).format(date),
    weekday: new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone: timezone }).format(date),
    time: new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: timezone }).format(date),
  }
}

export default function InvitationTemplate({ event, guest, musicSignal }) {
  const date = dateParts(event.datetime, event.timezone || 'Asia/Ho_Chi_Minh')
  const photos = event.gallery.filter(Boolean)

  return (
    <motion.main className={`journey-page theme-${guest.theme || 'ink'}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
      <MusicButton source={guest.music || event.defaultMusic} startSignal={musicSignal} />
      <div className="journey-layout">
        <p className="page-marginalia">Notes from the road <span>✳</span> {event.graduationYear}</p>

        <article className="letter-sheet">
          <header className="letter-header">
            <span>THE NEXT CHAPTER</span>
            <span>VOL. {event.graduationYear}</span>
          </header>
          <div className="letter-stamp" aria-hidden="true">{event.fieldOfStudy}<br />& EVERYWHERE <span>✳</span></div>
          <div className="letter-body">
            <p className="letter-dear">Dear {guest.name},</p>
            <p className="letter-intro">Một lời mời gửi từ hành trình của mình</p>
            <h1>{event.title}<em>{event.graduationYear}</em></h1>
            <div className="letter-squiggle" aria-hidden="true">〰〰〰 ✳</div>
            <p className="letter-message">{guest.message || event.message}</p>
            <p className="letter-host">{event.hostName ? <>Mong được gặp bạn,<br /><strong>{event.hostName}</strong></> : <span className="pending-copy">Tên người tốt nghiệp sẽ cập nhật</span>}</p>
          </div>
          <div className="airmail-edge" aria-hidden="true"></div>
        </article>

        <section className="ticket-section" aria-labelledby="ticket-title">
          <div className="section-heading"><span className="section-number">01 / THE RENDEZVOUS</span><h2 id="ticket-title">Hẹn gặp bạn <em>ở điểm đến này.</em></h2></div>
          <div className="ticket-card">
            <div className="ticket-main">
              <div className="ticket-heading"><span>BOARDING PASS</span><span>{event.fieldOfStudy || event.title} · {event.graduationYear}</span></div>
              <div className="ticket-columns">
                <div><span className="ticket-label">WHEN / THỜI GIAN</span>{date ? <><strong>{date.time}</strong><p>{date.weekday}, {date.day} {date.month} {date.year}</p></> : <p className="ticket-pending">Ngày và giờ sẽ cập nhật</p>}</div>
                <div><span className="ticket-label">WHERE / ĐỊA ĐIỂM</span>{event.location.name ? <><strong>{event.location.name}</strong>{event.location.address && <p>{event.location.address}</p>}</> : <p className="ticket-pending">Địa điểm sẽ cập nhật</p>}</div>
              </div>
              {event.location.mapsUrl && <a className="map-link" href={event.location.mapsUrl} target="_blank" rel="noopener noreferrer">Mở bản đồ <span aria-hidden="true">↗</span></a>}
            </div>
            <div className="ticket-stub" aria-hidden="true"><span>ADMIT ONE</span><b>✳</b><small>WITH LOVE</small></div>
          </div>
        </section>

        {date && <section className="countdown-section" aria-labelledby="countdown-title"><span className="section-number">02 / THE COUNTDOWN</span><h2 id="countdown-title">Chờ đến ngày <em>mình gặp nhau.</em></h2><Countdown datetime={event.datetime} /></section>}

        {photos.length > 0 && <section className="gallery-section" aria-labelledby="gallery-title"><span className="section-number">03 / THE MEMORIES</span><h2 id="gallery-title">Những nơi mình đã qua.</h2><div className="gallery-grid">{photos.map((photo, index) => <figure key={photo}><img src={photo} alt={`Kỷ niệm ${index + 1}`} loading="lazy" /><figcaption>MEMORY NO. {String(index + 1).padStart(2, '0')}</figcaption></figure>)}</div></section>}

        <footer className="journey-footer"><div className="footer-mark" aria-hidden="true">✳</div><p>{event.thankYou}</p>{event.hostName && <strong>{event.hostName}</strong>}{event.contact.phone && <a href={`tel:${event.contact.phone}`}>{event.contact.label || 'Liên hệ'} · {event.contact.phone}</a>}<small>End of one chapter, beginning of everything.</small></footer>
      </div>
    </motion.main>
  )
}
