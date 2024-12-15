import { ListProjectStatus } from '@/actions/projectStatus'
import React, { useState } from 'react'
import useSWR from 'swr'

type Props = {
  filters: any
  setFilters: React.Dispatch<React.SetStateAction<any>>
  handleSearch: (e: React.FormEvent) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  currentYear: number
  course: number
}

const ProjectFilterForm: React.FC<Props> = ({
  filters,
  setFilters,
  handleSearch,
  handleKeyPress,
  currentYear,
  course,
}) => {
  const [value, setValue] = useState<number | ''>(0)

  const { data, mutate, isLoading } = useSWR(
    `/v1/project-status?course=${course}`,
    () => ListProjectStatus({ course: course, isActive: true }),
  )

  return (
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
        onChange={e => setFilters({ ...filters, projectName: e.target.value })}
        onKeyDown={handleKeyPress}
      />

      <div className="flex w-auto items-center gap-2">
        <input
          type="number"
          name="semester"
          min={1}
          max={3}
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

      {data && data.length > 0 && (
        <select
          name="projectStatus"
          className="w-full rounded-md border p-2 text-sm sm:mt-2 sm:w-auto sm:text-base md:mt-0"
          value={filters.projectStatus}
          onChange={e =>
            setFilters({ ...filters, projectStatus: e.target.value })
          }
        >
          <option value="">สถานะเอกสาร</option>
          {data?.map(status => (
            <option key={status.id} value={status.id}>
              {status.name}
            </option>
          ))}
        </select>
      )}
      <button
        type="submit"
        className="w-full rounded-md bg-primary2-400 p-2 text-sm text-secondary1 shadow-md transition duration-200 hover:bg-primary2-500 sm:mt-2 sm:w-auto sm:text-base md:mt-0"
      >
        ค้นหา
      </button>
    </form>
  )
}

export default ProjectFilterForm
