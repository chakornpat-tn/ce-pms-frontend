'use client'
import { CreateProjectDocs } from '@/actions/projectDocuments'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CloudUpload } from '@mui/icons-material'
import { useActionState, useState } from 'react'
import course from '@/constants/course/course'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import { UpdateProjectUser } from '@/actions/projectUser'
import useSWR from 'swr'
import { GetProjectUserByProjectIdUserComplete } from '@/actions/projectUser'
import { Loader } from '@/components/Loading'

type Props = {
  children: React.ReactNode
  projectId: number
  courseId: number
}

export function UpdateExamDocsDialog(props: Props) {
  const [actionError, action, isPending] = useActionState(
    UpdateProjectUser,
    null,
  )
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const { children, projectId, courseId } = props

  const { data, isLoading, error } = useSWR(
    'get-project-user-by-project-id-user-complete',
    () => GetProjectUserByProjectIdUserComplete(projectId),
  )

  if (!projectId) return
  if (isLoading) return <Loader />
  if (!data) return
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {courseId === course.PreProject
              ? 'อัปโหลดเอกสารสอบเตรียมโครงงาน'
              : 'อัปโหลดเอกสารสอบโครงงาน'}
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto w-full p-4">
          <form className="space-y-4" action={action}>
            <input type="hidden" name="projectId" value={projectId} />
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                id={courseId === course.PreProject ? 'prepDocs' : 'projectDocs'}
                name={
                  courseId === course.PreProject ? 'prepDocs' : 'projectDocs'
                }
                accept=".pdf"
                className="hidden"
                onChange={e => setSelectedFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor={
                  courseId === course.PreProject ? 'prepDocs' : 'projectDocs'
                }
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                <CloudUpload className="h-12 w-12 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'เลือกไฟล์'}
                </span>
              </label>
              <label
                htmlFor={
                  courseId === course.PreProject ? 'prepPoint' : 'projectPoint'
                }
              >
                <input
                  type="number"
                  className="mt-1 rounded border p-2"
                  name={
                    courseId === course.PreProject
                      ? 'prepPoint'
                      : 'projectPoint'
                  }
                  id={
                    courseId === course.PreProject
                      ? 'prepPoint'
                      : 'projectPoint'
                  }
                  min={0}
                  defaultValue={0}
                  max={
                    data[0].userProjectRole === userProjectRole.ADVISOR
                      ? 40
                      : 30
                  }
                  required
                />
                <span className="ml-2 text-sm text-gray-500">
                  {data[0].userProjectRole === userProjectRole.ADVISOR
                    ? 'คะแนนเต็ม 40 คะแนน'
                    : 'คะแนนเต็ม 30 คะแนน'}
                </span>
              </label>
            </div>
            {data && (
              <div className="mt-4">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        รายการ
                      </th>
                      {courseId === course.PreProject && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          เตรียมโครงงาน
                        </th>
                      )}
                      {courseId === course.Project && (
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                        >
                          โครงงาน
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        ไฟล์ล่าสุด
                      </td>
                      {courseId === course.PreProject && (
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {data[0]?.prepDocs ? (
                            <a
                              href={data[0]?.prepDocs || undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary2-400 hover:underline"
                            >
                              <span>เปิด</span>
                            </a>
                          ) : (
                            'ไม่มีเอกสาร'
                          )}
                        </td>
                      )}

                      {courseId === course.Project && (
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {data[0]?.projectDocs ? (
                            <a
                              href={data[0]?.projectDocs || undefined}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-primary2-400 hover:underline"
                            >
                              <span>เปิด</span>
                            </a>
                          ) : (
                            'ไม่มีเอกสาร'
                          )}
                        </td>
                      )}
                    </tr>
                    <tr>
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                        คะแนนที่ให้
                      </td>
                      {courseId === course.PreProject && (
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {data[0]?.prepPoint
                            ? `${data[0].prepPoint} คะแนน`
                            : 'ไม่ระบุคะแนน'}
                        </td>
                      )}
                      {courseId === course.Project &&
                        courseId === course.Project && (
                          <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                            {data[0]?.projectPoint
                              ? `${data[0].projectPoint} คะแนน`
                              : 'ไม่ระบุคะแนน'}
                          </td>
                        )}
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isPending && !selectedFile}
                className="inline-flex items-center gap-2 rounded-md bg-primary2-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary2-500 focus:outline-none"
              >
                <CloudUpload className="h-4 w-4" />
                {isPending ? 'อัปโหลด....' : 'อัปโหลด'}
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
