'use client'
import React, { useState } from 'react'
import { DashboardCard, ColumnCard, ColumnCard2 } from '@/components/Cards'
import ExamDateTimeTable from '@/components/Tables/ExamTable/ExamDateTime'
import useSWR from 'swr'
import {
  CheckExamDateTimeUserToken,
  CountProjectInYear,
} from '@/actions/projectUser'
import { ListProjectDocsWaitUpdate } from '@/actions/projectDocuments'
import WaitUpdateTable from '@/components/Tables/ProjectDocsTable/waitUpdateTable'
import { GetProjectProgressWaitUpdate } from '@/actions/progressReport'
import ProjectDocumentWaitUpdateTable from '@/components/Tables/ProjectProgressTable/ProgressWaitUpdate'

type Props = {}

function page({}: Props) {
  const [year, setYear] = useState(new Date().getFullYear() + 543)

  const ExamDateTimeData = useSWR('/project-user/check-exam-date', () =>
    CheckExamDateTimeUserToken(),
  )

  const ProjectDocsWaitUpdate = useSWR('/project-document/wait-update/', () =>
    ListProjectDocsWaitUpdate(),
  )

  const ProjectProgressWaitUpdate = useSWR(
    '/progress-report/wait-update/',
    () => GetProjectProgressWaitUpdate(),
  )

  const CountProject = useSWR(
    `/project-user/count-project/userId/${year}`,
    async () => await CountProjectInYear(year),
  )

  return (
    <section className="h-full bg-bg_primary">
      <article className="mb-2 flex min-h-[200px] w-full flex-row flex-wrap justify-around gap-2 rounded-sm bg-primary2-400 p-4">
        <div
          className={`flex min-h-[400px] w-full flex-1 flex-col items-stretch justify-center space-y-4`}
        >
          <p className="mb-4 flex items-center justify-center">
            <span className="mr-4 text-sm font-medium text-white">
              จำนวนโครงงานในปี
            </span>
            <input
              type="number"
              value={year}
              onChange={e => {
                setYear(Number(e.target.value))
             
              }}
              className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </p>
          <div className="flex h-auto flex-col items-center gap-3">
            <div className="min-h-16 w-full rounded-lg border-l-4 border-blue-500 bg-blue-50 p-4 text-center font-semibold text-blue-700 shadow-md transition-colors duration-200 hover:bg-blue-100">
              โครงงานในวิชาเตรียมโครงงาน {CountProject.data?.CountPreProp ?? 0}
            </div>
            <div className="min-h-16 w-full rounded-lg border-l-4 border-green-500 bg-green-50 p-4 text-center font-semibold text-green-700 shadow-md transition-colors duration-200 hover:bg-green-100">
              โครงงานในวิชาโครงงาน {CountProject.data?.CountOnProject ?? 0}
            </div>
            <div className="min-h-16 w-full rounded-lg border-l-4 border-purple-500 bg-purple-50 p-4 text-center font-semibold text-purple-700 shadow-md transition-colors duration-200 hover:bg-purple-100">
              โครงงานทั้งหมด {CountProject.data?.CountAllProject ?? 0}
            </div>
          </div>
        </div>
        <ExamDateTimeTable data={ExamDateTimeData.data} />
      </article>
      <article className="mb-2 flex min-h-[200px] w-full flex-col md:flex-row flex-wrap justify-around gap-2 rounded-sm p-4">
        <WaitUpdateTable data={ProjectDocsWaitUpdate.data} />
        <ProjectDocumentWaitUpdateTable data={ProjectProgressWaitUpdate.data} />
      </article>
    </section>
  )
}

export default page
