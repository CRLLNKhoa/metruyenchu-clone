import MyHead from "@/components/MyHead";
import { getDashboard } from "@/services/authService";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";

function Dashboard() {

  const id = useSelector(state => state.auth.id)

  const fetchDashboard = async () => {
    const res = await getDashboard(id);
    return res.data;
  };

  const query = useQuery({ queryKey: ["dashboard"], queryFn: fetchDashboard });
  const { isLoading, data,refetch } = query;
console.log(data)
  return (
    <>
     <MyHead
        title="Thống   kê  chung"
        description="Welcome to TypeFinance, where we help you to choose the best financing for you"
        image="/svg/logo.svg"
        url="https://typefinance.com"
      />
        <main className="w-full bg-white p-4 dark:bg-black dark:text-white rounded-s-lg flex flex-col pb-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="stats text-black dark:text-white col-span-2 bg-white dark:bg-black ">
              <div className="stat">
                <div className="stat-title text-black dark:text-white">
                  Tổng Tài Sản
                </div>
                <div className="stat-value">$12</div>
                <div className="stat-actions">
                  <button className="btn btn-sm btn-success">Thêm tài khoản</button>
                </div>
              </div>
    
              <div className="stat">
                <div className="stat-title text-black dark:text-white">
                  Thu Nhập Mới
                </div>
                <div className="stat-value">$5</div>
                <div className="stat-actions flex gap-3">
                  <button className="btn btn-sm btn-info">Rút về tài sản</button>
                  <button className="btn btn-sm">Xem chi tiết</button>
                </div>
              </div>
            </div>
            <div className="stats bg-white dark:bg-black col-span-3 shadow">
              <div className="stat  place-items-center">
                <div className="stat-title text-black dark:text-white">
                  Số Truyện
                </div>
                <div className="stat-value text-black dark:text-white">{data?.countStory}</div>
                <div className="stat-desc text-black dark:text-white">
                  From January 1st to February 1st
                </div>
              </div>
    
              <div className="stat place-items-center">
                <div className="stat-title text-black dark:text-white">
                  Số Chương
                </div>
                <div className="stat-value text-black dark:text-white">{data?.countChapter}</div>
                <div className="stat-desc text-black dark:text-white">
                  ↗︎ 40 (2%)
                </div>
              </div>
    
              <div className="stat place-items-center">
                <div className="stat-title text-black dark:text-white">
                  Số Lượt Xem
                </div>
                <div className="stat-value text-black dark:text-white">{data?.totalView}</div>
                <div className="stat-desc text-black dark:text-white">
                  Tổng các truyện
                </div>
              </div>
            </div>
            <div className="col-span-3">
                <h5>Danh sách ủng hộ</h5>
                <div className="overflow-x-auto ">
                  <table className="table table-xs">
                    <thead>
                      <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>company</th>
                        <th>location</th>
                        <th>Last Login</th>
                        <th>Favorite Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Littel, Schaden and Vandervort</td>
                        <td>Canada</td>
                        <td>12/16/2020</td>
                        <td>Blue</td>
                      </tr>
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Zemlak, Daniel and Leannon</td>
                        <td>United States</td>
                        <td>12/5/2020</td>
                        <td>Purple</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </main>
    </>
  );
}

export default Dashboard;
