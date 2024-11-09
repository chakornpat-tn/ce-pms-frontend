import React from 'react'

type Props = {
  filters: any
  setFilters: React.Dispatch<React.SetStateAction<any>>
  handleSearch: (e: React.FormEvent) => void
  handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void
  currentYear: number
}

const ProjectFilterForm: React.FC<Props> = ({
  filters,
  setFilters,
  handleSearch,
  handleKeyPress,
  currentYear,
}) => {
  return (
    <form
      className="mb-4 flex flex-col gap-2 py-2 sm:flex-row sm:flex-wrap sm:gap-4"
      onSubmit={handleSearch}
    >
      <input
        type="text"
        name="projectName"
        placeholder="ค้นหาชื่อโครงงาน"
        className="w-full rounded border p-2 text-sm sm:text-base md:w-auto"
        value={filters.projectName}
        onChange={e =>
          setFilters({ ...filters, projectName: e.target.value })
        }
        onKeyDown={handleKeyPress}
      />

      <div className="flex items-center gap-2 w-auto ">
        <input
          type="number"
          name="semester"
          min={1}
          max={3}
          placeholder="ภาคเรียน"
          className="w-full rounded border p-2 text-sm sm:text-base"
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
          value={filters.academicYear}
          onChange={e =>
            setFilters({
              ...filters,
              academicYear: parseInt(e.target.value) || currentYear,
            })
          }
          className="w-full rounded border p-2 text-sm sm:text-base sm:max-w-[180px] md:w-auto"
        />
      </div>

      <select
        name="projectStatus"
        className="w-full rounded border p-2 text-sm sm:text-base sm:mt-2 sm:w-auto md:mt-0"
        value={filters.projectStatus}
        onChange={e =>
          setFilters({ ...filters, projectStatus: e.target.value })
        }
      >
        <option value="">สถานะเอกสาร</option>
        <option value="draft">ร่าง</option>
        <option value="submitted">ส่งแล้ว</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-primary1 p-2 text-sm sm:text-base text-secondary1 shadow-md transition hover:bg-primary1/80 sm:mt-2 sm:w-auto md:mt-0"
      >
        ค้นหา
      </button>
    </form>
  )
}

export default ProjectFilterForm