# Thiệp mời lễ tốt nghiệp 2026

Website thiệp mời cá nhân dùng React, Vite và React Router. Mỗi khách nhận một đường dẫn `/invitation/:slug`. Tên người tốt nghiệp, ngày giờ và địa điểm còn để trống để điền sau.

## Chạy thử

```bash
npm install
npm run dev
```

Mở `/invitation/khach-moi-mau` hoặc `/invitation/nguoi-than-mau`. Trang `/` có nút xem thiệp mẫu, không công khai danh sách khách. Chạy `npm run lint` và `npm run build` trước khi đưa lên mạng.

## Điền thông tin thật

1. Sửa `src/data/event.json`: `hostName`, `fieldOfStudy`, `datetime`, `location.name`, `location.address`, `location.mapsUrl`, `message`, `thankYou` và `graduationYear`. `datetime` cần mốc có múi giờ, ví dụ `2026-12-20T18:00:00+07:00`. Để trống ngày thì phần đếm ngược ẩn; để trống URL bản đồ thì nút bản đồ ẩn.
2. Sửa `src/data/guests.json`: thay hai khách mẫu bằng khách thật. Mỗi người cần `slug` duy nhất, `name`, `group`, `message`. `theme` có thể là `ink` hoặc `warm`. `group` dành để phân loại dữ liệu; hai nhóm mẫu dùng cùng bố cục, khác lời mời và màu.
3. Ảnh chân dung chính nằm tại `public/images/portrait-main.jpg` và được nối bằng trường `portrait`. Bốn ảnh du lịch nằm tại `travel-01.jpg` đến `travel-04.jpg` và được liệt kê trong `gallery`. Khi thêm ảnh, đặt vào `public/images/` rồi thêm đường dẫn như `"/images/travel-05.jpg"` vào cuối mảng. Để mảng rỗng thì mục ảnh ẩn.
4. Nếu có nhạc được phép sử dụng, đặt vào `public/music/` và điền `defaultMusic`, hoặc `music` riêng cho từng khách. Để trống thì nút nhạc ẩn. Nhạc chỉ được thử phát sau khi khách mở thiệp; nếu trình duyệt chặn, khách có thể bấm nút nhạc.
5. Sửa tiêu đề và mô tả mặc định trong `index.html` khi đã chốt thông tin. Tiêu đề tab của link cá nhân tự lấy tên khách và tên sự kiện.

Bìa thư dùng bảng 15 khung hình `public/images/envelope/opening-sequence.png`. Giao diện cắt từng ô từ bảng ảnh khi chạy, phát theo thứ tự trái sang phải, trên xuống dưới trong khoảng 1,3 giây rồi chuyển ngay vào nội dung thiệp. Ảnh gốc được giữ nguyên trong một file để không phải tải 15 file riêng.

Không đưa dữ liệu riêng tư vào `guests.json`: file này nằm trong bản build và người truy cập có thể đọc được. Link theo `slug` không phải cơ chế bảo mật.

## RSVP

Form RSVP chưa bật vì chưa có nơi nhận dữ liệu được xác nhận. Tài liệu `docs/GOOGLE_SHEET_RSVP.md` và Apps Script là bản tham khảo cũ; chỉ cấu hình URL Apps Script trong trình duyệt với `no-cors` sẽ không xác nhận được dữ liệu đã lưu. Khi chọn nơi nhận RSVP, cần endpoint trả về phản hồi đọc được (CORS hoặc một API cùng miền) rồi mới thêm thông báo gửi thành công.

## Deploy

`vercel.json` chuyển mọi URL về `index.html` để mở trực tiếp hoặc tải lại `/invitation/:slug` trên Vercel. Với nền tảng khác, cấu hình SPA fallback tương đương. Thư mục `dist/` là kết quả của `npm run build`.
