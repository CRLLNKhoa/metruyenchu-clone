import { Loading } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import * as PaymentService from "services/paymentService";

export default function AssetTab() {
  const auth = useSelector((state) => state.auth);
  const fetchHis = async () => {
    const res = await PaymentService.getHis(auth?.id);
    return res.data;
  };
  const query = useQuery({ queryKey: ["his"], queryFn: fetchHis });
  const { isLoading, data } = query;
  return (
    <div className="flex flex-col gap-8">
      <h1>Tài sản hiện đang có:</h1>
      <div className="flex justify-between w-full items-center">
        <img
          className="w-8 h-8"
          src="https://metruyencv.com/assets/images/icons/candy.svg"
          alt="..."
        />
        <div className="mr-auto ml-6 flex flex-col">
          <span className="text-[13px] border-b pb-1">
            Đang có <b className="text-red-600">{auth.candy.quantity}</b> kẹo
          </span>
          <span className="text-[13px] pt-1">Bao gồm 0 kẹo miễn phí</span>
        </div>
        <button className="bg-[#B78A28] text-white text-[13px] px-6 py-1 rounded-sm">
          Nhận thưởng
        </button>
      </div>
      <div className="flex justify-between w-full items-center">
        <img
          className="w-8 h-8"
          src="https://metruyencv.com/assets/images/icons/flower.svg"
          alt="..."
        />
        <div className="mr-auto ml-6 flex flex-col">
          <span className="text-[13px] border-b pb-1">
            Đang có <b className="text-red-600">{auth.flower.quantity}</b> hoa
          </span>
          <span className="text-[13px] pt-1">Bao gồm 0 hoa miễn phí</span>
        </div>
        <button className="bg-[#B78A28] text-white text-[13px] px-6 py-1 rounded-sm">
          Nhận thưởng
        </button>
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-[15px] font-semibold border-b pb-2">Lịch sử: </h1>
        <div className="flex flex-col w-full gap-4 pt-8 ">
          {data?.map((item) => (
            <div key={item._id} className="flex gap-4 items-center w-full">
              <img
                className="w-6 h-6"
                src="https://metruyencv.com/assets/images/icons/candy.svg"
                alt="..."
              />
              <div className="flex flex-col w-full">
                <div className="flex justify-between w-full">
                  <p className="text-[13px] font-semibold">
                    Bạn đã mua gói {item.pack}$
                  </p>
                  <i className="text-[10px]">
                    {(item.createdAt).slice(0,10)}
                  </i>
                </div>
                <p className="text-[13px] ">+{item.amount} kẹo</p>
              </div>
            </div>
          ))}
          {isLoading && <Loading />}
        </div>
      </div>
    </div>
  );
}
