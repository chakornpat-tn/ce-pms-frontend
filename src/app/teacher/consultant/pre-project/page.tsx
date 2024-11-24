'use client'
import useSWR from 'swr'
import { ListProjectByUserID } from '@/actions/projectUser'
import courseStatus from '@/constants/course/courseStatus'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'
import ProjectFilterForm from '@/components/Forms/ProjectFilterForm/ProjectFilterForm'
import { Loader } from '@/components/Loading'

type Props = {}

type Project = {
  id: number
  projectName: string
  projectStatus: {
    name: string
    bgColor: string
    textColor: string
  }
}
function page({}: Props) {
  const currentYear = new Date().getFullYear() + 543
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    semester: 0,
    academicYear: currentYear,
    projectStatus: '',
    courseStatus: `${courseStatus.PreProject}, ${courseStatus.ApprovePreExam},${courseStatus.PassPre}`,
  })

  const fetchData = async () => {
    const res = await ListProjectByUserID(filters)
    toast.success('ค้นหาสำเร็จ', { duration: 1000 })
    return res
  }

  const { data, isLoading, mutate } = useSWR(
    [`/v1/project-user`, []],
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
      <section className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
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
                  <th className="w-[40%] whitespace-nowrap px-4 py-2 text-start text-sm md:text-base">
                    ชื่อโครงงาน
                  </th>
                  <th className="w-[40%] whitespace-nowrap px-4 py-2 text-start text-sm md:text-base">
                    สถานะ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data &&
                  data.map(project => (
                    <tr key={project.id} className="hover:bg-gray-100">
                      <td className="whitespace-nowrap px-4 py-2">
                        <label
                          htmlFor={`project${project.id}`}
                          className="text-base md:text-lg"
                        >
                          {project.projectName}
                        </label>
                      </td>
                      <td className="whitespace-nowrap px-4 py-2">
                        <span
                          style={{
                            backgroundColor:
                              project.projectStatus?.bgColor || '#0f1035',
                            color:
                              project.projectStatus?.textColor || '#FFFFFF',
                          }}
                          className="inline-block rounded-md px-2 py-1 text-xs md:text-sm"
                        >
                          {project.projectStatus?.name || 'ปกติ'}
                        </span>
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
      />

      {/* Search Results */}
      <ProjectTable data={data} loading={isLoading} />
    </section>
  )
}
export default page
