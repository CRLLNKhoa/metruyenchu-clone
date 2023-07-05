import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function LoginMiddleware({ children }) {
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (auth.id === "" && router.pathname!=="/login" && router.pathname!=="/register" && router.pathname!=="/" ) {
      router.push("/login");
    }
  }, [router.pathname]);
  return <>{children}</>;
}

export default LoginMiddleware;
