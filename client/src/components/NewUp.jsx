import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { FaUserEdit } from "react-icons/fa";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import { EffectCoverflow, Pagination } from "swiper";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "services/storyService";

export default function NewUp() {
  const swiperRef = useRef();
  const [indx, setIndx] = useState(0);
  const fetchStory = async () => {
    const res = await StoryService.getStory(8);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyS"], queryFn: fetchStory });
  const { isLoading, data, refetch } = query;
  return (
    <div className="w-full group">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-4">Mới Đăng</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      {data && (
        <div className="relative p-6 bg-[#F7F5F0] rounded-lg flex flex-col gap-4 justify-center items-center">
          <button
            onClick={() => {
              swiperRef.current.slidePrev();
              if (indx === 0) {
                setIndx(data.length - 1);
              } else setIndx(indx - 1);
            }}
            className="absolute z-50 top-[80px] p-4 border  rounded-full left-0 bg-white"
          >
            <GrLinkPrevious />
          </button>
          <button
            onClick={() => {
              swiperRef.current.slideNext();
              if (indx === data.length - 1) {
                setIndx(0);
              } else setIndx(indx + 1);
            }}
            className="absolute z-50 top-[80px] p-4 border  rounded-full right-0 bg-white"
          >
            <GrLinkNext />
          </button>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={3}
            loop={true}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
            className="mySwiper"
            onSlideChange={(e) => setIndx(e.activeIndex)}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
          >
            {data?.map((item) => (
              <SwiperSlide key={item._id} className="relative">
                <img src={item.thumbnail} />
              </SwiperSlide>
            ))}
          </Swiper>
          <h1 className="w-full text-center mt-8 font-bold">
            {data[indx]?.title}
          </h1>
          <p className="text-center text-[13px] mt-4 h-[120px]">
            {data[indx]?.description.slice(0, 220)}
          </p>
          <div className="flex w-full items-center justify-between mt-4">
            <span className="flex items-center gap-2 text-[13px]">
              <FaUserEdit />
              {data[indx]?.userId?.displayName}
            </span>
            <span className="text-[12px] border text-[#B78A28] px-2 border-[#B78A28]">
              {data[indx]?.genre}
            </span>
          </div>
          <Link
            href={`/truyen/${data[indx]?._id}`}
            className="bg-red-600 flex justify-center w-[120px] py-2 hover:bg-red-900 rounded-full text-[13px] font-semibold text-white"
          >
            Đọc ngay
          </Link>
        </div>
      )}
    </div>
  );
}
