import React, { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Link from "next/link";

export default function Input({
  title,
  name,
  id = "input",
  type = "text",
  err,onChange,value,disable
}) {
  const [show, setShow] = useState(true);
  return (
    <div className="w-full">
      <label className="text-[12px] text-black  dark:text-white mb-2" htmlFor={id}>
        {title}
      </label>
      <div
        className={`${
          err && "border-red-500"
        }w-full rounded-md relative`}
      >
        <input
          type={show ? type  : "text"}
          onChange={onChange}
          value={value}
          id={id}
          disabled={disable}
          name={name}
          autoComplete="off"
          className={`${err&&"border-red-500"} ${disable&&"cursor-not-allowed"} text-black  dark:text-white  w-full focus:border-[#7367F0] transition-all duration-300 border rounded-md pl-4 pr-8 py-2 text-[14px] bg-transparent outline-none`}
        />
        {type==="password" &&  <Link href="/login" className="text-[12px] cursor-pointer absolute top-[-18px] right-1 text-[#2841D5]">Quên mật khẩu?</Link>}
        {type === "password" &&
          (show ? (
            <AiOutlineEye
              className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={() => setShow(!show)}
            />
          ) : (
            <AiOutlineEyeInvisible
              className="absolute right-2 top-[50%] translate-y-[-50%] cursor-pointer"
              onClick={() => setShow(!show)}
            />
          ))}
        {err && (
          <BiErrorCircle
            className={
              type === "password"
                ? "right-8 absolute text-red-500 top-[50%] translate-y-[-50%]"
                : "right-2 absolute text-red-500 top-[50%] translate-y-[-50%]"
            }
          />
        )}
        <p className="absolute left-0 text-[10px] text-red-500 bottom-[-16px]">
          {err}
        </p>
      </div>
    </div>
  );
}
