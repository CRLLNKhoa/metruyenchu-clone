import { Popover } from '@nextui-org/react'
import { data } from 'autoprefixer'
import { useMutationHooks } from 'hooks/useMutationHook'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { payment, upVip, updateAuth } from 'redux/slice/authSlice'
import * as AuthService from "services/authService"
import * as Payment from "services/paymentService"

export default function UpVipTab() {
  const auth = useSelector((state)=> state.auth)
  const mutation = useMutationHooks((data) => Payment.upVip(data))
  const {data, isLoading} = mutation
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch()
  const handleUp =()=>{
    if(auth?.candy.quantity <= 300000){
      toast.error("Bạn không đủ kẹo!")
      setIsOpen(false)
    }else {
      mutation.mutate(auth?.id)
      setIsOpen(false)
    }
  }
  useEffect(() => {
    if(data?.status==="OK"){
      toast.success("Nâng cấp thành công!")
      dispatch(payment(data?.data.asset))
      dispatch(upVip(data?.data))
    }
    if(data?.status==="ERR"){
      toast.error("Bạn không  đủ kẹo!")
    }
  }, [data]);

  return (
    <div className='flex flex-col gap-4 justify-center items-start'>
        <h1 className='text-[16px] font-semibold border-b pb-2 w-full'>Nâng cấp tài khoản</h1>
        <div className='text-[13px] w-full'>
          <p>- Sau khi nâng cấp tài khoản bạn sẽ không bị làm phiền bởi quảng cáo</p>
          <p>- Phí nâng cấp tài khoản 300,000 Kẹo vĩnh viễn</p>
        </div>
        {
          auth.vip.status ? <p className='text-red-600 text-[13px]'>Bạn đang nâng cấp tài khoản!</p>:  <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
          <Popover.Trigger>
          <button className='bg-[#B78A28] py-1 rounded-full text-white text-[13px] font-semibold hover:bg-sky-600 w-[200px]'>Nâng cấp</button>
          </Popover.Trigger>      
          <Popover.Content>
            <div className='p-4'>
              <div>
                <h1 className='text-red-600 border-b pb-2 font-semibold '>Xác nhận thanh toán</h1>
                <p className='text-[13px] py-8'>Bạn có thật sự muốn nâng cấp tài khoản không? Thao tác này không thể hoàn tác!</p>
                <div className='flex w-full justify-end gap-2'>
                  <button onClick={()=> setIsOpen(false)} className='bg-red-500 font-bold px-4 py-1 text-white text-[13px] rounded-sm'>Không</button>
                  <button onClick={handleUp} className='bg-sky-500 px-4 py-1 text-white font-bold text-[13px] rounded-sm'>Xác nhận</button>
                </div>
              </div>
            </div>
          </Popover.Content> 
        </Popover>
        }
    </div>
  )
}
