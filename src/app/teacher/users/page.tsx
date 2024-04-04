import { UserModalForm } from '@/components/Modals'
import { User, getUserRole } from '@/types/User'

type Props = {}

const getUsers = async () => {
  try {
    const apiUrl = process.env.API_URL
    const response = await fetch(`${apiUrl}/admin/users`)
    const data = await response.json()
    return data as User[]
  } catch (error) {
    console.log(error)
  }
}

const roleColor = [, 'bg-blue-600', 'bg-orange-600', 'bg-green-600']

async function page({}: Props) {
  const users = await getUsers()

  return (
    <>
      <div className="flex min-h-svh justify-center ">
        <article className="h-full w-4/5 p-8">
          <div className="mb-2 flex  flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-primary1">
              จัดการบัญชีผู้ใช้
            </h1>
            {/* <button
              type="button"
              className=" my-2 scale-100 rounded-md bg-primary2-400 px-2 py-3 text-secondary1 shadow-md transition hover:bg-primary2-500 focus:scale-90"
            >
              เพิ่มบัญชีผู้ใช้
            </button> */}
            <UserModalForm />
          </div>

          {/* ---------------------------------------------Search Option--------------------------------------------- */}

          {/* ---------------------------------------------Users List------------------------------------------------ */}

          <div className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
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
                {users?.map((user: any) => (
                  <tr key={user._id} className=" border-b  hover:bg-slate-100">
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
                      <a
                        href="#"
                        className="font-medium text-blue-600 hover:underline"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </>
  )
}

export default page
