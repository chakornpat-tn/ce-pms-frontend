'use client'
import React from 'react'
import { DashboardCard, ColumnCard, ColumnCard2 } from '@/components/Cards'
import ExamDateTimeTable from '@/components/Tables/ExamTable/ExamDateTime'
import useSWR from 'swr'
import { CheckExamDateTimeUserToken } from '@/actions/projectUser'
import { ListProjectDocsWaitUpdate } from '@/actions/projectDocuments'
import WaitUpdateTable from '@/components/Tables/ProjectDocsTable/waitUpdateTable'

type Props = {}

function page({}: Props) {
  const ExamDateTimeData = useSWR('/project-user/check-exam-date', () =>
    CheckExamDateTimeUserToken(),
  )

  const ProjectDocsWaitUpdate = useSWR('/project-document/wait-update/', () =>
    ListProjectDocsWaitUpdate(),
  )

  return (
    <section className="h-full bg-bg_primary">
      <article className="flex items-center justify-center rounded bg-primary2-300">
        <div className="grid h-full grid-cols-1 items-center justify-between gap-4 px-4 py-8 md:grid-cols-3 md:gap-8 md:px-0 md:py-16">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
      </article>
      <article className="my-2 min-h-[200px] flex w-full flex-row flex-wrap justify-around gap-2">
          <WaitUpdateTable data={ProjectDocsWaitUpdate.data} />
          <ExamDateTimeTable data={ExamDateTimeData.data} />
      </article>    </section>
  )
}

export default page
