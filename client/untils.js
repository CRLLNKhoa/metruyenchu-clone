export const isJsonString = (data) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


  export  const themeColor = [
    { bg: "#E9D8D8", body: "#F5E4E4", header: "#E0CFCD", text: "#333333" },
    { bg: "#E9D8D8", body: "#F5EBCD", header: "#EAE0C3", text: "#333333" },
    { bg: "#ccd8cc", body: "#E2EEE2", header: "#C5CFC2", text: "#333333" },
    { bg: "#CED9D9", body: "#E1E8E8", header: "#CED9D9", text: "#333333" },
    { bg: "#E4DECE", body: "#EAE4D3", header: "#DBD5C3", text: "#333333" },
    { bg: "#D7D4CE", body: "#E5E3DF", header: "#9E9E9D", text: "#333333" },
    { bg: "#111111", body: "#222222", header: "#111111", text: "#ffff" },
  ];

  export const input = {
    genre: [
      "Huyễn Huyền",
      "Võng Du",
      "Đồng Nhân",
      "Cạnh Kỹ",
      "Kiếm Hiệp",
      "Tiên Hiệp",
      "Khoa Huyễn",
      "Đô Thị",
      "Dã Sử",
      "Huyền Nghi",
      "Kỳ Ảo",
    ],
    view: ["Góc Nhìn Thứ Nhất", "Góc Nhìn Nam", "Góc Nhìn Nữ"],
    character: [
      "Điềm Đạm",
      "Nhiệt Huyết",
      "Vô Sỉ",
      "Thiết Huyết",
      "Nhẹ Nhàng",
      "Cơ Trí",
      "Lãnh Khốc",
      "Kêu Ngạo",
      "Ngu Ngốc",
      "Giảo Hoạt",
    ],
    worldScene: [
      "Đông Phương Huyễn Huyền",
      "Dị Thế Đại Lục",
      "Vương Triều Tranh Bá",
      "Cao Võ Thế Giới",
      "Tây Phương Kỳ Huyễn",
      "Hiện Đại Ma Pháp",
      "Hắc Ám Huyễn Tưởng",
      "Lịch Sử Thần Thoại",
      "Võ Hiệp Huyễn Tưởng",
      "Cổ Võ Tương Lai",
      "Tu Chân Văn Minh",
      "Huyễn Tưởng Tu Tiên",
      "Hiện Đại Tu Chân",
      "Thần Thoại Tu Chân",
      "Cổ Điển Tu Chân",
      "Viễn Cổ Hồng Hoang",
      "Đô Thị Sinh Hoạt",
      "Đô Thị Dị Nâng",
      "Thanh Xuân Vườn Trường",
      "Ngu Nhạc Minh Tinh",
      "Thương Chiến Chức Tràng",
      "Giá Không Lịch Sử",
      "Lịch Sử Quân Sự",
      "Dân Gian Truyền Thuyết",
      "Lịch Sử Quan Trường",
      "Hư Nghĩ Võng Du",
      "Du Hí Dị Giới",
      "Điện Tử Cạnh Kỹ",
      "Thể Dục Cạnh Kỹ",
      "Cổ Võ Cơ Giáp",
      "Thế Giới Tương Lai",
      "Tinh Tế Văn Minh",
      "Tiến Hóa Dị Giới",
      "Mạc Thế Nguy Cơ",
      "Thời Không Xuyên Toa",
      "Quỷ Bí Huyền Nghi",
      "Kỳ Diệu Thới Giới",
      "Trinh Thám Thôi Lý",
      "Thám Hiểm Sinh Tồn",
      "Cung Vi Trạch Đấu",
      "Kinh Thương Chủng Điền",
      "Tiên Lữ Kỳ Duyên",
      "Hào Môn Thế Gia",
      "Dị Tộc Luyến Tình",
      "Tinh Tế Luyến Ca",
      "Linh Khí Khôi Phục",
      "Chư Thiên Vạn Giới",
    ],
    sect: [
      "Hệ Thống",
      "Lão Gia",
      "Bàn Thờ",
      "Tùy Thân",
      "Phàm Nhân",
      "Vô Địch",
      "Xuyên Qua",
      "Nữ Cường",
      "Khế Ước",
      "Trọng Sinh",
      "Hồng Lâu",
      "Học Viện",
      "Biến Thân",
      "Cổ Ngu",
      "Chuyển Thế",
      "Xuyên Sách",
      "Đàn Xuyên",
      "Phế Tài",
      "Dưỡng Thành",
      "Cơm Mềm",
      "Vô Hạn",
      "Mery Sue",
      "Cá Mặn",
      "Xây Dựng Thế Lực",
      "Xuyên Nhanh",
      "Phụ Nữ",
      "Vả Mặt",
      "Sảng Văn",
      "Xuyên Không",
      "Ngọt Sủng",
      "Ngự Thú",
      "Điền Viên",
      "Toàn Dân",
      "Mỹ Thuật",
      "Phản Phái",
      "Sau Màn",
    ],
    isComplete:[
      "Chưa hoàn thành",
      "Hoàn thành",
      "Dừng viết"
    ]
  };