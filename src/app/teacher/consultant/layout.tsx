'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AddIcon from '@mui/icons-material/Add'
import {
  AddCircleRounded,
  IndeterminateCheckBoxRounded,
} from '@mui/icons-material'
import { ProjectStudentRequest } from '@/models/Project'
import { CreateProjectDialog } from '@/components/Dialog'


type Props = {
  children: React.ReactNode
}
function layout({ children }: Props) {


  const pathname = usePathname()
  return (
    <>
      <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-primary1 md:text-4xl">
          โครงงานที่เป็นที่ปรึกษา
        </h1>
        <CreateProjectDialog
          trigger={
            <button className="mt-2 flex items-center gap-2 rounded bg-primary2-400 px-4 py-2 text-secondary1 shadow-md transition hover:bg-primary2-500 md:mt-0">
              <AddIcon /> สร้างโครงงาน
            </button>
          }
        />
      </div>
      <div className="my-[15px] w-full rounded-md bg-white shadow-sm">
        <ul className="-mb-px flex flex-wrap">
          <li className="me-2">
            <Link
              href="/teacher/consultant/pre-project"
              className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${pathname === '/teacher/consultant/pre-project' ? 'border-primary1' : 'border-transparent'}`}
            >
              เตรียมโครงงาน
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/teacher/consultant/project"
              className={`inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${pathname === '/teacher/consultant/project' ? 'border-primary1' : 'border-transparent'}`}
            >
              โครงงาน
            </Link>
          </li>
        </ul>
        <div className="flex flex-row items-center justify-center p-4">
          {children}
        </div>
      </div>
    </>
  )
}

export default layout
