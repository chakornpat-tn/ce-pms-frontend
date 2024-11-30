import { getUserRole } from '@/models/User'
import { User } from '@/models/User'
import UserMenu from './UserMenu'

type Props = {
  usersData: User[] | undefined
}

export function UsersTable({ usersData }: Props) {
  const roleColor = [, 'bg-blue-600', 'bg-orange-600', 'bg-green-600']

  return (
    <>
      <div className="mb-2 flex w-full items-center justify-start md:justify-center">
        <div className="flex h-auto w-full flex-col items-start md:w-4/5 md:flex-row md:items-center md:justify-center"></div>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="divide-y bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
              ชื่อ-นามสกุล
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
              ชื่อผู้ใช้
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:text-base">
              สิทธิ์
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {usersData?.map((user: User, i) => (
            <tr key={i} className="hover:bg-gray-100">
              <td className="whitespace-nowrap px-6 py-4">
                {user.name}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                {user.username}
              </td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className="flex items-center">
                  <div
                    className={`mr-[4px] rounded-full p-[5px] ${roleColor[user.role]}`}
                  ></div>
                  {getUserRole(user.role)}
                </div>
              </td>
              <td className="whitespace-nowrap px-6 py-4 text-right text-sm text-primary1">
                <UserMenu userId={user.id} userName={user.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>    </>
  )
}
