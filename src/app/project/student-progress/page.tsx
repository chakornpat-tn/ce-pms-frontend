'use client'
import { GetProjectFormToken, UpdateProjectFormToken } from '@/actions/project'
import useSWR from 'swr'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Loader } from '@/components/Loading'
import { CreateProgressReportDialog } from '@/components/Dialog'
import { ListProgressReportFormToken } from '@/actions/progressReport'
import dayjs from 'dayjs'
import { ProgressReportStatusBadge } from '@/components/Badge'

export default function DocsEdit() {
  const router = useRouter()

  const fetcher = async () => {
    const data = await ListProgressReportFormToken()
    return data
  }

  const { data, error, mutate } = useSWR('my-progress-report', fetcher)

  if (error) return <>Error loading data</>
  if (!data) {
    return (
      <section className="relative mt-0 flex min-h-[85dvh] items-center justify-center overflow-x-auto rounded bg-white p-10 shadow-md">
        <Loader />
      </section>
    )
  }

  return (
    <section className="relative mt-0 h-auto min-h-[85dvh] rounded bg-white p-4 shadow-md sm:p-6 md:p-10">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowBackIcon className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        ย้อนกลับ
      </button>
      <div className="">
        <div className="mb-4 flex flex-col items-start justify-between sm:flex-row sm:items-center">
          <h2 className="mb-4 text-lg font-bold sm:mb-0 sm:text-xl md:text-2xl">
            รายงานความคืบหน้าของโครงงาน
          </h2>

          <CreateProgressReportDialog>
            <button className="w-full rounded-md bg-primary2-400 px-2 py-1 text-xs text-white transition-colors hover:bg-primary2-500 sm:w-auto sm:px-3 sm:py-1.5 sm:text-sm md:px-4 md:py-2 md:text-base">
              ส่งรายงานความคืบหน้า
            </button>
          </CreateProgressReportDialog>
        </div>
        <article className="mt-5 w-full bg-white">
          {data &&
            data.map(item => (
              <div
                key={item.id}
                className="mb-4 flex flex-col items-center justify-between rounded-lg border border-primary1 p-4 shadow-sm hover:shadow-md sm:flex-row sm:px-6"
              >
                <div className="text-lg font-medium text-primary1">
                  <p>{item.title}</p>
                  <p>
                    <ProgressReportStatusBadge status={item.status} />
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  {dayjs(item.createAt).format('DD/MM/') +
                    (parseInt(dayjs(item.updatedAt).format('YYYY')) + 543)}{' '}
                </div>
              </div>
            ))}
        </article>
      </div>
    </section>
  )
}
