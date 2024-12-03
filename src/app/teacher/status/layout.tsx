'use client'
import userRoles from '@/constants/userRoles/userRoles'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

type Props = {
  children: React.ReactNode
  project: React.ReactNode
  preProject: React.ReactNode
}

function Layout({ children, project, preProject }: Props) {
  const [role, setRole] = useState(userRoles.preProjectTeacher)
  const [activeTab, setActiveTab] = useState('project')

  useEffect(() => {
    const fetchRole = async () => {
      const res = await fetch('/api/auth/check')
      const data = await res.json()
      if (data.user) {
        setRole(Number(data.user.role))
        if( data.user.role === userRoles.preProjectTeacher) setActiveTab('preProject')
      }
    }
    fetchRole()
  }, [])

  return (
    <>
      <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-primary1 md:text-4xl">
        จัดการสถานะโครงงาน
        </h1>
      </div>
      <div className="my-[15px] w-full rounded-md bg-white shadow-sm">
        <ul className="-mb-px flex flex-wrap">
          {role === userRoles.ProjectTeacher && (
            <li className="me-2">
              <button
                onClick={() => setActiveTab('project')}
                className={`inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${activeTab === 'project' ? 'border-primary1' : 'border-transparent'}`}
              >
                โครงงาน
              </button>
            </li>
          )}
          {(role === userRoles.ProjectTeacher ||
            role === userRoles.preProjectTeacher) && (
            <li className="me-2">
              <button
                onClick={() => setActiveTab('preProject')}
                className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${activeTab === 'preProject' ? 'border-primary1' : 'border-transparent'}`}
              >
                เตรียมโครงงาน
              </button>
            </li>
          )}
        </ul>
        
        <div className="flex flex-row items-center justify-center p-4">
          {activeTab === 'project' ? project : preProject}
        </div>
      </div>
    </>
  )
}

export default Layout
