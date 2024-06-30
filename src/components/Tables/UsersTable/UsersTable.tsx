import { User, getUserRole } from '@/types/User'
import UserMenu from './UserMenu'

type Props = {
  usersData: User[] | undefined
}

export function UsersTable({ usersData }: Props) {
  const roleColor = [, 'bg-blue-600', 'bg-orange-600', 'bg-green-600']

  return (
    <>
      <div className=" mb-2 flex w-full items-center justify-start  md:justify-center">
        <div className="flex h-auto w-full flex-col items-start md:w-4/5 md:flex-row md:items-center md:justify-center"></div>
      </div>
      <table className="mb-5  w-full  text-left text-sm">
        <thead className="border-b text-xs uppercase text-primary1  max-md:hidden">
          <tr>
            <th scope="col" className="px-6 py-4 text-lg">
              ชื่อ-นามสกุล
            </th>
            <th scope="col" className="px-6 py-4 text-lg ">
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
          {usersData?.map((user: User, i) => (
            <>
              <tr
                key={i}
                className="border-b transition-colors duration-300 hover:bg-slate-100 max-md:flex max-md:flex-col "
              >
                <div className="flex w-full flex-row items-center">
                  <th
                    scope="col"
                    className=" mr-1 p-0 text-xs md:hidden md:p-4"
                  >
                    ชื่อ-นามสกุล
                  </th>
                  <td className="whitespace-nowrap py-4 text-sm text-primary1 max-md:flex max-md:flex-row md:px-6 md:text-base">
                    {user.name}
                  </td>
                </div>

                <td className="px-0 py-4 text-base text-primary1 max-md:hidden md:px-6">
                  {user.username}
                </td>
                <td className="flex items-center px-6 py-4 text-sm text-primary1 max-md:justify-between max-md:text-base">
                  <div className="flex items-center p-0  text-sm text-primary1 max-sm:text-xs">
                    <div
                      className={`bg-b mr-[4px] rounded-full p-[5px] ${roleColor[user.role]}`}
                    ></div>
                    {getUserRole(user.role)}
                  </div>{' '}
                  <div className="md:hidden">
                    <UserMenu userId={user._id} userName={user.name} />
                  </div>
                </td>
                <td className="px-6 py-4 text-right text-base text-primary1 max-md:hidden">
                  <UserMenu userId={user._id} userName={user.name} />
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </>
  )
}
