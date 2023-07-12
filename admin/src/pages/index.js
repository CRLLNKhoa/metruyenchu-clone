import { Inter } from "next/font/google";
import React, { useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Chip } from "@material-tailwind/react";
import {
  Timeline,
  TimelineItem,
  TimelineConnector,
  TimelineIcon,
  Typography,
  TimelineHeader,
} from "@material-tailwind/react";
import {RiNumbersFill} from "react-icons/ri"
import {TbProgressCheck} from "react-icons/tb"
import {BiSolidBookAlt} from "react-icons/bi"
import  {GrMoney} from "react-icons/gr"
import {FaUserAlt} from "react-icons/fa"
import {BsFillFileTextFill} from "react-icons/bs"
import {AiFillEye} from "react-icons/ai"
import {MdStarRate,MdOutlineError} from "react-icons/md"
import { dashboard } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const getDashboard = async() =>{
    const res = await dashboard()
    return res.data
  }
    // Queries
    const query = useQuery({ queryKey: ['todos'], queryFn: getDashboard })
    const {data} = query
console.log(data)
  return (
    <div className=" bg-white rounded-s-lg p-4 flex flex-col gap-8">
      <Breadcrumb path="Thống kê chung" />
      <div className="grid grid-cols-3 gap-4 flex-wrap">
        <div className="flex gap-4 col-span-3 lg:col-span-1 items-center shadow-md p-4 rounded-lg">
          <div className="bg-red-600 flex  justify-center  items-center text-white w-16 h-16 rounded-full">
            <FaUserAlt size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Người Dùng</p>
              <b>{data?.countUser}</b>
            </div>
            <div className="flex gap-2">
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value={`Active: ${data?.countUserActive}`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                  }
                />
                 <Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value={`Ban: ${data?.countUserBan}`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
                  }
                />
             </div>
          </div>
        </div>
        <div className="flex gap-4  col-span-3 lg:col-span-1 items-center shadow-md  p-4 rounded-lg">
          <div className="bg-blue-600 w-16 h-16 flex  justify-center  items-center text-white rounded-full">
            <BiSolidBookAlt size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Truyện</p>
              <b>{data?.countStory}</b>
            </div>
             <div className="flex gap-2">
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value={`Public: ${data?.countStoryActive}`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                  }
                />
                 <Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value={`Hidden: ${data?.countStoryBan}`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
                  }
                />
             </div>
          </div>
        </div>
        <div className="flex gap-4  col-span-3 lg:col-span-1 items-center shadow-md  p-4 rounded-lg">
          <div className="bg-lime-600 w-16 h-16 flex  justify-center  items-center text-white rounded-full">
            <BsFillFileTextFill size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Chương Truyện</p>
              <b>{data?.countChapter}</b>
            </div>
          </div>
        </div>
        <div className="flex gap-4  col-span-3 lg:col-span-1 items-center shadow-md  p-4 rounded-lg">
          <div className="bg-yellow-800 w-16 h-16 flex  justify-center  items-center text-white rounded-full">
            <AiFillEye size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Lượt Xem</p>
              <b>{data?.countView}</b>
            </div>
          </div>
        </div>
        <div className="flex gap-4  col-span-3 lg:col-span-1 items-center shadow-md  p-4 rounded-lg">
          <div className="bg-gray-600 w-16 h-16 flex  justify-center  items-center text-white rounded-full">
            <MdStarRate size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Lượt Đánh Giá</p>
              <b>{data?.countRate}</b>
            </div>
          </div>
        </div>
        <div className="flex gap-4  col-span-3 lg:col-span-1 items-center shadow-md  p-4 rounded-lg">
          <div className="bg-red-600 w-16 h-16 flex  justify-center  items-center text-white rounded-full">
            <MdOutlineError size={28} />
          </div>
          <div>
            <div className="flex flex-col text-[15px]">
              <p>Số Lượt Báo Lỗi</p>
              <b>24</b>
            </div>
            <div className="flex gap-2">
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value={`Fixed: 20`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                  }
                />
                 <Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value={`error: 4`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
                  }
                />
             </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap lg:flex-nowrap gap-4">
      <Timeline>
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost">
              <RiNumbersFill className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Tổng Số Lần Nạp Kẹo
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {data?.countPayment} Giao dịch
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="red">
              <TbProgressCheck className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Tình Trạng Thanh Toán
              </Typography>
              <div className="flex gap-2">
                <Chip
                  variant="ghost"
                  color="green"
                  size="sm"
                  value={`success: ${data?.countPayment}`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-green-900" />
                  }
                />
                 <Chip
                  variant="ghost"
                  color="red"
                  size="sm"
                  value={`error: 0`}
                  icon={
                    <span className="content-[''] block w-2 h-2 rounded-full mx-auto mt-1 bg-red-900" />
                  }
                />
             </div>
            </div>
          </TimelineHeader>
        </TimelineItem>
        <TimelineItem className="h-28">
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="green">
              <GrMoney className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Tổng Tiền Nhận Được
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {data?.totalPayment.toLocaleString('vi', {style : 'currency', currency : 'VND'})}
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>

      <Timeline>
        <TimelineItem className="h-28">
          <TimelineConnector className="!w-[78px]" />
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost">
              <RiNumbersFill className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Số Mở Vip
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {data?.countVip} Giao dịch
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
        <TimelineItem className="h-28">
          <TimelineHeader className="relative rounded-xl border border-blue-gray-50 bg-white py-3 pl-4 pr-8 shadow-lg shadow-blue-gray-900/5">
            <TimelineIcon className="p-3" variant="ghost" color="green">
              <GrMoney className="h-5 w-5" />
            </TimelineIcon>
            <div className="flex flex-col gap-1">
              <Typography variant="h6" color="blue-gray">
                Tổng Tiền Nhận Được
              </Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {(data?.countVip * 300000).toLocaleString('vi', {style : 'currency', currency : 'VND'})}
              </Typography>
            </div>
          </TimelineHeader>
        </TimelineItem>
      </Timeline>
    </div>
    </div>
  );
}
