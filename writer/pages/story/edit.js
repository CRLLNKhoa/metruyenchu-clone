"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useState } from "react";
import { BsFolder2Open } from "react-icons/bs";
import * as dataSelect from "@/dataFake/selectBoxData";
import { useRouter } from "next/router";
import { getStoryDetail, editStory } from "@/services/storyService";
import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "@/components/LoadingSkeleton";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { toast } from "react-toastify";
import { success,error } from "@/components/Message";

function EditStory() {
  const [imgs, setImgs] = useState(
    "https://static.cdnno.com/poster/day-bygones/300.jpg?1683542627"
  );
  const router = useRouter();

  const [story, setStory] = useState({
    title: "",
    description: "",
    progress: "",
    genre: "",
    character: "",
    worldScene: "",
    sect: "",
    originalLook: "",
  });

  // NOTE Editor
  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({ editor }) =>
      setStory({ ...story, description: editor.getHTML() }),
    content: story?.description,
    editorProps: {
      attributes: {
        class:
          "border border-[#570df8] min-h-[120px] text-[14px] rounded-lg px-4 py-1 mx-auto focus:outline-none",
      },
    },
  });

  const fetchDetailStory = async () => {
    const res = await getStoryDetail(router.query.id);
    return res.data;
  };

  const query = useQuery({
    queryKey: ["detailStory"],
    queryFn: fetchDetailStory,
  });
  const { isLoading, data } = query;

  useEffect(() => {
    setStory({
      ...story,
      genre: data?.genre,
      description: data?.description,
      title: data?.title,
      sect: data?.sect,
      worldScene: data?.worldScene,
      originalLook: data?.originalLook,
      progress: data?.progress,
      character: data?.character
    });
    setImgs(data?.thumbnail);
  }, [data]);

  useEffect(() => {
    editor?.commands.setContent(story.description)
  }, [story]);

  const handleChangeAvatar = async (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };

  const mutation = useMutationHooks((data) => editStory(data));

  const handleChangeThumbnail = async () => {
    const toastLoading = toast.loading("Đang cập nhật ảnh bìa truyền!");
    mutation.mutate({
      id: router.query.id,
      data: {
        thumbnail: imgs,
      },
    });
    const { isSuccess } = mutation;
    if (isSuccess) {
      toast.update(toastLoading, {
        render: "Cập nhật ảnh bìa thành công!",
        autoClose: 3000,
        type: "success",
        isLoading: false,
      });
    } else
      toast.update(toastLoading, {
        render: "Cập nhật không thành công!",
        autoClose: 3000,
        type: "error",
        isLoading: false,
      });
  };

  const mutationUpdate = useMutationHooks((data) => editStory(data));
  const { isLoading: isLoadingUpdate, data: dataUpdate } = mutationUpdate;
  const handleUpdate = () => {
    mutationUpdate.mutate({ id: router.query.id, data: story });
  };

  useEffect(() => {
    if(dataUpdate?.status === "ERR"){
      error({text: "Cập nhật xảy ra lỗi!"})
    }
    if(dataUpdate?.status === "OK"){
      success({text: "Cập nhật thành công!"})
    }
  }, [dataUpdate]);

  // NOTE SKELETON
  if (isLoading) {
    return (
      <div className="w-full bg-white dark:bg-black dark:text-white p-4 rounded-s-lg flex flex-col pb-8">
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <>
      <main className="w-full bg-white dark:bg-black dark:text-white p-4 rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold">Sửa thông tin truyện</h1>
        <div className="flex flex-col mt-8 gap-4">
          {/* NOTE Thumbnail */}
          <div className="flex flex-col justify-center w-full items-center py-6 gap-4">
            <img
              width={150}
              height={200}
              src={imgs}
              alt="?"
              className="rounded-lg"
            />
            <div className="flex gap-2">
              <label
                htmlFor="ava"
                className="w-[50px] flex justify-center items-center cursor-pointer  py-2 rounded-md text-[white] bg-[#148464] text-[13px]"
              >
                <BsFolder2Open />
              </label>
              <button
                onClick={handleChangeThumbnail}
                className="w-[150px] flex justify-center items-center cursor-pointer  py-1 rounded-md text-[white] bg-[#7367F0] text-[13px]"
              >
                Cập nhật ảnh bìa
              </button>
            </div>
            <input
              type="file"
              id="ava"
              onChange={handleChangeAvatar}
              className="hidden"
            />
            <p className="text-center text-[12px]">
              Lưu ý: file ảnh không nặng quá 2MB. Đừng lo lắng nếu không tìm
              được ảnh bìa ưng ý, chúng tôi sẽ hỗ trợ làm giúp bạn ảnh bìa đẹp
              khi truyện được xuất bản
            </p>
          </div>

          {/* NOTE Tên truyện */}
          <div className="flex flex-col w-full mt-8">
            <h2 className="text-[13px] mb-1">Tên truyện</h2>
            <input
              type="text"
              value={story?.title}
              onChange={(e) => setStory({ ...story, title: e.target.value })}
              placeholder="Viết hoa chữ cái đầu mỗi từ. Ví dụ: Truyên Tiên Hiệp Hấp Dẫn"
              className="input dark:bg-black dark:text-white input-bordered input-primary w-full input-md"
            />
          </div>
          {/* NOTE Giới thiệu */}
          <div className="flex flex-col w-full mt-4">
            <h2 className="text-[13px] mb-1">Giới thiệu</h2>
            <EditorContent editor={editor} />
          </div>
          {/* NOTE Tình trạng truyện*/}
          <h2 className="text-[13px]">Tình trạng</h2>
          <select
            defaultValue={data?.progress}
            onChange={(e) => setStory({ ...story, progress: e.target.value })}
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Tình trạng truyện của bạn?</option>
            {dataSelect.input.isComplete.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Thể  loại*/}
          <h2 className="text-[13px]">Thể loại</h2>
          <select
            defaultValue={data?.genre}
            onChange={(e) => setStory({ ...story, genre: e.target.value })}
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Thể loại truyện của bạn?</option>
            {dataSelect.input.genre.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Tính cách nhân vật*/}
          <h2 className="text-[13px]">Tính cách nhân vật</h2>
          <select
            defaultValue={data?.character}
            onChange={(e) => setStory({ ...story, character: e.target.value })}
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Tính cách nhân vật của truyện?</option>
            {dataSelect.input.character.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Bối cảnh thế giới*/}
          <h2 className="text-[13px]">Bối cảnh thế giới</h2>
          <select
            defaultValue={data?.worldScene}
            onChange={(e) => setStory({ ...story, worldScene: e.target.value })}
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Bối cảnh thế giới của truyện?</option>
            {dataSelect.input.worldScene.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Lưu phái*/}
          <h2 className="text-[13px]">Lưu phái</h2>
          <select
            defaultValue={data?.sect}
            onChange={(e) => setStory({ ...story, sect: e.target.value })}
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Lưu phái của truyện?</option>
            {dataSelect.input.sect.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Thị giác*/}
          <h2 className="text-[13px]">Thị giác</h2>
          <select
            defaultValue={data?.originalLook}
            onChange={(e) =>
              setStory({ ...story, originalLook: e.target.value })
            }
            className="select font-normal mt-0 dark:bg-black dark:text-white select-md select-primary w-full"
          >
            <option disabled>Thị giác của truyện?</option>
            {dataSelect.input.view.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          {/* NOTE Buttons */}
          <button onClick={handleUpdate} className="btn btn-primary mt-4">
            {isLoadingUpdate && (
              <span className="loading loading-spinner"></span>
            )}
            {isLoadingUpdate ? "Đang cập nhật thông tin" : "cập nhật"}
          </button>
        </div>
      </main>
    </>
  );
}

export default EditStory;
