import Link from "next/link";
import React from "react";

export default function NewUpdateItem({
  time = 0,
  genre = "Thể loại",
  title = "Tiêu đề",
  storyName = "Tên truyện",
  author = "Tác giả",
  idChapter = "/",
  idStory = "/",
}) {
  return (
    <div className="flex justify-between w-full gap-4 items-end overflow-hidden">
      <p className="w-[10%] flex justify-start text-[12px] font-semibold text-[#b2b0ad]">
        {genre}
      </p>
      <Link
        className="w-[25%] flex justify-start text-[14px] hover:text-[#b78a28] font-semibold"
        href={`/truyen/${idStory}`}
      >
        <p className="truncate">{storyName}</p>
      </Link>
      <Link
        className="w-[25%] flex justify-start hover:text-[#b78a28] text-[13px]"
        href={`/chuong/${idChapter}`}
      >
        <p className="truncate">{title}</p>
      </Link>
      <div className="w-[20%] flex justify-start text-[12px] font-semibold text-[#b2b0ad]">
        {author}
      </div>
      <div className="w-[10%] flex justify-end text-[12px] font-semibold text-[#b2b0ad]">{`${time.slice(
        8,
        10
      )}-${time.slice(5, 7)}-${time.slice(0, 4)}`}</div>
    </div>
  );
}
