'use client'
import useSWR from 'swr'
import { CreateUserModalForm } from '@/components/Modals'
import { UsersTable } from '@/components/Tables'
import CircularProgress from '@mui/material/CircularProgress'

type Props = {}

function page({}: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, isLoading } = useSWR(`${apiUrl}/admin/users`, fetcher, {
    refreshInterval: 5000,
  })

  return (
    <>
      <div className="flex min-h-svh justify-center ">
        <article className="h-full w-4/5 p-8">
          <div className="mb-2 flex  flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-primary1">
              จัดการบัญชีผู้ใช้
            </h1>
            <CreateUserModalForm />
          </div>

          {/* ---------------------------------------------Search Option--------------------------------------------- */}

          {/* ---------------------------------------------Users List------------------------------------------------ */}
          {isLoading && (
            <div className="flex h-2/4 w-full items-center  justify-center">
              <CircularProgress color="inherit" />
            </div>
          )}

          {data && (
            <div className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
              <UsersTable usersData={data} />
            </div>
          )}
        </article>
      </div>
    </>
  )
}

export default page
