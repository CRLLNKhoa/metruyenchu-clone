import Input from "components/Input";
import LoadingCustom from "components/Loading";
import { useMutationHooks } from "hooks/useMutationHook";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as ChapterService from "services/chapterService";
'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Head from "next/head";

export default function AddChapter() {
  const router = useRouter();
  const id = router.query.id
  const [content, setContent] = useState("<p>Nội dung truyện! 🌎️</p>");
  const [title, setTitle] = useState("");
  const [chapterNo, setChapterNo] = useState(0);
  const mutation = useMutationHooks((data) => ChapterService.createChapter(data));
  const { data, isLoading } = mutation;
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    editorProps: {
      attributes: {
        class: 'border px-4 py-2 rounded-lg min-h-[200px]',
      },
    },
    onUpdate({ editor }) {
      setContent(editor.getHTML());
  },
    content: '<p>Nội dung truyện! 🌎️</p>',
  })


  const notify = () =>
  toast.error(data?.message, {
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
  toast.success(data?.message, {
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
    if (data?.status === "ERR") {
      notify();
    }
    if (data?.status === "OK") {
      notifySuccess();
      setTitle("")
      setChapterNo(0)
      setContent("")
    }
  }, [data]);


  return (
    <div>
            <Head>
        <title>Thêm chương truyện</title>
      </Head>
      {isLoading && <LoadingCustom tip="Đang thêm!" />}
      <h1 className="text-[20px] mb-6">Thêm chương truyện</h1>
      <div className="flex flex-col gap-4 bg-white dark:bg-[#283046] p-6 rounded-lg">
        <div>
          <h1 className="text-[12px]  text-black mb-1 dark:text-white">
            Nội dung
          </h1>
          <EditorContent  className="text-black dark:text-white" value={content} editor={editor} />
        </div>
        <Input title="Tên truyện" value={router.query.slug} disable />
        <div>
          <p className="title-input">Tên chương</p>
          <input
            placeholder=""
            type="text"
            className="input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <button
          onClick={() =>
            mutation.mutate({
              title: title,
              storyId: id,
              content: content,
              chapterNo: 1,
            })
          }
          className="bg-[#7367F0] text-[13px] text-[white] rounded-lg transition-all duration-300 hover:brightness-125 py-2"
        >
          Xuất bản
        </button>
      </div>
    </div>
  );
}
