import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  BsArrowUpCircle,
  BsSoundwave,
  BsGift,
  BsFlower2,
  BsChatLeft,
} from "react-icons/bs";
import { BiLike } from "react-icons/bi";
import { AiFillCaretDown } from "react-icons/ai";
import { Pagination } from "@nextui-org/react";
import CardStoryRank from "components/CardStoryRank";
import * as StoryService from "services/storyService";
import { useQuery } from "@tanstack/react-query";

export default function BangXepHang() {
  const router = useRouter();
  const [tab, setTab] = useState(router.query.tab || "createdAt");
  const arr = [
    {
      value: 1,
      label: "Theo Ngày",
    },
    {
      value: 2,
      label: "Theo Tuần",
    },
    {
      value: 3,
      label: "Theo Tháng",
    },
  ];
  const [time, setTime] = useState(arr[0]);

  // NOTE List
  const [page, setPage] = useState(0);

  const fetch = () => {
    const res = StoryService.getRank(10, page,tab);
    return res;
  };

  const result = useQuery({
    queryKey: ["projects", page,tab],
    queryFn: fetch,
    keepPreviousData: true,
  });

  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    result;

  // NOTE GO TO Top
  const scroll = () => {
    const section = document.querySelector("#header");
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    scroll();
  }, [page]);

  return (
    <>
      {/* NOTE Header */}
      <Head>
        <title>Bảng xếp hạng MeTruyenChu</title>
      </Head>
      <div className="bg-white w-[1200px] px-12 pb-12">
        <div className="z-50 p-4 bg-white rounded-lg w-full text-black translate-y-[-140px] flex gap-8">
          <div className="grid w-full grid-cols-4 gap-4">
            {/* NOTE TAB */}
            <div className="flex flex-col">
              <span
                onClick={() => setTab("createdAt")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "createdAt" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BsArrowUpCircle />
                Thịnh hành
              </span>
              <span
                onClick={() => setTab("view")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "view" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BsSoundwave />
                Đọc nhiều
              </span>
              {/* <span onClick={()=>setTab(3)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===3?"tab-account-index":"tab-account"}`}><AiOutlineSetting size={20} />Cài đặt</span> */}
              <span
                onClick={() => setTab("updatedAt")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "updatedAt" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BsGift />
                Tặng thưởng
              </span>
              <span
                onClick={() => setTab("_id")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "_id" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BsFlower2 />
                Đề cử
              </span>
              <span
                onClick={() => setTab("yeu-thich")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "yeu-thich" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BiLike />
                Yêu thích
              </span>
              <span
                onClick={() => setTab("isComplete")}
                className={`cursor-pointer p-3 flex gap-2 items-center ${
                  tab === "isComplete" ? "tab-account-index" : "tab-account"
                }`}
              >
                <BsChatLeft />
                Thảo luận
              </span>
            </div>
            {/* NOTE CONTENT */}
            <div className="col-span-3 flex flex-col">
              {/* NOTE Content - header */}
              <div id="header" className="w-full flex justify-end">
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="flex m-1 text-[14px] cursor-pointer"
                  >
                    Xếp hạng:{" "}
                    <b className="flex ml-4 items-center text-[13px] gap-2">
                      {time.label} <AiFillCaretDown size={10} />
                    </b>
                  </label>
                  <ul
                    tabIndex={0}
                    className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36"
                  >
                    <li
                      className="hover:bg-[#B78A28] hover:text-white"
                      onClick={() => setTime(arr[0])}
                    >
                      <a>Theo ngày</a>
                    </li>
                    <li
                      className="hover:bg-[#B78A28] hover:text-white"
                      onClick={() => setTime(arr[1])}
                    >
                      <a>Theo tuần</a>
                    </li>
                    <li
                      className="hover:bg-[#B78A28] hover:text-white"
                      onClick={() => setTime(arr[2])}
                    >
                      <a>Theo tháng</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* NOTE Body CONTENT  */}
              {isLoading ? (
                <div className="p-8 flex flex-col gap-8">
                  <div className="w-full flex flex-col items-center">
                  <progress className="progress w-56"></progress>
                  <i>Đang tải thông tin!</i>
                  </div>
                </div>
              ) : (
                <div className="p-8 flex flex-col gap-8">
                  {data?.data?.map((item, index) => (
                    <CardStoryRank
                    key={item._id}
                    id={item._id}
                      index={index}
                      title={item.title}
                      genre={item.genre}
                      desc={item.description}
                      author={item.userId.displayName}
                      num={item.view}
                      page={page}
                      thumbnail={item.thumbnail}
                      icon={<BsArrowUpCircle size={12} />}
                    />
                  ))}
                </div>
              )}

              {/* NOTE Content Paginate */}
              <div className="w-full flex justify-end">
                <Pagination
                  onChange={(page) => setPage(page - 1)}
                  color="warning"
                  total={data?.totalPage}
                  initialPage={1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
