import Link from 'next/link'
import React from 'react'
type Props = {
  path: string
}

const DashboardCard = ({}) => {
    return (
      <div
        className="block max-w-sm p-6 bg-white border rounded-lg">
        <div className="flex-1 truncate">
          <div className="flex items-center justify-between">
            <h3 className="truncate max-w-48 text-sm text-gray-800 font-bold">99999</h3>
            <div className="relative w-auto pl-4 flex-initial">
                          <div
                            className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 rounded-full bg-pink-500"
                          >
                            <i className="fas fa-users"></i>
                          </div>
                        </div>
                        </div>
          <p className="mt-1 truncate text-sm text-gray-500"> อยู่ในระหว่างวิชาเตรียมโครงงาน</p>
        </div>
      </div>
    )
  }

const ColumnCard = ({}) => {
    return (
      <div className="flex flex-wrap mt-4">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
              <div
                className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
              >
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                  <div className="flex flex-wrap items-center">
                    <div
                      className="relative w-full px-4 max-w-full flex-grow flex-1"
                    >
                      <h3 className="font-semibold text-base text-blueGray-700">
                        ตารางวันสอบ
                      </h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    )
}
  export {DashboardCard, ColumnCard}