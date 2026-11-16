# RSVP → Google Sheet (3 cột)

> Lưu ý: Đây là tài liệu tham khảo từ bản thiệp trước. Repo hiện tại chưa bật form RSVP. Một yêu cầu `fetch` dùng `no-cors` không thể xác nhận Google Sheet đã ghi dữ liệu; cần API trả phản hồi đọc được trước khi hiển thị trạng thái gửi thành công.

## Sheet — chỉ cần 3 cột

Dòng 1 (header):

| A | B | C |
|---|---|---|
| Tên | Lời chúc | Tham dự |

- **Tên** — người gửi
- **Lời chúc** — nội dung chúc
- **Tham dự** — `Có` (tick) hoặc `Không` (không tick)

## Setup nhanh

1. Tạo Google Sheet + header như trên
2. **Extensions → Apps Script** → dán `docs/rsvp-apps-script.gs` → Save
3. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy URL Web app
5. Tạo `.env` ở root:

```env
VITE_RSVP_SCRIPT_URL=https://script.google.com/macros/s/XXXX/exec
```

6. `npm run dev` (hoặc build lại)

## Form trên thiệp

- Ô tên
- Ô lời chúc
- **1 checkbox**: tick = Có tham dự, không tick = Không

Mỗi lần gửi = 1 dòng trên Sheet.
