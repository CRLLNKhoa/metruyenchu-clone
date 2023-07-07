import Link from "next/link";
import React from "react";
import NewUpdateItem from "./NewUpdateItem";
import { useQuery } from "@tanstack/react-query";
import * as ChapterService from "services/chapterService";
import { Grid, Progress } from "@nextui-org/react";
import Skeleton from "react-loading-skeleton";

export default function NewUpdate() {
  const fetch = async () => {
    const res = await ChapterService.getChapter();
    return res.data;
  };
  const query = useQuery({ queryKey: ["chapterN"], queryFn: fetch });
  const { isLoading, data, refetch } = query;

  console.log(data)
  return (
    <div className="group">
      <div className="flex w-full justify-between border-b">
        <h1 className="font-bold text-[18px] mb-4">Mới cập nhật</h1>
        <Link
          href="/"
          className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </Link>
      </div>
      <div className="flex flex-col gap-4 py-4">
        {data?.map((item) => (
          <NewUpdateItem
            idStory={item.storyId._id}
            genre={item.storyId.genre}
            storyName={item.storyId.title}
            title={item.title}
            idChapter={item._id}
            author={item.storyId.userId.displayName}
            time={item.createdAt}
            key={item._id}
          />
        ))}
        {isLoading && (Array.from(Array(10).keys()).map(item=><Skeleton key={item} />))}
      </div>
    </div>
    
  );
}
