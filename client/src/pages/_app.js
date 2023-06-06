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

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <>
          <Header />
          <div className="flex flex-col justify-center items-center bg-white w-full">
            <section className="bg-no-repeat w-full bg-top bg-[url('https://static.cdnno.com/storage/topbox/f24e43e1f7cbb2e79193c1900f01b6a9.jpg')] pt-[388px] bg-white"></section>
            <Component {...pageProps} />
          </div>
          <Footer />
          <ToastContainer />
        </>
      </Provider>
    </QueryClientProvider>
  );
}
