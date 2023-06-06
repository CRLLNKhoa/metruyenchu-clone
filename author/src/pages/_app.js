import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import Header from "components/Header";
import Sidebar from "components/Sidebar";
import { ThemeProvider } from "next-themes";
import { useRouter } from "next/router";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { store } from "redux/store";
import { Provider } from "react-redux";

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const { asPath } = router;

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <ThemeProvider enableSystem={false} attribute="class">
          {asPath === "/login" || asPath === "/register" ? (
            <>
              <Component {...pageProps} />
              <ToastContainer />
            </>
          ) : (
            <>
              <Sidebar />
              <Header />
              <ToastContainer />
              <section className="lg:ml-[20%] mt-[62px]">
                <section className="px-6 py-6 text-[#CBCED2] bg-[#F8F8F8] dark:bg-[#182131] min-h-screen">
                  <Component {...pageProps} />
                  <p className="mt-16">© vTruyen.Com 2023</p>
                </section>
              </section>
            </>
          )}
        </ThemeProvider>
      </Provider>
    </QueryClientProvider>
  );
}
