import React, { useEffect } from "react";
import { Tooltip, Button } from "@nextui-org/react";
import { GoPlusSmall } from "react-icons/go";
import { AiOutlineUnorderedList, AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { MdOutlineMarkUnreadChatAlt } from "react-icons/md";
import { FaBan } from "react-icons/fa";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import { DeleteTooltip } from "./TooltipDel";
import { useMutationHooks } from "hooks/useMutationHook";
import * as StoryService from "services/storyService"
import LoadingCustom from "./Loading";

export default function StoryCard({ title, published, id,refetch }) {
  const notify = () =>
    toast.warning("Đang cập nhật!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
    const notifyS = () =>
    toast.success(data?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
  const router = useRouter();
  const mutation = useMutationHooks((data) => StoryService.delStory(data))
  const  handleDel =()=>{
    mutation.mutate(id)
  }
  const {data,isLoading} = mutation
  useEffect(() => {
    if(data?.status === "ERR"){
      notify()
    }
    if(data?.status  === "OK"){
      notifyS()
      refetch()
    }
  }, [data]);
  return (
    <div className="p-4 rounded-md bg-white border dark:border-slate-600 dark:bg-[#283046]">
      {isLoading && <LoadingCustom tip="Đang xóa!" />}
      <h1 className="text-[18px] text-[black] dark:text-white mb-3">{title}</h1>
      {published ? (
        <p className="text-[13px] text-green-400">Tình trạng: Đã xuất bản</p>
      ) : (
        <p className="text-[13px] text-orange-400">Tình trạng: Chưa xuất bản</p>
      )}
      <div className="border-t mt-3 border-slate-600 pt-4 flex gap-4">
        <Tooltip content="Thêm chương" placement="bottom" color="invert">
          <button
            onClick={() =>
              router.push(
                {
                  pathname: `/chapter/add/${id}`,
                  query: { slug: title },
                })
            }
            className="bg-[#d4d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm"
          >
            <GoPlusSmall />
          </button>
        </Tooltip>
        <Tooltip content="Danh sách chương" placement="bottom" color="invert">
          <Link href={`/chapter/list/${id}`} className="bg-[#d4d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm">
            <AiOutlineUnorderedList />
          </Link>
        </Tooltip>
        <Tooltip content="Chỉnh sửa truyện" placement="bottom" color="invert">
          <Link
            href={`/books/edit/${id}`}
            className="bg-[#d4d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm"
          >
            <FiEdit color="#fca800" />
          </Link>
        </Tooltip>
        <Tooltip
          content="Yêu cầu hỗ trợ (coming soon)"
          placement="bottom"
          color="success"
        >
          <button onClick={notify} className="bg-[#d3d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm">
            <MdOutlineMarkUnreadChatAlt color="#20df16" />
          </button>
        </Tooltip>
        <Tooltip
          content="Chặn người dùng (coming soon)"
          placement="bottom"
          color="success"
        >
          <button
            onClick={notify}
            className="bg-[#d4d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm"
          >
            <FaBan color="red" />
          </button>
        </Tooltip>
        <Tooltip placement="bottom" trigger="click" content={<DeleteTooltip onClick={handleDel} />}>
          <button
            className="bg-[#d4d4d3] text-[12px] text-black  dark:text-white dark:bg-slate-600 px-[8px] py-[4px] rounded-sm"
          >
            <AiFillDelete color="red" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}
