'use client'
import React from 'react'
import dayjs from 'dayjs'
import Link from 'next/link'
import { ProjectReportWaitUpdateRes } from '@/models/ProgressReport'

const ProjectDocumentWaitUpdateTable = ({
  data,
}: {
  data?: ProjectReportWaitUpdateRes[]
}) => {
  return (
    <div
      className={`min-h-[400px] w-full flex-1 rounded-md border bg-white shadow-md`}
    >
      <div className="border bg-primary2-400 p-4">
        <h2 className="text-lg font-semibold text-white">รายงานความคืบหน้า</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 sm:text-sm">
                ชื่อโครงงาน
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium text-gray-600 sm:table-cell sm:text-sm">
              รายงานควาทคืบหน้า
              </th>
             
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 sm:text-sm">
                วันเวลา
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 overflow-y-scroll">
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="cursor-pointer hover:bg-gray-100">
                  <td className="px-4 py-3 text-xs sm:text-sm">
                    <div className="line-clamp-2 hover:underline sm:line-clamp-1">
                      <Link
                        href={`/teacher/project-detail/${row.project.id}/progress-report`}
                        key={rowIndex}
                      >
                        {row.project.projectName}
                      </Link>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 sm:hidden">
                      {row.title}
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-xs sm:table-cell sm:text-sm">
                    {row.title}
                  </td>
           
                  <td className="whitespace-nowrap px-4 py-3 text-xs sm:table-cell sm:text-sm">
                    {dayjs(row.createAt)
                      .add(543, 'year')
                      .format('DD/MM/YYYY HH:mm')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  ยังไม่มีเอกสารอัปเดต
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProjectDocumentWaitUpdateTable
