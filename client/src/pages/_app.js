import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { ToastContainer } from "react-toastify";
import Header from "components/Header";
import Ads from "components/Ads";
import Footer from "components/Footer";
import "@/styles/style.css";
import { useRouter } from "next/router";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <>
          <Header />
          {router.pathname.slice(0, 7) !== "/chuong" ? (
            <div className="flex flex-col justify-center items-center bg-white w-full">
             <div className="w-full bg-yellow-300 flex justify-center items-center">
             <marquee width="1200px" scrollamount="10" direction="right" behavior="alternate" loop className="bg-yellow-300 flex italic text-[12px] py-1">
                <span className="mr-12">Server sau một khoảng thời gian sẽ tắt nên lần tải website có thể hơi lâu, mong bạn thông cảm!.</span>
            </marquee>
             </div>
              <section className="bg-no-repeat w-full bg-top bg-[url('https://static.cdnno.com/storage/topbox/f24e43e1f7cbb2e79193c1900f01b6a9.jpg')] pt-[388px] bg-white"></section>
              <Component {...pageProps} />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
          <Footer />
          <ToastContainer />
        </>
      </Provider>
    </QueryClientProvider>
  );
}
