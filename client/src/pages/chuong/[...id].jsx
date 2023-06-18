import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  BsArrowRight,
  BsArrowLeft,
  BsCaretRightSquareFill,
  BsCaretLeftSquareFill,
} from "react-icons/bs";
import { Loading, Tooltip } from "@nextui-org/react";
import { FaBars } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import * as ChapterService from "services/chapterService";
import { FaBook, FaFont, FaTextHeight } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { BiText, BiTime } from "react-icons/bi";
import {
  AiOutlineHeart,
  AiOutlineSetting,
  AiOutlineArrowLeft,
  AiOutlineInfoCircle,
  AiOutlineFontSize,
} from "react-icons/ai";
import parse from "html-react-parser";
import { BsBookmark, BsChatDots } from "react-icons/bs";
import { useMutationHooks } from "hooks/useMutationHook";
import { MdColorLens } from "react-icons/md";
import { themeColor } from "../../../untils";
import { useDispatch, useSelector } from "react-redux";
import authSlice, { updateTheme } from "redux/slice/authSlice";
import { useRouter } from "next/router";
import * as AuthService from "services/authService";
import { toast } from "react-toastify";
import {IoMdSend} from "react-icons/io"
import * as CommentService from "services/commentService"
import CommentCard from "components/CommentCard";
import Skeleton from "react-loading-skeleton";

export async function getServerSideProps(context) {
  const id = context.query.id;
  // Rest of `getServerSideProps` code
  return {
    props: {
      id,
    },
  };
}

export default function Chapter({ id }) {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  // NOTE State
  const [setting, setSetting] = useState({
    fontSize: 20,
    font: "font-mono",
    space: 1,
  });
  const dispatch = useDispatch();
  const [theme, setTheme] = useState(themeColor[6]);

  // NOTE Handle Setting
  const handleSpace = (action) => {
    if (action === "pluss") {
      if (setting.space === 5) {
        setSetting({ ...setting, space: 5 });
      } else setSetting({ ...setting, space: setting.space + 1 });
    }
    if (action === "sub") {
      if (setting.space === 1) {
        setSetting({ ...setting, space: 1 });
      } else setSetting({ ...setting, space: setting.space - 1 });
    }
  };

  // NOTE Get Chapter
  const fetchChapter = async () => {
    const res = await ChapterService.getChapterDetail(id[0], id[1]);
    return res;
  };
  const query = useQuery({
    queryKey: ["chapterDetail"],
    queryFn: fetchChapter,
  });
  const { isLoading, data, refetch } = query;

  useEffect(() => {
    refetch();
  }, [id]);

  // NOTE Handle list chapter
  const fetchListChapter = useMutationHooks((data) =>
    ChapterService.getListChapter(data)
  );
  const { data: dataList, isLoading: isLoadingListChapter } = fetchListChapter;
  const handleListChapter = () => {
    window.my_modal_2.showModal();
    fetchListChapter.mutate(id[0]);
  };

  // NOTE Hanlde show action
  const [isShowAction, setIsShowAction] = useState(false);

  // NOTE Handle Favorite
  const [noticationF, setNoticationF] = useState();
  const handleFavorite = async (type) => {
    if (type === "favorite") {
      const q = await AuthService.favorite(auth?.id, {
        favoriteStories: id[0],
      });
      toast.success("Đánh dấu thành công!");
    }
    if (type === "unfavorite") {
      const q = await AuthService.unfavorite(auth?.id, {
        favoriteStories: id[0],
      });
    }
  };

  // NOTE CMT   
  const [limit, setLimit] = useState(6);
  const fetchCmts = async (context) => {
    const limit = context?.queryKey && context.queryKey[1];
    const res = await CommentService.getCommentStoryPageChapter(id[0], limit,id[1]);
    return res;
  };
  // Get Comments
  const queryCmts = useQuery(["cmtsStory", limit], fetchCmts, {
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true,
  });
  const {
    isLoading: isLoadingCmt,
    data: dataCmt,
    refetch: refetchCMT,
    isPreviousData,
    isFetching,
  } = queryCmts;
  // Comments
  const mutation = useMutationHooks((data) => CommentService.addComment(data));
  const { data: statusCmt } = mutation;
  const [comment, setComment] = useState({
    storyId: id[0],
    cmt: "",
    chapterNo: id[1],
  });

  const send = () => {
    if(auth.id === ""){
      toast.warning("Bạn chưa đăng nhập!")
    }else{
      mutation.mutate({ ...comment, userId: auth.id });
      setComment({ ...comment, cmt: "" });
    }
  };

  useEffect(() => {
    refetchCMT()
    setComment({ ...comment, chapterNo: id[1] });
  }, [id[1]]);

  useEffect(() => {
    if (statusCmt?.status === "OK") {
      refetchCMT();
    }
  }, [statusCmt?.status]);

  // NOTE GO TO CMT
  const scroll = () => {
    const section = document.querySelector( '#cmts' );
    section.scrollIntoView( { behavior: 'smooth', block: 'start' } );
  };

  // NOTE Handle View
  useEffect(() => {
    if(data?.status === "OK"){
      const timer = setTimeout(() => {
          ChapterService.view(data?.data?._id)
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [data,id[1]]);

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        auth.theme === 6 && "bg-black"
      } w-full`}
    >
      {/* NOTE SEO */}
      <Head>
        <title>{`Chương ${data?.data?.chapterNo || "..."}: ${
          data?.data?.title || "..."
        }`}</title>
      </Head>

      {/* NOTE Setting */}
      <div
        className={`bg-[${theme.body}] ${
          auth.theme === 6 && "text-white"
        } fixed top-[100px] flex-col right-0 z-50 rounded-l-lg flex justify-center`}
      >
        <div className="tooltip tooltip-left" data-tip="Danh sách chương">
          <button
            onClick={handleListChapter}
            className="border-b-2 border-slate-200 p-4"
          >
            <FaBars />
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Cài đặt hiển thị">
          <button
            onClick={() => window.my_modal_3.showModal()}
            className="border-b-2 border-slate-200 p-4"
          >
            <AiOutlineSetting />
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Thông tin truyện">
          <Link
            href={`/truyen/${id[0]}`}
            className="border-b-2 border-slate-200 flex justify-center p-4"
          >
            <AiOutlineArrowLeft />
          </Link>
        </div>
        <div className="tooltip tooltip-left" data-tip="Hướng dẫn">
          <button onClick={() => window.my_modal_1.showModal()} className="p-4">
            <AiOutlineInfoCircle />
          </button>
        </div>
      </div>

      {/* NOTE Action */}
      <div
        className={`bg-[${theme.body}] ${
          auth.theme === 6 && "text-white"
        } fixed bottom-[20px] flex-col right-0 z-50 rounded-l-lg flex justify-center`}
      >
        <div
          className={`absolute z-50 ${
            isShowAction ? "right-[60px]" : "right-[-600px]"
          } transition-all duration-300 top-[15%] translate-y-[-50%] bg-white h-12 rounded-full flex items-center p-2 gap-4 shadow-md z-40`}
        >
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-love.svg?v=1"
              alt=""
            />
          </div>
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-like.svg?v=1"
              alt=""
            />
          </div>
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-fun.svg?v=1"
              alt=""
            />
          </div>
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-sad.svg?v=1"
              alt=""
            />
          </div>
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-angry.svg?v=1"
              alt=""
            />
          </div>
          <div className="w-[32px] h-[32px]">
            <img
              className="w-[32px] h-[32px]"
              src="https://metruyencv.com/assets/images/icons/react-attack.svg"
              alt=""
            />
          </div>
        </div>
        <div className="tooltip tooltip-left">
          <button
            onClick={() => setIsShowAction(!isShowAction)}
            className="border-b-2 border-slate-200 p-4 z-50"
          >
            <AiOutlineHeart />
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Đánh dấu">
          <button
            onClick={() => handleFavorite("favorite")}
            className="border-b-2 border-slate-200 p-4"
          >
            <BsBookmark />
          </button>
        </div>
        <div className="tooltip tooltip-left" data-tip="Bình luận">
          <button onClick={scroll} className="p-4">
            <BsChatDots />
          </button>
        </div>
      </div>

      <div className={`bg-[${theme.bg}] w-[1200px] px-12 pb-12`}>
        <div
          className={`z-50 p-8 bg-[${
            theme.body
          }] flex-col mt-10 rounded-lg w-full ${
            auth.theme === 6 && "text-white"
          } flex gap-8`}
        >
          {/* NOTE Next Prev */}
          <div className="w-full flex justify-between">
            <Link
              href={data?.prev?.link || "/"}
              className={
                data?.prev?.hidden
                  ? "border cursor-default border-slate-200 opacity-0 text-slate-400 flex items-center gap-2 px-4 py-1 rounded-full"
                  : `border ${
                      auth.theme === 6 ? "border-white" : "border-black"
                    } flex items-center gap-2 px-4 py-1 rounded-full`
              }
            >
              <BsArrowLeft />
              Chương trước
            </Link>
            <Link
              href={data?.next?.link || "/"}
              className={
                data?.next?.hidden
                  ? "border opacity-0 cursor-default border-slate-200 text-slate-400 flex items-center gap-2 px-4 py-1 rounded-full"
                  : `border ${
                      auth.theme === 6 ? "border-white" : "border-black"
                    } flex items-center gap-2 px-4 py-1 rounded-full`
              }
            >
              Chương sau <BsArrowRight />
            </Link>
          </div>
          {/* NOTE Info */}
          <div className="flex flex-col">
            <h1 className="text-[32px] mb-2 font-semibold">
              Chương {data?.data?.chapterNo}: {data?.data?.title}
            </h1>
            <div
              className={`flex flex-wrap text-[15px] gap-4 mb-8 border-b border-[${theme.text}] pb-2`}
            >
              <span className="flex items-center gap-2">
                <FaBook /> {data?.data?.storyId?.title}
              </span>
              <span className="flex items-center gap-2">
                <FaUserEdit /> {data?.data?.storyId?.userId?.displayName}
              </span>
              <span className="flex items-center gap-2">
                <BiText /> {data?.length} chữ
              </span>
              <span className="flex items-center gap-2">
                <AiOutlineHeart /> 8 cảm xúc
              </span>
              <span className="flex items-center gap-2">
                <BiTime /> {data?.data?.createdAt?.slice(0, 10)}
              </span>
            </div>
            <div
              className={`text-[${setting.fontSize}px] ${setting.font} space-y-${setting.space} select-none`}
            >
              {data?.data && parse(data?.data?.content)}
              {isLoading && <Skeleton count={20} />}
            </div>
          </div>
          {/* NOTE Next Prev */}
          <div className="w-full flex justify-between">
            <Link
              href={data?.prev?.link || "/"}
              className={
                data?.prev?.hidden
                  ? "border cursor-default border-slate-200 opacity-0 text-slate-400 flex items-center gap-2 px-4 py-1 rounded-full"
                  : `border ${
                      auth.theme === 6 ? "border-white" : "border-black"
                    } flex items-center gap-2 px-4 py-1 rounded-full`
              }
            >
              <BsArrowLeft />
              Chương trước
            </Link>
            <Link
              href={data?.next?.link || "/"}
              className={
                data?.next?.hidden
                  ? "border opacity-0 cursor-default border-slate-200 text-slate-400 flex items-center gap-2 px-4 py-1 rounded-full"
                  : `border ${
                      auth.theme === 6 ? "border-white" : "border-black"
                    } flex items-center gap-2 px-4 py-1 rounded-full`
              }
            >
              Chương sau <BsArrowRight />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {/* NOTE Comments */}
            <div id="cmts" className="w-full flex flex-col py-4 col-span-2">
                  <h1 className="text-[20px] font-semibold mb-2">
                 Bình luận
                  </h1>
                  <div className="flex items-center gap-4">
                    <img
                      className="rounded-full w-[42px] h-[42px]"
                      src={auth.avatar || "https://static.cdnno.com/user/default/200.jpg"}
                      alt="..."
                    />
                    <div className="flex-1 relative">
                      <textarea
                        value={comment.cmt}
                        onChange={(e) =>
                          setComment({ ...comment, cmt: e.target.value })
                        }
                        className="w-full text-black outline-none border-2 rounded-lg p-2 pr-10"
                        rows="2"
                        placeholder="Bình luận..."
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
                    {dataCmt?.data?.length === 0 && <div className="flex justify-center italic"><p>Chưa có bình luận.</p></div>}
                    {dataCmt?.data?.map((item) => (
                      <CommentCard
                        key={item._id}
                        name={item.userId.displayName}
                        cmt={item.cmt}
                        chapter={item.chapterNo}
                        like={item.liked}
                        time={item.createdAt}
                        idCmt={item._id}
                        rs={refetchCMT}
                        loading={isFetching}
                        replaydata={item.replay}
                        avatar={item.userId.avatar}
                      />
                    ))}
                  </div>
                  {dataCmt?.total > dataCmt?.data?.length && (
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
            <div className="flex flex-col gap-8">
              <img src="https://static.cdnno.com/storage/topbox/cebad4b66813e64201c68ff65b502520.jpg" alt="" />
              <img src="https://static.cdnno.com/storage/topbox/1ab9401aa7998a0fb9ae105e485d29f8.jpg" alt="" />
              <img src="https://static.cdnno.com/storage/topbox/b74ae6625b4b0c60e4027eb3161c9e25.jpg" alt="" />
              <img src="https://static.cdnno.com/storage/topbox/0f85beec0d67cdc2093c7a289a86164f.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>

      {/* NOTE Modal Danh sách chương */}
      <dialog id="my_modal_2" className="modal">
        <form
          method="dialog"
          className="modal-box w-11/12 max-w-5xl flex flex-col h-[80%] max-h-screen overflow-hidden "
        >
          <h3 className="font-bold text-lg">Danh sách các chương</h3>
          <div className="py-4 pr-2 flex-1 overflow-y-scroll scrollbar-thumb-gray-900 scrollbar-rounded-lg scrollbar-thin scrollbar-track-gray-100">
            <div className="w-full">
              {isLoadingListChapter && (
                <div className="w-full flex justify-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              )}
              <div className="grid grid-cols-3 gap-4">
                {dataList?.data?.map((item) => (
                  <Link
                    key={item._id}
                    title={`Chương ${item.chapterNo}: ${item.title}`}
                    href={`/chuong/${id[0]}/${item?.chapterNo}`}
                    className="truncate flex gap-2 items-center cursor-pointer hover:text-[#8B6514] pb-1"
                  >
                    <span className="text-[14px] font-semibold">
                      Chương {item.chapterNo}:
                    </span>
                    <span className="text-[14px] truncate hover:text-[#8B6514]">
                      {item.title}
                    </span>
                    <span className="text-[11px] ml-auto italic">
                      {item.createdAt.slice(0, 10)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* NOTE Modal cài đặt */}
      <dialog id="my_modal_3" className="modal">
        <form
          method="dialog"
          className="modal-box w-5/12 max-w-5xl flex flex-col max-h-screen overflow-hidden "
        >
          <h3 className="font-bold text-lg border-b-2 pb-2">
            Cài đặt hiển thị
          </h3>
          <div className="py-4 pr-2 flex-1 ">
            <div className="w-full flex flex-col mt-4 gap-8">
              <div className="flex gap-4 items-start">
                <h1 className="font-bold flex gap-2 items-center">
                  <MdColorLens /> Màu sắc:
                </h1>
                <div className="flex flex-wrap flex-1 gap-4 justify-around">
                  <div
                    onClick={() => {
                      setTheme(themeColor[0]), dispatch(updateTheme(0));
                    }}
                    className="w-[42px] h-[42px] bg-[#F5E4E4] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[1]), dispatch(updateTheme(1));
                    }}
                    className="w-[42px] h-[42px] bg-[#F5EBCD] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[2]), dispatch(updateTheme(2));
                    }}
                    className="w-[42px] h-[42px] bg-[#E2EEE2] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[3]), dispatch(updateTheme(3));
                    }}
                    className="w-[42px] h-[42px] bg-[#E1E8E8] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[4]), dispatch(updateTheme(4));
                    }}
                    className="w-[42px] h-[42px] bg-[#EAE4D3] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[5]), dispatch(updateTheme(5));
                    }}
                    className="w-[42px] h-[42px] bg-[#E5E3DF] rounded-full cursor-pointer"
                  ></div>
                  <div
                    onClick={() => {
                      setTheme(themeColor[6]), dispatch(updateTheme(6));
                    }}
                    className="w-[42px] h-[42px] bg-[#222222] rounded-full cursor-pointer"
                  ></div>
                </div>
              </div>
              <div className="flex gap-4">
                <h1 className="font-bold flex gap-2 items-center">
                  <FaFont /> Font chữ:
                </h1>
                <select
                  value={setting.font}
                  onChange={(e) =>
                    setSetting({ ...setting, font: e.target.value })
                  }
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option value="font-sans">Sans</option>
                  <option value="font-serif">Serif</option>
                  <option value="font-mono">Mono</option>
                  <option value="font-dancing">Dancing</option>
                  <option value="font-ubuntu">Ubuntu</option>
                </select>
              </div>
              <div className="flex gap-4">
                <h1 className="font-bold flex gap-2 items-center">
                  <AiOutlineFontSize /> Cỡ chữ:
                </h1>
                <select
                  value={setting.fontSize}
                  onChange={(e) =>
                    setSetting({ ...setting, fontSize: e.target.value })
                  }
                  className="select select-bordered select-sm w-full max-w-xs"
                >
                  <option value={10}>Extra Small</option>
                  <option value={15}>Small</option>
                  <option value={20}>Medium</option>
                  <option value={24}>Large</option>
                  <option value={32}>Extra Large</option>
                </select>
              </div>
              <div className="flex gap-4">
                <h1 className="font-bold flex gap-2 items-center">
                  <FaTextHeight /> Giãn dòng:
                </h1>
                <div className="flex gap-8 items-center ml-4">
                  <BsCaretLeftSquareFill
                    onClick={() => handleSpace("sub")}
                    size={24}
                    className="cursor-pointer"
                  />
                  <span>{setting.space * 20}%</span>
                  <BsCaretRightSquareFill
                    onClick={() => handleSpace("pluss")}
                    size={24}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      {/* NOTE Modal hướng dẫn */}
      <dialog id="my_modal_1" className="modal">
        <form method="dialog" className="modal-box">
          <button
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Hướng dẫn!</h3>
          <p className="py-4">
            <img
              src="https://metruyencv.com/assets/images/guide.png?260523"
              alt=""
            />
          </p>
          <div className="modal-action">
            {/* if there is a button, it will close the modal */}
            <button className="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
