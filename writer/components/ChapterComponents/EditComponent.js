"use client";
import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

function EditComponent() {
  const editor = useEditor({
    extensions: [StarterKit],
    content:
      "<p>Giới thiệu ngắn,  bạn hãy  giới thiệu truyện của bạn ngắn gọn, tối đa 700  chữ</p>",
    editorProps: {
      attributes: {
        class:
          "border bg-white border-[#570df8] dark:bg-black dark:text-white min-h-[200px] text-[14px] rounded-lg px-4 py-1 mx-auto focus:outline-none",
      },
    },
  });

  return (
    <>
      <div className="dark:bg-black dark:text-white">
        <h1 className="font-semibold mb-8">Chỉnh sửa chương</h1>
        {/* NOTE Tên truyện */}
        <div className="flex flex-col w-full">
          <h2 className="text-[13px] mb-1">Tên chương</h2>
          <input
            type="text"
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
            <button className="btn btn-sm mt-8 ml-auto btn-primary">
              <span className="loading loading-spinner"></span>
              loading
            </button>
       </div>
      </div>
    </>
  );
}

export default EditComponent;
