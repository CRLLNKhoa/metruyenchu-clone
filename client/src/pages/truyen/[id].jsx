import Nominate from "components/Nominate";
import React, { Fragment, useEffect, useState } from "react";
import { BiGlassesAlt } from "react-icons/bi";
import { BsFillBookmarkFill } from "react-icons/bs";
import { IoMdFlower, IoMdSend } from "react-icons/io";
import { Tab } from "@headlessui/react";
import * as StoryService from "services/storyService";
import { useQuery } from "@tanstack/react-query";
import { AiFillStar } from "react-icons/ai";
import { ImBook } from "react-icons/im";
import {
  FaLayerGroup,
  FaSortNumericDown,
  FaSortNumericUpAlt,
} from "react-icons/fa";
import { BsFillCaretUpSquareFill } from "react-icons/bs";
import Link from "next/link";
import { useSelector } from "react-redux";
import CommentCard from "components/CommentCard";
import * as CommentService from "services/commentService";
import { useMutationHooks } from "hooks/useMutationHook";
import Head from "next/head";
import Fantab from "components/StoryDetail/Fantab";
import { GiRead } from "react-icons/gi";
import * as AuthService from "services/authService";
import Skeleton from "react-loading-skeleton";
import RateTab from "components/StoryDetail/RateTab";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const id = context.query.id;
  // Rest of `getServerSideProps` code
  return {
    props: {
      id,
    },
  };
}

Number.prototype.pad = function (size) {
  var s = String(this);
  while (s.length < (size || 2)) {
    s = "0" + s;
  }
  return s;
};

export default function Story({ id }) {
  const [sortChapter, setSortChapter] = useState(false);
  const auth = useSelector((state) => state.auth);
  const fetchStory = async () => {
    const res = await StoryService.getStoryDetail(id);
    return res.data;
  };

  // Get Story
  const [limit, setLimit] = useState(8);
  const query = useQuery({ queryKey: ["storyDT"], queryFn: fetchStory });
  const { isLoading, data, refetch: refetchStory } = query;
  const fetchCmts = async (context) => {
    const limit = context?.queryKey && context.queryKey[1];
    const res = await CommentService.getCommentStory(id, limit);
    return res.data;
  };

  const totalRating =
    Math.round(
      (data?.rating?.reduce(
        (acc, cur) =>
          acc +
          (cur.content + cur.character + cur.worldScene) / (data?.rating?.length*3),
        0
      )) *
        100
    ) / 100;

  // Get Comments
  const queryCmts = useQuery(["cmtsStory", limit], fetchCmts, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const {
    isLoading: isLoadingCmt,
    data: dataCmt,
    refetch,
    isPreviousData,
    isFetching,
  } = queryCmts;
  const chapterLength = data?.chapter?.length;
  // Comments
  const mutation = useMutationHooks((data) => CommentService.addComment(data));
  const { data: statusCmt } = mutation;
  const [comment, setComment] = useState({
    storyId: id,
    cmt: "",
    chapterNo: 1,
  });

  const send = () => {
    if (auth.id === "") {
      toast.warning("Bạn chưa đăng nhập!");
    } else {
      mutation.mutate({ ...comment, userId: auth.id });
      setComment({ ...comment, cmt: "" });
    }
  };

  useEffect(() => {
    if (statusCmt?.status === "OK") {
      refetch();
    }
  }, [statusCmt]);

  const handleFavorite = async (type) => {
    if (type === "favorite") {
      const q = await AuthService.favorite(auth?.id, {
        favoriteStories: data?._id,
      });
      await refetchStory();
    }
    if (type === "unfavorite") {
      const q = await AuthService.unfavorite(auth?.id, {
        favoriteStories: data?._id,
      });
      await refetchStory();
    }
  };

  // NOTE Read Story
  const readStory = useMutationHooks((data) => AuthService.read(data));
  const router = useRouter();

  const handleRead = (type) => {
    if (type === "old") {
      readStory.mutate({
        id: auth.id,
        data: {
          seenStory: id,
        },
      });
      router.push(`/chuong/${id}/${1}`);
    }
    if (type === "new") {
      readStory.mutate({
        id: auth.id,
        data: {
          seenStory: id,
        },
      });
      router.push(`/chuong/${id}/${data?.chapter?.length}`);
    }
  };

  return (
    <div className="bg-white w-[1200px] px-12 pb-12">
      <Head>
        <title>{data?.title}</title>
        <meta name="description" content="Checkout our cool page" key="desc" />
        <meta property="og:title" content="Social Title for Cool Page" />
        <meta
          property="og:description"
          content="And a social description for our cool page"
        />
        <meta property="og:image" content={data?.thumbnail} />
      </Head>
      {isLoading ? (
        <Skeleton count={10} />
      ) : (
        <div className="z-50 p-4 bg-white rounded-lg w-full text-black translate-y-[-140px] flex gap-8">
          <div>
            <img width={210} height={280} src={data?.thumbnail} alt="..." />
          </div>
          <div className="flex flex-col gap-8">
            <h1 className="text-[20px] font-semibold">{data?.title}</h1>
            <div className="flex gap-2 flex-wrap">
              <span className="border px-4 py-1 rounded-full border-sky-600 text-sky-600 text-[13px]">
                {data?.genre}
              </span>
              <span className="border px-4 py-1 rounded-full border-lime-600 text-lime-600  text-[13px]">
                {data?.character}
              </span>
              <span className="border px-4 py-1 rounded-full border-red-600 text-red-600 text-[13px]">
                {data?.progress}
              </span>
              <span className="border px-4 py-1 rounded-full border-pink-600 text-pink-600 text-[13px]">
                {data?.sect}
              </span>
              <span className="border px-4 py-1 rounded-full border-slate-600 text-slate-600 text-[13px]">
                {data?.worldScene}
              </span>
              <span className="border px-4 py-1 rounded-full border-[#8B6514] text-[#8B6514] text-[13px]">
                {data?.originalLook}
              </span>
            </div>
            <div className="flex gap-8 text-[14px]">
              <div className="flex flex-col">
                <span className="font-bold">
                  {data?.chapter?.length?.pad()}
                </span>
                <span>Chương</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">14</span>
                <span>Chương/tuần</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">
                  {data?.chapter?.reduce((acc, cur) => acc + cur.view, 0).pad()}
                </span>
                <span>Lượt đọc</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold">{data?.liked?.length.pad()}</span>
                <span>Lưu</span>
              </div>
            </div>
            <div className="text-[17px] flex items-center gap-2">
              <div className="flex text-yellow-300">
                <AiFillStar color={totalRating >= 1 ? "#FB923C" : "#E2E8F0"} />
                <AiFillStar color={totalRating >= 2 ? "#FB923C" : "#E2E8F0"} />
                <AiFillStar color={totalRating >= 3 ? "#FB923C" : "#E2E8F0"} />
                <AiFillStar color={totalRating >= 4 ? "#FB923C" : "#E2E8F0"} />
                <AiFillStar color={totalRating >= 5 ? "#FB923C" : "#E2E8F0"} />
              </div>
              <p className="text-[13px]">
                {totalRating}
                /5 ({data?.rating?.length} đánh giá)
              </p>
            </div>
            <div className="flex gap-4">
              {data?.chapter?.length > 0 && (
                <button
                  onClick={() => handleRead("old")}
                  className="flex transition-all duration-300 hover:bg-[#8b6514] font-semibold rounded-full items-center gap-2 bg-[#B78A28] px-6 py-2 text-white"
                >
                  <BiGlassesAlt size={26} />
                  Đọc truyện
                </button>
              )}
              {data?.chapter?.length > 0 && (
                <button
                  onClick={() => handleRead("new")}
                  className="flex transition-all duration-300 hover:bg-red-800 font-semibold rounded-full items-center gap-2 bg-red-600 px-6 py-2 text-white"
                >
                  <GiRead size={26} />
                  Đọc mới nhất
                </button>
              )}

              {data?.liked?.includes(auth?.id) ? (
                <button
                  onClick={() => handleFavorite("unfavorite")}
                  className="flex transition-all duration-300 hover:bg-[#666666] font-semibold rounded-full items-center gap-2 text-[#666666] bg-white px-6 border border-[#666666] py-2 hover:text-white"
                >
                  <BsFillBookmarkFill size={20} />
                  Bỏ đánh dấu
                </button>
              ) : (
                <button
                  onClick={() => handleFavorite("favorite")}
                  className="flex transition-all duration-300 hover:bg-[#666666] font-semibold rounded-full items-center gap-2 text-[#666666] bg-white px-6 border border-[#666666] py-2 hover:text-white"
                >
                  <BsFillBookmarkFill size={20} />
                  Đánh dấu
                </button>
              )}
              <button className="flex transition-all duration-300 hover:border-red-600 font-semibold rounded-full items-center gap-2 text-[#8B6514] bg-[#F7F5F0] px-6 border border-[#8B6514] py-2 hover:text-black">
                <IoMdFlower fill="#FAA9A6" size={26} />
                Đề cử
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="text-black px-4 translate-y-[-120px]">
        <Tab.Group>
          <Tab.List className="border-b-2 flex gap-8 pb-2 text-[18px] font-semibold">
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button className={selected ? "tab-active" : "tab"}>
                  Giới thiệu
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button className={selected ? "tab-active" : "tab"}>
                  Đánh giá
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "tab-active flex items-center gap-2"
                      : "tab flex items-center gap-2"
                  }
                >
                  D.s Chương{" "}
                  {
                    <p className="text-[13px] text-black bg-slate-200 px-2 rounded-full">
                      {data?.chapter.length}
                    </p>
                  }
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button
                  className={
                    selected
                      ? "tab-active flex items-center gap-2"
                      : "tab flex items-center gap-2"
                  }
                >
                  Bình luận{" "}
                  {
                    <p className="text-[13px] text-black bg-slate-200 px-2 rounded-full">
                      {data?.comments.length}
                    </p>
                  }
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                /* Use the `selected` state to conditionally style the selected tab. */
                <button className={selected ? "tab-active" : "tab"}>
                  Hâm mộ
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="col-span-2 flex gap-12 flex-col">
                  <p className="text-[13px]">{data?.description}</p>
                  <div className="text-[14px]">
                    <div className="flex items-center gap-16 border-b border-t py-4">
                      <h1 className="font-semibold w-[20%]">Cảm xúc</h1>
                      <div className="flex gap-6">
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-love.svg?v=1"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-like.svg?v=1"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-fun.svg?v=1"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-sad.svg?v=1"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-angry.svg?v=1"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                        <span className="flex items-center gap-2">
                          <img
                            width={28}
                            src="https://metruyencv.com/assets/images/icons/react-attack.svg"
                            alt=".."
                          />
                          <span>2</span>
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-16 py-4">
                      <h1 className="font-semibold w-[20%]">Đề cử</h1>
                      <div className="flex justify-between flex-1">
                        <span className="flex gap-2 items-center">
                          <IoMdFlower size={24} color="pink" />
                          12
                        </span>
                        <span className="text-[13px] font-bold">No. 102</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-16 py-4 border-b border-t">
                      <h1 className="font-semibold w-[20%]">Chương mới</h1>
                      <div className="flex justify-between flex-1">
                        <span>{data?.chapter[0]?.title}</span>
                        <span className="text-[12px]">
                          {data?.chapter[chapterLength - 1]?.createdAt?.slice(
                            0,
                            10
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[#F7F5F0] w-full p-4 flex flex-col justify-center items-center gap-2">
                  <img
                    src={data?.userId.avatar}
                    alt=""
                    className="rounded-full w-[64px] h-[64px]"
                  />
                  <h1 className="text-[13px] font-semibold mb-4">
                    {data?.userId.displayName}
                  </h1>
                  <div className="flex justify-between gap-8">
                    <div className="flex flex-col items-center">
                      <ImBook fill="#8B6514" />
                      <span className="text-[13px]">Số truyện</span>
                      <b className="text-[13px]">
                        {data?.userId?.storyWritten?.length.pad()}
                      </b>
                    </div>
                    <div className="flex flex-col items-center">
                      <FaLayerGroup fill="#8B6514" />
                      <span className="text-[13px]">Số chương</span>
                      <b className="text-[13px]">
                        {data?.userId?.storyWritten?.length.pad()}
                      </b>
                    </div>
                    <div className="flex flex-col items-center">
                      <BsFillCaretUpSquareFill fill="#8B6514" />
                      <span className="text-[13px]">Cấp</span>
                      <b className="text-[13px]">
                        {data?.userId?.storyWritten?.length.pad()}
                      </b>
                    </div>
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <RateTab idStory={id} />
            </Tab.Panel>
            <Tab.Panel>
              <div className="w-full flex justify-between py-4">
                <h1 className="text-[20px] font-semibold">Danh sách chương </h1>
                <button
                  onClick={() => setSortChapter(!sortChapter)}
                  className="text-[24px]"
                >
                  {sortChapter ? <FaSortNumericDown /> : <FaSortNumericUpAlt />}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {sortChapter ? (
                  <>
                    {data?.chapter?.map((item) => (
                      <Link
                        key={item._id}
                        href={`/chuong/${id}/${item?.chapterNo}`}
                        className="truncate flex gap-2 items-center cursor-pointer"
                      >
                        <span className="font-bold">
                          Chương {item?.chapterNo}:
                        </span>
                        <span className="text-[14px] truncate hover:text-[#8B6514]">
                          {item.title}
                        </span>
                        <span className="text-[11px] ml-auto">
                          {item.createdAt.slice(0, 10)}
                        </span>
                      </Link>
                    ))}
                  </>
                ) : (
                  <>
                    {data?.chapter?.toReversed().map((item) => (
                      <Link
                        key={item._id}
                        href={`/chuong/${id}/${item?.chapterNo}`}
                        className=" truncate flex gap-2 items-center cursor-pointer"
                      >
                        <span className="font-bold">
                          Chương {item?.chapterNo}:
                        </span>
                        <span className="text-[14px] truncate hover:text-[#8B6514]">
                          {item.title}
                        </span>
                        <span className="text-[11px] ml-auto">
                          {item.createdAt.slice(0, 10)}
                        </span>
                      </Link>
                    ))}
                  </>
                )}
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <div className="grid grid-cols-3 gap-4">
                <div className="w-full flex flex-col py-4 col-span-2">
                  <h1 className="text-[20px] font-semibold mb-2">
                    {data?.comments.length} Bình luận
                  </h1>
                  <div className="flex items-center gap-4">
                    <img
                      className="rounded-full w-[42px] h-[42px]"
                      src={
                        auth.avatar ||
                        "https://static.cdnno.com/user/default/200.jpg"
                      }
                      alt="..."
                    />
                    <div className="flex-1 relative">
                      <textarea
                        value={comment.cmt}
                        onChange={(e) =>
                          setComment({ ...comment, cmt: e.target.value })
                        }
                        className="w-full outline-none border-2 rounded-lg p-2 pr-10"
                        rows="2"
                      ></textarea>
                      <button
                        onClick={send}
                        className="absolute right-4 top-[50%] translate-y-[-50%] text-[36px] text-sky-600"
                      >
                        <IoMdSend />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col py-4 gap-4">
                    {dataCmt?.map((item) => (
                      <CommentCard
                        key={item._id}
                        name={item.userId.displayName}
                        cmt={item.cmt}
                        chapter={item.userId.chapterNo}
                        like={item.liked}
                        time={item.createdAt}
                        idCmt={item._id}
                        rs={refetch}
                        loading={isFetching}
                        replaydata={item.replay}
                        avatar={item.userId.avatar}
                      />
                    ))}
                  </div>
                  {data?.comments?.length > dataCmt?.length && (
                    <div className="flex justify-center">
                      <button
                        onClick={() => setLimit(limit + 6)}
                        className={`border border-black hover:border-[#B78A28] hover:bg-[#B78A28] hover:text-white w-[200px] px-4 py-2 rounded-full`}
                      >
                        {isPreviousData
                          ? "Đang tải thêm"
                          : "Xem thêm bình luận"}
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex flex-col pt-4 gap-4">
                  <div className="border-b pb-4">
                    <img
                      src="https://static.cdnno.com/storage/topbox/05d6bf31b6a87bf8a1d096ebf52f3248.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="border-b pb-4">
                    <img
                      src="https://static.cdnno.com/storage/topbox/db0ee8c7ead9c9e2c998f5d53bcd7b9e.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="border-b pb-4">
                    <img
                      src="https://static.cdnno.com/storage/topbox/f1ec33fbef50029b4177f7a62bcd9287.jpg"
                      alt="..."
                    />
                  </div>
                  <div className="border-b pb-4">
                    <img
                      src="https://static.cdnno.com/storage/topbox/7e1e920022cca08724c99f105201496f.jpg"
                      alt="..."
                    />
                  </div>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <Fantab />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
}
