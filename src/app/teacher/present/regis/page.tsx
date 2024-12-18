'use client'
import useSWR from 'swr'
import courseStatus from '@/constants/course/courseStatus'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import {
  GetProjectInCommittee,
  GetProjectInCompleteUsers,
  ListProjectByUserID,
} from '@/actions/projectUser'
import { Loader } from '@/components/Loading'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import ProjectMenu from '@/components/Tables/ProjectTable/TeacherProjectMenu'
import { ProjectStatusBadge } from '@/components/Badge'
import course from '@/constants/course/course'

type Props = {}

type Project = {
  id: number
  username: string
  projectName: string
  projectStatus: {
    name: string
    bgColor: string
    textColor: string
  }
}

function Regis({}: Props) {
  const currentYear = new Date().getFullYear() + 543

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username)
    toast.success(`คัดลอก"${username}"เสร็จสิ้น`, { duration: 1000 })
  }
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    semester: 0,
    academicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.ApprovePreExam}`,
  })

  const fetchData = async () => {
    const res = await GetProjectInCompleteUsers(filters)
    return res
  }

  const { data, isLoading, mutate } = useSWR(
    `project-in-complete-users`,
    fetchData,
  )

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }

  const ProjectTable = ({
    data,
    loading,
  }: {
    data: Project[] | undefined
    loading: boolean
  }) => {
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
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="divide-y bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                    ชื่อโครงงาน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                    สถานะ
                  </th>
                  <th className="p-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                    ลงทะเบียนเป็นกรรมการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data &&
                  data.map(project => (
                    <tr key={project.id} className="hover:bg-gray-100">
                      <td className="whitespace-nowrap px-6 py-4">
                        {project.projectName}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <ProjectStatusBadge
                          textColor={project.projectStatus?.textColor}
                          bgColor={project.projectStatus?.bgColor}
                          name={project.projectStatus?.name}
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <button className="rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500">
                          ลงทะเบียน
                        </button>
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

  return (
    <section className="w-full">
      {/* Search Form */}
      <ProjectFilterForm
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        currentYear={currentYear}
        course={course.Project}
      />
      {/* Search Results */}
      <ProjectTable data={data} loading={isLoading} />
    </section>
  )
}
export default Regis
