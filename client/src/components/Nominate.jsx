import Link from "next/link";
import React from "react";
import CardStory from "./CardStory";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "services/storyService";
import Skeleton from "react-loading-skeleton";

export default function Nominate() {
  const fetchStory = async () => {
    const res = await StoryService.getStory(8);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyN"], queryFn: fetchStory });
  const { isLoading, data } = query;
  return (
    <div className="w-full  group">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-4">Biên tập viên đề cử</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      {data && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {data?.map((item) => (
            <CardStory
              key={item._id}
              id={item._id}
              title={item.title}
              img={item.thumbnail}
              desc={item.description}
              genre={item.genre}
              author={item?.userId?.displayName}
            />
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {isLoading && (
          <>
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
            <Skeleton height={120} />
          </>
        )}
      </div>
    </div>
  );
}
