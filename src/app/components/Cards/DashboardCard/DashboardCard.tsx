import Link from "next/link";
import React from "react";
import { ButtonPrimary2 } from "../../Buttons";
type Props = {
  path: string;
};

const DashboardCard = ({}) => {
  return (
    <div className="block max-w-sm p-6 bg-white border rounded-lg">
      <div className="flex-1 truncate">
        <div className="flex items-center justify-between">
          <h3 className="truncate max-w-48 text-sm text-gray-800 font-bold">
            99999
          </h3>
          <div className="relative w-auto pl-4 flex-initial">
            <div className="text-white p-3 text-center inline-flex items-center justify-center w-10 h-10 rounded-full bg-pink-500">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
        <p className="mt-1 truncate text-sm text-gray-500">
          {" "}
          อยู่ในระหว่างวิชาเตรียมโครงงาน
        </p>
      </div>
    </div>
  );
};

const ColumnCard = ({}) => {
  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-2xl">ตารางวันสอบ</h3>
              </div>
            </div>
            {/* ========Title======== */}
            <div className="block w-full overflow-x-auto">
              <table className="items-center w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 align-middle bg-bg_primary border border-solid py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      ชื่อโครงงาน
                    </th>
                    <th className="px-6 align-middle bg-bg_primary border border-solid py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      วิชา
                    </th>
                    <th className="px-6 align-middle bg-bg_primary border border-solid py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      วันที่
                    </th>
                    <th className="px-6 align-middle bg-bg_primary border border-solid py-3 text-base border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      เวลา
                    </th>
                  </tr>
                </thead>
                {/* ========Body======== */}
                <tbody>
                  {/* ========Line1======== */}
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                      ระบบเจาะยางรถอาจารย์
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      โครงงาน
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      25 กพ 2555
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      12:00 น.
                    </td>
                  </tr>
                  {/* ========Line2======== */}
                  <tr>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 text-left">
                      ชื่อโครงงาน
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      วิชา
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      วันที่
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4">
                      เวลา
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex justify-center items-center font-semibold text-base">
            <ButtonPrimary2 Title={"ดูทั้งหมด"} path={"#"}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export { DashboardCard, ColumnCard };
