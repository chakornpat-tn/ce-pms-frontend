'use client'
import { useState, useEffect } from 'react'
import { CreateUserModalForm } from '@/components/Modals'
import { UsersTable } from '@/components/Tables'
import Pagination from '@mui/material/Pagination'

type Props = {}

function page({}: Props) {
  const [usersData, setUsersData] = useState([])
  const [totalResult, setTotalResult] = useState(0)
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(30)

  const apiUrl = process.env.NEXT_PUBLIC_API_URL

  const fetchData = async () => {
    const res = await fetch(
      `${apiUrl}/user?name=${name}&role=${role}&page=${page}&perPage=${perPage}`,
      { cache: 'no-store' },
    )
    const data = await res.json()
    setUsersData(data.users)
    setTotalResult(data.totalResult)
  }

  useEffect(() => {
    fetchData()
  }, [page])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    fetchData()
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setPerPage(newValue)
    setPage(1)
  }

  return (
    <>
      <div className="flex min-h-svh justify-center ">
        <article className="h-full w-4/5 p-8">
          <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-primary1">
              จัดการบัญชีผู้ใช้
            </h1>
            <CreateUserModalForm />
          </div>

          {/* Search Form */}
          <form
            className="mb-4 flex flex-col justify-center gap-2 py-4 sm:flex-row sm:gap-4"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              name="name"
              placeholder="ค้นหาชื่อ"
              className="w-full rounded border p-2 md:w-auto"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <select
              name="role"
              className="w-full rounded border p-2 md:w-auto"
              value={role}
              onChange={e => setRole(e.target.value)}
            >
              <option value="">ทุกสิทธิ์</option>
              <option value="1">อาจารย์โครงงาน</option>
              <option value="2">อาจารย์เตรียมโครงงาน</option>
              <option value="3">อาจารย์ทั่วไป</option>
            </select>
            <div className="m-0 flex w-auto flex-row items-center justify-evenly p-0">
              <h2 className="text-xs md:text-base">หน้าละ</h2>
              <input
                type="number"
                name="perPage"
                placeholder="จำนวนต่อหน้า"
                className="ml-2 max-w-[75px] rounded border p-2 sm:max-w-[100px]"
                value={perPage}
                onChange={handlePerPageChange}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded bg-primary2-400 p-2 text-secondary1 shadow-md transition hover:bg-primary2-500 sm:w-auto"
            >
              ค้นหา
            </button>
          </form>

          {/* Users List */}
          <div className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
            <UsersTable usersData={usersData} />
            <div className="flex flex-row justify-between">
              <p className="text-sm text-gray-500">
                จำนวนทั้งหมด {totalResult} ผู้ใช้
              </p>

              {/* Pagination */}
              <Pagination
                count={totalResult / perPage}
                page={page}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </article>
      </div>
    </>
  )
}

export default page
