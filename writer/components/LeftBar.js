import Link from "next/link";
import React, { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineUnorderedList,
  AiOutlineFileProtect,
} from "react-icons/ai";
import { IoIosAddCircleOutline } from "react-icons/io";
import { TbReportAnalytics, TbDeviceAnalytics } from "react-icons/tb";
import { BiErrorAlt } from "react-icons/bi";
import { CiLight, CiDark } from "react-icons/ci";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { useSelector } from "react-redux";

function LeftBar() {
  // NOTE Theme
  const { systemTheme, theme, setTheme } = useTheme();
  const router = useRouter();
  const [themeBtn, settheme] = useState(true);
  const auth = useSelector((state) => state.auth);

  return (
    <div className="shadow-lg w-full dark:bg-black dark:text-white h-screen overflow-y-scroll scrollbar-none justify-between flex flex-col">
      <div className="h-16 pl-6 pt-4 flex items-center">
        <img className="w-10" src="/svg/logo.svg" alt="logo.png" />
      </div>
      <div className="py-12">
        <Link
          href="/"
          className={`flex items-center gap-2 ${
            router.pathname === "/" ? "bg-gray-200 text-black" : "text-gray-400"
          } hover:bg-gray-200 hover:text-black px-4 duration-500 py-5`}
        >
          <AiOutlineHome size={20} />
          Home
        </Link>

        <div className="px-4 flex gap-2 items-center py-4 text-gray-400 font-medium">
          <AiOutlineFileProtect size={20} /> Quản lý truyện
        </div>

        {auth.id && (
          <div className="">
            <Link
              href="/story/create"
              className={`flex pl-8 items-center gap-2 ${
                router.pathname === "/story/create"
                  ? "bg-gray-200 text-black"
                  : "text-gray-400"
              } hover:bg-gray-200 hover:text-black px-4 duration-500 py-2`}
            >
              <IoIosAddCircleOutline size={20} />
              Thêm truyện
            </Link>

            <Link
              href="/story"
              className={`flex pl-8 items-center gap-2 ${
                router.pathname === "/story"
                  ? "bg-gray-200 text-black"
                  : "text-gray-400"
              } hover:bg-gray-200 hover:text-black px-4 duration-500 py-2`}
            >
              <AiOutlineUnorderedList size={20} />
              Danh sách truyện
            </Link>
          </div>
        )}

        <div className="px-4 py-4 flex items-center gap-2 text-gray-400 font-medium">
          <TbDeviceAnalytics size={22} /> Thống kê
        </div>

        {auth.id && (
          <div className="">
            <Link
              href="/thong-ke"
              className="px-8 flex items-center gap-2 text-gray-400 hover:bg-gray-200 hover:text-black duration-500 py-2"
            >
              <TbReportAnalytics size={20} />
              Thống kê chung
            </Link>

            <Link
              href="/"
              className="px-8 flex items-center gap-2 text-gray-400 hover:bg-gray-200 hover:text-black duration-500 py-2"
            >
              <BiErrorAlt size={20} />
              Báo lỗi <i className="text-[10px]">(comming soon)</i>
            </Link>
          </div>
        )}
      </div>
      <div className="w-full mt-auto py-4">
        <div className="flex w-full relative p-2 items-center">
          <div
            onClick={() => {
              settheme(true);
              setTheme("light");
            }}
            className={`w-1/2 cursor-pointer flex ${
              themeBtn && "bg-gray-200 font-semibold"
            } p-2 rounded-full items-center justify-center dark:text-white dark:bg-black gap-2`}
          >
            <CiLight size={22} />
            <p>Light</p>
          </div>
          <div
            onClick={() => {
              settheme(false);
              setTheme("dark");
            }}
            className={`w-1/2 dark:text-white dark:bg-black dark:border-primary border cursor-pointer flex ${
              !themeBtn && "bg-gray-200 font-semibold"
            } p-2 rounded-full items-center justify-center gap-2`}
          >
            <CiDark size={22} />
            <p>Dark</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftBar;
