'use client'
import {
  changeProgressReportStatus,
  ListProgressReport,
} from '@/actions/progressReport'
import React from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/Loading'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { ProgressReportStatusBadge } from '@/components/Badge'
import dayjs from 'dayjs'
import { useParams } from 'next/navigation'
import { ProgressReportDetailDialog } from '@/components/Dialog'
import progressReportStatus from '@/constants/progressReport/status'
import { CheckUserIsAdvisor } from '@/actions/projectUser'

type Props = {}

function progressReport({}: Props) {
  const params = useParams()
  const router = useRouter()
  const { data, isLoading, error, mutate } = useSWR(
    `/v1/progress-report?projectId=${params.projectId}`,
    () => ListProgressReport(Number(params.projectId)),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
    },
  )

  const IsAdvisor = useSWR(`check-advisor-${Number(params.projectId)}`, () =>
    CheckUserIsAdvisor(Number(params.projectId)),
  )

  if (error) {
    router.back()
  }
  if (isLoading) {
    return (
      <section className="relative mt-0 flex min-h-[85dvh] items-center justify-center overflow-x-auto rounded bg-white p-4 shadow-md sm:p-6 md:p-10">
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
      <div className="w-full">
        <div className="mb-4 flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
            รายงานความคืบหน้าของโครงงาน
          </h2>
        </div>
        <article className="mt-5 w-full">
          {data &&
            data.map(item => (
              <div
                key={item.id}
                onClick={async () => {
                  if (
                    item.status == progressReportStatus.WAITING &&
                    IsAdvisor.data
                  ) {
                    await changeProgressReportStatus(
                      item.id,
                      progressReportStatus.SEEN,
                    )
                    mutate()
                  }
                }}
              >
                <ProgressReportDetailDialog
                  progressId={item.id}
                  onSuccess={mutate}
                  projectId={Number(params.projectId)}
                >
                  <div className="mb-4 flex cursor-pointer flex-col items-start justify-between space-y-2 rounded-lg border border-primary1 p-4 shadow-sm hover:shadow-md sm:flex-row sm:items-center sm:space-y-0 sm:px-6">
                    <div className="space-y-1 text-base font-medium text-primary1 sm:text-lg">
                      <p className="break-words">{item.title}</p>
                      <p>
                        <ProgressReportStatusBadge status={item.status} />
                      </p>
                    </div>
                    <div className="text-xs text-gray-600 sm:text-sm">
                      {dayjs(item.createAt).format('HH:mm ') +
                        dayjs(item.createAt).format('DD/MM/') +
                        (Number(dayjs(item.createAt).format('YYYY')) + 543)}
                    </div>
                  </div>
                </ProgressReportDetailDialog>
              </div>
            ))}
        </article>
      </div>
    </section>
  )
}

export default progressReport
