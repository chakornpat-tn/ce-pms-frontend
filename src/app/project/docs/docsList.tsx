'use client'
import React from 'react'
import useSWR from 'swr'
import { ProjectDocumentRes } from '@/models/ProjectDocument'
import { ListProjectDocs } from '@/actions/projectDocuments'
import { Loader } from '@/components/Loading'
import PlagiarismIcon from '@mui/icons-material/Plagiarism'
import {
  UploadDocsDialog,
  UploadDocsWithCommentsDialog,
} from '@/components/Dialog'
import {
  CloudDownload as DownloadIcon,
  Comment as CommentIcon,
  CloudUpload as UploadIcon,
} from '@mui/icons-material'
import dayjs from 'dayjs'
import { ListComment } from '@/actions/comment'
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

  const projectComments = useSWR(
    ['project-comment', projectId, documentId],
    () => ListComment(projectId, documentId),
  )
  const { data, isLoading, error, mutate } = useSWR(
    projectId && documentId
      ? [`/v1/project-document`, projectId, documentId]
      : null,
    fetchDocs,
    { revalidateOnFocus: false },
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
          <div className="flex w-full justify-center">
            <UploadDocsWithCommentsDialog
              projectId={projectId}
              documentId={documentId}
              documentName={`${documentName}-v.${data.length + 1}`}
              onSuccess={mutate}
              trigger={
                <div className="flex w-full justify-center rounded-md bg-primary2-400 p-2 transition-colors duration-200 hover:bg-primary2-500">
                  <button className="flex items-center gap-2 text-white">
                    <UploadIcon className="h-5 w-5" />
                    <p className="text-xs md:text-base">อัปโหลดเอกสารใหม่</p>
                  </button>
                </div>
              }
            />
          </div>
          {data.map((doc: ProjectDocumentRes, index: number) => (
            <div
              key={doc.id}
              className="relative mt-4 min-h-[100px] w-full rounded-md border bg-white p-3 shadow-sm transition-all duration-200 hover:shadow-md md:mt-6 md:p-6"
            >
              {/* content  */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-3 text-primary2-500">
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
                {doc.advisorDocsUrl && (
                  <div className="flex items-center gap-2 text-xs md:text-sm">
                    <span className="text-gray-500">รายงานข้อผิดพลาด:</span>{' '}
                    <div className="flex items-center justify-center gap-2 rounded-md bg-red-100 p-1.5 text-red-600">
                      <a
                        href={doc.advisorDocsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-row gap-1.5 transition-colors duration-200 hover:text-red-700 hover:underline"
                      >
                        <PlagiarismIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                        <p className="break-all text-sm font-medium">
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
                    <p className="mb-2 text-xs font-semibold text-gray-700 md:text-sm">
                      หัวข้อที่ทำการแก้ไข
                    </p>
                    {doc.CommentBasedEdits.map((editComment, index) => (
                      <p
                        key={index}
                        className="ml-3 text-xs text-gray-600 md:ml-4 md:text-sm"
                      >
                        - {editComment.content}
                      </p>
                    ))}
                  </div>
                )}
                {doc.comments && doc.comments.length > 0 && (
                  <div className="border-t pt-3 md:pt-4">
                    <div>
                      <p className="mb-2 text-xs font-semibold text-gray-700 md:text-sm">
                        ความคิดเห็น
                      </p>
                      {doc.comments.map((comment, index) => (
                        <p
                          key={index}
                          className="ml-3 text-xs text-gray-600 md:ml-4 md:text-sm"
                        >
                          - {comment.content}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="flex h-64 items-center justify-center">
          <UploadDocsDialog
            projectId={projectId}
            documentId={documentId}
            documentName={documentName}
            onSuccess={mutate}
            trigger={
              <button className="text-primary1-500 flex items-center justify-center gap-2 hover:underline">
                <UploadIcon className="h-5 w-5" />
                คลิกเพื่ออัปโหลด
              </button>
            }
          />
        </div>
      )}
    </>
  )
}

export default DocsList
