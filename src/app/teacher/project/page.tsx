'use client'
import useSWR from 'swr'
import { ListProjects } from '@/actions/project'
import { Loader } from '@/components/Loading'
import { CheckBox } from '@/components/CheckBox'
import courseStatus from '@/constants/course/courseStatus'
import { useState } from 'react'
import { ListProjectFilterQuery } from '@/models/Project'
import { toast } from 'sonner'

type Props = {}

function page({}: Props) {
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

  const { data, isLoading, mutate } = useSWR('/v1/project', fetchData, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    mutate()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="container flex h-full w-full justify-center">
      <article className="w-auto p-2 md:p-4">
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-primary1">จัดการโครงงาน</h1>
        </div>

        {/* Search Form */}
        <form
          className="mb-4 flex flex-col gap-2 py-2 sm:flex-row sm:flex-wrap sm:gap-4"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            name="projectName"
            placeholder="ค้นหาชื่อโครงงาน"
            className="w-full rounded border p-2 md:w-auto"
            value={filters.projectName}
            onChange={e =>
              setFilters({ ...filters, projectName: e.target.value })
            }
            onKeyDown={handleKeyPress}
          />

          <div className="flex items-center gap-2">
            <input
              type="number"
              name="semester"
              min={1}
              max={3}
              placeholder="ภาค"
              className="w-full rounded border p-2 md:w-auto"
              value={filters.semester || ''}
              onChange={e =>
                setFilters({
                  ...filters,
                  semester: parseInt(e.target.value) || 0,
                })
              }
            />
            <p className="flex-shrink-0">/</p>
            <input
              type="number"
              name="academicYear"
              placeholder="ปีการศึกษา"
              value={filters.academicYear}
              onChange={e =>
                setFilters({
                  ...filters,
                  academicYear: parseInt(e.target.value) || currentYear,
                })
              }
              className="w-full rounded border p-2 sm:max-w-[180px] md:w-auto"
            />
          </div>

          <select
            name="projectStatus"
            className="w-full rounded border p-2 sm:mt-2 sm:w-auto md:mt-0"
            value={filters.projectStatus}
            onChange={e =>
              setFilters({ ...filters, projectStatus: e.target.value })
            }
          >
            <option value="">สถานะเอกสาร</option>
            <option value="draft">ร่าง</option>
            <option value="submitted">ส่งแล้ว</option>
          </select>

          {/* Search Button */}
          <button
            type="submit"
            className="w-full rounded bg-primary1 p-2 text-secondary1 shadow-md transition hover:bg-primary1/80 sm:mt-2 sm:w-auto md:mt-0"
          >
            ค้นหา
          </button>
        </form>

        {/* Search Results */}
        <section className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
          <article>
            <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
              <h2 className="mb-4 text-2xl font-bold md:mb-0">
                ผลลัพธ์การค้นหา
              </h2>
              <button className="w-full rounded-md bg-primary1 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary1/80 md:w-auto md:px-4 md:py-2 md:text-base">
                จัดการโครงงาน
              </button>
            </div>

            {/* Project List */}
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="divide-y bg-gray-50">
                  <tr>
                    <th className="whitespace-nowrap px-4 py-2">เลือก</th>
                    <th className="whitespace-nowrap px-4 py-2 text-start">
                      ชื่อโครงงาน
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 text-start">
                      สถานะ
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {data &&
                    data.map(project => (
                      <tr key={project.id} className="hover:bg-gray-100">
                        <td className="flex justify-center whitespace-nowrap px-4 py-2">
                          <CheckBox
                            id={project.id}
                            name={project.projectName}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <label
                            htmlFor={`project${project.id}`}
                            className="break-words text-lg"
                          >
                            {project.projectName}
                          </label>
                        </td>
                        <td className="whitespace-nowrap px-4 py-2">
                          <span
                            style={{
                              backgroundColor: project.projectStatus.bgColor,
                              color: project.projectStatus.textColor,
                            }}
                            className="inline-block rounded-md px-2 py-1 text-sm"
                          >
                            {project.projectStatus.name}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>
      </article>
    </div>
  )
}
export default page
