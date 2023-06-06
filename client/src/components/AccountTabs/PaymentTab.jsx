import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import * as PaymentService from "services/paymentService"
import { useMutationHooks } from "hooks/useMutationHook";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { payment } from "redux/slice/authSlice";
import { Loading, red } from "@nextui-org/react";

export default function PaymentTab() {
  const [pack,setPack] = useState(1)
  const [amount, setAmount] =  useState(2.49)
  const [SDKReady,setSDKReady] = useState(false)
  const dispatch = useDispatch()

  const addPaypalScript = async () => {
    const {data} = await PaymentService.getClientId()
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    script.async = true;
    script.onload = () => {
      setSDKReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!window.paypal){
      addPaypalScript()
    }else {
      setSDKReady(true)
    }
  }, []);

  const handlePack = (pack,amount) => {
      setPack(pack)
      setAmount(amount)
  }

  const auth = useSelector((state)=> state.auth)
  const mutation = useMutationHooks((data)=> PaymentService.payment(data))
  const {data: dataPayment,isLoading: isLoadingPayment} = mutation

  useEffect(() => {
    if(dataPayment?.status==="OK"){
      toast.success(dataPayment.message)
      dispatch(payment(dataPayment?.data))
    }
  }, [dataPayment]);

  return (
    <div className="flex flex-col relative">
      {isLoadingPayment && <div className="absolute top-0 right-0 left-0 bottom-0 bg-[#fffff999] z-[99999] flex justify-center items-center">
        <Loading size="md" textColor="error"><p className="text-[13px]">Đang thanh toán</p></Loading>
      </div>}
      <h1 className="text-[15px] font-bold mb-12">Các gói mua kẹo: </h1>
      <div className="flex gap-4 flex-wrap justify-center mb-12">
        <div onClick={()=>handlePack(1,2.49)} className={`${pack===1?"bg-sky-400 text-white":"bg-slate-200"} flex items-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-sky-400`}>
          <span>Gói: 50.000</span>
          <img
            className="w-4 h-4"
            src="https://metruyencv.com/assets/images/icons/candy.svg"
            alt="..."
          />
          <b>(2,49$)</b>
        </div>
        <div onClick={()=>handlePack(2,4.98)} className={`${pack===2?"bg-sky-400 text-white":"bg-slate-200"} flex items-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-sky-400`}>
          <span>Gói: 100.000</span>
          <img
            className="w-4 h-4"
            src="https://metruyencv.com/assets/images/icons/candy.svg"
            alt="..."
          />
          <b>(4,98$)</b>
        </div>
        <div onClick={()=>handlePack(3,9.94)} className={`${pack===3?"bg-sky-400 text-white":"bg-slate-200"} flex items-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-sky-400`}>
          <span>Gói: 200.000</span>
          <img
            className="w-4 h-4"
            src="https://metruyencv.com/assets/images/icons/candy.svg"
            alt="..."
          />
          <b>(9,94$)</b>
        </div>
        <div onClick={()=>handlePack(4,19.49)} className={`${pack===4?"bg-sky-400 text-white":"bg-slate-200"} flex items-center gap-2 py-2 px-4 rounded-full cursor-pointer hover:bg-sky-400`}>
          <span>Gói: 500.000</span>
          <img
            className="w-4 h-4"
            src="https://metruyencv.com/assets/images/icons/candy.svg"
            alt="..."
          />
          <b>(19,49$)</b>
        </div>
      </div>
      <h1 className="text-[15px] font-semibold">Hình thức thanh toán: </h1>
      <div className="flex justify-center">
          <PayPalScriptProvider options={{ "client-id": "test" }}>
          {SDKReady && <PayPalButtons
          forceReRender={[amount]}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                mutation.mutate({id: auth.id,data: {pack: amount}})
              });
            }}
            onError={()=>alert("error")}
          />}
        </PayPalScriptProvider>
      </div>
    </div>
  );
}
