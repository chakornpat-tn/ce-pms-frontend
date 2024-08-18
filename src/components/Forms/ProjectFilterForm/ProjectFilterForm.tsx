import React from 'react'

type Props = {}

function ProjectFilterForm({}: Props) {
  const currentYear = new Date().getFullYear() + 543

  return (
    <form className="mb-4 flex flex-col gap-2 py-2 sm:flex-row sm:flex-wrap sm:gap-4">
      <input
        type="text"
        name="title"
        placeholder="ค้นหาชื่อโครงงาน"
        className="w-full rounded border p-2 md:w-auto"
      />

      <div className="flex items-center gap-2">
        <input
          type="number"
          name="semester"
          min={1}
          max={3}
          placeholder="ภาค"
          className="w-full rounded border p-2 md:w-auto"
        />
        <p className="flex-shrink-0">/</p>
        <input
          type="number"
          name="academicYear"
          placeholder="ปีการศึกษา"
          defaultValue={currentYear}
          className="w-full rounded border p-2 sm:max-w-[180px] md:w-auto"
        />
      </div>

      <select
        name="documentStatus"
        className="w-full rounded border p-2 sm:mt-2 sm:w-auto md:mt-0"
      >
        <option value="">สถานะเอกสาร</option>
        <option value="draft">ร่าง</option>
        <option value="submitted">ส่งแล้ว</option>
      </select>

      <select
        name="projectStatus"
        className="w-full rounded border p-2 sm:mt-2 sm:w-auto md:mt-0"
      >
        <option value="">สถานะโครงงาน</option>
        <option value="preparation">ดำเนินการเตรียมโครงงาน</option>
        <option value="completed">เสร็จสมบูรณ์</option>
      </select>

      <button
        type="submit"
        className="w-full rounded bg-primary1 p-2 text-secondary1 shadow-md transition hover:bg-primary1/80 sm:mt-2 sm:w-auto md:mt-0"
      >
        ค้นหา
      </button>
    </form>
  )
}

export { ProjectFilterForm }
