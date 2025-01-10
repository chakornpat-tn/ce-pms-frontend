'use client'
import useSWR from 'swr'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { Loader } from '@/components/Loading'
import { ConvToProjectDialog, ProjectDetailDialog } from '@/components/Dialog'
import userRoles from '@/constants/userRoles/userRoles'
import course from '@/constants/course/course'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'
import { ListProjectPassPre } from '@/actions/project'
import { useRouter } from 'next/navigation'
import courseStatus from '@/constants/course/courseStatus'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type Props = {}

type Project = {
  id: number
  username: string
  projectName: string
  semester: number
  academicYear: number
  projectStatus: {
    name: string
    bgColor: string
    textColor: string
  }
  courseStatus: number
}

function Page({}: Props) {
  const router = useRouter()
  const currentYear = new Date().getFullYear() + 543 - 2
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    semester: 0,
    academicYear: currentYear,
  })
  const [selectedIds, setSelectedIds] = useState<number[]>([])

  const handleSelect = (id: number) => {
    setSelectedIds(prevSelectedIds => {
      if (prevSelectedIds.includes(id)) {
        return prevSelectedIds.filter(selectedId => selectedId !== id)
      } else {
        return [...prevSelectedIds, id]
      }
    })
  }

  const fetchData = async () => {
    const res = await ListProjectPassPre(filters)
    return res
  }

  const { data, isLoading, mutate } = useSWR(`consultant-project`, fetchData)

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
          <div className="mt-2 overflow-x-auto">
            <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
              <h2 className="mb-4 text-xl font-bold md:mb-0 md:text-2xl">
                โครงงานที่ผ่านเตรียมโครงงาน
              </h2>
              <ConvToProjectDialog
                ids={selectedIds}
                onSuccess={mutate}
                newCourseStatus={courseStatus.Project}
                nullOnSuccess={true}
              >
                <button className="w-full rounded-md bg-primary2-400 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary2-500 md:w-auto md:px-4 md:py-2 md:text-base">
                  ย้ายมายังวิชาโครงงาน
                </button>
              </ConvToProjectDialog>
            </div>
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
                    ปีการศึกษา
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
                      <ProjectDetailDialog
                        projectId={project.id}
                        userRole={userRoles.Teacher}
                        courseMenu={course.Project}
                        onSuccess={mutate}
                      >
                        <td className="cursor-pointer whitespace-nowrap px-6 py-4 hover:underline">
                          {project.projectName}
                        </td>
                      </ProjectDetailDialog>

                      <td className="flex items-center whitespace-nowrap px-6 py-4">
                        {project.username}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {project.semester}/{project.academicYear}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {CourseStatusDesc(project.courseStatus)}
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
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowBackIcon className="mr-2 h-5 w-5" />
        ย้อนกลับ
      </button>
      {/* Search Form */}
      <form
        className="mb-4 flex flex-col gap-2 py-2 sm:flex-row sm:flex-wrap sm:gap-4"
        onSubmit={handleSearch}
      >
        <input
          type="text"
          name="projectName"
          placeholder="ค้นหาชื่อโครงงาน"
          className="w-full rounded-md border p-2 text-sm sm:text-base md:w-auto"
          value={filters.projectName}
          onChange={e =>
            setFilters({ ...filters, projectName: e.target.value })
          }
          onKeyDown={handleKeyPress}
        />

        <div className="flex w-auto items-center gap-2">
          <input
            type="number"
            name="semester"
            min={1}
            max={2}
            placeholder="ทุกภาคเรียน"
            className="w-full min-w-[113px] rounded-md border p-2 text-sm sm:text-base"
            value={filters.semester || ''}
            onChange={e =>
              setFilters({
                ...filters,
                semester: parseInt(e.target.value) || 0,
              })
            }
          />
          <p className="flex-shrink-0 text-sm sm:text-base">/</p>
          <input
            type="number"
            name="academicYear"
            placeholder="ปีการศึกษา"
            min="0"
            value={filters.academicYear}
            onChange={e =>
              setFilters({
                ...filters,
                academicYear:
                  Math.max(0, parseInt(e.target.value)) || currentYear,
              })
            }
            className="w-full rounded-md border p-2 text-sm sm:max-w-[180px] sm:text-base md:w-auto"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-md bg-primary2-400 p-2 text-sm text-secondary1 shadow-md transition duration-200 hover:bg-primary2-500 sm:mt-2 sm:w-auto sm:text-base md:mt-0"
        >
          ค้นหา
        </button>
      </form>
      {/* Search Results */}
      <ProjectTable data={data} loading={isLoading} />
    </section>
  )
}
export default Page
