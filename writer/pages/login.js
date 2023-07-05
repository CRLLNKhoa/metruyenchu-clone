import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useMutationHooks } from "@/hooks/useMutationHook";
import * as AuthService from "@/services/authService";
import { useRouter } from "next/router";
import * as Message from "@/components/Message";
import jwt_decode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { updateAuth } from "@/redux/slice/authSlice";

function Login() {
  const router = useRouter();
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [acount, setAcount] = useState({
    email: "",
    password: "",
  });
  const mutation = useMutationHooks((data) => AuthService.loginUser(data));

  const handleLogin = () => {
    if (acount.email === "") {
      Message.error({
        text: "Email không được bỏ trống!",
        theme: "light",
        position: "bottom-right",
      });
    }
    if (acount.password === "") {
      Message.error({
        text: "Password không được bỏ trống!",
        theme: "light",
        position: "bottom-right",
      });
    } else mutation.mutate(acount);
  };

  const { data, isLoading } = mutation;

  useEffect(() => {
    if (data?.status === "ERR") {
      Message.error({ text: data.message, position: "bottom-right" });
    }
    if (data?.status === "OK") {
      Message.success({ text: data.message, position: "bottom-right" });
      localStorage.setItem("access_token",JSON.stringify(data?.access_token))
      if(data?.access_token){
        const decoded = jwt_decode(data?.access_token)
        if(decoded?.id){
          handleGetDetailUser(decoded?.id,data?.access_token)
        }
      }
    }
  }, [data]);

  const handleGetDetailUser = async (id, token) => {
    const res = await AuthService.getDetailUser(id, token);
    dispatch(updateAuth({ ...res?.data, access_token: token }));
    handleLoginSuccess()
  };

  const handleLoginSuccess = () => {
    router.push("/");
  };

  useEffect(() => {
    if(auth.id !== ""){
        router.push("/")
    }
  }, [auth.id]);

  return (
    <>
      <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
        <div className="hero">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Đăng nhập ngay thôi!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-black">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-white">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input dark:text-black input-bordered"
                    value={acount.email}
                    onChange={(e) =>
                      setAcount({ ...acount, email: e.target.value })
                    }
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-white">Mật khẩu</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Mật khẩu"
                    className="input dark:text-black input-bordered"
                    value={acount.password}
                    onChange={(e) =>
                      setAcount({ ...acount, password: e.target.value })
                    }
                  />
                  <label className="label">
                    <a
                      href="#"
                      className="label-text-alt dark:text-white link link-hover"
                    >
                      Quên mật khẩu?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button onClick={handleLogin} className="btn btn-primary">
                    {isLoading && (
                      <span className="loading loading-spinner"></span>
                    )}
                    {isLoading ? "Đang đăng nhập" : "Đăng nhập"}
                  </button>
                </div>
                <Link className="text-center text-[13px] mt-4" href="/register">
                  Đăng kí ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
