import { useRouter } from "next/router";
import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import  * as AuthService from "../services/authService"
import { isJsonString } from "@/until";
import { resetAuth, updateAuth } from "@/redux/slice/authSlice";

function Header() {
  const router = useRouter();
  const { pathname } = router;
  const arrPath = pathname.slice(1).split("/");

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    // setIsLoading(true);
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetDetailUser(decoded?.id, storageData);
    }
  }, []);

  // NOTE Refesh token 
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
    // setIsLoading(false);
  };

  const handleLogout = async () => {
    await AuthService.logoutUser();
    dispatch(resetAuth());
  };

  return (
    <div className="bg-white dark:bg-black dark:text-white p-4 rounded-es-lg z-50 flex justify-between">
      <div className="text-sm breadcrumbs">
        <ul className="m-0">
          <li>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-4 h-4 mr-2 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                ></path>
              </svg>
              Home
            </a>
          </li>
          {arrPath.map((item) => (
            <li key={item}>
              <a className="capitalize">{item}</a>
            </li>
          ))}
        </ul>
      </div>

      {!auth.id && (
        <button onClick={()=> router.push("/login")} className="btn">
          <img className="w-6 h-6" src="/svg/login.svg" alt=""/>
          Đăng nhập
        </button>
      )}

      {auth.id && (
        <div className="dropdown dropdown-end">
          <label tabIndex={20} className="">
            <div className="avatar cursor-pointer">
              <div className="w-10 rounded">
                <img src={auth.avatar} alt="Tailwind-CSS-Avatar-component" />
              </div>
            </div>
          </label>
          <ul
            tabIndex={20}
            className="dropdown-content m-0 z-50 menu shadow-lg bg-base-100 dark:bg-black dark:text-white rounded-box w-52"
          >
            <li>
              <p className="hover:text-primary duration-500">Thông tin</p>
            </li>
            <li>
              <p className="hover:text-primary duration-500">Cài đặt</p>
            </li>
            <li onClick={()=>router.push("/thong-ke")}>
              <p className="hover:text-primary duration-500">Doanh thu</p>
            </li>
            <li onClick={handleLogout}>
              <p className="hover:text-primary duration-500">Đăng xuất</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Header;
