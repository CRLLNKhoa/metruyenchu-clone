import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Provider, useDispatch, useSelector } from "react-redux";
import * as AuthService  from  "services/authService"
import { updateAuth } from "redux/slice/authSlice";
import { useEffect, useState } from "react";
import { isJsonString } from "../../untils";
import jwt_decode from "jwt-decode";

const inter = Inter({ subsets: ["latin"] });

const data = [
  {
    title: "Thông báo bảo trì [Cập nhật: đã xong]",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Ươm mần tác giả Việt: Tổng kết giải tinh phẩm",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Ươm mần tác giả Việt: Tổng kết giải nhân khí",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Thông báo bảo trì",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Ươm mần tác giả Việt: Tổng kết giải nhân khí của bình luận truyện",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Ươm mần tác giả Việt: Tổng kết giải nhân khí phần đánh giá truyện",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Thông báo: Đã sửa lỗi phát sinh trong đợt tết",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Hoàn thành thanh toán doanh thu tháng 1",
    time: "22/08/2022 22:04:13",
  },
  {
    title: "Giới thiệu chức năng chăn tương tác",
    time: "22/08/2022 22:04:13",
  },
  {
    title: `Hướng dẫn "tác giả củ" của vTruyen tham gia cuộc thi: Ươm mần tác giả Việt`,
    time: "22/08/2022 22:04:13",
  },
];

export default function Home() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch();
  return (
   <div>
      <Head>
        <title>Trang tin tức</title>
      </Head>
      <main className="dark:bg-[#283046] p-5 w-full bg-white border rounded-lg  dark:border-none">
        <h1 className="text-[18px] text-[#95979B] mb-4 dark:text-white">Tin tức mới</h1>
        <div className="flex flex-col gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4 group cursor-pointer">
              <p className="w-[8px] h-[8px] border rounded-full border-[#95979B]"></p>
              <div className="flex items-end gap-4">
                <p className="group-hover:text-[#7367F0] text-[14px] dark:text-white text-[#95979B]">
                  {item.title}
                </p>
                <p className="text-[12px] text-[#676D7D]">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
   </div>
  );
}
