'use client'
import useSWR from 'swr'
import { GetMaxProjectAcademicYear, ListProjects } from '@/actions/project'
import courseStatus from '@/constants/course/courseStatus'
import { useEffect, useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import TeacherProjectTable from '@/components/Tables/ProjectTable/TeacherProjectTable'
import Course from '@/constants/course/course'
import course from '@/constants/course/course'
import userRoles from '@/constants/userRoles/userRoles'

type Props = {}

function Page({}: Props) {
  const currentYear = new Date().getFullYear() + 543
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    semester: 0,
    academicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.PreProject}, ${courseStatus.ApprovePreExam},${courseStatus.PassPre}`,
  })

  const fetchData = async () => {
    const res = await ListProjects(filters)
    if (res.length == 0 && filters.academicYear == currentYear) {
      setFilters({ ...filters, academicYear: currentYear - 1 })
      mutate()
    }
    return res
  }

  const { data, isLoading, mutate } = useSWR([`/v1/pre-project`, []], fetchData)

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
      const maxYear = res.academicYear
        ? res.academicYear
        : new Date().getFullYear() + 543

      setFilters(prev => ({
        ...prev,
        academicYear: maxYear,
      }))
      mutate()
    }
    fetchYear()
  }, [])

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-primary1">
          จัดการหัวข้อเตรียมโครงงาน
        </h1>
      </div>
      {/* Search Form */}
      <ProjectFilterForm
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        currentYear={Number(filters.academicYear)}
        course={Course.PreProject}
      />
      {/* Search Results */}
      <TeacherProjectTable
        data={data}
        loading={isLoading}
        userRole={userRoles.preProjectTeacher}
        courseList={course.PreProject}
        mutate={mutate}
      />
    </>
  )
}
export default Page
