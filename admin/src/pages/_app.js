import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import "@/styles/globals.css";
import { QueryClientProvider,QueryClient } from "@tanstack/react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create a client
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  return <QueryClientProvider client={queryClient}>
    <div className=" bg-blue-gray-100 flex">
      <Sidebar />
      <div className="h-screen w-full overflow-y-scroll lg:pl-4 lg:pt-4">
        <Header  />
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </div>
  </QueryClientProvider>;
}
