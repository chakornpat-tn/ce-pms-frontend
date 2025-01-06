'use client'
import useSWR from 'swr'
import { ListProjects } from '@/actions/project'
import courseStatus from '@/constants/course/courseStatus'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import TeacherProjectTable from '@/components/Tables/ProjectTable/TeacherProjectTable'
import Course from '@/constants/course/course'
import course from '@/constants/course/course'
import userRoles from '@/constants/userRoles/userRoles'
import Link from 'next/link'
import { Add } from '@mui/icons-material'

type Props = {}

function page({}: Props) {
  const currentYear = new Date().getFullYear() + 543
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    projectSemester: 0,
    projectAcademicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.Project}, ${courseStatus.ApproveProjectExam},${courseStatus.Pass}`,
  })

  const fetchData = async () => {
    const res = await ListProjects(filters)
    if (res.length == 0 && filters.projectAcademicYear == currentYear) {
      setFilters({ ...filters, projectAcademicYear: currentYear - 1 })
      mutate()
    }
    return res
  }

  const { data, isLoading, mutate } = useSWR(`/v1/project`, fetchData)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-primary1">จัดการโครงงาน</h1>
        <div>
          <Link href="/teacher/project/pass-pre-project">
            <button className="mt-2 flex items-center gap-2 rounded-md bg-primary2-400 px-4 py-2 text-secondary1 shadow-md transition hover:bg-primary2-500 md:mt-0">
              <Add /> เพิ่มโครงงาน
            </button>
          </Link>
        </div>
      </div>
      {/* Search Form */}
      <ProjectFilterForm
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        currentYear={Number(filters.projectAcademicYear)}
        course={Course.Project}
      />

      {/* Search Results */}
      <TeacherProjectTable
        courseList={course.Project}
        userRole={userRoles.ProjectTeacher}
        data={data}
        loading={isLoading}
        mutate={mutate}
      />
    </>
  )
}
export default page
