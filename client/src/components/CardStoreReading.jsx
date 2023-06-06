import Link from "next/link";
import React from "react";

export default function CardStoreReading({thumbnail="",title=""}) {
  return (
    <div className="flex gap-4">
      <img
        width={32}
        height={42}
        src={thumbnail}
        alt="?"
      />
      <div className="flex justify-between flex-col overflow-hidden">
        <Link
          href="/"
          className="text-black hover:text-[#b78a28] truncate text-[14px] font-semibold "
        >
          {title}
        </Link>
        <p className="text-[12px]">Đã đọc: 0</p>
      </div>
    </div>
  );
}
