import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="not-found-index">404 / LOST CORRESPONDENCE</span>
      <h1>Lời mời này<br /><em>chưa đến nơi.</em></h1>
      <p>Vui lòng kiểm tra lại đường dẫn riêng đã được gửi cho bạn.</p>
      <Link className="button button-outline" to="/">Về trang đầu <span aria-hidden="true">↗</span></Link>
    </main>
  )
}
