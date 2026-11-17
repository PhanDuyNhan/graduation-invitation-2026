# Thiết kế lại UI thiệp mời tốt nghiệp

Bạn là một designer kiêm frontend developer. Hãy làm lại giao diện đang chạy trong repository này thành một thiệp mời tốt nghiệp có cảm giác cao cấp, riêng tư và được chăm chút bởi một người thiết kế thiệp chuyên nghiệp. Chủ nhân thiệp học ngành Ngôn ngữ Anh và thích du lịch.

Hãy sửa **website React đang chạy**, không dừng ở mockup hoặc ảnh thiết kế. Đọc mã nguồn trước khi quyết định bố cục. Bạn có quyền thay đổi mạnh phần UI, CSS, typography và chuyển động nếu kết quả tốt hơn. Tự quyết các chi tiết thị giác từ dữ liệu và ảnh hiện có; đừng dừng công việc để hỏi về thông tin sự kiện còn trống.

## Bối cảnh dự án

- Stack hiện tại: React 19, Vite 8, React Router 7 và Framer Motion.
- Mỗi khách nhận link `/invitation/:slug`. Trang lấy thông tin chung từ `src/data/event.json` và thông tin khách từ `src/data/guests.json`.
- Bìa trước khi mở nằm ở `src/components/Envelope.jsx`. Nội dung sau khi mở nằm ở `src/templates/InvitationTemplate.jsx`. CSS chính nằm ở `src/styles/global.css`.
- `public/images/portrait-main.jpg` là ảnh chân dung chính. `public/images/travel-01.jpg` đến `travel-04.jpg` là ảnh gallery. Xem ảnh thật trước khi chọn cách crop.
- `designs/travel-graduation-invitation/` là bản thiết kế cũ để tham khảo cấu trúc. Website không đọc HTML trong thư mục đó.
- Tên người tốt nghiệp, ngày giờ và địa điểm vẫn để trống để chủ repo điền sau. Đừng tự bịa thông tin này.

## Hướng mỹ thuật

Tạo cảm giác của một ấn phẩm du lịch hoặc thiệp mời in riêng: tinh tế, có nhịp bố cục, chất liệu giấy và chi tiết nhỏ đáng nhớ. Dùng sở thích du lịch và ngành Ngôn ngữ Anh như chất liệu kể chuyện. Chỉ chọn vài dấu hiệu thị giác phù hợp, chẳng hạn chữ viết tay, dấu hành trình, ghi chú bên lề hoặc một tấm ảnh được đặt như vật kỷ niệm. Đừng nhồi tất cả biểu tượng passport, máy bay, bản đồ và vé lên cùng một màn hình.

"Cao cấp" ở đây đến từ tỷ lệ chữ, khoảng trắng, màu sắc, ảnh và chuyển động có chủ đích. Tránh các khung chữ nhật cứng, card UI lặp lại, viền vàng dày, gradient bóng bẩy, icon trang trí rải đều và bố cục trông như landing page AI. Có thể dùng góc bo bất đối xứng, mép giấy, đường cong hoặc bố cục lệch nhẹ nếu chúng giúp thiệp tự nhiên hơn.

Ảnh chân dung cần là điểm nhấn của thiệp, không bị che bởi tem màu cam hay họa tiết nặng. Bốn ảnh du lịch phải có cách sắp xếp có nhịp, không chỉ là bốn ô giống nhau. Giữ chữ mời, tên khách, thời gian và địa điểm dưới dạng HTML đọc được, không ghép chữ vào ảnh.

## Luồng cần giữ

1. Khách mở link riêng và thấy đúng tên của mình trên bìa.
2. Bấm hoặc nhấn Enter hoặc Space để mở thiệp. Hiệu ứng mở có điểm đầu và điểm kết thúc rõ, không cản việc đọc.
3. Nội dung sau khi mở có tên khách, lời mời riêng, ảnh chân dung, thời gian, địa điểm, gallery và lời cảm ơn.
4. Chỉ hiện đếm ngược khi `event.datetime` có giá trị. Chỉ hiện nút bản đồ khi có `location.mapsUrl`. Chỉ hiện nút nhạc khi có nguồn nhạc. Nhạc chỉ thử phát sau thao tác của người xem.
5. Slug không tồn tại dẫn đến trang 404. Trang chủ không công khai toàn bộ danh sách khách.
6. Form RSVP chưa có nơi lưu đáng tin cậy. Đừng thêm trạng thái "gửi thành công" giả.

## Cách triển khai

- Thiết kế mobile first. Kiểm tra khoảng 390 px, 768 px và 1440 px. Tên khách dài không được chạm ảnh hoặc tràn khung.
- Giữ dữ liệu nội dung trong `event.json` và `guests.json`. Nếu cần thêm trường UI, dùng tên rõ nghĩa và ghi vào `README.md` cách điền.
- Có trạng thái khi thiếu ảnh, ngày, địa điểm hoặc nhạc. Không để khung trống hay đường dẫn ảnh lỗi.
- Chuyển động nên nhẹ và ngắn. Tôn trọng `prefers-reduced-motion`. Nút có trạng thái hover, focus và vùng chạm đủ lớn.
- Chú ý độ tương phản, alt ảnh, semantic HTML và cách đọc bằng bàn phím.
- Nếu đổi cấu trúc component hoặc CSS, xóa phần cũ không còn dùng. Đừng giữ hai giao diện song song trong luồng production.

## Hoàn thành và kiểm tra

Trước khi sửa, nêu ngắn gọn hướng thiết kế bạn chọn và lý do nó hợp với ảnh thật. Sau đó triển khai trực tiếp vào app. Chạy `npm run lint`, `npm run build` và `npm run check:routes`. Mở thử hai link `/invitation/khach-moi-mau` và `/invitation/nguoi-than-mau`, một slug sai, cùng giao diện trên điện thoại và máy tính. Kiểm tra bìa trước và sau khi mở thiệp, ảnh tải đủ, không có chữ đè nhau hoặc lỗi console.

Khi xong, báo những file đã sửa, link local để xem, kết quả kiểm tra và những thông tin chủ repo còn cần điền. Chỉ coi công việc hoàn tất khi giao diện mới đã nằm trong mã nguồn chạy được.
