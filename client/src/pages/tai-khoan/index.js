import React, { useEffect, useState } from 'react'
import {HiOutlineUserCircle} from "react-icons/hi"
import {BiBook,BiHelpCircle} from  "react-icons/bi"
import {AiOutlineSetting,AiOutlineGift,AiOutlineBell} from "react-icons/ai"
import {RxLayers} from "react-icons/rx"
import {TbCandy} from "react-icons/tb"
import {BsArrowUpCircle} from "react-icons/bs"
import SettingTab from 'components/AccountTabs/SettingTab'
import Head from 'next/head'
import Storyboard from 'components/AccountTabs/Storyboard'
import { useSelector } from 'react-redux'
import AssetTab from 'components/AccountTabs/AssetTab'
import PaymentTab from 'components/AccountTabs/PaymentTab'
import UpVipTab from 'components/AccountTabs/UpVipTab'
import MissionTab from 'components/AccountTabs/MissionTab'
import NoticationTab from 'components/AccountTabs/NoticationTab'
import HelpTab from 'components/AccountTabs/HelpTab'
import { useRouter } from 'next/router'

export default function Account() {
    const router = useRouter()
    const [tab,setTab] =  useState(Number(router.query.tab) || 1)
    const auth = useSelector((state)=>state.auth)

    useEffect(() => {
      setTab(Number(router.query.tab))
      if(router.query === {}){
        setTab(1)
      }
    }, [router]);


  return (
    <div className='bg-white w-[1200px] px-12 pb-12'>
      <Head>
        <title>Tài khoản</title>
      </Head>
        <div className='z-50 p-8 bg-white rounded-lg w-full text-black translate-y-[-140px] flex gap-8'>
            <div className='flex flex-col w-[20%]'>
                <span onClick={()=>setTab(1)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===1?"tab-account-index":"tab-account"}`}><HiOutlineUserCircle size={20} /> Hồ sơ</span>
                <span onClick={()=>setTab(2)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===2?"tab-account-index":"tab-account"}`}><BiBook size={20} /> Tủ truyện</span>
                {/* <span onClick={()=>setTab(3)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===3?"tab-account-index":"tab-account"}`}><AiOutlineSetting size={20} />Cài đặt</span> */}
                <span onClick={()=>setTab(4)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===4?"tab-account-index":"tab-account"}`}><RxLayers size={20}/>Tài sản</span>
                <span onClick={()=>setTab(5)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===5?"tab-account-index":"tab-account"}`}><TbCandy size={20} />Mua kẹo</span>
                <span onClick={()=>setTab(6)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===6?"tab-account-index":"tab-account"}`}><BsArrowUpCircle size={20} />Nâng cấp</span>
                <span onClick={()=>setTab(7)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===7?"tab-account-index":"tab-account"}`}><AiOutlineGift size={20}/>Nhận thưởng</span>
                <span onClick={()=>setTab(8)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===8?"tab-account-index":"tab-account"}`}><AiOutlineBell size={20} />Thông báo</span>
                <span onClick={()=>setTab(9)} className={`cursor-pointer p-3 flex gap-2 items-center ${tab===9?"tab-account-index":"tab-account"}`}><BiHelpCircle size={20} />Trợ giúp & Báo lỗi</span>
            </div>
            <div className='flex-1'>
              {tab===1&& <SettingTab />}
              {tab===2&& <Storyboard />}
              {tab===4&& <AssetTab />}
              {tab===5&& <PaymentTab />}
              {tab===6&& <UpVipTab />}
              {tab===7&& <MissionTab />}
              {tab===8&& <NoticationTab />}
              {tab===9&& <HelpTab />}
            </div>
        </div>
    </div>
  )
}
