'use client'
import React from 'react'
import useSWR from 'swr'
import { ProjectDocumentRes } from '@/models/ProjectDocument'
import {
  ListProjectDocs,
  UpdateProjectDocStatus,
} from '@/actions/projectDocuments'
import { Loader } from '@/components/Loading'
import { CloudDownload as DownloadIcon, Message } from '@mui/icons-material'
import dayjs from 'dayjs'
import projectDocumentStatus from '@/constants/projectDocumentStatus/projectDocumentStatus'

type Props = {
  projectId?: number
  documentId?: number
  documentName: string | null
}

const DocsList = (props: Props) => {
  const { projectId, documentId, documentName } = props

  const fetchDocs = async () => {
    if (projectId && documentId) {
      return await ListProjectDocs(projectId, documentId)
    }
    return []
  }

  const { data, isLoading, error, mutate } = useSWR(
    projectId && documentId
      ? [`/v1/project-document`, projectId, documentId]
      : null,
    fetchDocs,
  )
  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )

  if (error) return <div>ไม่พบเอกสาร</div>
  if (!documentName) return

  return (
    <>
      {data && data.length > 0 ? (
        <section className="list-disc pl-2 md:pl-6">
          {data.map((doc: ProjectDocumentRes, index: number) => (
            <div
              key={doc.id}
              className="relative mt-4 min-h-[100px] w-full rounded-md border bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md md:mt-6 md:p-6"
            >
              {/* content  */}
              <div className="mb-3 flex flex-col items-start gap-3 md:flex-row md:items-center">
                <div
                  className="flex items-center gap-3 text-primary2-500"
                >
                  <a
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary2-600 flex flex-row gap-2 transition-colors duration-200 hover:underline"
                  >
                    <DownloadIcon className="h-5 w-5 md:h-6 md:w-6" />
                    <h1 className="break-all text-lg font-medium md:text-xl">
                      {doc.documentName}
                    </h1>
                  </a>
                </div>

              </div>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className="text-gray-500">สถานะ:</span>
                  <span
                    className={`rounded-md px-2 py-1 font-medium ${
                      doc.status === projectDocumentStatus.APPROVED
                        ? 'bg-green-100 text-green-600'
                        : doc.status === projectDocumentStatus.REJECTED
                          ? 'bg-red-100 text-red-600'
                          : doc.status === projectDocumentStatus.SEEN
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {doc.status === projectDocumentStatus.APPROVED &&
                      'อนุมัติแล้ว'}
                    {doc.status === projectDocumentStatus.REJECTED &&
                      'ไม่อนุมัติ'}
                    {doc.status === projectDocumentStatus.SEEN && 'ดูแล้ว'}
                    {doc.status === projectDocumentStatus.WAITING &&
                      'รอดำเนินการตรวจ'}
                  </span>
                </div>
                <div className="text-xs text-gray-500 md:text-sm">
                  {dayjs(doc.createdAt)
                    .add(543, 'year')
                    .format('DD/MM/YYYY เวลา HH.mm น.')}
                </div>
                {doc.CommentBasedEdits && doc.CommentBasedEdits.length > 0 && (
                  <div className="rounded-md bg-gray-100 p-3 md:p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700 md:text-base">
                      หัวข้อที่ทำการแก้ไข
                    </p>
                    {doc.CommentBasedEdits.map((editComment, index) => (
                      <p
                        key={index}
                        className="ml-3 text-sm text-gray-600 md:ml-4 md:text-base"
                      >
                        - {editComment.content}
                      </p>
                    ))}
                  </div>
                )}
                {doc.comments && doc.comments.length > 0 && (
                  <div className="border-t pt-3 md:pt-4">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-700 md:text-base">
                        ความคิดเห็น
                      </p>
                      {doc.comments.map((comment, index) => (
                        <p
                          key={index}
                          className="ml-3 text-sm text-gray-600 md:ml-4 md:text-base"
                        >
                          - {comment.content}
                        </p>
                      ))}
                    </div>
                  </div>
                )}{' '}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <></>
      )}
    </>
  )
}

export default DocsList
