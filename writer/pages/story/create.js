"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import * as dataSelect from "@/dataFake/selectBoxData";
import MyHead from "@/components/MyHead";
import { addStory } from "@/services/storyService";
import { useMutationHooks } from "@/hooks/useMutationHook";
import * as Message from "@/components/Message"
import { useSelector } from "react-redux";

function CreateStory() {
  const auth = useSelector(state => state.auth)
  const [check, setcheck] = useState(true);
  const [story, setStory] = useState({
    title: "",
    description: "<p>Giới thiệu ngắn,  bạn hãy  giới thiệu truyện của bạn ngắn gọn, tối đa 700  chữ</p>",
    genre: "Huyễn Huyền",
    character: "Điềm Đạm",
    worldScene: "Đông Phương Huyễn Huyền",
    sect: "Hệ Thống",
    originalLook: "Góc Nhìn Thứ Nhất",
  });

  const editor = useEditor({
    extensions: [StarterKit],
    content:
      "<p>Giới thiệu ngắn,  bạn hãy  giới thiệu truyện của bạn ngắn gọn, tối đa 700  chữ</p>",
    editorProps: {
      attributes: {
        class:
          "border border-[#570DF8] outline-[#570DF8] min-h-[200px] text-[14px] rounded-lg px-4 py-1 mx-auto focus:outline-none",
      },
    },
    onUpdate: () => setStory({...story, description: editor.getHTML()})
  });
  const mutation  = useMutationHooks(data => addStory(data))
  const {data,isLoading} = mutation

  useEffect(() => {
    if(data?.status === "ERR"){
      Message.error({text: data?.message,position: "top-right"})
    }
    if(data?.status === "OK"){
      Message.success({text: data?.message,position: "top-right"})
      setStory({...story,title: "",description: "<p>Giới thiệu ngắn,  bạn hãy  giới thiệu truyện của bạn ngắn gọn, tối đa 700  chữ</p>"})
    }
  }, [data]);

  const handleAddStory = () => {
    if(story.title === "" || story.description === ""){
      Message.warning({text: "Bạn chưa nhập tên truyện hoặc giới thiệu!",position: "top-right"})
    }
    else mutation.mutate({...story,idUser: auth.id})
  }
  return (
    <>
      <MyHead
        title="Thêm truyện mới"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="https://typefinance.com/typefinance-dp.jpg"
        url="https://typefinance.com"
      />

      <main className="w-full bg-white dark:bg-black dark:text-white p-4 rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold text-[24px]">Thêm truyện mới</h1>
        <p className="text-[14px]">Bắt đầu sáng tạo thế giới của riêng bạn</p>
        <div className="flex flex-col mt-8 gap-4">
          {/* NOTE Tên truyện */}
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] mb-1">Tên truyện</h2>
            <input
              type="text"
              placeholder="Viết hoa chữ cái đầu mỗi từ. Ví dụ: Truyên Tiên Hiệp Hấp Dẫn"
              className="input dark:bg-black input-bordered input-primary w-full input-md"
              value={story.title}
              onChange={(e) => setStory({ ...story, title: e.target.value })}
            />
          </div>
          {/* NOTE Giới thiệu */}
          <div className="flex flex-col w-full">
            <h2 className="text-[13px] mb-1">Giới thiệu</h2>
            <EditorContent editor={editor} />
          </div>
          {/* NOTE Thể  loại*/}
          <h2 className="text-[13px]">Thể loại</h2>
          <select onChange={(e) => setStory({...story,genre: e.target.value})} className="select mt-0 font-normal dark:bg-black dark:text-white select-md select-primary w-full">
            <option disabled defaultValue>
              Thể loại truyện của bạn?
            </option>
            {dataSelect.input.genre.map((item) => (
              <option  value={item} key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Tính cách nhân vật*/}
          <h2 className="text-[13px]">Tính cách nhân vật</h2>
          <select onChange={(e) => setStory({...story,character: e.target.value})} className="select mt-0 font-normal dark:bg-black dark:text-white select-md select-primary w-full">
            <option disabled defaultValue>
              Tính cách nhân vật của truyện?
            </option>
            {dataSelect.input.character.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Bối cảnh thế giới*/}
          <h2 className="text-[13px]">Bối cảnh thế giới</h2>
          <select onChange={(e) => setStory({...story,worldScene: e.target.value})} className="select mt-0 font-normal dark:bg-black dark:text-white select-md select-primary w-full">
            <option disabled defaultValue>
              Bối cảnh thế giới của truyện?
            </option>
            {dataSelect.input.worldScene.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Lưu phái*/}
          <h2 className="text-[13px]">Lưu phái</h2>
          <select onChange={(e) => setStory({...story,sect: e.target.value})} className="select mt-0 font-normal dark:bg-black dark:text-white select-md select-primary w-full">
            <option disabled defaultValue>
              Lưu phái của truyện?
            </option>
            {dataSelect.input.sect.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Thị giác*/}
          <h2 className="text-[13px]">Thị giác</h2>
          <select value={story.originalLook} onChange={(e) => setStory({...story,originalLook: e.target.value})} className="select mt-0 font-normal dark:bg-black dark:text-white select-md select-primary w-full">
            {dataSelect.input.view.map((item) => (
              <option value={item} key={item}>{item}</option>
            ))}
          </select>
          {/* NOTE Button add */}
          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-4">
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                onChange={() => setcheck(!check)}
              />
              <span className="label-text dark:text-white">
                Tôi đồng ý với nội quy đăng truyện{" "}
              </span>
            </label>
          </div>
          <button onClick={handleAddStory} disabled={check} className="btn btn-primary">
              {isLoading &&  <span className="loading loading-spinner"></span>}
              {isLoading ? "Đang khởi tạo" : "Thêm truyện"}
          </button>
        </div>
      </main>
    </>
  );
}

export default CreateStory;
