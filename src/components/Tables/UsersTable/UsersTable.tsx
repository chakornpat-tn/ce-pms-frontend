'use client'
import { User, getUserRole } from '@/types/User'
import UserMenu from './UserMenu'

type Props = {
  usersData: User[] | undefined
}

export function UsersTable({ usersData }: Props) {
  const roleColor = [, 'bg-blue-600', 'bg-orange-600', 'bg-green-600']

  return (
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
        {usersData?.map((user: any) => (
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
                className={`bg-b mr-[4px] h-[10px] w-[10px] rounded-md ${roleColor[user.role]}`}
              ></div>
              {getUserRole(user.role)}
            </td>
            <td className="px-6 py-4 text-right text-base text-primary1">
              <UserMenu />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
