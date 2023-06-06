import Link from "next/link";
import React from "react";
import CardStory from "./CardStory";

export default function TopRating() {
  return (
    <div className="w-full group p-2 lg:p-0">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-8">Đánh giá cao</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-8">
        <div className="">
          <CardStory type="rate" />
        </div>
        <div className="">
          <CardStory />
        </div>
        <div className="">
          <CardStory />
        </div>
        <div className="">
          <CardStory />
        </div>
        <div className="">
          <CardStory />
        </div>
        <div className="">
          <CardStory />
        </div>
      </div>
    </div>
  );
}
