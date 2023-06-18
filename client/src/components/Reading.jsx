import Link from "next/link";
import React from "react";
import CardStoreReading from "./CardStoreReading";
import { useQuery } from "@tanstack/react-query";
import * as StoryService from "services/storyService"
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/router";

export default function Reading() {
  const fetchStory = async () => {
    const res = await StoryService.getStory(5);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyR"], queryFn: fetchStory });
  const { isLoading, data, refetch } = query;

  const listReading = useSelector((state)=> state.auth)
  const reading = listReading?.seenStory
  const showData = data && [...reading,...data]
  
  const uniqueIds = [];
  
  const unique = showData?.filter(element => {
    const isDuplicate = uniqueIds.includes(element._id);
  
    if (!isDuplicate) {
      uniqueIds.push(element._id);
  
      return true;
    }
  
    return false;
  });

  const router = useRouter()
  const goto = () => {
      router.push({
        pathname: "tai-khoan",
        query: {
          tab: 2
        }
      })
  }
  

  return (
    <div className="border-b pb-8 group">
      <div className="flex w-full justify-between ">
        <h1 className="font-bold text-[18px] mb-4">Đang đọc</h1>
        <p
          onClick={goto}
          className="cursor-pointer text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
        >
          Xem tất cả
        </p>
      </div>
      <div className="flex flex-col gap-6">
        {unique?.map(item=><CardStoreReading key={item._id} thumbnail={item.thumbnail} title={item.title}/>)}
        {isLoading && (Array.from(Array(5).keys()).map(item=><Skeleton height={44} key={item} />))}
      </div>
    </div>
  );
}
