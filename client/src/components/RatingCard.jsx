import Link from 'next/link'
import React from 'react'

export default function RatingCard() {
  const cmt  = "Sau Lạn Kha Kỳ Duyên hiếm thấy lại một bộ Tiên hiệp kiểu nhẹ nhàng pha lẫn dân gian chí quái như này. Ai đói chương có thể qua đọc thử Tân Bạch XSau Lạn Kha Kỳ Duyên hiếm thấy lại một bộ Tiên hiệp kiểu nhẹ nhàng pha lẫn dân gian chí quái như này. Ai đói chương có thể qua đọc thử Tân Bạch X"
  return (
    <div className='bg-[#F7F5F0] rounded-lg flex flex-col p-4 gap-2'>
        <div className='flex gap-2 items-center'>
            <img width={42} height={40} className='rounded-full' src="https://static.cdnno.com/user/5f01c8326e991e344b84875e5fb14ab8/50.jpg?1669884819" alt="" />
            <div className='flex-1'>
              <div className='text-[14px]'><Link href="/" className='font-bold text-[14px]'>Tên người dùng </Link>đánh giá</div>
              <Link href="/" className='text-[13px] font-semibold text-[#BF2C24] leading-3'>Tên truyện Tên truyện</Link>
            </div>
            <span className='bg-[#BF2C24] px-2 rounded-full text-white text-[13px]'>5.00</span>
        </div>
          <p className='text-[13px] text-justify'>{cmt.slice(0,160)+"..."}</p>
    </div>
  )
}
