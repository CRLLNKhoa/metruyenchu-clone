import Link from "next/link";
import React, { useState } from "react";
import { AiFillCaretDown } from "react-icons/ai";

function Header() {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-white duration-500 transition-all lg:hidden mb-8 px-4 py-2 flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="font-bold">QLMCT</h3>
        <span onClick={()=>setShow(!show)} className="cursor-pointer">
          <AiFillCaretDown />
        </span>
      </div>
      {show && (
        <div className="flex flex-col mt-4">
          <Link
            className="hover:bg-blue-gray-200 py-2 rounded-lg pl-4 hover:text-white duration-500"
            href="/"
          >
            Quản lí Chung
          </Link>
          <Link
            className="hover:bg-blue-gray-200 py-2 rounded-lg pl-4 hover:text-white duration-500"
            href="/nguoi-dung"
          >
            Quản lí người dùng
          </Link>
          <Link
            className="hover:bg-blue-gray-200 py-2 rounded-lg pl-4 hover:text-white duration-500"
            href="/truyen"
          >
            Quản lí truyện
          </Link>
          <Link
            className="hover:bg-blue-gray-200 py-2 rounded-lg pl-4 hover:text-white duration-500"
            href="/chuong"
          >
            Quản lí chương
          </Link>
          
        </div>
      )}
    </div>
  );
}

export default Header;
