import Image from "next/image";
import { Inter } from "next/font/google";
import Nominate from "components/Nominate";
import Reading from "components/Reading";
import Guide from "components/Guide";
import NewUpdate from "components/NewUpdate";
import TopList from "components/TopList";
import TopRating from "components/TopRating";
import NewRating from "components/NewRating";
import NewComplete from "components/NewComplete";
import NewUp from "components/NewUp";
import 'react-loading-skeleton/dist/skeleton.css'
import Head from "next/head";
import * as StoryService from "services/storyService"
import { useQuery } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const fetchStory = async () => {
    const res = await StoryService.getStory(10);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyRaaa"], queryFn: fetchStory });
  const { isLoading, data, refetch } = query;
  return (
    <div className="bg-white w-full lg:w-[1200px] lg:px-12 pb-12">
       <Head>
        <title>Trang chủ - MTC</title>
      </Head>
      <div className="z-50 p-4 bg-white rounded-lg w-full text-black translate-y-[-140px] grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 col-span-1">
          <Nominate />
        </div>
        <div className="pl-4">
          <Reading />
          <Guide />
        </div>
      </div>
      <div className="text-black mt-[-120px] p-4">
        <NewUpdate />
      </div>
      <div className="text-black p-4 grid lg:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border p-4 rounded-lg shadow-md">
          <TopList data={data} type={"read"} title="Đọc nhiều tuần" />
        </div>
        <div className="border p-4 rounded-lg  shadow-md">
          <TopList data={data?.toReversed()} type={"populor"}  title="Thịnh hành tuần" />
        </div>
        <div className="border p-4 rounded-lg  shadow-md">
          <TopList data={data} type={"recomment"} title="Đề cử tuần" />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 text-black gap-6 mt-10">
        <div className="lg:col-span-2 col-span-1">
          <TopRating />
        </div>
        <div>
          <NewRating />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 grid-cols-1 text-black gap-0 lg:gap-6 mt-10">
        <div className="flex justify-center items-center col-span-1">
          <NewUp />
        </div>   
        <div className="col-span-2">
          <NewComplete />
        </div>
      </div>
  
    </div>
  );
}
