import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <main className="not-found">
      <span className="not-found-symbol" aria-hidden="true">✳</span>
      <p className="eyebrow">Không tìm thấy thiệp</p>
      <h1>Đường dẫn này chưa có thiệp.</h1>
      <p>Vui lòng kiểm tra lại link được gửi cho bạn.</p>
      <Link className="button button-outline" to="/">Về trang đầu</Link>
    </main>
  )
}
