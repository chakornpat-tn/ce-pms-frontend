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
      <table className="mb-5 w-full text-left text-sm">
        <thead className="border-b text-xs uppercase text-primary1 max-md:hidden">
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
            <th scope="col" className="px-6 py-4">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {usersData?.map((user: User, i) => (
            <tr
              key={i}
              className="border-b transition-colors duration-300 hover:bg-slate-100"
            >
              <td className="whitespace-nowrap py-4 text-sm text-primary1 md:px-6 md:text-base">
                {user.name}
              </td>
              <td className="px-0 py-4 text-base text-primary1 max-md:hidden md:px-6">
                {user.username}
              </td>
              <td className="px-0 py-auto  text-base text-primary1  md:px-4">
                <div className="flex h-full items-center p-0 text-sm text-primary1 max-sm:text-xs">
                  <div
                    className={`mr-[4px] rounded-full p-[5px] ${roleColor[user.role]}`}
                  ></div>
                  {getUserRole(user.role)}
                </div>
              </td>
              <td className="px-2 py-4 tex-right text-base text-primary1">
                <UserMenu userId={user.id} userName={user.name} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
