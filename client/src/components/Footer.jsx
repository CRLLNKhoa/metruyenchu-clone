import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white gap-6 border-t flex flex-col items-center justify-center bg-[url('https://metruyencv.com/assets/images/footer-bg.png')] bg-no-repeat bg-bottom w-full min-h-[320px]">
      <img
        className="w-[64px] h-[64px]"
        src="https://metruyencv.com/assets/images/logo.png?90125"
        alt="..."
      />
      <p className="w-[80%] text-[13px] font-semibold text-black text-center">
        Mê Truyện Chữ là nền tảng mở trực tuyến, miễn phí đọc truyện chữ được
        convert hoặc dịch kỹ lưỡng, do các converter và dịch giả đóng góp, rất
        nhiều truyện hay và nổi bật được cập nhật nhanh nhất với đủ các thể loại
        tiên hiệp, kiếm hiệp, huyền ảo ...
      </p>
      <div className="flex gap-4">
        <img
          width={120}
          height={60}
          src="https://metruyencv.com/assets/images/app-store.png?90125"
          alt="..."
        />
        <img
          width={120}
          height={60}
          src="https://metruyencv.com/assets/images/google-play.png?90125"
          alt="..."
        />
      </div>
      <div className=" hidden lg:flex flex-wrap gap-6 text-black">
        <p className="hover:text-[#C19A46] transition-all duration-300 cursor-pointer text-[14px]">Điều khoản dịch vụ</p>
        <p className="hover:text-[#C19A46] transition-all duration-300 cursor-pointer text-[14px]">Chính sách bảo mật</p>
        <p className="hover:text-[#C19A46] transition-all duration-300 cursor-pointer text-[14px]">Về bản quyền</p>
        <p className="hover:text-[#C19A46] transition-all duration-300 cursor-pointer text-[14px]">Hướng dẫn sử dụng</p>
        <p className="hover:text-[#C19A46] transition-all duration-300 cursor-pointer text-[14px]">Tải video tiktok không logo</p>
      </div>
    </footer>
  );
}
