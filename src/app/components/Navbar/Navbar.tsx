import * as React from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'

export default function Navbar() {
  return (
    <div className="bg-bg_primary">
      <nav className="flex justify-between items-center w-full top-0  md:px-20 py-3 px-3 ">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="md:text-2xl font-semibold whitespace-nowrap text-primary2-500">
            Project Management System
          </span>
        </Link>
        <div className="flex max-w-16 max-h-16 md:max-w-52 md:max-h-32 items-center rtl:space-x-reverse ml-auto">
          <span>
            <Button className="text-primary2-300 bg-primary2-100 text-xs md:text-base rounded-lg">
              <Link href="/login">Login/เข้าสู่ระบบ</Link>
            </Button>
          </span>
        </div>
      </nav>
      <hr className="w-[85vw] h-1 mx-auto py-0 border-0 rounded bg-primary2-400" />
    </div>
  )
}
