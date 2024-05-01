'use client'
import { User, getUserRole } from '@/types/User'
import UserMenu from './UserMenu'
import { useState } from 'react'

type Props = {
  usersData: User[] | undefined
}

export function UsersTable({ usersData }: Props) {
  const roleColor = [, 'bg-blue-600', 'bg-orange-600', 'bg-green-600']

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState('')

  const handleSearchChange = (event: any) => {
    setSearchTerm(String(event.target.value))
  }

  const handleRoleChange = (event: any) => {
    setSelectedRole(event.target.value)
  }

  const filteredUsers = usersData?.filter(user => {
    const nameMatches = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
    const roleMatches =
      selectedRole === '' || user.role === parseInt(selectedRole)
    return nameMatches && roleMatches
  })

  return (
    <>
      <div className=" mb-2 flex w-full items-center justify-start  md:justify-center">
        <div className="flex h-auto w-full flex-col items-start md:w-4/5 md:flex-row md:items-center md:justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="ค้นหาจาก ชื่อ-นามสกุล"
            className="mr-2 w-full rounded-md border border-gray-300 p-2 focus:border-primary1 focus:outline-none focus:ring md:w-4/5"
          />
          <select
            value={selectedRole}
            onChange={handleRoleChange}
            className="my-2 ml-0 w-full rounded-md border border-gray-300 p-2  focus:border-primary1 focus:outline-none focus:ring md:w-1/5 lg:max-w-[150px]"
          >
            <option value="">ทั้งหมด</option>
            <option value="1">อาจารย์โครงงาน</option>
            <option value="2">อาจารย์เตรียมโครงงาน</option>
            <option value="3">อาจารย์ทั่วไป</option>
          </select>
        </div>
      </div>
      <table className="mb-5  w-full  text-left text-sm">
        <thead className=" border-b text-xs uppercase  text-primary1">
          <tr>
            <th scope="col" className="px-6 py-4 text-lg">
              ชื่อ-นามสกุล
            </th>
            <th scope="col" className="px-6 py-4 text-lg">
              ชื่อผู้ใช้
            </th>

            <th scope="col" className="px-6 py-4 text-lg">
              สิทธิ์
            </th>
            <th scope="col" className="px-6 py-4 ">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers?.map((user: User) => (
            <tr
              key={user._id}
              className=" border-b  transition-colors duration-300 hover:bg-slate-100"
            >
              <td className=" whitespace-nowrap px-6 py-4 text-base text-primary1">
                {user.name}
              </td>
              <td className="px-6 py-4 text-base text-primary1">
                {user.username}
              </td>
              <td className="flex flex-row items-center px-6 py-4 text-base text-primary1">
                <div
                  className={`bg-b mr-[4px] rounded-full p-[5px] ${roleColor[user.role]}`}
                ></div>
                {getUserRole(user.role)}
              </td>
              <td className="px-6 py-4 text-right text-base text-primary1">
                <UserMenu userId={user._id} userName={user.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
