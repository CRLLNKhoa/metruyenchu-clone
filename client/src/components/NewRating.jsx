import Link from 'next/link'
import React from 'react'
import CardStory from './CardStory'
import RatingCard from './RatingCard'
import * as RatingService from "services/ratingService"
import { useQuery } from '@tanstack/react-query'

export default function NewRating() {
   // Rating
   const fetch = async () => {
    const res = await RatingService.getNewRating(4);
    return res.data;
  };
  const queryMyRating  = useQuery({queryKey: ["newlisstRating"],queryFn: fetch})
  const {data, isLoading} = queryMyRating
  return (
    <div className="w-full h-full group p-2 lg:p-0">
    <div className="flex w-full justify-between">
      <h1 className="font-bold text-[18px] mb-4">Mới đánh giá</h1>
      <Link
        href="/"
        className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
      >
        Xem tất cả
      </Link>
    </div>
    <div className='flex flex-col justify-between gap-4'>
      {data?.map(item => 
        <div key={item._id}><RatingCard data={item} /></div>
        )}
    </div>
  </div>
  )
}
