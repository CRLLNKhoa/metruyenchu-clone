import React, { useEffect, useState } from "react";
import { BiTimeFive, BiGlassesAlt } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { BsFillReplyFill } from "react-icons/bs";
import { MdReport } from "react-icons/md";
import { useSelector } from "react-redux";
import { useMutationHooks } from "hooks/useMutationHook";
import * as CommentService from "services/commentService";
import { Loading } from "@nextui-org/react";
import { IoMdSend } from "react-icons/io";

export default function CommentCard({
  cmt = "",
  name,
  chapter = 0,
  time = "",
  like = [],
  idCmt,
  rs,
  loading,
  replaydata,
  avatar
}) {
  const [num, setNum] = useState(300);
  const auth = useSelector((state) => state.auth);
  const unlikeApi = useMutationHooks((data) => CommentService.unLike(data));
  const likeApi = useMutationHooks((data) => CommentService.like(data));
  const replayApi = useMutationHooks((data) => CommentService.replay(data));
  const handleLike = (id, userId) => {
    if (like.includes(userId)) {
      unlikeApi.mutate({ id: id, userId: userId });
    } else {
      likeApi.mutate({ id: id, userId: userId });
    }
  };

  const [replay, setReplay] = useState({
    cmt: "",
  });

  useEffect(() => {
    if (replayApi?.data?.status === "OK") {
      rs();
    }
  }, [replayApi?.data]);

  useEffect(() => {
    if (likeApi?.data?.status === "OK") {
      rs();
    }
  }, [likeApi?.data]);

  useEffect(() => {
    if (unlikeApi?.data?.status === "OK") {
      rs();
    }
  }, [unlikeApi?.data]);

  const [isShow, setShow] = useState(false);
  const [isShowReplay, setIsShowReplay] = useState(3);
  return (
    <div className="flex gap-4 items-start pb-2">
      <div className="relative w-[42px]">
        <img
          className="rounded-full w-[42px] h-[42px]"
          src={avatar}
          alt="..."
        />
        <span className="bg-[#B78A28] absolute bottom-[-6px] font-semibold text-white rounded-full flex justify-center text-[10px] left-0 right-0">
          Cấp 0
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <h1 className="font-bold">{name}</h1>
        <div className="flex gap-12">
          <span className="flex text-[10px] items-center gap-2">
            <BiTimeFive />
            {time.slice(0, 10)}
          </span>
          <span className="flex text-[10px] items-center gap-2">
            <BiGlassesAlt />
            Chương {chapter}
          </span>
        </div>
        <div className="border-t pt-2">
          <p className="text-left">
            {cmt.slice(0, num)}
            {num !== 300000 && num < 300 && (
              <button onClick={() => setNum(300000)}>...Đọc thêm</button>
            )}
          </p>
        </div>
        <div className="flex justify-end gap-8 text-slate-400">
          <span
            onClick={() => handleLike(idCmt, auth.id)}
            className={`${
              like.includes(auth.id) && (auth.theme === 6 ? "text-red-600" : "text-black")
            } flex items-center gap-2 cursor-pointer`}
          >
            <AiFillLike /> {like.length}
          </span>
          <span
            onClick={() => setShow(!isShow)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <BsFillReplyFill /> Trả lời
          </span>
          <span className="flex items-center gap-2 cursor-pointer">
            <MdReport /> Báo xấu
          </span>
        </div>
        <div className=" w-full">
          {isShow && (
            <div className="flex w-full gap-4 items-center">
              <img
                src={auth.avatar}
                alt="..."
                className="rounded-full w-10 h-10"
              />
              <div className="flex-1 w-full border-2 flex relative">
                <textarea
                  onChange={(e) =>
                    setReplay({ ...replay, cmt: e.target.value })
                  }
                  className="w-full h-full ab outline-none p-2 text-[14px] pr-10"
                  placeholder="Trả lời..."
                ></textarea>
                <button
                  onClick={() => {
                    replayApi.mutate({
                      id: idCmt,
                      body: { cmt: replay.cmt, userId: auth.id },
                    });
                    setShow(false), setReplay({ ...replay, cmt: "" });
                  }}
                  className="absolute right-4 top-[50%] translate-y-[-50%] text-[#B78A28] text-[24px]"
                >
                  <IoMdSend />
                </button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-8 mt-6 mb-6">
            {replaydata?.map((item, index) => (
              <div
              key={item._id}
                className={`${
                  index < replaydata.length - isShowReplay && "hidden"
                } flex gap-4 pb-4`}
              >
                <div className="w-10 h-10 rounded-full relative">
                  <img
                    src={item.userId.avatar}
                    alt="..."
                    className="rounded-full w-[42px] h-[42px]"
                  />
                  <span className="absolute bottom-[-6px] bg-[#B78A28] rounded-full text-white text-[10px] left-0 right-0 flex justify-center">
                    Cấp 0
                  </span>
                </div>
                <div className="flex flex-col flex-1">
                  <h1 className="text-[13px] font-semibold">
                    {item.userId.displayName}
                  </h1>
                  <span className="text-[10px]">Đã trả lời: {name}</span>
                  <p className="text-[14px] mt-2 border-t pt-2">{item.cmt}</p>
                </div>
              </div>
            ))}
            {replaydata.length > 3 && isShowReplay === 3 && (
              <button
                className="text-sky-600 text-[13px]"
                onClick={() => setIsShowReplay(10000)}
              >
                Bình luận củ hơn
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
