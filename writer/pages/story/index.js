import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getStory,delStory } from "@/services/storyService";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { success,error } from "@/components/Message";

function Storys() {
  const router = useRouter();
  const [arlet, setarlet] = useState(false);
  const [delId, setDelId] = useState("")
  const [delName, setDelName] = useState("")

  const id = useSelector((state) => state.auth.id);

  const fetchStory = async () => {
    const res = await getStory(id);
    return res.data;
  };

  const query = useQuery({ queryKey: ["story"], queryFn: fetchStory });
  const { isLoading, data,refetch } = query;



  const delMutation = useMutationHooks((id) => delStory(id))
  const {data: dataDel} = delMutation
  const handleDelete = () => {
    setarlet(false)
    delMutation.mutate(delId)
  }
  useEffect(() => {
    if(dataDel?.status === "ERR"){
      error({text:dataDel?.message})
    }
    if(dataDel?.status === "OK"){
      success({text:dataDel?.message})
      refetch()
    }
  }, [dataDel]);

  return (
    <>
      <main className="w-full bg-white dark:bg-black dark:text-white p-4 rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold">Danh sách truyện</h1>
        <p className="text-[13px]">Danh sách các truyện bạn đã đăng</p>
        <div className="grid grid-cols-3 gap-4 mt-8">
          {/* NOTE List Story */}
          {data?.map((item) => (
            <div key={item._id} className="border min-h-[120px] rounded-lg p-2 shadow-sm flex flex-col">
              <h1 className="font-semibold text-[15px]">{item.title}</h1>
              <span className="text-[13px] flex gap-2">
                Trạng thái:{" "}
                {item.published ? (
                  <p className="font-normal text-green-600">đã xuất bản</p>
                ) : (
                  <p className="font-normal text-orange-600">chưa xuất bản</p>
                )}
              </span>
              <div className="flex mt-auto gap-2 w-full flex-wrap">
                <button
                  onClick={() => router.push({
                    pathname: "/chapter/create",
                    query: { id: item._id,title: item.title },
                  })}
                  className="text-[9px] btn btn-primary btn-xs"
                >
                  Thêm chương
                </button>
                <button
                  onClick={() => router.push(`/chapter/list`)}
                  className="text-[9px] btn btn-info btn-xs"
                >
                  Ds.chương
                </button>
                <button
                  onClick={() => router.push({
                    pathname: "/story/edit",
                    query: { id: item._id },
                  })}
                  className="text-[9px] btn btn-warning btn-xs"
                >
                  Chỉnh sửa
                </button>
                <button
                  onClick={() => {setarlet(true);setDelId(item._id),setDelName(item.title)}}
                  className="text-[9px] btn btn-error btn-xs"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* NOTE Arlet */}
      {arlet && (
        <div
          onClick={() => setarlet(false)}
          className="fixed top-0 left-0 right-0 bottom-0 z-50"
        ></div>
      )}
      <div
        className={`alert shadow-lg bg-black text-white dark:bg-white dark:text-black fixed z-50 ${
          arlet ? "top-10" : "-top-80"
        } transition-all  duration-700 right-10 w-[600px]`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info shrink-0 w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <span>Bạn có chắc là muốn xóa truyện "{delName}".</span>
        <div className="flex gap-2">
          <button
            onClick={() => setarlet(false)}
            className="btn btn-primary btn-sm"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-error"
          >
            Xóa
          </button>
        </div>
      </div>
    </>
  );
}

export default Storys;
