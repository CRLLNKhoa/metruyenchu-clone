import Link from 'next/link'
import React from 'react'
import {BsPen} from "react-icons/bs"
import {AiOutlineMenu} from "react-icons/ai"

export default function FilterCard({thumbnail,title,desc="",author,genre,chapter}) {
  return (
    <div className='flex pt-6 pb-8 border-b'>
        <img className='w-[90px] h-[120px]' src={thumbnail} alt="" />
        <div className='flex-1 justify-between flex flex-col px-2'>
            <Link className='font-semibold text-[15px]' href="/"><span>{title}</span></Link>
            <p className='text-[12px]'>{desc.slice(0,90)}...</p>
            <div className='flex justify-between'>
                <span className='flex text-[10px] items-center  gap-2'><BsPen />{author}</span>
                <span className='border rounded-[4px] px-4 border-[#B78A28] text-[#B78A28] text-[10px] py-[2px]'>{genre}</span>
            </div>
            <span className='flex items-center text-[10px] gap-2'><AiOutlineMenu />{chapter} Chương</span>
        </div>
    </div>
  )
}
