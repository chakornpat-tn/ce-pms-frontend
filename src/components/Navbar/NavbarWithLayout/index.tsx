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
  Lock,
} from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

const NavbarWithSideBar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  
  const router = useRouter()

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check')
        const data = await res.json()
        if (data.user) setUser(data.user.name)
        setIsAuthenticated(data.isAuthenticated)
      } catch (error) {
        console.error('Auth check failed:', error)
        setIsAuthenticated(false)
      }
    }

    checkAuth()
    setIsLoading(false)
  }, [])

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
      })

      if (res.ok) {
        setIsOpen(false)
        setIsAuthenticated(false)
        router.push('/')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const authenticatedItems = [
    { name: 'หน้าแรก', icon: Home, link: '/teacher' },
    { name: 'วิชาโครงงาน', icon: Article, link: '/teacher/project' },
    { name: 'วิชาเตรียมโครงงาน', icon: Book, link: '/teacher/pre-project' },
    {
      name: 'โครงงานที่เป็นที่ปรึกษา',
      icon: Bookmark,
      link: '/teacher/consultant',
    },
    { name: 'คุมสอบโครงงาน', icon: Group, link: '/teacher/present' },
    { name: 'จัดการผู้ใช้', icon: Person, link: '/teacher/users' },
    { name: 'สถานะโครงงาน', icon: Assignment, link: '#' },
    { name: 'เอกสาร', icon: Description, link: '#' },
    { name: 'เปลี่ยนรหัสผ่าน', icon: Lock, link: '#' },
  ]

  const sidebarItems = [
    ...authenticatedItems,
    { name: 'ออกจากระบบ', icon: ExitToApp, onClick: handleLogout },
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
            <p className="mb-4 flex items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-md bg-primary2-400 py-4 text-sm text-secondary1 w-full">
              {user}
            </p>
            <ul>
              {sidebarItems.map((item, index) => (
                <li key={index} className="mb-4">
                  {'onClick' in item ? (
                    <button
                      onClick={item.onClick}
                      className="primary-hover flex w-full items-center rounded-md p-2"
                    >
                      <item.icon className="mr-3" />
                      <span>{item.name}</span>
                    </button>
                  ) : (
                    <Link
                      href={'link' in item ? item.link : '#'}
                      className="primary-hover flex items-center rounded-md p-2"
                    >
                      <item.icon className="mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  )}
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
        <div className="navbar bg-white shadow-md">
          <div className="flex-none">
            {(isAuthenticated && !isLoading) && (
              <button
                className="btn btn-square btn-ghost"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <Link href={'/'} className="btn btn-ghost text-xl">
              Project Management System
            </Link>
          </div>
          <div className="flex-none">
            {(!isAuthenticated && !isLoading) && (
              <Link href={'/login'}>
                <button className="btn btn-square btn-ghost">
                  <Login className="h-5 w-5" />
                </button>
              </Link>
            )}
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

export default NavbarWithSideBar
