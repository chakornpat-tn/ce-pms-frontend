'use client'

import React, { useActionState, useEffect, useState } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import course from '@/constants/course/course'
import Link from 'next/link'

type Props = {
  children: React.ReactNode
  academicYear?: number
  semester?: number
  courseSelect?: number
}

const CreateCommitteePointExcelDialog: React.FC<Props> = ({
  children,
  academicYear: initialAcademicYear,
  semester: initialSemester,
  courseSelect: initialCourseSelect,
}: Props) => {
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [academicYear, setAcademicYear] = useState(initialAcademicYear || new Date().getFullYear() + 543)
  const [semester, setSemester] = useState(initialSemester || 1)
  const [courseSelect, setCourseSelect] = useState(initialCourseSelect || course.PreProject)

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">สร้างไฟล์คะแนนสอบ{courseSelect === course.Project ? 'โครงงาน': 'เตรียมโครงงาน'}</DialogTitle>
          <DialogDescription>สร้างไฟล์เอกสารคะแนนของกรรมการสำหรับนักศึกษาแต่ละคน</DialogDescription>
        </DialogHeader>
        <div className="mx-auto w-full p-4">
          <form
            className="space-y-4"
            action={formData => {
              const newSemester = Number(formData.get('semester'))
              const newAcademicYear = Number(formData.get('academicYear'))
              setSemester(newSemester)
              setAcademicYear(newAcademicYear)
              setDialogOpen(false)
            }}
          >
            {/* Semester */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ภาคเรียน 
              </label>
              <input
                type="number"
                name="semester"
                className="w-[100%] rounded-md border px-3 py-2"
                min={1}
                max={3}
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                required
              />
            </div>
            {/* Academic Year */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ปีการศึกษา 
              </label>
              <input
                type="number"
                name="academicYear"
                className="w-[100%] rounded-md border px-3 py-2"
                value={academicYear}
                onChange={(e) => setAcademicYear(Number(e.target.value))}
                required
              />
            </div>

            {/* Submit */}
            {/* <Link href={`/api/committee/2568/2/2`} target='_blank'> */}
            <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault()
                  window.open(`/api/committee/${academicYear}/${semester}/${courseSelect}`)
                }}
                className="w-[100%] rounded-md bg-primary2-400 px-4 py-2 text-secondary1 hover:bg-primary2-500"
              >
                สร้าง
              </button>
            {/* </Link> */}
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export { CreateCommitteePointExcelDialog }
