import { Loading } from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import StoryCard from 'components/StoryCard'
import { useMutationHooks } from 'hooks/useMutationHook'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import * as StoryService from "services/storyService"


export default function Books() {
  const id = useSelector((state)=> state.auth.id)
  const fetchStory = async () => {
    const res = await StoryService.getStory(id);
    return res.data;
  };
  const query = useQuery({ queryKey: ["story"], queryFn: fetchStory });
  const { isLoading, data,refetch } = query;
  const router = useRouter()

  useEffect(() => {
    if(id===""){
      router.push("/")
    }
  }, []);

  return (
   <>
   <Head>
    <title>Danh sách truyện</title>
   </Head>
      <section>
        <div className='mb-4'>
          <h1 className='text-[20px] text-[black] dark:text-white'>Truyện của tôi</h1>
          <p className='text-[14px] text-[black] dark:text-white'>Danh sách các truyện bạn đã đăng</p>
        </div>
        {isLoading && <div className='w-full flex justify-center  items-center'><Loading><span className='text-[12px] text-white'>Đang tải danh sách truyện</span></Loading></div>}
        <div className='w-full grid grid-cols-2 gap-4 '>
          {data?.map(item=> <StoryCard refetch={refetch} title={item.title} published={item.published} id={item._id} key={item._id} />)}
        </div>
      </section>
   </>
  )
}
