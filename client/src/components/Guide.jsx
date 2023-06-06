import Link from "next/link";
import React from "react";

export default function Guide() {
  return (
    <div className="py-4 group">
      <div className="flex w-full justify-between ">
        <h1 className="font-bold text-[18px] mb-4">Hướng dẫn</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <ul className="list-disc pl-4 text-[15px] flex flex-col gap-2">
        <li className="text-black hover:text-[#b78a28] cursor-pointer">
          Mấy thứ cấp này nọ là gì vậy?
        </li>
        <li className="text-black hover:text-[#b78a28] cursor-pointer">
          Kẹo là gì và để làm gì?
        </li>
        <li className="text-black hover:text-[#b78a28] cursor-pointer">
            Làm sao để lên cấp vậy?
        </li><li className="text-black hover:text-[#b78a28] cursor-pointer">
          Quy định về việc lạm dụng kẹo miễn phí
        </li>
        <li className="text-black hover:text-[#b78a28] cursor-pointer">
          Làm sao để có hoa?
        </li>
        <li className="text-black hover:text-[#b78a28] cursor-pointer">
          Tôi còn thất mắc khác?
        </li>
      </ul>
    </div>
  );
}
