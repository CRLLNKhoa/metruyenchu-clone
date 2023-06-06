import Link from "next/link";
import React from "react";
import { BiBookAdd, BiErrorAlt } from "react-icons/bi";
import { MdStorage } from "react-icons/md";
import { FaChartBar } from "react-icons/fa";
import { BsFillFileTextFill } from "react-icons/bs";
import { useRouter } from 'next/router';
import { toast } from "react-toastify";

export default function Sidebar() {
  const router = useRouter();
  const {asPath} = router
  const notify = () => toast.warning("Bạn chưa được cấp quyền!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    });
  return (
    <div className="lg:w-[20%]  shadow-lg border dark:border-none bg-[#F8F8F8] dark:bg-[#283046] fixed top-0 left-0 bottom-0">
      <Link href="/" className="w-full h-[62px] flex gap-4 px-6 items-center">
        <img
          height={24}
          width={36}
          src="https://creator.vtruyen.com/img/logo.36f34a9f.svg"
          alt="?"
        />
        <h1 className="text-[#7367F0] text-[20px] font-bold">vCreator</h1>
      </Link>
      <div className="h-full bg-[#F8F8F8] dark:bg-[#283046] px-6 py-6 transition-all  duration-300 overflow-y-scroll scrollbar-thumb-rounded scrollbar-thin scrollbar-thumb-[#7b7b8400]">
        <div className="flex flex-col gap-6 h-screen">
          <div>
            <p className="text-[14px] uppercase text-[#5E6475] mb-2">
              Sách truyện
            </p>
            <div className="flex flex-col gap-2">
              <Link className={asPath==="/books/new"?"sidebar-item sidebar-item-active":"sidebar-item"} href="/books/new">
                <BiBookAdd className="text-[16px]" />
                Thêm Truyện Mới
              </Link>
              <Link className={asPath==="/books"?"sidebar-item sidebar-item-active":"sidebar-item"} href="/books">
                <MdStorage className="text-[16px]" />
                Truyện Của Tôi
              </Link>
              <Link className="sidebar-item" href="/">
                <BiErrorAlt className="text-[16px]" />
                Báo Lỗi
              </Link>
              <Link className="sidebar-item" href="/">
                <FaChartBar className="text-[16px]" />
                Thống Kê
              </Link>
              <Link className="sidebar-item" href="/">
                <BsFillFileTextFill className="text-[16px]" />
                Tư Liệu
              </Link>
            </div>
          </div>
          <div>
            <p className="text-[14px] uppercase text-[#5E6475] mb-2">
              Thể loại
            </p>
            <div onClick={notify} className="flex flex-col gap-2 cursor-not-allowed select-none">
              <p className="sidebar-item dark:!text-[#74727258] !text-[#74727258]">
                <BiBookAdd className="text-[16px]" />
                Thêm Thể Loại Mới
              </p>
              <p className="sidebar-item dark:!text-[#74727258] !text-[#74727258]">
                <MdStorage className="text-[16px]" />
                Danh Sách Thể Loại
              </p>
            </div>
          </div>
          <div>
            <p className="text-[14px] uppercase text-[#5E6475] mb-2">tác giả</p>
            <div className="flex flex-col gap-2 cursor-not-allowed select-none">
              <p className="sidebar-item dark:!text-[#74727258] !text-[#74727258]">
                <BiBookAdd className="text-[16px]" />
                Thêm Tác Giả Mới
              </p>
              <p className="sidebar-item dark:!text-[#74727258] !text-[#74727258]">
                <MdStorage className="text-[16px]" />
                Danh Sách Tác Giả
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
