'use client'
import React from 'react'
import { DashboardCard, ColumnCard, ColumnCard2 } from '@/components/Cards'
import ExamDateTimeTable from '@/components/Tables/ExamTable/ExamDateTime'
import useSWR from 'swr'
import { CheckExamDateTimeUserToken } from '@/actions/projectUser'
import { ListProjectDocsWaitUpdate } from '@/actions/projectDocuments'
import WaitUpdateTable from '@/components/Tables/ProjectDocsTable/waitUpdateTable'
import { GetProjectProgressWaitUpdate } from '@/actions/progressReport'
import ProjectDocumentWaitUpdateTable from '@/components/Tables/ProjectProgressTable/ProgressWaitUpdate'

type Props = {}

function page({}: Props) {
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

  return (
    <section className="h-full bg-bg_primary">
      <article className="mb-2 flex min-h-[200px] w-full flex-row flex-wrap justify-around gap-2 rounded-sm bg-primary2-400 p-4">
        <div
          className={`min-h-[400px] w-full flex-1 rounded-md border bg-white shadow-md`}
        >
          
        </div>
        <ExamDateTimeTable data={ExamDateTimeData.data} />
      </article>
      <article className="my-2 flex min-h-[200px] w-full flex-row flex-wrap justify-around gap-2">
        <WaitUpdateTable data={ProjectDocsWaitUpdate.data} />
        <ProjectDocumentWaitUpdateTable data={ProjectProgressWaitUpdate.data} />
      </article>
    </section>
  )
}

export default page
