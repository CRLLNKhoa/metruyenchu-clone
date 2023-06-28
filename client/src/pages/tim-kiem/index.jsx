import Head from "next/head";
import React, { useEffect, useState } from "react";
import { input } from "../../../untils";
import { BsFilterLeft } from "react-icons/bs";
import FilterCard from "components/Cards/FilterCard";
import { Pagination } from "@nextui-org/react";
import * as StoryService from "services/storyService";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter()
  console.log(router)
  const [selected, setSelected] = useState([router.query.genre]);
  const [filter, setFilter] = useState({
    genre: [router.query.genre],
    character: [],
    progress: [],
    worldScene: [],
    sect: [],
    view: [],
    title: []
  });
  const [sort, setSort] = useState("createdAt");
  const [debounce, setDebounce] = useState(false);

  // NOTE HANDLE SELECTED
  const handleSelected = (item, type) => {
    if (!selected.includes(item)) {
      setSelected([...selected, item]);
      switch (type) {
        case 1:
          setFilter({ ...filter, genre: [...filter.genre, item] });
          break;
        case 2:
          setFilter({ ...filter, progress: [...filter.progress, item] });
          break;
        case 3:
          setFilter({ ...filter, character: [...filter.character, item] });
          break;
        case 4:
          setFilter({ ...filter, worldScene: [...filter.worldScene, item] });
          break;
        case 5:
          setFilter({ ...filter, sect: [...filter.sect, item] });
          break;
        case 6:
          setFilter({ ...filter, view: [...filter.view, item] });
          break;
        default:
          console.log(item);
      }
    }
    if (selected.includes(item)) {
      setSelected(selected.filter((items) => items !== item));
      switch (type) {
        case 1:
          setFilter({
            ...filter,
            genre: filter.genre.filter((items) => items !== item),
          });
          break;
        case 2:
          setFilter({
            ...filter,
            progress: filter.progress.filter((items) => items !== item),
          });
          break;
        case 3:
          setFilter({
            ...filter,
            character: filter.character.filter((items) => items !== item),
          });
          break;
        case 4:
          setFilter({
            ...filter,
            worldScene: filter.worldScene.filter((items) => items !== item),
          });
          break;
        case 5:
          setFilter({
            ...filter,
            sect: filter.sect.filter((items) => items !== item),
          });
          break;
        case 6:
          setFilter({
            ...filter,
            view: filter.view.filter((items) => items !== item),
          });
          break;
        default:
          console.log(item);
      }
    }
  };

  // NOTE FECHT
  const [page, setPage] = useState(0);

  const fetch = () => {
    const res = StoryService.getFiter(20, page, filter);
    return res;
  };

  const result = useQuery({
    queryKey: ["filllter", page, filter],
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
      <Head>
        <title>Tìm kiếm truyện</title>
      </Head>
      <div className="bg-white w-[1200px] px-12 pb-12">
        <div
          id="header"
          className="z-50 p-4 bg-white rounded-lg w-full text-black translate-y-[-140px] flex gap-8"
        >
          <div className="grid w-full grid-cols-4 gap-4">
            {/* NOTE Filter */}
            <div className="flex flex-col gap-4 border-r pr-2">
              {/* NOTE Selected */}
              <div className="flex flex-col gap-2">
                <h1 className="font-semibold">Đã chọn</h1>
                <div className="flex flex-wrap gap-2">
                  {selected.map((item) => (
                    <span
                      key={item}
                      className="border relative group flex items-center gap-1 border-slate-400 text-[12px] pl-[10px] pr-[10px] py-[2px] rounded-sm cursor-pointer bg-slate-600 text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex justify-end">
                  <i
                    onClick={() =>
                      setFilter({
                        genre: [],
                        character: [],
                        progress: [],
                        worldScene: [],
                        sect: [],
                        view: [],
                      })
                    }
                    className="text-[12px] cursor-pointer hover:text-sky-600"
                  >
                    Xóa tất cả
                  </i>
                </div>
              </div>
              {/* NOTE Genre */}
              <div className="flex flex-col">
                <h1 className="font-semibold">Thể loại</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.genre.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 1)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* NOTE IsComplete */}
              <div className="flex flex-col">
                <h1 className="font-semibold">Tình trạng</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.isComplete.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 2)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* NOTE  Characteer*/}
              <div className="flex flex-col">
                <h1 className="font-semibold">Tính cách nhân vật</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.character.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 3)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* NOTE WORLDSCEEN */}
              <div className="flex flex-col">
                <h1 className="font-semibold">Bỗi cảnh thế giới</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.worldScene.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 4)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* NOTE Sect */}
              <div className="flex flex-col">
                <h1 className="font-semibold">Lưu phái</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.sect.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 5)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              {/* NOTE view */}
              <div className="flex flex-col">
                <h1 className="font-semibold">Thị giác</h1>
                <div className="flex flex-wrap py-2 gap-2 justify-start">
                  {input.view.map((item) => (
                    <span
                      key={item}
                      onClick={() => handleSelected(item, 6)}
                      className={`border ${
                        selected.includes(item) ? "bg-slate-600" : "bg-white"
                      } border-slate-400 ${
                        selected.includes(item)
                          ? "text-white"
                          : "text-slate-600"
                      } text-[12px] px-[10px] py-[2px] rounded-sm cursor-pointer hover:bg-slate-600 hover:text-white`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* NOTE Content */}
            <div className="col-span-3">
              {/* NOTE  Sort */}
              <div className="flex gap-8">
                <span
                  onClick={() => setSort("createdAt")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "createdAt" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Thời gian <BsFilterLeft />
                </span>
                <span
                  onClick={() => setSort("view")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "view" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Lượt xem <BsFilterLeft />
                </span>
                <span
                  onClick={() => setSort("rating")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "rating" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Đánh giá <BsFilterLeft />
                </span>
                <span
                  onClick={() => setSort("favorite")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "favorite" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Lưu truyện <BsFilterLeft />
                </span>
                <span
                  onClick={() => setSort("comment")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "comment" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Bình luận <BsFilterLeft />
                </span>
                <span
                  onClick={() => setSort("chapter")}
                  className={`flex items-center gap-1 text-[14px] font-semibold hover:text-[#B78A28] ${
                    sort === "chapter" && "text-[#B78A28]"
                  } cursor-pointer`}
                >
                  Số chương <BsFilterLeft />
                </span>
              </div>
              {/* NOTE Show Réult */}
              <div className="py-8">
                {isFetching ? (
                  <div className="flex flex-col items-center">
                    <progress className="progress w-56"></progress>
                    <i className="text-[13px]">Đang lọc truyện</i>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 px-2 gap-4">
                    {data?.data?.map((item) => (
                      <FilterCard
                        key={item._id}
                        thumbnail={item.thumbnail}
                        title={item.title}
                        desc={item.description}
                        author={item.userId.displayName}
                        chapter={item.chapter.length}
                        genre={item.genre}
                      />
                    ))}
                  </div>
                )}

                {data?.data?.length < 1 && (
                  <div className="flex items-center w-full justify-center">
                    <i>Không tồn tại</i>
                  </div>
                )}

                {/* NOTE Content Paginate */}
                {data?.data?.length > 0 && (
                  <div className="w-full flex justify-end py-8">
                    <Pagination
                      onChange={(page) => setPage(page)}
                      color="warning"
                      total={data?.totalPage}
                      initialPage={1}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
