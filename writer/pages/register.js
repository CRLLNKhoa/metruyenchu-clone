import { useMutationHooks } from "@/hooks/useMutationHook";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import * as AuthService from "@/services/authService";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import * as Message from "@/components/Message";

function Register() {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    if (auth.id) {
      router.push("/");
    }
  }, [auth.id]);

  const [account, setAccount] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const mution = useMutationHooks((data) => AuthService.signUpUser(data));
  const { data, isLoading } = mution;

  useEffect(() => {
    if (data?.status === "ERR") {
      Message.error({ text: data?.message, position: "bottom-right" });
    }
    if (data?.status === "OK") {
      Message.success({ text: data?.message, position: "bottom-right" });
      router.push("/login");
    }
  }, [data]);

  const handleRegister = () => {
    if (!account.email || !account.password) {
      Message.error({ text: "Nhập đủ thông tin!", position: "bottom-right" });
    }
    if (account.password !== account.confirm_password) {
      Message.error({
        text: "Xác nhận mật khẩu không đúng!",
        position: "bottom-right",
      });
    } else mution.mutate({ email: account.email, password: account.password });
  };
  return (
    <>
      <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
        <div className="hero ">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Đăng ký ngay thôi!</h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 dark:bg-black">
              <div className="card-body">
                <div className="form-control ">
                  <label className="label">
                    <span className="label-text dark:text-white">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="email"
                    className="input dark:text-black input-bordered"
                    value={account.email}
                    onChange={(e) =>
                      setAccount({ ...account, email: e.target.value })
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
                    value={account.password}
                    onChange={(e) =>
                      setAccount({ ...account, password: e.target.value })
                    }
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text dark:text-white">
                      Nhập lại mật khẩu
                    </span>
                  </label>
                  <input
                    type="password"
                    placeholder="Nhập lại mật khẩu"
                    className="input dark:text-black input-bordered"
                    value={account.confirm_password}
                    onChange={(e) =>
                      setAccount({
                        ...account,
                        confirm_password: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-control mt-6">
                  <button
                    disabled={isLoading}
                    onClick={handleRegister}
                    className="btn btn-primary"
                  >
                    {isLoading && <span className="loading loading-spinner"></span>}
                    {isLoading ? "loading" : "Đăng ký"}
                  </button>
                </div>
                <Link className="text-center text-[13px] mt-4" href="/login">
                  Đã có tài khoản
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Register;
