import Link from "next/link";
import MyHead from "../components/MyHead";
import { data } from "@/dataFake/news";

export default function Home() {
  return (
    <>
      <MyHead
        title="Home"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="https://typefinance.com/typefinance-dp.jpg"
        url="https://typefinance.com"
      />

      <div className="flex flex-col gap-8 pb-8">
        <main className="w-full bg-white dark:bg-black dark:text-white p-4 rounded-s-lg">
          <h1 className="font-bold">Chào mừng đến với vTruyen Creator</h1>
          <div className="flex flex-col mt-4 gap-4">
            <p>
              - vCreator là nền tảng xuất bản dành cho các tác giả của
              vTruyen.Com. Ở đây bạn có thể thoải mái xuất bản các tác phẩm do
              mình sáng tác và có thể kiếm tiền từ chúng.
            </p>
            <p>
              - Nếu đây là lần đầu ghé thăm của bạn, bạn có thể thử viết vài bản
              thảo ở đây nè, nếu muốn tham gia cùng chúng tôi hãy Đăng ký trở
              thành Tác Giả nhé, và đừng quên ghé qua Kiến Thức Cơ Bản để hiểu
              rõ cách sử dụng hệ thống.
            </p>
          </div>
        </main>
        <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg">
          <h1 className="font-bold">Tin tức mới</h1>
          <div className="flex flex-col mt-4 gap-4">
            {data.map((item, index) => (
              <div
                key={index}
                className="flex group items-center cursor-pointer w-full gap-8"
              >
                <p>{index + 1}.</p>
                <h3 className="">
                  {item.title}
                </h3>
                <i className="text-[10px]">{item.time}</i>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
