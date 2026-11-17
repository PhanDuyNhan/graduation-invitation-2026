import { useState } from 'react'
import { motion } from 'framer-motion'
import Countdown from '../components/Countdown.jsx'
import MusicButton from '../components/MusicButton.jsx'

function dateParts(datetime, timezone) {
  if (!datetime || Number.isNaN(new Date(datetime).getTime())) return null

  try {
    const date = new Date(datetime)
    return {
      day: new Intl.DateTimeFormat('vi-VN', { day: '2-digit', timeZone: timezone }).format(date),
      month: new Intl.DateTimeFormat('vi-VN', { month: 'long', timeZone: timezone }).format(date),
      year: new Intl.DateTimeFormat('vi-VN', { year: 'numeric', timeZone: timezone }).format(date),
      weekday: new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone: timezone }).format(date),
      time: new Intl.DateTimeFormat('vi-VN', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: timezone }).format(date),
    }
  } catch {
    return null
  }
}

function Portrait({ source, alt }) {
  const [failed, setFailed] = useState(false)

  if (!source || failed) {
    return (
      <div className="portrait-placeholder" role="img" aria-label="Ảnh chân dung sẽ được cập nhật">
        <span>PORTRAIT</span>
        <strong>’26</strong>
        <small>To be continued</small>
      </div>
    )
  }

  return <img src={source} alt={alt} onError={() => setFailed(true)} />
}

function GalleryPhoto({ source, index }) {
  const [failed, setFailed] = useState(false)

  return (
    <figure className={`memory memory-${index + 1}`}>
      {source && !failed ? (
        <img src={source} alt={`Kỷ niệm trên hành trình, ảnh ${index + 1}`} loading="lazy" onError={() => setFailed(true)} />
      ) : (
        <div className="memory-placeholder" role="img" aria-label={`Ảnh kỷ niệm ${index + 1} sẽ được cập nhật`}>
          <span>IMAGE TO FOLLOW</span>
        </div>
      )}
      <figcaption>
        <span>0{index + 1}</span>
        <span>{index === 0 ? 'THE OLD TOWN' : index === 1 ? 'COASTAL LIGHT' : index === 2 ? 'BLUE HOUR' : 'SUN-WASHED DAYS'}</span>
      </figcaption>
    </figure>
  )
}

export default function InvitationTemplate({ event, guest, musicSignal }) {
  const date = dateParts(event.datetime, event.timezone || 'Asia/Ho_Chi_Minh')
  const photos = (event.gallery || []).filter(Boolean).slice(0, 4)
  const location = event.location || {}
  const hostName = event.hostName || 'Tên người tốt nghiệp'

  return (
    <motion.main
      className={`invitation-page theme-${guest.theme || 'ink'}`}
      initial={{ opacity: 1, y: 0 }}
    >
      <MusicButton source={guest.music || event.defaultMusic} startSignal={musicSignal} />

      <div className="invitation-shell">
        <section className="invitation-hero" aria-labelledby="invitation-title">
          <div className="hero-copy">
            <p className="private-note">A private invitation for</p>
            <p className="guest-name">{guest.name}</p>
            <div className="route-line" aria-hidden="true"><span>01</span><i /><span>∞</span></div>
            <p className="hero-kicker">Một hành trình khép lại. Một hành trình mới bắt đầu.</p>
            <h1 id="invitation-title">{event.title}<em>{event.graduationYear}</em></h1>
            <p className="hero-message">{guest.message || event.message}</p>
            <div className="signature-block">
              <span>Mong được gặp bạn,</span>
              <strong className={!event.hostName ? 'is-placeholder' : ''}>{hostName}</strong>
            </div>
          </div>

          <figure className="hero-portrait">
            <Portrait source={event.portrait} alt="Ảnh chân dung người tốt nghiệp" />
          </figure>
        </section>

        <section className="rendezvous" aria-labelledby="rendezvous-title">
          <div className="section-intro">
            <h2 id="rendezvous-title">Hẹn gặp bạn<br /><em>ở điểm đến này.</em></h2>
            <p>Ngày đặc biệt sẽ trọn vẹn hơn khi có những người đã đồng hành cùng mình ở đó.</p>
          </div>

          <div className="event-ledger">
            <div className="ledger-heading">
              <span>FIELD NOTES</span>
              <span>{event.fieldOfStudy || event.title} · {event.graduationYear}</span>
            </div>
            <dl>
              <div>
                <dt>WHEN / THỜI GIAN</dt>
                <dd>{date ? <><strong>{date.time}</strong><span>{date.weekday}, {date.day} {date.month} {date.year}</span></> : <span className="pending-value">Ngày và giờ sẽ được cập nhật</span>}</dd>
              </div>
              <div>
                <dt>WHERE / ĐỊA ĐIỂM</dt>
                <dd>{location.name ? <><strong>{location.name}</strong>{location.address && <span>{location.address}</span>}</> : <span className="pending-value">Điểm hẹn đang được hoàn thiện</span>}</dd>
              </div>
            </dl>
            {location.mapsUrl && <a className="map-link" href={location.mapsUrl} target="_blank" rel="noopener noreferrer">Mở bản đồ <span aria-hidden="true">↗</span></a>}
            <p className="ledger-note">Please keep this invitation close.</p>
          </div>
        </section>

        {date && (
          <section className="countdown-section" aria-labelledby="countdown-title">
            <h2 id="countdown-title">Đếm từng ngày<br /><em>đến lúc gặp nhau.</em></h2>
            <Countdown datetime={event.datetime} />
          </section>
        )}

        {photos.length > 0 && (
          <section className="memories-section" aria-labelledby="memories-title">
            <div className="memories-heading">
              <h2 id="memories-title">Những nơi<br /><em>mình đã đi qua.</em></h2>
              <p>Vài lát cắt từ hành trình cũ, trước khi một chân trời khác bắt đầu.</p>
            </div>
            <div className="memory-grid">
              {photos.map((photo, index) => <GalleryPhoto key={`${photo}-${index}`} source={photo} index={index} />)}
            </div>
          </section>
        )}

        <footer className="invitation-footer">
          <div className="footer-route" aria-hidden="true"><span>VIET NAM</span><i /><span>EVERYWHERE</span></div>
          <p>{event.thankYou}</p>
          <strong className={!event.hostName ? 'is-placeholder' : ''}>{hostName}</strong>
          {event.contact?.phone && <a href={`tel:${event.contact.phone}`}>{event.contact.label || 'Liên hệ'} · {event.contact.phone}</a>}
          <small>END OF ONE CHAPTER — BEGINNING OF EVERYTHING</small>
        </footer>
      </div>
    </motion.main>
  )
}
