import EditComponent from "@/components/ChapterComponents/EditComponent";
import MyHead from "@/components/MyHead";
import React, { useEffect, useState } from "react";
import { getListChapter } from "@/services/chapterService";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { Loading, Pagination, Progress } from "@nextui-org/react";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { deleteChapter } from "@/services/chapterService";
import * as Message from "@/components/Message"

function ListChapter() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [listChapter, setListChapter] = useState([]);
  const [propData, setPropData] = useState({
    title: "",
    content: "",
  });

  const fetchChapter = async () => {
    const res = await getListChapter({
      id: router.query.id,
      page: page - 1,
    });
    return res;
  };

  const query = useQuery({ queryKey: ["chapter"], queryFn: fetchChapter });
  const { isLoading, data, refetch } = query;

  useEffect(() => {
    setListChapter(data?.data);
  }, [data]);

  useEffect(() => {
    refetch();
  }, [page]);

  const mutation = useMutationHooks(id => deleteChapter(id))
  const {data: dataDel,isLoading: isLoadingDel} = mutation

  useEffect(() => {
    if(dataDel?.status === "ERR"){
      Message.error({text: dataDel?.message,position: "top-right"})
    }
    if(dataDel?.status === "OK"){
      Message.success({text: dataDel?.message,position: "top-right"})
      refetch()
    }
  }, [dataDel]);

  return (
    <>
      <MyHead
        title="Danh sách truyện"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="/svg/logo.svg"
        url="https://typefinance.com"
      />

      <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold text-[24px]">
          Danh sách chương của truyện
        </h1>
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead className="dark:bg-black dark:text-white">
              <tr>
                <th>Chương</th>
                <th>Tên chương</th>
                <th>Lượt xem</th>
                <th>Ngày đăng</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            {!isLoading && (
              <tbody>
                {listChapter?.map((item) => (
                  <tr key={item._id} className="hover hover:text-black cursor-pointer  ">
                    <th>{item.chapterNo}</th>
                    <td>{item.title}</td>
                    <td>{item.view}</td>
                    <td>{item.createdAt.slice(0, 10)}</td>
                    <td className="flex gap-2 justify-end">
                      <label
                        onClick={() =>
                          setPropData({
                            title: item.title,
                            content: item.content,
                            chapterNo: item.chapterNo,
                            id: item._id 
                          })
                        }
                        htmlFor="my-drawer"
                        className="btn btn-warning btn-xs"
                      >
                        Chỉnh sửa
                      </label>
                      <button onClick={()=>mutation.mutate(item._id)} disabled={isLoadingDel} className="btn btn-xs btn-error">{isLoadingDel?"Waiting..":"xóa"}</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
          {isLoading && (
            <div className="p-8">
              <Progress
                className="w-full"
                indeterminated
                striped
                value={200}
                max={250}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end mt-8">
          <Pagination
            color="success"
            onChange={(page) => setPage(page)}
            total={data?.totalPage}
            initialPage={page}
          />
        </div>
      </main>

      <div className="drawer z-50 dark:bg-black dark:text-white">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-3/5 bg-white dark:bg-black dark:text-white h-full overflow-y-scroll text-base-content">
            {/* Sidebar content here */}
            <EditComponent action={refetch} data={propData} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListChapter;
