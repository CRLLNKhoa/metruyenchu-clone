import { useQuery } from "@tanstack/react-query";
import Input from "components/Input";
import LoadingCustom from "components/Loading";
import { useMutationHooks } from "hooks/useMutationHook";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import * as ChapterService from "services/chapterService";
'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

export default function AddChapter() {
  const router = useRouter();
  const id = router.query.id;
  const fetchStory = async () => {
    const res = await ChapterService.getChapter(id);
    return res.data;
  };
  const query = useQuery({ queryKey: ["chapteredit"], queryFn: fetchStory });
  const { isLoading: isLoadingGet, data: dataGet, refetch } = query;

  const [content, setContent] = useState(dataGet?.content);
  const [title, setTitle] = useState("");
  const [titleS, setTitleS] = useState("");
  const [chapterNo, setChapterNo] = useState("");
  const mutation = useMutationHooks((data) => ChapterService.editChapter(data));
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
    content: content,
  })

  useEffect(() => {
    setContent(dataGet?.content)
    setChapterNo(dataGet?.chapterNo)
    setTitle(dataGet?.title)
    setTitleS(dataGet?.storyId?.title)
  }, [dataGet]);

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
    if (data?.status === "OK") {
    toast.success("Cập nhật thành công!")
    }
    if (data?.status === "ERR") {
      toast.error(data?.message)
      }
  }, [data]);
  return (
    <div>
      <Head>
        <title>Chỉnh sửa chương</title>
      </Head>
      {isLoading && <LoadingCustom tip="Đang cập  nhật!" />}
      <h1 className="text-[18px] mb-6">Chỉnh sửa chương truyện</h1>
      <div className="flex flex-col gap-4 bg-white dark:bg-[#283046] p-6 rounded-lg">
        <div>
          <h1 className="text-[12px]  text-black mb-1 dark:text-white">
            Nội dung
          </h1>
          <EditorContent  className="text-black dark:text-white" value={content} editor={editor} />
        </div>
        <Input title="Tên truyện" value={titleS} disable />
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
              id: id,
              data: {
                title: title,
                content: content,
              },
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
