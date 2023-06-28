import { useMutationHooks } from "hooks/useMutationHook";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as AuthService from "services/authService";
import { updateAuth } from "redux/slice/authSlice";

export default function SettingTab() {
  const auth = useSelector((state) => state.auth);

  const namRef = useRef();
  const nuRef = useRef();
  const khacRef = useRef();

  const [dataUpdate, setDataUpdate] = useState({
    displayName: auth.displayName,
    sex: auth.sex,
    birthyear: auth.birthyear,
  });

  useEffect(() => {
    setDataUpdate({
        displayName: auth.displayName,
        sex: auth.sex,
        birthyear: auth.birthyear,
      })
      setImgs(auth.avatar)
  }, [auth]);

  const [imgs, setImgs] = useState(auth.avatar);

  const handleChnageAvatar = (e) => {
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImgs(data.result);
    });
    data.readAsDataURL(e.target.files[0]);
  };
  const mutation = useMutationHooks((data) =>
    AuthService.updateUser(data)
  );
  const { isLoading, data } = mutation;
  const dispath = useDispatch()
  useEffect(() => {
    if(data?.status==="OK"){
      toast.success("Cập nhật thông tin thành công!")
      dispath(updateAuth(data?.data))
    }
  }, [data]);

  useEffect(() => {
    if (nuRef.current?.checked === true) {
      setDataUpdate({ ...dataUpdate, sex: 2 });
    }
  }, [nuRef.current?.checked]);
  useEffect(() => {
    if (khacRef.current?.checked === true) {
      setDataUpdate({ ...dataUpdate, sex: 3 });
    }
  }, [khacRef.current?.checked]);
  useEffect(() => {
    if (namRef.current?.checked === true) {
      setDataUpdate({ ...dataUpdate, sex: 1 });
    }
  }, [namRef.current?.checked]);
  return (
    <div className="flex flex-col justify-between items-center">
      <div className="flex flex-col justify-center items-center gap-2 border-b pb-8">
        <div className="relative z-10 overflow-hidden group rounded-full">
          <img
            src={imgs}
            alt="..."
            className="rounded-full w-[120px] h-[120px]"
          />
          <label
            className="z-0 group-hover:bottom-0 transition-all cursor-pointer  duration-700 text-white font-semibold absolute bottom-[-100px] left-[50%] translate-x-[-50%] w-[120px] h-11 items-center justify-center flex bg-[#B78A28] text-[13px]"
            htmlFor="ava"
          >
            Thay đổi
          </label>
          <input
            onChange={handleChnageAvatar}
            id="ava"
            className="hidden"
            type="file"
          />
        </div>
        <span className="text-[13px] text-center italic  w-[320px]">
          Hover vào ảnh trên để đổi ảnh đại diện, file ảnh không nặng quá 1MB
        </span>
      </div>
      <div className="w-full py-4 flex-col gap-6 flex">
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold" htmlFor="">
            Tên hiển thị
          </label>
          <input
            className="border-2 py-2 px-4 rounded-full outline-[#B78A28] text-[13px]"
            type="text"
            placeholder={auth.displayName}
            onChange={(e) =>
              setDataUpdate({ ...dataUpdate, displayName: e.target.value })
            }
            value={dataUpdate.displayName}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold" htmlFor="">
            Năm sinh
          </label>
          <input
            className="border-2 py-2 px-4 rounded-full outline-[#B78A28] text-[13px]"
            type="number"
            min={1900}
            max={2023}
            placeholder={auth.birthyear || "Chưa cập nhật"}
            onChange={(e) =>
              setDataUpdate({ ...dataUpdate, birthyear: e.target.value })
            }
            value={dataUpdate.birthyear}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold" htmlFor="">
            Giới tính
          </label>
          <div className="flex items-center gap-8 text-[13px]">
            <div className="flex gap-2 items-center">
              <input
                className="cursor-pointer"
                defaultChecked={auth.sex === 1}
                ref={namRef}
                type="radio"
                name="sex"
                id="nam"
                onChange={()=>setDataUpdate({ ...dataUpdate, sex: 1 })}
              />
              <label className="cursor-pointer" htmlFor="nam">
                Nam
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                className="cursor-pointer"
                defaultChecked={auth.sex === 2}
                ref={nuRef}
                type="radio"
                name="sex"
                id="nu"
                onChange={()=>setDataUpdate({ ...dataUpdate, sex: 2 })}
              />
              <label className="cursor-pointer" htmlFor="nu">
                Nữ
              </label>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="radio"
                name="sex"
                id="khac"
                defaultChecked={auth.sex === 3}
                ref={khacRef}
                className="cursor-pointer"
                onChange={()=>setDataUpdate({ ...dataUpdate, sex: 3 })}
              />
              <label className="cursor-pointer" htmlFor="khac">
                Khác
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-semibold" htmlFor="">
            Tài khoản Email
          </label>
          <input
            className="border-2 py-2 px-4 rounded-full outline-[#B78A28] text-[13px] select-none"
            type="text"
            disabled
            value={auth.email}
          />
          <i className="text-[12px]">
            Lưu ý: Chưa cập nhật chức năng đổi email
          </i>
        </div>
        <button disabled={isLoading} onClick={()=>mutation.mutate({id: auth.id, data: {...dataUpdate,avatar: imgs}})} className="bg-[#B78A28] w-[120px] px-2 py-2 rounded-full text-white ml-auto hover:brightness-125 text-[14px]">
          {isLoading?"Đang cập nhật":"Cập nhật"}
        </button>
      </div>
    </div>
  );
}
