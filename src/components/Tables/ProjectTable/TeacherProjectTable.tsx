'use client'
import React, { useState } from 'react'
import { CheckBox } from '@/components/CheckBox'
import { Loader } from '@/components/Loading'
import TeacherProjectMenu from './TeacherProjectMenu'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { toast } from 'sonner'
import { ProjectStatusBadge } from '@/components/Badge'
import { ProjectManagementMenu } from '@/components/DropdownMenu'
import { UpdateProjectsRequest } from '@/models/Project'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'

type Project = {
  id: number
  projectName: string
  username: string
  projectStatus: {
    name: string
    bgColor: string
    textColor: string
  }
  courseStatus: number
}

type Props = {
  data: Project[] | undefined
  loading: boolean
  courseList: number
  mutate: () => void
}

const TeacherProjectTable: React.FC<Props> = ({
  data,
  loading,
  courseList,
  mutate,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username)
    toast.success(`คัดลอก"${username}"เสร็จสิ้น`, { duration: 1000 })
  }

  const handleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id)
      } else {
        return [...prevSelectedIds, id]
      }
    })
  }
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-md">
      <article>
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="mb-4 text-xl font-bold md:mb-0 md:text-2xl">
            ผลลัพธ์การค้นหา
          </h2>
          <ProjectManagementMenu
          courseList={courseList}
            idSelection={selectedIds}
            onSuccess={mutate}
          >
            <button className="w-full rounded-md bg-primary2-400 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary2-500 md:w-auto md:px-4 md:py-2 md:text-base">
              จัดการโครงงาน
            </button>
          </ProjectManagementMenu>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="divide-y bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                  เลือก
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                  ชื่อโครงงาน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                  ชื่อผู้ใช้งาน
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                  สถานะ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                  ดำเนินการ
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data &&
                data.map(project => (
                  <tr key={project.id} className="hover:bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4">
                      <input
                        className="checkbox-[primary2-500] checkbox checkbox-sm md:checkbox-md"
                        type="checkbox"
                        checked={selectedIds.includes(project.id)}
                        onChange={() => handleSelect(project.id)}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {project.projectName}
                    </td>
                    <td className="flex items-center whitespace-nowrap px-6 py-4">
                      {project.username}
                      <button
                        onClick={() => handleCopyUsername(project.username)}
                        className="ml-2 rounded-full p-1 transition-colors hover:bg-gray-200"
                      >
                        <ContentCopyIcon className="text-gray-500" />
                      </button>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <ProjectStatusBadge
                        textColor={project.projectStatus?.textColor}
                        bgColor={project.projectStatus?.bgColor}
                        name={project.projectStatus?.name}
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {CourseStatusDesc(project.courseStatus)}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-primary1">
                      <TeacherProjectMenu
                        projectId={project.id}
                        projectName={project.projectName}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

export default TeacherProjectTable
