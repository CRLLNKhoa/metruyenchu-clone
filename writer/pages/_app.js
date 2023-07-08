import "../styles/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";
import "../public/nprogress.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Script from "next/script";
import LeftBar from "@/components/LeftBar";
import Header from "@/components/Header";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LoginMiddleware from "@/middlewares/loginMiddleware";
import { NextUIProvider } from "@nextui-org/react";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      setIsLoading(true);
      NProgress.start();
    };
    const handleComplete = () => {
      setIsLoading(false);
      NProgress.done();
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, []);

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-WYTYXQXVK6`}
      />
      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-WYTYXQXVK6', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>

        <QueryClientProvider client={queryClient}>
          <Provider store={store}>
            <ThemeProvider enableSystem={true} attribute="class">
              <LoginMiddleware>
                <div className="grid grid-cols-5 h-screen bg-slate-200 dark:bg-slate-900 gap-4">
                  <div className="col-span-1 hidden lg:flex bg-white">
                    <LeftBar />
                  </div>
                  <div className="col-span-5 lg:col-span-4 pb-8 h-screen flex flex-col gap-4 overflow-y-scroll">
                    <Header />
                    <Component {...pageProps} />
                  </div>
                </div>
              </LoginMiddleware>
            </ThemeProvider>
          </Provider>
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryClientProvider>

      <ToastContainer />
      {isLoading && (
        <div className="nprogress-custom-parent">
          <div className="nprogress-custom-bar" />
        </div>
      )}
    </>
  );
}
