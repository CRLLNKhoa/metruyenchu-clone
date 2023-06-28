import Link from "next/link";
import React from "react";
import {FaUserEdit}  from "react-icons/fa"

export default function CardStoryRank({icon,index=0,title,genre,author,num,desc="",thumbnail,page=0,id}) {

  const badge = () => {
    if(index===0){
        return "bg-[#FFC100]"
    }
    if(index===1){
        return "bg-[#F9973A]"
    }
    if(index===2){
        return "bg-[#F04921]"
    }
    if(index >= 3){
        return "bg-[#A3A3A3]"
    }
  }

  const badges = () => {
    if(index===0){
        return "border-[#FFC100]"
    }
    if(index===1){
        return "border-[#F9973A]"
    }
    if(index===2){
        return "border-[#F04921]"
    }
    if(index >= 3){
        return "border-[#A3A3A3]"
    }
  }
    
  return (
    <div className="flex gap-4">
      <div className="w-[90px] h-[120px] relative">
        <div className={`absolute w-[28px] z-50 h-[28px] ${badge()} text-[15px] font-bold leading-[2] text-white text-center`}>
          {page===0?index+1:((index+1)+page*10)}
          <div className={`absolute z-[-1] border-[14px] ${badges()} border-b-transparent left-0 top-[45%]`}></div>
        </div>
        <img
          src={thumbnail}
          alt=""
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <Link href={`/truyen/${id}`} className="font-semibold text-[15px]">
          {title}
        </Link>
        <p className="text-[13px] flex-1 text-slate-500">
          {desc.slice(0,300)}...
        </p>
        <div className="flex gap-8">
            <span className="flex text-[13px] text-slate-500 gap-2 items-center"><FaUserEdit/>{author}</span>
            <span className="flex text-[12px] text-slate-500 gap-2 items-center">{icon} {num}</span>
            <span className="flex text-[12px] gap-2 items-center border px-4 text-[#B78A28] border-[#B78A28]">{genre}</span>
        </div>
      </div>
    </div>
  );
}
