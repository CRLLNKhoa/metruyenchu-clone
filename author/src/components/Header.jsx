import React from "react";
import { CgSun } from "react-icons/cg";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { BiUser, BiLogOut, BiMoon } from "react-icons/bi";
import { FiCreditCard } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { useTheme } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import  * as AuthService from "services/authService"
import { resetAuth, updateAuth } from "redux/slice/authSlice";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { isJsonString } from "../../untils";


export default function Header() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const { push } = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem("access_token");
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData };
  };

  // Add a request interceptor
  AuthService.axiosJWT.interceptors.request.use(
    async (config) => {
      // Do something before request is sent
      const currentTime = new Date();
      const { decoded } = handleDecoded();
      if (decoded?.exp < currentTime.getTime() / 1000) {
        const data = await UserSevice.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );

  const handleGetDetailUser = async (id, token) => {
    const res = await AuthService.getDetailUser(id, token);
    dispatch(updateAuth({ ...res?.data, access_token: token }));
    setIsLoading(false);
  };

  const handleLogout = async () => {
    await AuthService.logoutUser();
    dispatch(resetAuth());
    push("/login")
  };

  useEffect(() => {
    setMounted(true)
  }, []);

  const renderThemeChanger = () => {
    if(!mounted) return null
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <CgSun
          onClick={() => setTheme("light")}
          className="text-[20px] cursor-pointer text-[#7367F0] font-bold"
        />
      );
    } else {
      return (
        <BiMoon
          onClick={() => setTheme("dark")}
          className="text-[20px] cursor-pointer text-[#7367F0] font-bold"
        />
      );
    }
  };
  return (
    <header className="z-50 shadow-lg border-b dark:border-none bg-[#F8F8F8] dark:bg-[#283046] h-[62px] flex items-center justify-between px-6 fixed left-[20%] top-0 right-0">
      {renderThemeChanger()}
      <div className="text-[#8E8B98] dark:text-[#CFD1D5] flex gap-2 items-center">
        <div className="flex flex-col">
          <p className="text-[14px] select-none text-[#444345] dark:text-[#CFD1D5] text-right">
            {auth?.displayName}
          </p>
          <span className="select-none text-[12px] leading-3">
            {auth?.email}
          </span>
        </div>
        <Menu as="div" className="relative text-left z-50">
          <Menu.Button>
            <img
              className="rounded-full cursor-pointer select-none"
              width={40}
              height={40}
              src={auth?.avatar || "https://firebasestorage.googleapis.com/v0/b/upload-getlink-ab132.appspot.com/o/myImages%2Fz3933384702915_8957f9705e8e7e84969ca28b2e2174b9.jpg?alt=media&token=971d010b-13a9-45fa-ad2a-7e4f54870865"}
              alt="?"
            />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-40 mt-2 origin-top-right divide-y divide-gray-100 rounded-md  bg-white dark:bg-[#31375A] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className=" py-2 flex flex-col gap-2">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-[rgba(115,103,240,0.12)] text-[#7367f0]"
                          : "text-[#474747] dark:text-[#CFD1D5]"
                      } group flex w-full items-center px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BiUser className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <BiUser className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      Cài đặt
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-[rgba(115,103,240,0.12)] text-[#7367f0]"
                          : "text-[#474747] dark:text-[#CFD1D5]"
                      } group flex w-full items-center px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <FiCreditCard
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      ) : (
                        <FiCreditCard
                          className="mr-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      )}
                      Thanh toán
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active
                          ? "bg-[rgba(115,103,240,0.12)] text-[#7367f0]"
                          : "text-[#474747] dark:text-[#CFD1D5]"
                      } group flex w-full items-center px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BsBell className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <BsBell className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      Thông báo {"(0)"}
                    </button>
                  )}
                </Menu.Item>
                <p className="border"></p>
                <Menu.Item>
                  {({ active }) => (
                    <button
                    onClick={handleLogout}
                      className={`${
                        active
                          ? "bg-[rgba(115,103,240,0.12)] text-[#7367f0]"
                          : "text-[#474747] dark:text-[#CFD1D5]"
                      } group flex w-full items-center px-2 py-2 text-sm`}
                    >
                      {active ? (
                        <BiLogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      ) : (
                        <BiLogOut className="mr-2 h-5 w-5" aria-hidden="true" />
                      )}
                      Đăng xuất
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </header>
  );
}
