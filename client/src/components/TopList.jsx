import Link from "next/link";
import React from "react";
import { FaGlasses } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { TbBook2 } from "react-icons/tb";
import {BsArrowUpCircle,BsFlower2} from "react-icons/bs"

export default function TopList({ title = "Title" }) {
  return (
    <div className="group">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-4">{title}</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <ItemTop type="recomment"/>
        <Item index={2} />
        <Item index={3} />
        <Item index={4} />
        <Item index={5} />
        <Item index={6} />
        <Item index={7} />
        <Item index={8} />
        <Item index={9} />
        <Item index={10} />
      </div>
    </div>
  );
}

 const ItemTop = ({ type="populor",num=0 }) => {
  const renderType = () => {
    if (type === "read") {
      return (
        <p className="flex text-emerald-500 items-center text-[12px] font-semibold gap-2">
          {num} <FaGlasses />
        </p>
      );
    }
    if(type === "populor"){
        return(
            <p className="flex text-[#FFC400] items-center text-[12px] font-semibold gap-2">
          {num} <BsArrowUpCircle />
        </p>
        )
    }
    if(type === "recomment"){
        return(
            <p className="flex text-[#FFC400] items-center text-[12px] font-semibold gap-2">
          {num} <BsFlower2 />
        </p>
        )
    }
  };
  return (
    <div className="flex items-start w-full gap-2">
      <img
        height={32}
        width={24}
        src="https://metruyencv.com/assets/images/icons/medal-1.svg"
        alt="?"
      />
      <div className="flex w-[54%] flex-col ml-2">
        <Link href="/" className="text-[14px] w-full font-semibold hover:text-[#b78a28] overflow-hidden">
          <p className="truncate">Đệ Đệ Ta Là Thiên Tuyển Chi Tử Đệ Đệ Ta Là Thiên Tuyển Chi Tử</p>
        </Link>
        {renderType()}
        <div>
          <p className="flex items-center gap-1 text-[12px]">
            <FaUserEdit /> Lương Nguyễn Khoa
          </p>
        </div>
        <p className="flex items-center text-[12px] gap-1">
          <TbBook2 /> Huyễn Huyền
        </p>
      </div>
      <div className="flex w-[100px] perspective-9">
        <img className="translate-z-50 translate-x-[9px] -rotate-y-40" width={85} height={112} src="https://static.cdnno.com/poster/quang-am-chi-ngoai/150.jpg?1655013821" alt="?" />
        <div className="w-12 h-[114px] bg-[#efefef] -translate-z-50 -translate-x-[1px] rotate-y-40 shadow-[inset_0_0_5px_#333]"></div>
      </div>
    </div>
  );
};

 const Item = ({index}) =>  {
    return(
        <div className="flex items-center gap-2 border-t py-2 justify-between">
            {index===2&&<img src="https://metruyencv.com/assets/images/icons/medal-2.svg" alt="?"/>}
            {index===3&&<img src="https://metruyencv.com/assets/images/icons/medal-3.svg" alt="?"/>}
            {(index!==2 && index!==3)&& <p className="w-[10%] pl-2 text-[14px] font-semibold">{index}</p>}
            <Link href="/" className="w-[70%] text-[14px] hover:text-[#b78a28]"><p className="truncate">Tên truyện Tên truyện Tên truyện Tên truyện</p></Link>
            <p className="text-[12px]">123.2131</p>
        </div>
    )
 }
