"use client";
import React, { useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { updateChapter } from "@/services/chapterService";
import { useMutationHooks } from "@/hooks/useMutationHook";
import * as Message from "@/components/Message"

function EditComponent({ data,action }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: data.content,
    onUpdate: ({ editor }) =>
      setChapter({ ...chapter, content: editor.getHTML() }),
    editorProps: {
      attributes: {
        class:
          "border bg-white border-[#570df8] dark:bg-black dark:text-white min-h-[120px] text-[14px] rounded-lg px-4 py-1 mx-auto focus:outline-none",
      },
    },
  });

  useEffect(() => {
    editor?.commands?.setContent(data?.content);
  }, [data]);

  const [chapter, setChapter] = useState({
    chapterNo: data?.chapterNo,
    content: data?.content,
    title: data?.title,
    id: data?.id,
  });

  useEffect(() => {
    setChapter({
      chapterNo: data?.chapterNo,
      content: data?.content,
      title: data?.title,
      id: data?.id,
    });
  }, [data]);

  const mutation = useMutationHooks((data) => updateChapter(data));

  const {data: dataUpdate,isLoading} = mutation

  const handleUpdate = () => {
    mutation.mutate({
      id: data?.id,
      data: chapter,
    });
  };

  useEffect(() => {
    if(dataUpdate?.status === "ERR"){
      Message.error({text: dataUpdate?.message,position: "top-right"})
    }
    if(dataUpdate?.status === "OK"){
      Message.success({text: dataUpdate?.message,position: "top-right"})
      action()
    }
  }, [dataUpdate]);

  return (
    <>
      <div className="dark:bg-black dark:text-white">
        <h1 className="font-semibold mb-8 text-[24px]">Chỉnh sửa chương</h1>
        {/* NOTE Chương*/}
        <div className="flex flex-col w-full">
          <h2 className="text-[13px] mb-1">Chương số</h2>
          <input
            type="number"
            value={chapter.chapterNo}
            onChange={(e) =>
              setChapter({ ...chapter, chapterNo: e.target.value })
            }
            placeholder="Chương số"
            className="input dark:bg-black dark:text-white input-bordered input-primary w-full input-md"
          />
        </div>
        {/* NOTE Tên truyện */}
        <div className="flex flex-col mt-8 w-full">
          <h2 className="text-[13px] mb-1">Tên chương</h2>
          <input
            type="text"
            value={chapter.title}
            onChange={(e) => setChapter({ ...chapter, title: e.target.value })}
            placeholder="Viết hoa chữ cái đầu mỗi từ. Ví dụ: Truyên Tiên Hiệp Hấp Dẫn"
            className="input dark:bg-black dark:text-white input-bordered input-primary w-full input-md"
          />
        </div>
        {/* NOTE Nội dung chương */}
        <div className="flex flex-col w-full mt-8">
          <h2 className="text-[13px] mb-1">Nội dụng chương</h2>
          <EditorContent editor={editor} />
        </div>
        {/* NOTE Button Save */}
        <div className="w-full flex">
          <button onClick={handleUpdate} className="btn btn-sm mt-8 ml-auto btn-primary">
            {isLoading && <span className="loading loading-spinner"></span>}
            {isLoading ? "Đang chỉnh sửa!" : "Cập nhật"}
          </button>
        </div>
      </div>
    </>
  );
}

export default EditComponent;
