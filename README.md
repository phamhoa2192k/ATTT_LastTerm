# Nhập môn An toàn thông tin: Bài tập lớn cuối kỳ

GV hướng dẫn: TS. Trần Vĩnh Đức

Nhóm SV thực hiện:

Phạm Đức Hòa - 20183918

Nguyễn Thanh Tú - 20184002

Trần Minh Quang - 20183972

## 1. Mục tiêu

Hoàn thành bài tập lớn cho môn học

## 2. Đề tài

Nhóm chúng em lên ý tưởng tạo nhóm trang web có cùng 1 server sử dụng khóa công khai
để đăng nhập, khóa này sẽ được lưu trữ trên blockchain

Trong bài tập lớn này, do không có blockchain nên nhóm em lưu khóa này vào file `key.db`

## 3. Công nghệ sử dụng

Trong đồ án này, nhóm chúng em đã sử dụng

* ngôn ngữ 'expressjs`, `html`, `css`, `javascript`
* nền tảng `Visual Studio Code`

## 4. Các script sử dụng

### Đầu tiên, ta tải mã nguồn về máy theo các bước: 

* Tìm 1 thư mục trong máy để lưu mã nguồn
* Git bash here, gõ lệnh `git clone https://github.com/phamhoa2192k/ATTT_LastTerm.git`

### Tiếp theo, ta cài `extension` vào trình duyệt (ví dụ ở đây dùng `chrome`) bằng cách:

* Mở [`link`](chrome://extensions/)
* Bật chế độ dành cho nhà phát triển
* Chọn `Tiện ích đã giải nén`
* Tìm đến thư mục mã nguồn đã tải về và tải lên folder `extension` là thư mục con của mã nguồn

### Cuối cùng là chạy chương trình

* Mở thư mục `server` bằng `Visual Studio Code`
* Mở `new terminal` trong `Visual Studio Code`
* Nếu máy tính đã có sẵn `npm`, ta gõ `npm install express` để cài `exxpress`
* Nếu máy tính chưa có `npm`, ta gõ `npm install`
* Tiếp theo, ta gõ `cd server` để chuyển đế thư mục `server`
* Chạy `server` bằng lệnh `node app.js`
* Ta mở trình duyệt, mở trang `localhost:3000`, ta sẽ được chuyển đến trang login của 
nhóm trang web chạy trên server đã cài đặt

### Cách đăng nhập

* Chọn nút tiện ích góc trên bên phải trình duyệt
* Ghim extension: `Login with extension`
* Chọn extension đó, 
* Ấn nút `Login`
* Chọn `Choose key file`
* Tìm đến thư mục mã nguồn đã tải, vào folder `extension`, chọn file `key.db`
* Chọn `login`, chọn `sign` là đăng nhập thành công

## 5. Demo
Ảnh và video đã được thêm trong thư mục [`media`](https://github.com/phamhoa2192k/ATTT_LastTerm/tree/master/media)
