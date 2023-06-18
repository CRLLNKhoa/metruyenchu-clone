import Link from 'next/link'
import React from 'react'

export default function RatingCard(props) {
  const {character,content,storyId,userId,cmt,worldScene} = props.data
  const f = (num) => {
    if(Number.isInteger(num)){
      return `${num}.00`
    }else return num
  }
  return (
    <div className='bg-[#F7F5F0] rounded-lg flex flex-col p-4 gap-2'>
        <div className='flex gap-2 items-center'>
            <img width={42} height={40} className='rounded-full w-[42px] h-[42px]' src={userId?.avatar} alt="" />
            <div className='flex-1'>
              <div className='text-[14px]'><Link href="/" className='font-bold text-[14px]'>{userId?.displayName} </Link>đánh giá</div>
              <Link href={`/truyen/${storyId._id}`} className='text-[13px] font-semibold text-[#BF2C24] leading-3'>{storyId?.title}</Link>
            </div>
            <span className='bg-[#BF2C24] px-2 rounded-full text-white text-[13px]'>{f(Math.round((character + worldScene + content)/3*100)/100)}</span>
        </div>
          <p className='text-[13px] text-justify'>{cmt.slice(0,160)+"..."}</p>
    </div>
  )
}
