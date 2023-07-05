import EditComponent from "@/components/ChapterComponents/EditComponent";
import MyHead from "@/components/MyHead";
import React from "react";

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function ListChapter() {
  return (
    <>
    <MyHead
        title="Danh sách truyện"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="/svg/logo.svg"
        url="https://typefinance.com"
      />

      <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
        <h1 className="font-semibold">Danh sách chương của truyện</h1>
        <div className="overflow-x-auto mt-8">
          <table className="table">
            {/* head */}
            <thead className="dark:bg-black dark:text-white">
              <tr>
                <th>STT</th>
                <th>Tên chương</th>
                <th>Lượt xem</th>
                <th>Ngày đăng</th>
                <th className="text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((item) => (
                <tr className="hover hover:text-black cursor-pointer  ">
                  <th>{item}</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                  <td className="flex gap-2 justify-end">
                    <label htmlFor="my-drawer" className="btn btn-warning btn-xs">
                      Chỉnh sửa
                    </label>
                    <button className="btn btn-xs btn-error">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="join mt-8 ml-auto">
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="1"
            checked
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="2"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="3"
          />
          <input
            className="join-item btn btn-square"
            type="radio"
            name="options"
            aria-label="4"
          />
        </div>
      </main>

      <div className="drawer z-50 dark:bg-black dark:text-white">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">{/* Page content here */}</div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <div className="menu p-4 w-4/5 bg-white dark:bg-black dark:text-white h-full overflow-y-scroll text-base-content">
            {/* Sidebar content here */}
            <EditComponent />
          </div>
        </div>
      </div>
    </>
  );
}

export default ListChapter;
