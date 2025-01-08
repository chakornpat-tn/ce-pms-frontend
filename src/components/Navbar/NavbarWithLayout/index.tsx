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
import userRoles from '@/constants/userRoles/userRoles'

type Props = {
  children: React.ReactNode
}

const NavbarWithSideBar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState('')
  const [role, setRole] = useState(999)
  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()

  const toggleSidebar = () => setIsOpen(!isOpen)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/auth/check')
        const data = await res.json()
        if (data.user) {
          setUser(data.user.name)
          setRole(Number(data.user.role))
        }
        setIsAuthenticated(data.isAuthenticated)
      } catch (error) {
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
        router.push('/login')
      }
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const authenticatedItems = [
    { name: 'หน้าแรก', icon: Home, link: '/teacher', role: userRoles.Teacher },
    {
      name: 'วิชาโครงงาน',
      icon: Article,
      link: '/teacher/project',
      role: userRoles.ProjectTeacher,
    },
    {
      name: 'วิชาเตรียมโครงงาน',
      icon: Book,
      link: '/teacher/pre-project',
      role: userRoles.preProjectTeacher,
    },
    {
      name: 'โครงงานที่เป็นที่ปรึกษา',
      icon: Bookmark,
      link: '/teacher/consultant/pre-project',
      role: 3,
    },
    {
      name: 'คุมสอบโครงงาน',
      icon: Group,
      link: '/teacher/present',
      role: userRoles.Teacher,
    },
    {
      name: 'จัดการผู้ใช้',
      icon: Person,
      link: '/teacher/users',
      role: userRoles.ProjectTeacher,
    },
    {
      name: 'สถานะโครงงาน',
      icon: Assignment,
      link: '/teacher/status',
      role: userRoles.preProjectTeacher,
    },
    {
      name: 'เอกสาร',
      icon: Description,
      link: '/teacher/docs',
      role: userRoles.preProjectTeacher,
    },
    {
      name: 'เปลี่ยนรหัสผ่าน',
      icon: Lock,
      link: '/teacher/change-password',
      role: userRoles.Teacher,
    },
  ]

  const projectItems = [
    { name: 'หน้าแรก', icon: Home, link: '/project' },
    { name: 'ส่งเอกสาร', icon: Description, link: '/project/docs' },
    { name: 'เปลี่ยนรหัสผ่าน', icon: Lock, link: '/project/change-password' },
    {
      name: 'ออกจากระบบ',
      icon: ExitToApp,
      onClick: handleLogout,
      role: userRoles.Teacher,
    },
  ]

  const sidebarItems = [
    ...authenticatedItems,
    {
      name: 'ออกจากระบบ',
      icon: ExitToApp,
      onClick: handleLogout,
      role: userRoles.Teacher,
    },
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
            <p className="mb-4 flex w-full items-center justify-center text-ellipsis whitespace-nowrap rounded-md bg-primary2-400 py-4 text-sm text-secondary1 overflow-hidden">
              <span className="overflow-hidden text-ellipsis text-sm sm:text-xs">{user}</span>
            </p>
            <ul className="cursor-pointer">
              {(role == userRoles.ProjectTeacher ||
                role == userRoles.preProjectTeacher ||
                role == userRoles.Teacher) &&
                sidebarItems.map((item, index) => {
                  const commonClasses = 'flex items-center rounded-md p-2'
                  const IconComponent = <item.icon className="mr-3" />
                  if (role > item.role) return null

                  const linkContent = (
                    <>
                      {IconComponent}
                      <span>{item.name}</span>
                    </>
                  )

                  return (
                    <li key={index} className="mb-4" draggable="false">
                      {'onClick' in item ? (
                        <button
                          onClick={item.onClick}
                          className={`${commonClasses} primary-hover w-full`}
                        >
                          {linkContent}
                        </button>
                      ) : (
                        <Link
                          href={'link' in item ? item.link : '#'}
                          className={`${commonClasses} primary-hover`}
                          draggable="false"
                        >
                          {linkContent}
                        </Link>
                      )}
                    </li>
                  )
                })}

              {role === userRoles.Student &&
                projectItems.map((item, index) => {
                  const commonClasses = 'flex items-center rounded-md p-2'
                  const IconComponent = <item.icon className="mr-3" />
                  const linkContent = (
                    <>
                      {IconComponent}
                      <span>{item.name}</span>
                    </>
                  )

                  return (
                    <li key={index} className="mb-4" draggable="false">
                      {'onClick' in item ? (
                        <button
                          onClick={item.onClick}
                          className={`${commonClasses} primary-hover w-full`}
                        >
                          {linkContent}
                        </button>
                      ) : (
                        <Link
                          href={'link' in item ? item.link : '#'}
                          className={`${commonClasses} primary-hover`}
                          draggable="false"
                        >
                          {linkContent}
                        </Link>
                      )}
                    </li>
                  )
                })}
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
            {isAuthenticated && !isLoading && (
              <button
                className="btn btn-square btn-ghost"
                onClick={toggleSidebar}
              >
                <Menu className="h-5 w-5" />
              </button>
            )}
          </div>
          <div className="flex-1">
            <Link
              href={
                [
                  userRoles.ProjectTeacher,
                  userRoles.preProjectTeacher,
                  userRoles.Teacher,
                ].includes(role)
                  ? '/teacher'
                  : role === userRoles.Student
                    ? '/project'
                    : '/'
              }
              className="btn btn-ghost text-xl"
            >
              Project Management System
            </Link>
          </div>
          <div className="flex-none">
            {!isAuthenticated && !isLoading && (
              <Link href={'/login'}>
                <button className="btn btn-square btn-ghost">
                  <Login className="h-5 w-5" />
                </button>
              </Link>
            )}
          </div>
        </div>

        <main className='h-full'
          onClick={() => isOpen && window.innerWidth < 768 && toggleSidebar()}
        >
          {children}
        </main>
      </div>
    </div>
  )
}

export default NavbarWithSideBar
