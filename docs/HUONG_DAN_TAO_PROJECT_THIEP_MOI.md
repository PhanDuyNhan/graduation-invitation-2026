# Hướng dẫn tạo một project thiệp mời cùng dạng

Tài liệu này mô tả **mã đang chạy trong repository này** và là bản giao việc cho AI tạo một website thiệp mời mới. Giữ cách tổ chức một website với nhiều đường dẫn cá nhân. Thay toàn bộ nội dung, hình ảnh, màu sắc, kiểu chữ và cách trang trí theo sự kiện mới.

## 1. Cách project hiện tại hoạt động

Website dùng React 19, Vite 8, React Router 7, Framer Motion, CSS Modules, Context API và dữ liệu JSON. Mỗi khách nhận một URL dạng `/invitation/:slug`. Cùng một bản build phục vụ tất cả khách.

Luồng hiển thị thực tế:

1. `src/main.jsx` tạo `BrowserRouter`; `src/App.jsx` gọi `AppRouter`.
2. `src/router/AppRouter.jsx` định tuyến `/invitation/:slug` đến `InvitationPage`. `/quan-ly-thiep` hiện danh sách khách. `/` và URL không hợp lệ chuyển đến 404.
3. `src/pages/InvitationPage/InvitationPage.jsx` lấy `slug`, gọi `useGuest`, chọn template theo `group`, rồi bọc template trong `InvitationProvider` và `MusicProvider`.
4. `src/hooks/useGuest.js` đọc `event.json` và tìm khách trong `guests.json` qua `src/utils/getGuestBySlug.js`. Đây là dữ liệu nhập vào bundle lúc build, không có API khách mời.
5. `src/templates/index.js` ánh xạ nhóm khách sang component template. Template dùng `src/templates/TemplateShell.jsx` để dựng trải nghiệm.
6. Ban đầu, `TemplateShell` hiện ảnh thiệp đóng và một nút trong `Envelope`. Khi khách bấm mở, `InvitationContext` đổi trạng thái, phát confetti, thử bật nhạc và hiện nội dung cuộn dọc.
7. Nội dung sau khi mở gồm tên khách và lời mời, lịch cùng đếm ngược, liên kết Google Maps, dải ảnh, form RSVP, số điện thoại và lời cảm ơn.

```text
index.html
└── src/main.jsx → App.jsx → router/AppRouter.jsx
    ├── /quan-ly-thiep → pages/HomePage
    ├── /invitation/:slug → pages/InvitationPage
    │   ├── data/guests.json + data/event.json
    │   ├── context/InvitationContext + context/MusicContext
    │   └── templates/index.js → TemplateShell → components/*
    └── /404 → pages/NotFoundPage
```

## 2. Vị trí các phần cần đọc hoặc thay

| Vị trí | Vai trò hiện tại | Khi làm thiệp mới |
| --- | --- | --- |
| `src/data/event.json` | Thông tin chung: người mời, ngày giờ, địa điểm, ảnh, nhạc, lời cảm ơn | Thay bằng dữ liệu sự kiện mới; bỏ trường chỉ dành cho lễ tốt nghiệp. |
| `src/data/guests.json` | Mỗi khách có `slug`, `name`, `group`, `message` và một số trường tùy chọn | Tạo danh sách mới; giữ `slug` duy nhất và ổn định. |
| `src/router/AppRouter.jsx` | Route thiệp, danh sách khách và 404 | Chọn rõ trang chủ hoặc trang quản lý theo nhu cầu mới. |
| `src/pages/InvitationPage/InvitationPage.jsx` | Ghép dữ liệu, template và nhạc | Đặt title theo sự kiện và xử lý khách không tồn tại. |
| `src/templates/index.js` | Chọn template bằng `group` | Ánh xạ các nhóm mới. |
| `src/templates/TemplateShell.jsx` | Thứ tự các section và trạng thái mở thiệp | Sắp xếp section theo kịch bản mới. |
| `src/components/` | Các khối UI và tương tác | Tái sử dụng ý tưởng, đổi bố cục và câu chữ. |
| `src/styles/` và các `*.module.css` | Kiểu chữ, màu, responsive và chuyển động | Xây hệ màu, font, khoảng cách và hiệu ứng mới. |
| `public/images/`, `public/music/` | Ảnh, họa tiết và âm thanh tĩnh | Thay bằng tài sản mới có quyền sử dụng. |
| `src/config/rsvp.js`, `docs/rsvp-apps-script.gs` | Form gửi lời chúc và tham dự vào Google Sheet | Cấu hình lại hoặc bỏ nếu sự kiện không cần RSVP. |
| `vercel.json` | Rewrite mọi URL về `index.html` cho React Router | Giữ nếu deploy SPA trên Vercel. |

Lệnh chạy hiện có: `npm install`, `npm run dev`, `npm run lint`, `npm run build`, `npm run preview`. `dist/` là kết quả build, không phải mã nguồn để sửa.

## 3. Những điểm dễ hiểu sai ở bản hiện tại

- `FamilyTemplate`, `TeacherTemplate`, `OfficeTemplate`, `HighSchoolTemplate`, `UniversityTemplate` và `VIPTemplate` hiện đều trả về cùng `TemplateShell`. Các file CSS chủ đề của từng nhóm tồn tại nhưng chưa được import vào template. `guest.theme` cũng chưa được dùng để đổi giao diện. Vì vậy, chọn nhóm hiện chưa tạo sáu kiểu thiệp khác nhau. Nhóm `family` chỉ đổi ảnh lịch trong `Calendar`.
- `Envelope` hiện dùng ảnh cố định `/images/design/1.jpg`. `Calendar` dùng `/images/design/3.jpg` hoặc `3-family.jpg`. Chữ và ngày trong những ảnh này không đổi theo JSON. Khi thay sự kiện, cần tạo lại ảnh hoặc dựng phần chữ, ngày, lịch bằng HTML và CSS.
- `GuestInfo` dùng `guest.name`, `guest.message`, `event.studentName` và `event.photo`. Nó chưa dùng `guest.photo`; tiêu đề "Lễ Tốt Nghiệp" còn viết trực tiếp trong JSX. `HomePage` cũng viết trực tiếp ngày, giờ và nơi tổ chức. Đổi mỗi JSON sẽ chưa đủ.
- `event.date`, `event.time`, `event.weekday`, `event.title`, `event.subtitle`, `event.university`, `event.major` và `event.degree` có trong dữ liệu nhưng không phải tất cả đều xuất hiện trong giao diện hiện tại. AI mới phải kiểm tra chỗ dùng từng trường, không đoán theo tên trường.
- `useCountdown` tính thời gian từ chuỗi ngày giờ. Chuỗi không có múi giờ như `2026-08-06T13:30:00` được trình duyệt hiểu theo giờ địa phương của người xem. Với sự kiện có giờ cố định ở Việt Nam, dùng mốc có `+07:00` và kiểm tra lại cách hiển thị.
- `src/components/RsvpForm` gửi `fetch` với `mode: 'no-cors'`. Trình duyệt không đọc được phản hồi máy chủ, nên màn hình thành công chỉ xác nhận rằng lệnh gửi không báo lỗi mạng. Muốn biết Google Sheet đã ghi dòng, cần kiểm tra Sheet hoặc thiết kế endpoint trả lời có CORS phù hợp.
- `/quan-ly-thiep` là route công khai liệt kê tên và link khách. Đường dẫn khó đoán không phải cơ chế bảo vệ. Nếu danh sách cần riêng tư, phải có xác thực hoặc không xuất danh sách đó trong website công khai.
- `PROMT.MD` và `README.md` là tài liệu tham khảo cũ. Một số mô tả trong đó khác mã hiện tại. Ưu tiên hành vi của các file trong `src/`.

## 4. Đặc tả chi tiết các hiệu ứng

Phần này phân biệt hiệu ứng đang xuất hiện trên website với component có mã nhưng chưa được lắp vào luồng thiệp. Các giá trị bên dưới lấy từ JSX và CSS hiện tại. Khi tạo phong cách mới, có thể đổi hình thức và nhịp chuyển động, nhưng phải giữ rõ hành động nào kích hoạt hiệu ứng và trạng thái kết thúc.

### 4.1. Chuyển trang và trạng thái tải

`src/router/AppRouter.jsx` bọc route trong `AnimatePresence mode="wait"`. Mỗi lần `location.pathname` đổi, trang cũ rời đi trước khi trang mới vào. Wrapper có `key={location.pathname}`. Trang mới bắt đầu ở `opacity: 0, y: 10`, kết thúc ở `opacity: 1, y: 0`; trang cũ thoát ở `opacity: 0, y: -8`. Thời gian chuyển là `0.35s`, với easing `[0.25, 1, 0.5, 1]`.

Các trang được nạp bằng `React.lazy` và `Suspense`. Lúc chờ, `PageLoader` hiện spinner CSS quay `360deg` mỗi `0.8s`, tuyến tính và lặp vô hạn. `InvitationPage` có loader tương tự khi chờ template. Trang 404 có card xuất hiện từ `opacity: 0, y: 20, scale: 0.97` đến trạng thái bình thường trong `0.45s`.

Trang `/quan-ly-thiep` còn có các chuyển động riêng. Các phần hero xuất hiện theo thứ tự với độ trễ `0.08s`, `0.16s`, `0.24s` và `0.32s`. Thẻ khách có độ trễ `0.03 * index` và thời gian `0.35s`. Hover nâng thẻ lên `3px`, đổi nền và viền; nút chính nâng `2px`. Các hiệu ứng này chỉ có trên route danh sách.

### 4.2. Màn hình thiệp đóng

`Envelope` hiển thị ảnh `/images/design/1.jpg` vừa trong chiều cao `100dvh` với `object-fit: contain`. Ảnh vào bằng fade từ `opacity: 0` đến `1` trong `0.4s`. Vùng bấm mở là nút trong suốt phủ phần lớn phong bì trên ảnh, đặt từ `left/right: 12%`, `top: 38%`, `bottom: 14%`. Nút có `aria-label` và viền focus khi dùng bàn phím.

Vòng sáng ở vị trí con dấu dùng CSS `@keyframes pulse`: mỗi `1.8s` nó tăng `scale` từ `0.9` đến `1.45` và giảm `opacity` từ `0.65` xuống `0`. Vòng này chỉ để gợi ý vị trí bấm, không nhận sự kiện chuột. Tọa độ `top: 58%` và kích thước `min(22%, 96px)` gắn với ảnh hiện tại. Với ảnh hoặc layout mới, AI phải đặt lại vùng bấm và vòng sáng, hoặc dựng phong bì bằng HTML và CSS để không phụ thuộc tọa độ của một ảnh.

**Giới hạn thực tế:** chưa có animation nắp phong bì lật, sáp niêm phong tách ra, lá thư trượt khỏi bao hoặc chuyển động 3D. Đây là ảnh đứng, một nút và hiệu ứng chuyển màn hình ở mục tiếp theo. Nếu sản phẩm mới yêu cầu mở phong bì nhiều bước, hãy triển khai các bước đó thành state và animation thật, không mô tả chúng như tính năng sẵn có.

### 4.3. Chuỗi hiệu ứng khi bấm mở

Nút `Envelope` gọi `handleOpen()` trong `TemplateShell`. Hàm này gọi `openEnvelope()` và `unlockAndPlay()` trong cùng lượt thao tác. `InvitationContext` chuyển `isEnvelopeOpen` và `showConfetti` sang `true`; trạng thái mở chỉ tồn tại trong bộ nhớ của trang, nên tải lại URL sẽ thấy thiệp đóng.

`AnimatePresence mode="wait"` trong `TemplateShell` đổi hai trạng thái:

1. Màn hình phong bì rời đi bằng `opacity: 0`, `scale: 0.98` và `y: -12` trong `0.4s`.
2. Sau khi màn hình đó rời đi, khối nội dung đi vào từ `opacity: 0, y: 20` đến `opacity: 1, y: 0` trong `0.5s`, easing `[0.25, 1, 0.5, 1]`.
3. `GuestInfo` còn tự fade và trượt lên `20px` trong `0.65s`, easing `[0.22, 1, 0.36, 1]`. Hiệu ứng này chồng lên chuyển động của khối nội dung. Khi làm mới, kiểm tra tổng chuyển động để chữ không bị trượt quá nhiều.

Khi đóng, `TemplateShell` khóa cuộn bằng `height: 100dvh` và `overflow: hidden`. Sau khi mở, trang chuyển sang cuộn dọc với cột nội dung tối đa `520px`. Phần thiệp trong `GuestInfo` dùng các lớp nắp giấy, bóng đổ, ánh sáng và dấu niêm phong bằng CSS, nhưng các lớp đó đứng yên.

Không có hiệu ứng hiện dần theo vị trí cuộn cho từng section. Các section xuất hiện khi được render sau khi mở. Không có parallax trong luồng thiệp hiện tại.

### 4.4. Confetti khi mở

`Confetti` là một lớp cố định phủ viewport, `pointer-events: none`, nên không chặn thao tác. Mặc định có `48` mảnh. Màu, vị trí, kích thước và độ trễ được tính theo chỉ số của từng mảnh, cho kết quả ổn định giữa các lần render.

Mỗi mảnh bắt đầu ở `y: -20`, rơi đến `110vh`, xoay thêm `280deg`, lệch ngang theo giá trị `x` riêng, rồi giảm opacity từ `1` về `0`. Thời gian một mảnh là `1.8` đến `2.8s`; độ trễ nằm trong khoảng `0` đến `0.33s`. Sau `3.2s`, `stopConfetti()` gỡ toàn bộ mảnh khỏi giao diện. Đây là hiệu ứng một lần cho mỗi lần mở thiệp.

### 4.5. Lịch và đếm ngược

`Calendar` đặt bốn ô ngày, giờ, phút, giây bằng HTML lên một vùng trống gần đáy ảnh lịch. `useCountdown` tính lại mỗi `1000ms` bằng `Date.now()`, chặn giá trị âm về `0` và trả `isComplete`. Khi đến giờ, bốn ô được thay bằng một câu chúc. Số trong `Calendar` đổi trực tiếp; không có animation lật số.

`src/components/Countdown/Countdown.jsx` có sẵn hiệu ứng đổi từng số: số mới trượt lên từ `y: 12, opacity: 0`; số cũ rời lên `y: -12, opacity: 0`, mỗi lượt `0.28s`. Component này **không được render trong `TemplateShell` hiện tại**. Nếu AI muốn dùng hiệu ứng số, cần lắp component này hoặc chuyển logic `Digit` vào lịch mới. Tránh đặt chữ, tháng hoặc ngày cố định trong ảnh lịch của sự kiện mới.

### 4.6. Dải ảnh và gallery

Thiệp đang dùng `PhotoMarquee`, không dùng `Gallery`. `PhotoMarquee` nhân đôi cùng một nhóm ảnh, cho track chạy ngang từ `translate3d(0, 0, 0)` đến `translate3d(-50%, 0, 0)` rồi lặp vô hạn. Thời gian một vòng là `max(12, số_ảnh * 3.2)` giây; bốn ảnh hiện tại tạo vòng `12.8s`. Hai mép viewport được làm mờ bằng CSS mask. Rê chuột hoặc focus vào vùng ảnh sẽ tạm dừng animation. Ảnh có kích thước lần lượt `150×190px`, `168×210px`, `180×220px` ở các breakpoint mặc định, `480px` và `768px`.

`Gallery.jsx` là component khác, hiện chưa được dùng trong thiệp. Nó tự đổi slide mỗi `4.5s`, cho ảnh mới fade và thu từ `scale: 1.04` về `1` trong `0.45s`. Nó có nút trước, sau và dấu chọn ảnh. AI mới nên chọn một kiểu gallery phù hợp với sự kiện, không bật cả hai chỉ vì chúng có sẵn.

### 4.7. Nhạc và các nút tương tác

`MusicProvider` tạo một đối tượng `Audio`, lặp bài nhạc và đặt âm lượng `0.4`. Nguồn nhạc ưu tiên `guest.music`, sau đó `event.defaultMusic`. Mã thử phát khi tải, nhưng trình duyệt có thể chặn. Khi người xem chạm, click hoặc nhấn phím, `useMusic` thử phát lại. Bấm mở phong bì cũng gọi `unlockAndPlay()`. Nút nhạc cố định ở góc trên bên phải, `42×42px`, có hover `scale: 1.06` và lúc nhấn `scale: 0.92`; khi phát, nút có thêm vòng sáng bằng `box-shadow`. Khi chuyển trang hoặc bỏ provider, audio được pause và listener được gỡ.

Form RSVP fade và trượt lên `16px` trong `0.45s` khi xuất hiện. Sau khi gửi, card kết quả xuất hiện từ `opacity: 0, y: 12`. Ô nhập đổi màu viền và thêm vòng focus trong `0.2s`. Nút gửi sáng hơn và nâng `1px` khi hover. Nút liên hệ và copy có hover nâng `1px`, active thu nhỏ. Những phản hồi này cần giữ khả năng nhìn thấy trạng thái focus và trạng thái đang gửi khi đổi thiết kế.

### 4.8. Hiệu ứng có mã nhưng chưa chạy

`FloatingFlowers` có thể tạo mặc định `14` cánh hoa, lá và chấm trôi từ `110vh` lên `-15vh`, lắc ngang, xoay `120deg`, lặp vô hạn. Mỗi phần tử có thời gian khoảng `10` đến `17s` và độ trễ riêng. Component này hiện không được gọi trong `TemplateShell`.

`InvitationCard` có animation fade, trượt lên `28px` và tăng `scale` từ `0.97` đến `1` trong `0.55s`; component này cũng chưa nằm trong luồng thiệp. Các file CSS template theo nhóm chưa được gắn vào component. Do đó, không được hứa với người dùng rằng mọi hiệu ứng trong `src/components/` đã xuất hiện trên website.

### 4.9. Quy tắc triển khai hiệu ứng cho project mới

1. Chọn một hiệu ứng mở thiệp làm điểm nhấn. Nếu dùng phong bì nhiều bước, tách trạng thái `closed → opening → opened` để tránh người xem bấm lặp và để âm thanh, confetti chạy đúng một lần. Nếu chỉ cần chuyển màn hình, dùng cấu trúc hiện tại.
2. Nêu rõ trạng thái đầu, trạng thái cuối, trigger, thời gian và cách thoát của mỗi hiệu ứng. Hiệu ứng không được che chữ hoặc cản nút.
3. Dùng `transform` và `opacity` cho phần tử chuyển động. Giữ số phần tử trang trí vừa đủ trên điện thoại; gỡ timer, audio và event listener khi component unmount.
4. Với `prefers-reduced-motion: reduce`, bỏ chuyển động lặp, rút ngắn chuyển trang và hiển thị nội dung ngay. Project hiện tại chưa có xử lý này, nên AI mới phải bổ sung.
5. Không bắt nhạc tự phát để khách xem được thiệp. Nút mở và nút nhạc phải hoạt động bằng cảm ứng, chuột và bàn phím.
6. Kiểm tra hiệu ứng trên điện thoại thật hoặc viewport nhỏ, nhất là `100dvh`, safe area, tên khách dài, tốc độ cuộn và khi tab trình duyệt mất focus.

## 5. Yêu cầu cho AI tạo project mới

Hãy dùng mục này như đề bài thực hiện. Người giao việc sẽ điền thông tin mới bên dưới hoặc gửi cùng tài liệu.

### Thông tin đầu vào cần chốt

| Mục | Nội dung mới |
| --- | --- |
| Loại sự kiện | `[đám cưới / sinh nhật / khai trương / lễ kỷ niệm / sự kiện khác]` |
| Tên sự kiện, người mời, người được mời | `[điền]` |
| Ngày, giờ, múi giờ | `[điền, ví dụ 2027-05-20T18:00:00+07:00]` |
| Địa điểm và URL bản đồ | `[điền]` |
| Giọng văn theo nhóm khách | `[trang trọng / thân mật và các nhóm cụ thể]` |
| Phong cách thị giác | `[ví dụ tối giản, cổ điển, vui tươi; mô tả màu, font, họa tiết]` |
| Ảnh, logo, nhạc | `[đường dẫn hoặc yêu cầu tạo mới]` |
| Các mục trên thiệp | `[lịch, đếm ngược, gallery, RSVP, liên hệ, nhạc, ...]` |
| Cách xử lý danh sách khách | `[công khai / có xác thực / không có trang danh sách]` |
| Nơi deploy và nhận RSVP | `[Vercel, dịch vụ khác; Google Sheet, API khác, hoặc không cần]` |

Nếu người dùng chưa cung cấp một thông tin làm thay đổi thiết kế hoặc dữ liệu sự kiện, hãy hỏi ngắn gọn. Có thể dùng nội dung mẫu rõ ràng là mẫu để dựng giao diện trước, nhưng không đưa tên, ngày, địa chỉ, ảnh hoặc số điện thoại của project tốt nghiệp vào sản phẩm mới.

### Kiến trúc cần giữ

1. Dùng một website React với route cá nhân `/invitation/:slug`. Đọc khách từ `guests.json` và thông tin chung từ `event.json`, hoặc đổi sang API nếu yêu cầu mới cần quản trị động.
2. Tách trang, template, component, dữ liệu và CSS. Không đặt toàn bộ thiệp trong một file. Chỉ tạo template riêng khi nhóm khách thật sự có khác biệt về bố cục hoặc hành vi. Nếu khác mỗi câu chữ hoặc màu, dùng một template nhận dữ liệu và theme.
3. Dữ liệu khách tối thiểu gồm `slug`, `name`, `group` và `message`. Dữ liệu sự kiện nên có `title`, `hostName`, `datetime`, `location`, `message`, `thankYou`, `gallery` và các mục tùy chọn đã thống nhất. Dùng tên trường nhất quán trong JSX.
4. Giữ tên khách, lời mời, ngày giờ, địa điểm và các nút quan trọng là chữ HTML có thể sửa và đọc bằng công cụ trợ năng. Chỉ dùng ảnh cho ảnh chụp, hình nền hoặc họa tiết. Nếu dùng ảnh tham chiếu từ Canva, không nhúng cả tấm thiệp chứa chữ làm nội dung chính.
5. Thiết kế mobile first. Kiểm tra màn hình nhỏ, chữ dài, tên khách dài, thao tác cảm ứng và bàn phím. Có trạng thái thiếu ảnh, nhạc hoặc URL bản đồ; giảm chuyển động khi người dùng chọn `prefers-reduced-motion`.
6. Nhạc chỉ được coi là sẵn sàng sau thao tác của người xem. Có nút phát và tạm dừng rõ ràng. Không dựa vào autoplay có tiếng vì trình duyệt có thể chặn.
7. Nếu có RSVP, quyết định trường dữ liệu và nơi lưu trước khi dựng form. Báo thành công chỉ sau khi có xác nhận đáng tin cậy từ máy chủ; không dùng kết quả `no-cors` để khẳng định đã lưu.
8. Giữ 404 cho slug không tồn tại. Nếu không có đăng nhập, không hiển thị danh sách khách trên một route công khai mà người dùng tưởng là riêng tư.

### Ví dụ dữ liệu mới, chỉ minh họa cấu trúc

```json
{
  "title": "Tiệc kỷ niệm",
  "hostName": "Gia đình An",
  "datetime": "2027-05-20T18:00:00+07:00",
  "location": {
    "name": "Tên địa điểm",
    "address": "Địa chỉ sẽ cập nhật",
    "mapsUrl": "https://maps.google.com/"
  },
  "message": "Lời mời chung cho sự kiện.",
  "thankYou": "Lời cảm ơn.",
  "gallery": ["/images/gallery/01.jpg"],
  "defaultMusic": "/music/background.mp3"
}
```

```json
[
  {
    "slug": "co-mai",
    "name": "Cô Mai",
    "group": "family",
    "message": "Lời mời riêng gửi Cô Mai.",
    "theme": "warm"
  }
]
```

Đây là dữ liệu giả để chỉ hình dạng file. Thay toàn bộ giá trị theo sự kiện thực tế. Kiểm tra rằng mọi `slug` là duy nhất; không đưa dữ liệu riêng tư vào JSON phía trình duyệt nếu không muốn người khác đọc được.

### Trình tự làm việc

1. Đọc các file được nêu ở mục 1 và 2. Chốt dữ liệu sự kiện, nhóm khách, danh sách section và hướng thiết kế.
2. Dựng hệ font, màu, khoảng cách, ảnh và chuyển động theo phong cách mới. Thay `index.html`, favicon và metadata.
3. Tạo JSON sự kiện và khách mới. Tránh đưa nội dung mẫu của thiệp tốt nghiệp vào bản mới.
4. Dựng lại màn hình mở thiệp và nội dung chính. Tách chữ ra khỏi ảnh trang trí. Nối mọi trường hiển thị với JSON thay vì để cố định trong JSX.
5. Nối theme hoặc template theo nhóm nếu thực sự cần. Kiểm tra bằng ít nhất hai khách thuộc hai nhóm khác nhau.
6. Tích hợp các phần đã chọn như gallery, bản đồ, lịch, đếm ngược, nhạc và RSVP. Bỏ hẳn các component không dùng.
7. Chạy `npm run lint` và `npm run build`. Mở URL hợp lệ, URL không hợp lệ và tải lại trực tiếp một URL `/invitation/:slug` trên bản preview hoặc môi trường deploy. Kiểm tra cả mobile và desktop.

## 6. Tiêu chí hoàn thành

- Mỗi khách có link riêng và thấy đúng tên, lời mời, nhóm giao diện.
- Nội dung mới xuất hiện nhất quán trên trang mở thiệp, lịch, đếm ngược, metadata, footer và trang quản lý nếu có.
- Không còn chữ, ảnh, nhạc, ngày giờ, địa điểm hoặc số điện thoại của thiệp tốt nghiệp mẫu.
- Giao diện mới có nhận diện riêng; các phần chữ chính vẫn là HTML, không nằm trong ảnh.
- Mở thiệp, phát hoặc tắt nhạc, mở bản đồ và gửi RSVP hoạt động theo yêu cầu đã chốt.
- Link thiệp hoạt động khi mở trực tiếp và khi refresh trên môi trường deploy.
- Build và lint thành công; ảnh không lỗi; giao diện dùng được trên điện thoại, máy tính và bằng bàn phím.
