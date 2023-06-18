import Link from "next/link";
import React from "react";
import CardStory from "./CardStory";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "services/storyService";
import { data } from "autoprefixer";

export default function TopRating() {
  const fetch = async () => {
    const res = await StoryService.getTopRating();
    return res.data;
  };

  const query = useQuery({
    queryKey: ["topRating"],
    queryFn: fetch,
  });

  const { data, isLoading } = query;

  return (
    <div className="w-full group p-2 lg:p-0">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-8">Đánh giá cao</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-8">
        {data?.map((item) => (
          <div key={item._id} className="">
            <CardStory id={item._id} num={item.quantityRating} genre={item.genre} desc={item.desc} img={item.thumbnail} author={item.author} title={item.title} rate={item.rating}  type="rate" />
          </div>
        ))}
      </div>
    </div>
  );
}
