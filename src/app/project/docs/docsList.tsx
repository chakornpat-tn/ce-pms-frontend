'use client'
import React from 'react'
import useSWR from 'swr'
import { ProjectDocumentRes } from '@/models/ProjectDocument'
import { ListProjectDocs } from '@/actions/projectDocuments'
import { Loader } from '@/components/Loading'
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
  const { data, isLoading, error } = useSWR(
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
        <section className="list-disc pl-6">
          {data.map((doc: ProjectDocumentRes, index: number) => (
            <div
              key={doc.id}
              className="relative mt-6 min-h-[100px] w-full rounded-lg border bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md"
            >
              {index === 0 && doc.comments && projectComments.data && (
                <UploadDocsWithCommentsDialog
                  projectId={projectId}
                  documentId={documentId}
                  documentName={`${documentName}-v.${data.length + 1}`}
                  trigger={
                    <div className="absolute -top-5 right-4 rounded-md bg-orange-300 px-4 py-1 transition-colors duration-200 hover:bg-orange-400">
                      <button className="flex items-center gap-2 text-primary2-400 transition-colors duration-200 hover:text-primary2-500">
                        <UploadIcon className="h-5 w-5" />
                        <p className="text-xs md:text-base">
                          อัพโหลดเอกสารใหม่
                        </p>
                      </button>
                    </div>
                  }
                />
              )}

              {/* content  */}
              <div className="mb-3 flex items-center gap-3">
                <div className="flex items-center gap-3 text-primary2-500">
                  <a
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary2-600 flex flex-row gap-2 transition-colors duration-200 hover:underline"
                  >
                    <DownloadIcon className="h-6 w-6" />
                    <h1 className="text-xl font-medium">{doc.documentName}</h1>
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  {dayjs(doc.updatedAt)
                    .add(543, 'year')
                    .format('DD/MM/YYYY เวลา HH.mm น.')}
                </div>
                {doc.CommentBasedEdits && doc.CommentBasedEdits.length > 0 && (
                  <div className="rounded-lg bg-gray-100 p-4">
                    <p className="mb-2 text-sm font-semibold text-gray-700">
                      หัวข้อที่ทำการแก้ไข
                    </p>
                    {doc.CommentBasedEdits.map((editComment, index) => (
                      <p key={index} className="ml-4 text-sm text-gray-600">
                        - {editComment.content}
                      </p>
                    ))}
                  </div>
                )}
                {doc.comments && doc.comments.length > 0 && (
                  <div className="border-t pt-4">
                    <div>
                      <p className="mb-2 text-sm font-semibold text-gray-700">
                        ความคิดเห็น
                      </p>
                      {doc.comments.map((comment, index) => (
                        <p key={index} className="ml-4 text-sm text-gray-600">
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
            trigger={
              <button className="text-primary1-500 flex items-center justify-center gap-2 hover:underline">
                <UploadIcon className="h-5 w-5" />
                คลิกเพื่ออัพโหลด
              </button>
            }
          />
        </div>
      )}
    </>
  )
}

export default DocsList
