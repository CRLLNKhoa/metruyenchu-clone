import Link from "next/link";
import React from "react";
import { FaUserEdit } from "react-icons/fa";

export default function CardStory({type="default",img,title,rate=0,desc="",author="",genre="",id,num}) {
  const f = (num) => {
    if(Number.isInteger(num)){
      return `${num}.00`
    }else return num
  }
  return (
    <div className={type==="default"?"flex items-center h-[110px]":"flex h-[120px]"}>
      <Link className="min-w-[72px] h-[97px]" href={`/truyen/${id}`}>
        <img
          className="w-[100%] h-[100%]"
          src={img}
          alt="??"
        />
      </Link>
      <div className="flex flex-col overflow-hidden pl-4 justify-between gap-2">
        <Link
          href={`/truyen/${id}`}
          className="text-black hover:text-[#b78a28] truncate text-[14px] font-semibold "
        >
          {title}
        </Link>
        {type==="rate" && <div className="flex gap-4 items-center">
          <span className="bg-red-600 px-2 rounded-full text-white text-[13px]">
            {f(rate)}
          </span>
          <p className="text-[13px] text-green-600">{num} đánh giá</p>
        </div>}
        <p className="whitespace-pre-wrap text-[13px]">
          {desc.slice(0,60)}...
        </p>
        <div className="flex justify-between gap-4 w-full">
          <div className="flex flex-nowrap text-[13px] justify-start overflow-hidden flex-1 items-center gap-2">
            <FaUserEdit /> <p className="truncate">{author}</p>
          </div>
          <span className="border border-[#b78a28] text-[#b78a28] text-[10px] px-2 min-w-[85px] flex justify-center items-center">
            {genre}
          </span>
        </div>
      </div>
    </div>
  );
}
