import Link from 'next/link'
import React from 'react'
import { ButtonPrimary2 } from '../../Buttons'
type Props = {
  path: string
}

const DashboardCard = ({}) => {
  return (
    <div className="block rounded-md border w-full h-full bg-white p-6">
      <div className="flex-1 truncate">
        <div className="flex items-center justify-between">
          <h3 className="max-w-48 truncate text-sm font-bold text-gray-800">
            99999
          </h3>
          <div className="relative w-auto flex-initial pl-4">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-pink-500 p-3 text-center text-white">
              <i className="fas fa-users"></i>
            </div>
          </div>
        </div>
        <p className="mt-1 truncate text-sm text-gray-500">
          {' '}
          อยู่ในระหว่างวิชาเตรียมโครงงาน
        </p>
      </div>
    </div>
  )
}


const ColumnCard = ({}) => {
  return (
    <div className="mt-4 flex flex-wrap">
      <div className="mb-6 w-full xl:mb-0 xl:w-6/12">
        <div className="relative flex w-full min-w-0 flex-col break-words rounded-md bg-white shadow-lg">
          <div className="mb-0 rounded-md-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3 className="text-xl font-semibold">ตารางวันสอบ</h3>
              </div>
            </div>
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-4 py-2 text-left align-middle text-sm font-semibold">
                      ชื่อโครงงาน
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-4 py-2 text-left align-middle text-sm font-semibold">
                      วิชา
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-4 py-2 text-left align-middle text-sm font-semibold">
                      วันที่
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-4 py-2 text-left align-middle text-sm font-semibold">
                      เวลา
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 text-left align-middle text-xs">
                      ระบบเจาะยางรถอาจารย์
                    </th>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      โครงงาน
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      25 กพ 2555
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      12:00 น.
                    </td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 text-left align-middle text-xs">
                      ชื่อโครงงาน
                    </th>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      วิชา
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      วันที่
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                      เวลา
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center text-sm font-semibold">
              <ButtonPrimary2 Title={'ดูทั้งหมด'} path={'#'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const ColumnCard2 = () => {
  return (
    <div className="mt-4 flex flex-wrap">
      <div className="mb-6 w-full xl:mb-0 xl:w-6/12">
        <div className="relative flex w-full min-w-0 flex-col break-words rounded-md bg-white shadow-lg">
          <div className="rounded-md-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3 className="text-xl font-semibold">โครงงานทั้งหมดในวิชาเตรียมโครงงาน</h3>
              </div>
            </div>
           
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-blue-100 px-4 py-2 text-left align-middle text-sm font-semibold">
                      ชื่อโครงงาน
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-blue-100 px-4 py-2 text-left align-middle text-sm font-semibold">
                      วิชา
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-blue-100 px-4 py-2 text-left align-middle text-sm font-semibold">
                      สถานะ
                    </th>
                  </tr>
                </thead>
                
                <tbody>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 text-left align-middle text-xs">
                        xxxxxxxxxxxxxx
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                        เตรียมโครงงาน
                      </td>
                      <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-3 px-4 align-middle text-xs">
                        <span className="rounded-md bg-yellow-400 px-3 py-1 text-white">
                          ยื่นส่งCEO2-อนุมัติแล้ว
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center text-sm font-semibold">
              <ButtonPrimary2 Title={'ดูทั้งหมด'} path={'#'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export { DashboardCard, ColumnCard, ColumnCard2 }
