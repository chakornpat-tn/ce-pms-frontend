'use client'
import useSWR from 'swr'
import courseStatus from '@/constants/course/courseStatus'
import { useEffect, useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import {
  GetProjectInCommittee,
} from '@/actions/projectUser'
import { Loader } from '@/components/Loading'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { ProjectStatusBadge } from '@/components/Badge'
import course from '@/constants/course/course'
import { CommitteeUpdateExamDocsDialog } from '@/components/Dialog'
import { GetMaxProjectAcademicYear } from '@/actions/project'

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

function Project({}: Props) {
  const currentYear = new Date().getFullYear() + 543

  const handleCopyUsername = (username: string) => {
    navigator.clipboard.writeText(username)
    toast.success(`คัดลอก"${username}"เสร็จสิ้น`, { duration: 1000 })
  }
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    projectSemester: 0,
    projectAcademicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.Project}, ${courseStatus.ApproveProjectExam}, ${courseStatus.Pass}`,
  })

  const fetchData = async () => {
    const res = await GetProjectInCommittee(filters)
    return res
  }

  const { data, isLoading, mutate } = useSWR(`committee-project`, fetchData)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }
   useEffect(() => {
    const fetchYear = async () => {
      const res = await GetMaxProjectAcademicYear()
      const maxYear = res.projectAcademicYear
        ? res.projectAcademicYear
        : new Date().getFullYear() + 543

      setFilters(prev => ({
        ...prev,
        projectAcademicYear: maxYear,
      }))
      mutate()
    }
    fetchYear()
  }, [])

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
                    ชื่อผู้ใช้งาน
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data &&
                  data.map(project => (
                    <tr key={project.id} className="hover:bg-gray-100">
                      <CommitteeUpdateExamDocsDialog
                        projectId={project.id}
                        courseId={course.Project}
                      >
                        <td className="cursor-pointer whitespace-nowrap px-6 py-4 hover:underline">
                          {project.projectName}
                        </td>
                      </CommitteeUpdateExamDocsDialog>
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
        currentYear={Number(filters.projectAcademicYear)}
        course={course.Project}
      />
      {/* Search Results */}
      <ProjectTable data={data} loading={isLoading} />
    </section>
  )
}
export default Project
