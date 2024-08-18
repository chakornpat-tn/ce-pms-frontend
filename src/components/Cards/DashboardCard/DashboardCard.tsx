import Link from 'next/link'
import React from 'react'
import { ButtonPrimary2 } from '../../Buttons'
type Props = {
  path: string
}

const DashboardCard = ({}) => {
  return (
    <div className="block max-w-sm rounded-lg border bg-white p-6">
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
      <div className="mb-12 w-full xl:mb-0 xl:w-8/12">
        <div className="relative mb-6 flex w-full min-w-0 flex-col break-words rounded bg-white shadow-lg">
          <div className="mb-0 rounded-t border-0 px-4 py-3">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full max-w-full flex-1 flex-grow px-4">
                <h3 className="text-2xl font-semibold">ตารางวันสอบ</h3>
              </div>
            </div>
            {/* ========Title======== */}
            <div className="block w-full overflow-x-auto">
              <table className="w-full border-collapse items-center">
                <thead>
                  <tr>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-6 py-3 text-left align-middle text-base font-semibold">
                      ชื่อโครงงาน
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-6 py-3 text-left align-middle text-base font-semibold">
                      วิชา
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-6 py-3 text-left align-middle text-base font-semibold">
                      วันที่
                    </th>
                    <th className="whitespace-nowrap border border-l-0 border-r-0 border-solid bg-bg_primary px-6 py-3 text-left align-middle text-base font-semibold">
                      เวลา
                    </th>
                  </tr>
                </thead>
                {/* ========Body======== */}
                <tbody>
                  {/* ========Line1======== */}
                  <tr>
                    <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-sm">
                      ระบบเจาะยางรถอาจารย์
                    </th>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      โครงงาน
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      25 กพ 2555
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      12:00 น.
                    </td>
                  </tr>
                  {/* ========Line2======== */}
                  <tr>
                    <th className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 text-left align-middle text-sm">
                      ชื่อโครงงาน
                    </th>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      วิชา
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      วันที่
                    </td>
                    <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-sm">
                      เวลา
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="flex items-center justify-center text-base font-semibold">
              <ButtonPrimary2 Title={'ดูทั้งหมด'} path={'#'} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export { DashboardCard, ColumnCard }
