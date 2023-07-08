"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MyHead from "@/components/MyHead";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutationHooks } from "@/hooks/useMutationHook";
import { addChapter } from "@/services/chapterService";
import { toast } from "react-toastify";

function CreateChapter() {
  const router = useRouter()

  const [chapter, setChapter] = useState({
    title: "",
    content: "",
    storyId: router.query.id,
    chapterNo: 1
  })

  const editor = useEditor({
    extensions: [StarterKit],
    onUpdate: ({editor}) => setChapter({...chapter,content: editor.getHTML()}),
    content:
      "<p>Nội dung chương truyện!</p>",
    editorProps: {
      attributes: {
        class:
          "border border-[#570df8] min-h-[200px] text-[14px] rounded-lg px-4 py-1 mx-auto focus:outline-none",
      },
    },
  });

  const mutation = useMutationHooks((data) => addChapter(data))
  const {data,isLoading} = mutation

  const handleAddChapter = () => {
    mutation.mutate(chapter)
  }


  useEffect(() => {
    if(data?.status === "ERR"){
      toast.error(data?.message,{autoClose: 3000})
    }
    if(data?.status === "OK"){
      toast.success(data?.message,{autoClose: 3000,position: "top-right"})
      setChapter({...chapter, title: "",content: ""})
      editor?.commands?.setContent("Nội dung chương truyện!")
    }
  }, [data]);

  return (
    <>
      <MyHead
        title="Thêm chương truyện"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="/svg/logo.svg"
        url="https://typefinance.com"
      />

      <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold text-[24px]">Thêm chương mới</h1>
        {/* NOTE Tên truyện */}
        <div className="flex flex-col w-full mt-8">
          <h2 className="text-[13px] mb-1">Tên truyện</h2>
          <input
            type="text"
            disabled
            value={router?.query?.title}
            placeholder="Viết hoa chữ cái đầu mỗi từ. Ví dụ: Truyên Tiên Hiệp Hấp Dẫn"
            className="input input-bordered input-primary w-full input-md"
          />
        </div>
        {/* NOTE Tên chương mới */}
        <div className="flex flex-col w-full mt-4">
          <h2 className="text-[13px] mb-1">Tên chương</h2>
          <input
            type="text"
            value={chapter.title}
            onChange={(e)=> setChapter({...chapter,title: e.target.value})}
            placeholder="Viết hoa chữ cái đầu mỗi từ. Ví dụ: Truyên Tiên Hiệp Hấp Dẫn"
            className="input dark:bg-black dark:text-white input-bordered input-primary w-full input-md"
          />
        </div>
        {/* NOTE Nội dung chương */}
        <div className="flex flex-col w-full mt-4">
          <h2 className="text-[13px] mb-1">Nội dung chương</h2>
          <EditorContent editor={editor} />
        </div>

        {/* NOTE Button */}
        <div className="flex mt-8">
          <button onClick={handleAddChapter} className="btn btn-primary ml-auto btn-sm">
            {isLoading && <span className="loading loading-spinner"></span>}
            {isLoading ? "Đang thêm chương truyện" : "Xuất bản"}
          </button>
        </div>
      </main>
    </>
  );
}

export default CreateChapter;
