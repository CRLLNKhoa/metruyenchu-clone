import { useRouter } from "next/router";
import React from "react";
import { GrFormAdd } from "react-icons/gr";

function StoryCard({ data,action}) {
  const router = useRouter();
  return (
    <div className="shadow-cardStory dark:border col-span-3 lg:col-span-1 relative rounded-lg overflow-hidden flex">
      <img
        className="min-h-[120px] max-h-[120px] min-w-[104px] max-w-[104px]"
        src={data.thumbnail}
        alt=""
      />
      <div className="flex flex-col py-2 px-4 w-full justify-between">
        <div>
          <h1 className="font-semibold text-[15px]">{data.title}</h1>
          <span className="text-[13px] flex items-center gap-1">
            Trạng thái:{" "}
            {data.published ? (
              <p className="text-green-500 text-[13px]">đã xuất bản</p>
            ) : (
              <p className="text-orange-500 text-[13px]">chưa xuất bản</p>
            )}
          </span>
        </div>
        <div className="flex  gap-4">
          <div className="tooltip tooltip-top" data-tip="Thêm chương">
            <button
              onClick={() =>
                router.push({
                  pathname: "/chapter/create",
                  query: { id: data._id, title: data.title },
                })
              }
              data-tooltip-target="tooltip-dark"
              type="button"
              className="btn-xs rounded-sm btn-primary text-white"
            >
              <img className="w-6" src="svg/add.svg" alt="" />
            </button>
          </div>

          <div className="tooltip tooltip-top" data-tip="Danh sách chương">
            <button onClick={() =>
                router.push({
                  pathname: "/chapter/list",
                  query: { id: data._id },
                })
              } className="btn-xs rounded-sm btn-info">
              <img className="w-6" src="svg/list.svg" alt="" />
            </button>
          </div>

          <div className="tooltip tooltip-top" data-tip="Chỉnh sửa truyện">
            <button
              onClick={() =>
                router.push({
                  pathname: "/story/edit",
                  query: { id: data._id },
                })
              }
              className="btn-xs rounded-sm btn-warning"
            >
              <img className="w-4" src="svg/edit.svg" alt="" />
            </button>
          </div>

          <div className="tooltip tooltip-top" data-tip="Xóa truyện">
            <button  onClick={() => {action.setarlet(true);action.setDelId(data._id),action.setDelName(data.title)}} className="btn-xs rounded-sm btn-error">
              <img className="w-4" src="svg/delete.svg" alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoryCard;
