import { useQuery } from "@tanstack/react-query";
import { useMutationHooks } from "hooks/useMutationHook";
import Link from "next/link";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as AuthService from "services/authService";

export default function NoticationTab() {
  const auth = useSelector((state) => state.auth);

  const fetch = async () => {
    const res = await AuthService.getNotic(auth?.id,10);
    return res;
  };

  const query = useQuery({
    queryKey: ["ListNotic"],
    queryFn: fetch,
  });

  const { data, isLoading,refetch } = query;

  const delNotic = useMutationHooks((id) => AuthService.delNotic(auth?.id))

  useEffect(() => {
    if(delNotic?.data?.status === "OK"){
      toast.success("Xóa thông báo thành công!")
      refetch()
    }
  }, [delNotic]);

  return (
    <div className="flex flex-col">
      <div className="border-b pb-2 flex justify-between">
        <h1 className="text-[15px] font-semibold ">Thông báo</h1>
        <b onClick={()=> delNotic.mutate()} className="text-[13px] cursor-pointer hover:bg-sky-100 px-8 rounded-lg py-1">Đánh dấu đã xem tất cả</b>
      </div>
      {data?.data?.length === 0 ? (
        <div className="flex items-center justify-center h-[200px]">
          <p className="italic">Hiện tại chưa có thông báo!</p>
        </div>
      ) : (
        <div className="flex flex-col mt-8">
          {data?.data?.map((item) => (
            <Link key={item._id} href={item.link} className="flex items-center gap-4 cursor-pointer rounded-md p-2 hover:bg-sky-100">
              <img
                className="w-[42px] h-[42px] rounded-full object-fill"
                src={item.thumbnail || "https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png?20060524154217"}
                alt=""
              />
              <div className="flex flex-col">
                <b className="text-[13px]">{item.title}</b>
                <i className="text-[13px]">{item.desc}</i>
              </div>
              <i className="text-[13px] ml-auto">{(item.createdAt).slice(0,10)}</i>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
