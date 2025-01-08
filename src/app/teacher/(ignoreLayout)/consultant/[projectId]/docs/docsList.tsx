'use client'
import React from 'react'
import useSWR from 'swr'
import { ProjectDocumentRes } from '@/models/ProjectDocument'
import PlagiarismIcon from '@mui/icons-material/Plagiarism'
import {
  ListProjectDocs,
  UpdateProjectDocStatus,
} from '@/actions/projectDocuments'
import { Loader } from '@/components/Loading'
import { CreateCommentsDialog } from '@/components/Dialog/CommentDialog/CreateCommentDialog'
import { CloudDownload as DownloadIcon, Message } from '@mui/icons-material'
import dayjs from 'dayjs'
import { CheckIcon } from 'lucide-react'
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
                  onClick={() => {
                    if (doc.status === projectDocumentStatus.WAITING)
                      UpdateProjectDocStatus(
                        doc.id,
                        projectDocumentStatus.SEEN,
                      ).then(() => {
                        mutate()
                      })
                  }}
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
                {index === 0 && (
                  <div className="mt-3 flex flex-row gap-2 md:ml-auto md:mt-0">
                    {![
                      projectDocumentStatus.REJECTED,
                      projectDocumentStatus.APPROVED,
                    ].includes(doc.status) && (
                      <button
                        className={`group rounded-md border border-gray-300 px-3 py-1.5 text-xs text-gray-700 shadow-sm transition-all duration-200 md:px-4 md:py-2 md:text-sm ${doc.status === projectDocumentStatus.APPROVED ? 'bg-green-300' : 'bg-white hover:bg-green-300 hover:text-primary1'}`}
                        disabled={doc.status === projectDocumentStatus.APPROVED}
                        onClick={() =>
                          UpdateProjectDocStatus(
                            doc.id,
                            projectDocumentStatus.APPROVED,
                          ).then(() => {
                            mutate()
                          })
                        }
                      >
                        <div className="flex flex-row items-center">
                          <CheckIcon className="mr-1 h-4 w-4 transform transition-transform duration-200 group-hover:scale-110 md:mr-2 md:h-5 md:w-5" />
                          อนุมัติผ่าน
                        </div>
                      </button>
                    )}

                    <CreateCommentsDialog
                      projectDocsId={doc.id}
                      onSuccess={() =>
                        UpdateProjectDocStatus(
                          doc.id,
                          projectDocumentStatus.REJECTED,
                        ).then(() => {
                          mutate()
                        })
                      }
                      trigger={
                        <button className="primary-hover group rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm md:px-4 md:py-2 md:text-sm">
                          <div className="flex flex-row items-center">
                            <Message className="mr-1 h-4 w-4 transform transition-transform duration-200 group-hover:scale-110 md:mr-2 md:h-5 md:w-5" />
                            แนะนำเอกสาร
                          </div>
                        </button>
                      }
                    />
                  </div>
                )}
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
                {doc.advisorDocsUrl && (
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="text-gray-500">รายงานข้อผิดพลาด:</span>
                    <div className="flex items-center justify-center gap-2 rounded-md bg-red-100 p-1.5 text-red-600">
                      <a
                        href={doc.advisorDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row gap-1.5 transition-colors duration-200 hover:text-red-700 hover:underline"
                      >
                        <PlagiarismIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <p className="break-all text-sm font-medium ">
                          {doc.documentName + ' (รายละเอียดข้อผิดพลาด)'}
                        </p>
                      </a>
                    </div>
                  </div>
                )}
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
