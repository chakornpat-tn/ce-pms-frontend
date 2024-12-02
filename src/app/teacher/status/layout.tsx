'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
      </div>
      <div className="my-[15px] w-full rounded-md bg-white shadow-sm">
        <ul className="-mb-px flex flex-wrap">
          <li className="me-2">
            <Link
              href="/teacher/status"
              className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${pathname === '/teacher/status' ? 'border-primary1' : 'border-transparent'}`}
            >
              เตรียมโครงงาน
            </Link>
          </li>
          <li className="me-2">
            <Link
              href="/teacher/status/project"
              className={`inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${pathname === '/teacher/status/project' ? 'border-primary1' : 'border-transparent'}`}
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
