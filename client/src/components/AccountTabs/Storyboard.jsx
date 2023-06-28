import { Loading } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "hooks/useMutationHook";
import Link from "next/link";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import * as AuthSerice from "services/authService";

export default function Storyboard({ userId }) {
  const [tab, setTab] = useState(1);
  const auth = useSelector((state) => state.auth);

  // NOTE READING
  const fetchStory = async () => {
    const res = await AuthSerice.getReading(auth.id);
    return res.data;
  };
  const query = useQuery({ queryKey: ["storyReadz"], queryFn: fetchStory });
  const { isLoading, data, refetch } = query;
  // NOTE FAVORITE
  const fetchStoryF = async () => {
    const res = await AuthSerice.getFavorite(auth.id);
    return res.data;
  };
  const queryF = useQuery({
    queryKey: ["storyfavorite"],
    queryFn: fetchStoryF,
  });
  const { isLoading: isLoadingF, data: dataF, refetch: refetchF } = queryF;

  return (
    <div className="flex flex-col">
      <div className="flex gap-8">
        <span
          onClick={() => setTab(1)}
          className={`${
            tab === 1 &&
            "border-b-4 pb-1 border-[#987221] text-[#987221] cursor-pointer font-bold"
          } cursor-pointer`}
        >
          Đang đọc
        </span>
        <span
          onClick={() => setTab(2)}
          className={`${
            tab === 2 &&
            "border-b-4 pb-1 border-[#987221] text-[#987221] cursor-pointer font-bold"
          } cursor-pointer`}
        >
          Đánh dấu
        </span>
      </div>
      {tab === 1 && (
        <div className="flex flex-col gap-4 py-6">
          {isLoading && (
            <div className="text-[#987221] h-[200px] items-center justify-center flex">
              <Loading color="currentColor" />
            </div>
          )}
          {data?.seenStory?.map((item) => (
            <Item
              key={item._id}
              chapter={item?.chapter?.length}
              img={item.thumbnail}
              title={item.title}
              id={item._id}
              readed={item.chapter_readed}
            />
          ))}
        </div>
      )}
      {tab === 2 && (
        <div className="flex flex-col py-6 gap-4">
          {isLoadingF && (
            <div className="text-[#987221] h-[200px] items-center justify-center flex">
              <Loading color="currentColor" />
            </div>
          )}
          {dataF?.favoriteStories?.map((item) => (
            <Item
              key={item._id}
              chapter={item?.chapter?.length}
              img={item.thumbnail}
              title={item.title}
              id={item._id}
              readed={item.chapter_readed}
              type
              refetchF={refetchF}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const Item = ({
  title = "Tên truyện",
  img = "https://static.cdnno.com/poster/cac-nguoi-tu-tien-ta-lam-ruong/150.jpg?1684303575",
  chapter = 0,
  id = 0,
  type,
  refetchF,readed=0
}) => {
  const auth = useSelector((state) => state.auth);
  // NOTE UNFAVORITE
  const handleDelete = async () => {
    const q = await AuthSerice.unfavorite(auth?.id, { favoriteStories: id });
    await refetchF();
  };

  return (
    <div className="flex gap-4 items-center cursor-pointer group">
      <img className="w-[48px] h-[62px]" src={img} alt=".." />
      <div className="flex flex-col flex-1">
        <Link
          href={`/truyen/${id}`}
          className="text-[14px] font-bold group-hover:text-[#987221]"
        >
          {title}
        </Link>
        <span className="text-[12px]">Đã đọc: {readed} / {chapter}</span>
      </div>
      {type && (
        <span onClick={handleDelete} className="hover:text-red-500">
          <MdDelete />
        </span>
      )}
    </div>
  );
};
