'use client'
import { GetProjectUserDetail } from '@/actions/projectUser'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import course from '@/constants/course/course'
import { ProjectUserWithUser } from '@/models/Project'
import React, { useState } from 'react'
import useSWR from 'swr'

type Props = {
  children: React.ReactNode
  projectId: number
  courseId?: number
}

const PointTeacherDialog = ({
  children,
  projectId,
  courseId = course.PreProject,
}: Props) => {
  const { data, isLoading, error } = useSWR<ProjectUserWithUser[]>(
    `/project-users/${projectId}`,
    () => GetProjectUserDetail(projectId),
  )

  const courseCheck = (children: React.ReactNode, courseTarget: number) => {
    if (courseId === courseTarget) return children
    else return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-4xl overflow-y-auto rounded bg-white md:h-auto">
        <DialogHeader>
          <DialogTitle>คะแนนสอบ</DialogTitle>
          <DialogDescription>ตารางแสดงคะแนนสอบของนักศึกษา</DialogDescription>
        </DialogHeader>
        <div className="flex justify-center py-4">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-2 py-2 text-left sm:px-4">ชื่อ</th>
                  {courseCheck(
                    <>
                      <th className="border px-2 py-2 text-left sm:px-4">
                        คะแนนเตรียมโครงงาน
                      </th>

                      <th className="border px-2 py-2 text-left sm:px-4">
                        เอกสารคะแนนเตรียมโครงงาน
                      </th>
                    </>,
                    course.PreProject,
                  )}

                  {courseCheck(
                    <>
                      <th className="border px-2 py-2 text-left sm:px-4">
                        คะแนนโครงงาน
                      </th>
                      <th className="border px-2 py-2 text-left sm:px-4">
                        เอกสารคะแนนโครงงาน
                      </th>
                    </>,
                    course.Project
                  )}
                </tr>
              </thead>
              <tbody>
                {data?.map((projectUser: ProjectUserWithUser) => (
                  <tr
                    key={projectUser.projectId + projectUser.userId}
                    className="hover:bg-gray-50"
                  >
                    <td className="border px-2 py-2 sm:px-4">
                      {projectUser.user.name}
                    </td>
                    {courseCheck(
                      <>
                        <td className="border px-2 py-2 sm:px-4">
                          {projectUser.prepPoint || '-'}
                        </td>
                        <td className="border px-2 py-2 sm:px-4">
                          {projectUser.prepDocs ? (
                            <a
                              href={projectUser.prepDocs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              เอกสารหลักฐาน
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                      </>,
                      course.PreProject,
                    )}
                    {courseCheck(
                      <>
                        <td className="border px-2 py-2 sm:px-4">
                          {projectUser.projectPoint || '-'}
                        </td>
                        <td className="border px-2 py-2 sm:px-4">
                          {projectUser.projectDocs ? (
                            <a
                              href={projectUser.projectDocs}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              เอกสารหลักฐาน
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
                      </>,
                      course.Project,
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>{' '}
      </DialogContent>
    </Dialog>
  )
}

export default PointTeacherDialog
