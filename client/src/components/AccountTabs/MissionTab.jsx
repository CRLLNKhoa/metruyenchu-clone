import React from "react";
import { toast } from "react-toastify";

export default function MissionTab() {
    const handle = () => {
        toast.warn("Đang cập nhật!")
    }
  return (
    <div>
      <h1 className="font-semibold border-b pb-2">Danh sách nhiệm vụ:</h1>
      <div className="flex flex-col gap-6 mt-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">
              Tặng quà cho tác giả hoặc dịch giả
            </h1>
            <p className="text-[13px] italic">15 Exp</p>
          </div>
          <button onClick={handle} className="bg-[#B78A28] hover:bg-sky-600 py-1 text-[13px] text-white px-8 rounded-md">
            Nhận thưởng
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">
            Đọc 5 chương của một truyện chưa từng đọc
            </h1>
            <p className="text-[13px] italic">10 Exp</p>
          </div>
          <button onClick={handle} className="bg-[#B78A28] hover:bg-sky-600 py-1 text-[13px] text-white px-8 rounded-md">
            Nhận thưởng
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">
            Thêm 1 bình luận
            </h1>
            <p className="text-[13px] italic">10 Exp</p>
          </div>
          <button onClick={handle} className="bg-[#B78A28] hover:bg-sky-600 py-1 text-[13px] text-white px-8 rounded-md">
            Nhận thưởng
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-[15px] font-semibold">
            Đọc 10 chương truyện
            </h1>
            <p className="text-[13px] italic">20 Exp</p>
          </div>
          <button onClick={handle} className="bg-[#B78A28] hover:bg-sky-600 py-1 text-[13px] text-white px-8 rounded-md">
            Nhận thưởng
          </button>
        </div>
      </div>
    </div>
  );
}
