'use client'
import React from 'react'
import dayjs from 'dayjs'

import { ProjectDocumentWaitUpdateRes } from '@/models/ProjectDocument'
import Link from 'next/link'
import course from '@/constants/course/course'

const WaitUpdateTable = ({
  data,
}: {
  data?: ProjectDocumentWaitUpdateRes[]
}) => {
  return (
    <div
      className={`min-h-[400px] w-full flex-1 rounded-md border bg-white shadow-md`}
    >
      <div className="border-b bg-primary2-400 p-4">
        <h2 className="text-lg font-semibold text-white">การอัปเดตเอกสาร</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 sm:text-sm">
                ชื่อโครงงาน
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium text-gray-600 sm:table-cell sm:text-sm">
                เอกสาร
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium text-gray-600 sm:table-cell sm:text-sm">
                วิชา
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
                        href={`/teacher/consultant/${row.project.id}/docs?course=${row.project.projectAcademicYear ? course.Project : course.PreProject}&docs=${String(row.document.id)}`}
                        key={rowIndex}
                      >
                        {row.project.projectName} 
                      </Link>
                    </div>
                    <div className="mt-1 text-xs text-gray-500 sm:hidden">
                      {row.project.projectAcademicYear
                        ? 'วิชาโครงงาน'
                        : 'วิชาเตรียมโครงงาน'}
                    </div>
                    <div className="mt-1 text-xs text-gray-500 sm:hidden">
                      {row.document.name}
                    </div>
                  </td>
                  <td className="hidden whitespace-nowrap px-4 py-3 text-xs sm:table-cell sm:text-sm">
                    {row.document.name}
                  </td>
                  <td className="hidden px-4 py-3 text-xs sm:table-cell sm:text-sm">
                    {row.project.projectAcademicYear
                      ? 'วิชาโครงงาน'
                      : 'วิชาเตรียมโครงงาน'}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs sm:table-cell sm:text-sm">
                    {dayjs(row.createdAt)
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

export default WaitUpdateTable
