import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { useMutationHooks } from "hooks/useMutationHook";
import * as RatingService from "services/ratingService";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { MdEdit } from "react-icons/md";

export default function RateTab({ idStory }) {
  // State
  const auth = useSelector((state) => state.auth);
  const [rate, setRate] = useState({
    character: 0,
    worldScene: 0,
    content: 0,
    cmt: "",
  });

  // Get list Rating
  const [limit, setLimit] = useState(6);
  const fetch = async (context) => {
    const limit = context?.queryKey && context.queryKey[1];
    const res = await RatingService.getRating(idStory, limit);
    return res;
  };
  const query = useQuery(["listRating",limit], fetch, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const { isLoading: isLoadingList, data: dataList, refetch } = query;

  // Rating
  const fetchMyRating = async () => {
    const res = await RatingService.getMyRating(idStory, auth?.id);
    return res.data;
  };
  const queryMyRating  = useQuery({queryKey: ["myRating"],queryFn: fetchMyRating})
  const {data: myRating, refetch: rfMyRating} = queryMyRating

  useEffect(() => {
    if (myRating?.length > 0) {
      setRate({
        character: myRating[0].character,
        worldScene: myRating[0].worldScene,
        content: myRating[0].content,
        cmt: myRating[0].cmt,
      })
    }else {
        setRate({
          character: 0,
          worldScene: 0,
          content: 0,
          cmt: "",
        })
    }
  }, [myRating]);

  const mutation = useMutationHooks((data) => RatingService.addRating(data));
  const { isLoading, data } = mutation;

  const mutationUpdate = useMutationHooks((data) => RatingService.updateRating(data));
  const { isLoading: isLoadingUpdate, data:dataUpdate } = mutationUpdate;

  const handleRating = () => {
    if (auth.id === "") {
      toast.warning("Bạn cần đăng nhập!");
    } else {
      mutation.mutate({ ...rate, userId: auth.id, storyId: idStory })
    }
  };

  const handleUpdateRating = () => {
    if (auth.id === "") {
      toast.warning("Bạn cần đăng nhập!");
    } else {
      mutationUpdate.mutate({id: myRating[0]?._id, data: rate})
    }
  };

  useEffect(() => {
    if(data?.status ===  "OK"){
      toast.success("Đánh giá thành công!")
      refetch()
    }
  }, [data]);

  useEffect(() => {
    if(dataUpdate?.status ===  "OK"){
      toast.success("Đánh giá thành công!")
      refetch()
    }
  }, [dataUpdate]);

  return (
    <div className="grid grid-cols-3 gap-4 py-4">
      <div className="col-span-2">
        <div className="flex flex-col">
          <div className="bg-[#F7F5F0] text-[#b78a28] py-4 px-8 rounded-t-lg flex flex-col gap-4">
            <div className="flex gap-8 items-center">
              <p className="w-[30%]">Tính cách nhân vật: </p>
              <input
                type="range"
                value={rate.character}
                onChange={(e) =>
                  setRate({ ...rate, character: e.target.value })
                }
                min={0}
                max="5"
                step={0.5}
                className="range range-warning range-xs w-[50%]"
              />
              <p className="font-semibold ml-auto">{rate.character}</p>
            </div>
            <div className="flex gap-8 items-center">
              <p className="w-[30%]">Nội dung cốt truyện: </p>
              <input
                type="range"
                value={rate.content}
                onChange={(e) => setRate({ ...rate, content: e.target.value })}
                min={0}
                max="5"
                step={0.5}
                className="range range-warning range-xs w-[50%]"
              />
              <p className="font-semibold ml-auto">{rate.content}</p>
            </div>
            <div className="flex gap-8 items-center">
              <p className="w-[30%]">Bố cục thế giới: </p>
              <input
                type="range"
                value={rate.worldScene}
                onChange={(e) =>
                  setRate({ ...rate, worldScene: e.target.value })
                }
                min={0}
                max="5"
                step={0.5}
                className="range range-warning range-xs w-[50%]"
              />
              <p className="font-semibold ml-auto">{rate.worldScene}</p>
            </div>
          </div>
          <div className="relative">
            <textarea
              className="p-2 border-2 w-full outline-none pr-16"
              rows="4"
              cols="4"
              placeholder="Đánh giá về truyện này"
              value={rate.cmt}
              onChange={(e) => setRate({ ...rate, cmt: e.target.value })}
            ></textarea>
            {myRating?.length === 1 ? (
              <button
                onClick={handleUpdateRating}
                className="absolute right-[20px] top-[50%] translate-y-[-50%] bg-[#B78A28] hover:bg-[#8B6514] text-white p-2 rounded-full text-[20px] flex items-center justify-center"
              >
                <MdEdit />
              </button>
            ) : (
              <button
                onClick={handleRating}
                className="absolute right-[20px] top-[50%] translate-y-[-50%] bg-[#B78A28] hover:bg-[#8B6514] text-white p-2 rounded-full text-[20px] flex items-center justify-center"
              >
                <IoMdSend />
              </button>
            )}
          </div>
        </div>
        {isLoadingList ? (
          <span className="loading  loading-dots loading-lg"></span>
        ) : (
          <div className="flex flex-col gap-4 mt-4">
            <h1>Danh sách đánh giá: </h1>
            {dataList?.data?.length === 0 && <div className="w-full flex justify-center text-[12px] italic">
              <p>Chưa có đánh giá</p>
            </div>}
            {dataList?.data?.map((item) => (
              <RatingCard key={item._id} props={item} />
            ))}
            {(dataList?.data?.length >= limit) && <button className="mt-2 text-sky-800" onClick={()=>setLimit(limit+6)}>Xem thêm đánh giá</button>}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        <div className="bg-[#F7F5F0] text-[#b78a28] p-4 rounded-lg">
          <div className="flex items-center pb-2 border-b">
            <p className="text-[15px] w-[50%] font-semibold">
              Đã có {dataList?.data?.length} đánh giá
            </p>
            <div className="text-[18px] flex items-center flex-1 justify-between gap-2">
              <div className="flex pl-4 text-yellow-300">
                <AiFillStar
                  color={dataList?.avg?.total >= 1 ? "#FB923C" : "#E2E8F0"}
                />
                <AiFillStar
                  color={dataList?.avg?.total >= 2 ? "#FB923C" : "#E2E8F0"}
                />
                <AiFillStar
                  color={dataList?.avg?.total >= 3 ? "#FB923C" : "#E2E8F0"}
                />
                <AiFillStar
                  color={dataList?.avg?.total >= 4 ? "#FB923C" : "#E2E8F0"}
                />
                <AiFillStar
                  color={dataList?.avg?.total >= 5 ? "#FB923C" : "#E2E8F0"}
                />
              </div>
              <p className="text-[14px] font-semibold">
                {dataList?.avg?.total}
              </p>
            </div>
          </div>
          <div className="flex flex-col pt-4">
            <div className="flex justify-between items-center pb-2">
              <p className="text-[15px] w-[50%]">Tính cách nhân vật:</p>
              <div className="text-[18px] flex items-center flex-1 justify-between gap-2">
                <div className="flex pl-4 text-yellow-300">
                  <AiFillStar
                    color={
                      dataList?.avg?.character >= 1 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.character >= 2 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.character >= 3 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.character >= 4 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.character >= 5 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                </div>
                <p className="text-[12px]">{dataList?.avg?.character}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2">
              <p className="text-[15px] w-[50%]">Nội dung cốt truyện:</p>
              <div className="text-[18px] flex items-center flex-1 justify-between gap-2">
                <div className="flex pl-4 text-yellow-300">
                  <AiFillStar
                    color={dataList?.avg?.content >= 1 ? "#FB923C" : "#E2E8F0"}
                  />
                  <AiFillStar
                    color={dataList?.avg?.content >= 2 ? "#FB923C" : "#E2E8F0"}
                  />
                  <AiFillStar
                    color={dataList?.avg?.content >= 3 ? "#FB923C" : "#E2E8F0"}
                  />
                  <AiFillStar
                    color={dataList?.avg?.content >= 4 ? "#FB923C" : "#E2E8F0"}
                  />
                  <AiFillStar
                    color={dataList?.avg?.content >= 5 ? "#FB923C" : "#E2E8F0"}
                  />
                </div>
                <p className="text-[12px]">{dataList?.avg?.content}</p>
              </div>
            </div>
            <div className="flex justify-between items-center pb-2">
              <p className="text-[15px] w-[50%]">Bố cục thế giới:</p>
              <div className="text-[18px] flex items-center flex-1 justify-between gap-2">
                <div className="flex pl-4 text-yellow-300">
                  <AiFillStar
                    color={
                      dataList?.avg?.worldScene >= 1 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.worldScene >= 2 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.worldScene >= 3 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.worldScene >= 4 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                  <AiFillStar
                    color={
                      dataList?.avg?.worldScene >= 5 ? "#FB923C" : "#E2E8F0"
                    }
                  />
                </div>
                <p className="text-[12px]">{dataList?.avg?.worldScene}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="text-[#b78a28] bg-[#F7F5F0] p-4">
          <h1 className="text-[15px] font-semibold mb-4">Lưu ý khi đánh giá</h1>
          <ul className="list-decimal text-[13px] italic pl-4 space space-y-4">
            <li>Không được dẫn link hoặc nhắc đến website khác</li>
            <li>
              Không được có những từ ngữ gay gắt, đả kích, xúc phạm người khác
            </li>
            <li>
              Đánh giá hoặc bình luận không liên quan tới truyện sẽ bị xóa
            </li>
            <li>
              Đánh giá hoặc bình luận chê truyện một cách chung chung không mang
              lại giá trị cho người đọc sẽ bị xóa
            </li>
            <li>Đánh giá có điểm số sai lệch với nội dung sẽ bị xóa</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

const RatingCard = ({ props }) => {
  const rate = Math.round(
    (props.worldScene + props.character + props.content) / 3 * 100
  )/100;
  const [show,setShow] = useState(false)
  return (
    <div className="flex items-start gap-4 py-4 px-4 bg-[#F7F5F0] rounded-lg">
      <div className="relative w-[42px] h-[42px]">
        <img
          className="rounded-full w-[42px] h-[42px]"
          src={props.userId.avatar}
          alt="..."
        />
        <span className="bg-[#B78A28] absolute bottom-[-6px] font-semibold text-white rounded-full flex justify-center text-[10px] left-0 right-0">
          Cấp {props.userId.exp}
        </span>
      </div>
      <div className="flex flex-col flex-1 gap-2">
        <h1>{props.userId.displayName}</h1>
        <div className="flex gap-4 items-center">
          <div className="text-[14px] flex items-center gap-2">
            <div className="flex text-yellow-300">
              <AiFillStar color={rate >= 1 ? "#FB923C" : "#E2E8F0"} />
              <AiFillStar color={rate >= 2 ? "#FB923C" : "#E2E8F0"} />
              <AiFillStar color={rate >= 3 ? "#FB923C" : "#E2E8F0"} />
              <AiFillStar color={rate >= 4 ? "#FB923C" : "#E2E8F0"} />
              <AiFillStar color={rate >= 5 ? "#FB923C" : "#E2E8F0"} />
            </div>
            <p className="text-[12px]">{rate}</p>
          </div>
          <span className="flex text-[12px] items-center gap-1">
            <BiTimeFive /> <p>{props.createdAt.slice(0, 10)}</p>
          </span>
        </div>
        <span className="text-[14px]">{(props.cmt).slice(0,show?99999999:240)}... <span className="text-sky-800 cursor-pointer" onClick={()=> setShow(!show)}>{props?.cmt?.length > 240 && ((show === false) ? "Đọc thêm" : "Rút gọn")}</span></span>
      </div>
    </div>
  );
};
