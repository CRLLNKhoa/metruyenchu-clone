import ListBox from "components/ListBox";
import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { input } from "dataSystem/selectBoxData";
import { useMutationHooks } from "hooks/useMutationHook";
import * as StoryService from "services/storyService";
import * as GenreService from "services/genreService"
import { useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import ListBoxGenre from "components/ListBoxGenre";
import LoadingCustom from "components/Loading";
import { toast } from "react-toastify";

export default function Create() {
  const [rule, setRule] = useState(false);
  const id  = useSelector((state)  => state.auth.id)

  const [genre, setGenre] = useState(input.genre[0]);
  const [character, setCharacter] = useState(input.character[0]);
  const [worldScene, setWorldScene] = useState(input.worldScene[0]);
  const [sect, setSect] = useState(input.sect[0]);
  const [view, setView] = useState(input.view[0]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");


  const mutation = useMutationHooks((data) => StoryService.createStory(data));
  const { isLoading, data } = mutation;

  useEffect(() => {
    if (data?.status === "ERR") {
      notify()
    }
    if(data?.status === "OK"){
      notifySuccess()
      setCharacter(input.character[0])
      setGenre(input.genre[0]);
      setDesc("")
      setTitle("")
      setView(input.view[0]);
      setSect(input.sect[0]);
      setWorldScene(input.worldScene[0]);
    }
  }, [data]);

  const notify = () => toast.error(data?.message, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "dark",
    });

    const notifySuccess = () => toast.success(data?.message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      });

  return (
    <div>
      <Head>
        <title>Thêm truyện mới</title>
        <meta
          property="og:title"
          content="Thêm truyện mới"
          key="Create Story"
        />
      </Head>
      {isLoading && <LoadingCustom tip="Đang thêm vào cơ sở dữ liệu!" />}
      <div className="flex  flex-col mb-6">
        <h1 className="text-[20px] text-[black] dark:text-white">Thêm truyện mới</h1>
        <p className="text-[14px] text-[black] dark:text-white">
          Bất đầu sáng tạo thế giới riêng của bạn
        </p>
      </div>
      <section className="w-full flex flex-col gap-6 min-h-screen dark:bg-[#283046] bg-white rounded-lg p-6">
        <div>
          <p className="title-input">Tên truyện</p>
          <input
            placeholder="Viết hoa mỗi chữ cái đầu, ví dụ như này: Viết Hoa Giống Này"
            type="text"
            className="input"
            onChange={(e)=>setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <p className="title-input">Giới thiệu</p>
          <textarea
            placeholder="Tóm tắt truyện không nên quá dài nên ngắn gọn, tập trung, thú vị. Phần này rất quan trọng vì nó quyết định độc giả có đọc hay không. Tối đa 700 từ"
            type="text"
            className="input h-32"
            onChange={(e)=>setDesc(e.target.value)}
            value={desc}
          />
        </div>
        <div>
          <p className="title-input">Thể loại</p>
          <ListBox data={input.genre} selected={genre} setSelected={setGenre} />
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
            selected={worldScene}
            setSelected={setWorldScene}
          />
        </div>
        <div>
          <p className="title-input">Lưu phái</p>
          <ListBox data={input.sect} selected={sect} setSelected={setSect} />
        </div>
        <div>
          <p className="title-input">Thị giác</p>
          <ListBox data={input.view} selected={view} setSelected={setView} />
        </div>
        <div className="flex items-center gap-4">
          <input
            onChange={() => setRule(!rule)}
            className="cursor-pointer"
            type="checkbox"
          />
          <p className="text-[14px]">
            Tôi đồng ý với{" "}
            <Link href="/" className="text-[#7367F0] text-[14px]">
              Nội Quy Đăng Truyện
            </Link>
          </p>
        </div>
        <button
          disabled={!rule}
          onClick={() =>
            mutation.mutate({
              title: title,
              description: desc,
              originalLook: view,
              idUser: id,
              sect: sect,
              worldScene: worldScene,
              character: character,
              genre: genre
            })
          }
          className={`${
            rule === true ? "bg-[#7367F0]" : "bg-[#babac0] cursor-not-allowed"
          } text-[14px] py-2 text-white rounded-md shadow-indigo-500/50 hover:shadow-2xl`}
        >
          Thêm truyện
        </button>
      </section>
    </div>
  );
}
