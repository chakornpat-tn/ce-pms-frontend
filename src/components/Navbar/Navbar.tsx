'use client'
import * as React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import Button from '@mui/material/Button'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

const NavbarGroup = {
  โครงงาน: [
    { name: 'จัดการโครงงาน', path: '/teacher/yearproject' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
  เตรียมโครงงาน: [
    { name: 'จัดการโครงงาน', path: '/teacher/pre-project' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
  ที่ปรึกษา: [
    { name: 'โครงงานที่เป็นที่ปรีกษา', path: '/teacher/consultant' },
    { name: 'สอบโครงงาน', path: '/teacher/present' },
  ],
  ผู้ใช้: [{ name: 'จัดการบัญชีผู้ใช้', path: '/teacher/users' }],
}

const Navbar: React.FC = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const toggleGroup = (group: string) => {
    setOpenGroup(openGroup === group ? null : group)
  }

  return (
    <div className="container navbar mx-auto rounded-lg bg-white shadow-md md:mt-4">
      <div className="navbar-start">
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label
              htmlFor="my-drawer"
              className="btn btn-circle btn-ghost drawer-button"
            >
              <MenuIcon />
            </label>
          </div>
          <div className="drawer-side z-[9999]">
            <label
              htmlFor="my-drawer"
              aria-label="close Navbar"
              className="drawer-overlay"
            ></label>
            <ul className="menu min-h-full w-80 rounded-br-md border-r-2 bg-white  p-4 text-base-content">
              <hr className="mx-auto h-1 w-11/12 rounded border-0 bg-primary2-500 py-0" />
              <div className="space-y-3 px-3 mt-4">
                <Link href="/teacher">
                  <h3
                    className="flex cursor-pointer items-center justify-between rounded-lg text-base font-medium text-primary1 hover:bg-primary2-100"
                  >
                    หน้าหลัก
                  </h3>
                </Link>
              </div>
              <hr className="mx-auto h-1 w-11/12 rounded border-0 bg-primary2-500 py-0 mt-4" />
              {Object.entries(NavbarGroup).map(([group, items]) => (
            <div key={group} className="space-y-3 px-3">
              <h3
                className={"flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-primary1"}
                onClick={() => toggleGroup(group)}
              >
                {group}
                {openGroup === group ? (
                  <KeyboardArrowUp className="text-primary1" />
                ) : (
                  <KeyboardArrowDown className="text-primary1" />
                )}
              </h3>

              {openGroup === group && (
                <ul>
                  {items.map((item, index) => (
                    <li
                      key={index}
                      className={"flex transform items-center rounded-lg px-3 py-2 pl-5 text-base  text-primary1 transition-colors duration-300"}
                    >
                      <Link href={item.path} className="text-sm text-primary1">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="navbar-center">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="whitespace-nowrap font-semibold text-primary2-500 md:text-2xl">
            Project Management System
          </span>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="ml-auto flex max-h-16 max-w-16 items-center md:max-h-32 md:max-w-52 rtl:space-x-reverse">
          <span>
            <Button className="rounded-lg bg-primary2-100 text-xs text-primary2-300 md:text-base">
              <Link href="/login" className="flex items-center">
                <LoginIcon className="lg:hidden" />
                <span className="hidden lg:inline">Login/เข้าสู่ระบบ</span>
              </Link>
            </Button>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Navbar