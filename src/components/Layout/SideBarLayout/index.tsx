'use client'
import React, { useState, useEffect } from 'react'
import {
  Home,
  Book,
  Bookmark,
  Group,
  Person,
  Description,
  Assignment,
  ExitToApp,
  Article,
  Menu,
  Login,
} from '@mui/icons-material'
import Link from 'next/link'

type props = {
  children: React.ReactNode
}

const TeacherNavbarWithSideBar = ({ children }: props) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleSidebar = () => setIsOpen(!isOpen)

  const sidebarItems = [
    { name: 'หน้าแรก', icon: Home, link: '/teacher' },
    { name: 'วิชาโครงงาน', icon: Article, link: '/teacher/project' },
    { name: 'วิชาเตรียมโครงงาน', icon: Book, link: '/teacher/pre-project' },
    {
      name: 'โครงงานที่เป็นที่ปรึกษา',
      icon: Bookmark,
      link: '/teacher/consultant',
    },
    { name: 'คุมสอบโครงงาน', icon: Group, link: '/teacher/present' },
    { name: 'จัดการผู้ใช้', icon: Person, link: '/teacher/present' },
    { name: 'สถานะโครงงาน', icon: Assignment, link: '#' },
    { name: 'เอกสาร', icon: Description, link: '#' },
    { name: 'ออกจากระบบ', icon: ExitToApp, link: '#' },
  ]

  return (
    <div className="relative">
      <aside
        className={`fixed left-0 top-0 h-full w-64 transform bg-white shadow-md transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } z-40`}
      >
        <div className="p-5">
          <nav className="mx-auto mt-8">
            <ul>
              {sidebarItems.map((item, index) => (
                <li key={index} className="mb-4">
                  <Link
                    href={`${item.link}`}
                    className="primary-hover flex items-center rounded-md p-2"
                  >
                    <item.icon className="mr-3" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>

      {/* Navbar */}
      <div
        className={`md:transition-all md:duration-300 ${isOpen ? 'md:ml-64' : 'ml-0'}`}
      >
        <div className="py-auto navbar justify-between bg-white shadow-md">
          <div className="flex-none">
            <button
              className="btn btn-square btn-ghost"
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <div className="flex flex-1 justify-center">
            <a className="btn btn-ghost text-xl">Project Management System</a>
          </div>
        </div>

        <main
          onClick={() => isOpen && window.innerWidth < 768 && toggleSidebar()}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default TeacherNavbarWithSideBar
