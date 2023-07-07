import Link from "next/link";
import React from "react";
import CardStory from "./CardStory";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "services/storyService";
import Skeleton from "react-loading-skeleton"; 

export default function NewComplete() {
  const fetchStory = async () => {
    const res = await StoryService.getStory(8);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyNC"], queryFn: fetchStory });
  const { isLoading, data, refetch } = query;
  return (
    <div className="w-full p-2  lg:p-0 group">
      <div className="flex w-full justify-between">
        <h1 className="font-bold text-[18px] mb-4">Mới hoàn thành</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
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
