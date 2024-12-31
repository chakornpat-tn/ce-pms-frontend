'use client'
import { ProjectUserExamDateRes } from '@/models/ProjectUser'
import React from 'react'
import dayjs from 'dayjs'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const ExamDateTimeTable = ({ data }: { data?: ProjectUserExamDateRes[] }) => {
  return (
    <div className={`w-full flex-1 rounded-md border bg-white shadow-sm min-h-[400px]`}>
      <div className="border-b bg-primary2-400 p-4">
        <h2 className="text-lg font-semibold text-white">ตารางนัดสอบ</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 sm:text-sm">
                ชื่อโครงงาน
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium text-gray-600 sm:table-cell sm:text-sm">
                วิชา
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 sm:text-sm">
                วันเวลา
              </th>
              <th className="hidden px-4 py-3 text-left text-xs font-medium text-gray-600 sm:table-cell sm:text-sm">
                สถานที่
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 overflow-y-scroll">
            {data && data.length > 0 ? (
              data.map((row, rowIndex) => (
                <DialogExamDateDetail key={rowIndex} data={row}>
                  <tr className="cursor-pointer hover:bg-gray-100">
                    <td className="px-4 py-3 text-xs sm:text-sm">
                      <div className="line-clamp-2 sm:line-clamp-1">
                        {row.projectName}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 sm:hidden">
                        {row.projectAcademicYear
                          ? 'วิชาโครงงาน'
                          : 'วิชาเตรียมโครงงาน'}
                      </div>
                      <div className="mt-1 text-xs text-gray-500 sm:hidden">
                        {row.examLocation}
                      </div>
                    </td>
                    <td className="hidden px-4 py-3 text-xs sm:table-cell sm:text-sm">
                      {row.projectAcademicYear
                        ? 'วิชาโครงงาน'
                        : 'วิชาเตรียมโครงงาน'}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs sm:text-sm">
                      {dayjs(row.examDateTime)
                        .add(543, 'year')
                        .format('DD/MM/YYYY HH:mm')}
                    </td>
                    <td className="hidden px-4 py-3 text-xs sm:table-cell sm:text-sm">
                      <div className="max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                        {row.examLocation}
                      </div>
                    </td>
                  </tr>
                </DialogExamDateDetail>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">
                  ยังไม่มีโครงงานที่นัดสอบตอนนี้
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function DialogExamDateDetail({
  children,
  data,
}: {
  children: React.ReactNode
  data: ProjectUserExamDateRes
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="m-4 w-[95vw] max-w-md bg-white">
        <DialogHeader>
          <DialogTitle>รายละเอียดการสอบ</DialogTitle>
          <DialogDescription className="break-words">
            {data.projectName}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold">วิชา</h4>
            <p>
              {data.projectAcademicYear ? 'วิชาโครงงาน' : 'วิชาเตรียมโครงงาน'}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">วันและเวลา</h4>
            <p>
              {dayjs(data.examDateTime)
                .add(543, 'year')
                .format('DD/MM/YYYY HH:mm')}
            </p>
          </div>
          <div>
            <h4 className="font-semibold">สถานที่</h4>
            <p className="break-words">{data.examLocation}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ExamDateTimeTable
