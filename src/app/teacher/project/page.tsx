'use client'
import useSWR from 'swr'
import { ListProjects } from '@/actions/project'
import courseStatus from '@/constants/course/courseStatus'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import TeacherProjectTable from '@/components/Tables/ProjectTable/TeacherProjectTable'

type Props = {}

function page({}: Props) {
  const title = 'จัดการโครงงาน'
  const currentYear = new Date().getFullYear() + 543
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    semester: 0,
    academicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.Project}, ${courseStatus.ApproveProjectExam}`,
  })

  const fetchData = async () => {
    const res = await ListProjects(filters)
    toast.success('ค้นหาสำเร็จ', { duration: 1000 })
    return res
  }

  const { data, isLoading, mutate } = useSWR(
    `/v1/project`,
    fetchData,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
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

  return (
    <>
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-3xl font-bold text-primary1">จัดการโครงงาน</h1>
      </div>
      {/* Search Form */}
      <ProjectFilterForm
        filters={filters}
        setFilters={setFilters}
        handleSearch={handleSearch}
        handleKeyPress={handleKeyPress}
        currentYear={currentYear}
      />
      {/* Search Results */}
      <TeacherProjectTable data={data} loading={isLoading} />
    </>
  )
}
export default page
