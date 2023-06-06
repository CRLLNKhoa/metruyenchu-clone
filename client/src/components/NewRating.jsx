import Link from 'next/link'
import React from 'react'
import CardStory from './CardStory'
import RatingCard from './RatingCard'

export default function NewRating() {
  return (
    <div className="w-full group p-2 lg:p-0">
    <div className="flex w-full justify-between">
      <h1 className="font-bold text-[18px] mb-4">Mới đánh giá</h1>
      <Link
        href="/"
        className="text-[13px] text-[#b78a28] transition-all duration-300 hidden group-hover:flex"
      >
        Xem tất cả
      </Link>
    </div>
    <div className='flex flex-col  gap-4'>
      <RatingCard />
      <RatingCard />
      <RatingCard />
    </div>
  </div>
  )
}
