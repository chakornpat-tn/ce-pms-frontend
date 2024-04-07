'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material'

const hoverStyle = `hover:bg-slate-100 `

const sidebarGroup = {
  โครงงาน: [
    { name: 'ตัวเลือก1', path: '/teacher/yearproject' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
  เตรียมโครงงาน: [
    { name: 'ตัวเลือก1', path: '/teacher/yearpreproject' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
  ที่ปรึกษา: [
    { name: 'ตัวเลือก1', path: '#' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
  ผู้ใช้: [
    { name: 'ตัวเลือก1', path: '/teacher/users' },
    { name: 'ตัวเลือก2', path: '#' },
  ],
}

const Sidebar: React.FC = () => {
  const [openGroup, setOpenGroup] = useState<string | null>(null)

  const toggleGroup = (group: string) => {
    setOpenGroup(openGroup === group ? null : group)
  }

  return (
    <aside className="invisible flex h-screen w-[18.125rem] flex-col overflow-y-auto  border-r-2 bg-white px-5 py-8  md:visible">
      <p className="text-font-medium  my-0 font-bold text-primary1">
        นายไปเกาหลี ไปกินเกาเหลา
      </p>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <hr className="mx-auto h-1 w-11/12 rounded border-0 bg-primary2-500 py-0" />
          <div className="space-y-3 px-3">
            <Link href="/teacher">
              <h3
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-primary1 ${hoverStyle}`}
              >
                หน้าหลัก
              </h3>
            </Link>
          </div>
          {Object.entries(sidebarGroup).map(([group, items]) => (
            <div key={group} className="space-y-3 px-3">
              <h3
                className={`flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-base font-medium text-primary1 ${hoverStyle}`}
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
                      className={`flex transform items-center rounded-lg px-3 py-2 pl-5 text-base  text-primary1 transition-colors duration-300 ${hoverStyle}`}
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
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
