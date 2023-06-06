import { useQuery } from "@tanstack/react-query";
import ListBox from "components/ListBox";
import LoadingCustom from "components/Loading";
import { input } from "dataSystem/selectBoxData";
import { useMutationHooks } from "hooks/useMutationHook";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as StoryService from "services/storyService";
import {BsFolder2Open} from "react-icons/bs"

export async function getServerSideProps(context) {
  const id = context.query.id; // Get ID from slug `/book/1`
  // Rest of `getServerSideProps` code
  return {
    props: {
      id,
    },
  };
}

export default function EditStory({ id }) {
  const router = useRouter();
  const mutation = useMutationHooks((data) => StoryService.editStory(data));
  const { isLoading: isLoadingUpdate, data: dataUpdate } = mutation;
  const fetchStoryDetail = async () => {
    const res = await StoryService.getStoryDetail(id);
    return res.data;
  };
  const query = useQuery({
    queryKey: ["storyDetail"],
    queryFn: fetchStoryDetail,
  });
  const { isLoading, data } = query;

  useEffect(() => {
    setGenre(data?.genre);
    setIsComplete(data?.progress);
    setSect(data?.sect);
    setView(data?.originalLook);
    setWorldScene(data?.worldScene);
    setCharacter(data?.character);
    setImgs(data?.thumbnail)
    setTitle(data?.title)
    setDesc(data?.description)
  }, [data]);

  const notify = () =>
    toast.error(dataUpdate?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });

  const notifySuccess = () =>
    toast.success(dataUpdate?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });

  useEffect(() => {
    if (dataUpdate?.status === "ERR") {
      notify();
    }
    if (dataUpdate?.status === "OK") {
      notifySuccess();
    }
  }, [dataUpdate]);


  const [genre, setGenre] = useState(data?.genre);
  const [character, setCharacter] = useState(data?.character);
  const [worldScene, setWorldScene] = useState(data?.worldScene);
  const [sect, setSect] = useState(data?.sect);
  const [view, setView] = useState(input.view[0]);
  const [title, setTitle] = useState(data?.title);
  const [desc, setDesc] = useState(data?.description);
  const [isComplete, setIsComplete] = useState("Đang ra");
  const [imgs, setImgs] = useState("https://static.cdnno.com/poster/day-bygones/300.jpg?1683542627");

  const handleChangeAvatar = async (e) => {
    const data = new FileReader();
    data.addEventListener('load', () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const updateThumb =  () => {
    mutation.mutate({id: id,data:{thumbnail: imgs}})
  }

  return (
    <div>
      {isLoading && <LoadingCustom tip="Đang lấy thông tin!" />}
      {isLoadingUpdate && <LoadingCustom tip="Đang cập nhật!" />}
      <h1 className="text-[18px] text-[black] dark:text-white">
        Chỉnh sửa truyện
      </h1>
      <p className="text-[14px] text-[black] dark:text-white">{data?.title}</p>
      <div className="bg-white dark:bg-[#283046] mt-6 p-6 rounded-lg">
        <h1>Sửa thông tin</h1>
        <div className="flex flex-col justify-center w-full items-center py-6 gap-4">
          <img
            width={150}
            height={200}
            src={imgs}
            alt="?"
          />
         <div className="flex gap-2">
            <label
              htmlFor="ava"
              className="w-[50px] flex justify-center items-center cursor-pointer  py-2 rounded-md text-[white] bg-[#148464] text-[13px]"
            >
              <BsFolder2Open />
            </label>
            <button onClick={updateThumb}
              className="w-[150px] flex justify-center items-center cursor-pointer  py-1 rounded-md text-[white] bg-[#7367F0] text-[13px]"
            >
              Cập nhật ảnh bìa
            </button>
         </div>
          <input type="file" id="ava" onChange={handleChangeAvatar} className="hidden" />
          <p className="text-center text-[12px]">
            Lưu ý: file ảnh không nặng quá 2MB. Đừng lo lắng nếu không tìm được
            ảnh bìa ưng ý, chúng tôi sẽ hỗ trợ làm giúp bạn ảnh bìa đẹp khi
            truyện được xuất bản
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="title-input">Tên truyện</p>
            <input
              placeholder="Viết hoa mỗi chữ cái đầu, ví dụ như này: Viết Hoa Giống Này"
              type="text"
              className="input"
              value={title || data?.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <p className="title-input">Giới thiệu</p>
            <textarea
              placeholder="Tóm tắt truyện không nên quá dài nên ngắn gọn, tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ"
              type="text"
              className="input h-32"
              onChange={(e) => setDesc(e.target.value)}
              value={desc || data?.description}
            />
          </div>
          <div>
            <p className="title-input">Tình trạng</p>
            <ListBox
              data={input.isComplete}
              selected={isComplete}
              setSelected={setIsComplete}
            />
          </div>
          <div>
            <p className="title-input">Thể loại</p>
            <ListBox
              data={input.genre}
              selected={genre}
              setSelected={setGenre}
            />
          </div>
          <div>
            <p className="title-input">Tính cách nhân vật chính</p>
            <ListBox
              data={input.character}
              selected={character}
              setSelected={setCharacter}
            />
          </div>
          <div>
            <p className="title-input">Bối cảnh thế giới</p>
            <ListBox
              data={input.worldScene}
              selected={worldScene }
              setSelected={setWorldScene}
            />
          </div>
          <div>
            <p className="title-input">Lưu phái</p>
            <ListBox
              data={input.sect}
              selected={sect}
              setSelected={setSect}
            />
          </div>
          <div>
            <p className="title-input">Thị giác</p>
            <ListBox
              data={input.view}
              selected={view || data?.originalLook}
              setSelected={setView}
            />
          </div>
          <button
            onClick={() =>
              mutation.mutate({
                id: id,
                data: {
                  title: title,
                  description: desc,
                  originalLook: view,
                  sect: sect,
                  worldScene: worldScene,
                  character: character,
                  genre: genre,
                  progress: isComplete,
                },
              })
            }
            className="bg-[#7367F0] py-2 rounded-lg text-[14px] hover:brightness-125 transition-all"
          >
            Cập nhật
          </button>
        </div>
      </div>
    </div>
  );
}
