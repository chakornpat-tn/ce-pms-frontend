'use client'
import { useState, useEffect } from 'react'
import { UsersTable } from '@/components/Tables'
import Pagination from '@mui/material/Pagination'
import Link from 'next/link'
import { listUser } from '@/actions/user'
import useSWR from 'swr'
import { ResListUser } from '@/models/User'
import { Skeleton } from '@mui/material'
import { Loader } from '@/components/Loading'

type Props = {}

function Page({}: Props) {
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(30)
  const [name, setName] = useState('')
  const [role, setRole] = useState<number | undefined>(undefined)

  const fetchData = async () => {
    const res = (await listUser({
      page,
      perPage,
      role,
      name,
    })) as ResListUser

    return res
  }

  const { data, isLoading, mutate } = useSWR('/v1/user', fetchData, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setPage(1)
    mutate()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent)
    }
  }

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    setPage(value)
    mutate()
  }

  const handlePerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setPerPage(newValue)
    setPage(1)
    mutate()
  }

  return (
    <>
      <div className="flex min-h-svh justify-center">
        <article className="h-full w-4/5 p-8">
          <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-primary1">
              จัดการบัญชีผู้ใช้
            </h1>
            <Link
              href="users/create"
              className="mt-2 rounded bg-primary2-400 px-4 py-2 text-secondary1 shadow-md transition hover:bg-primary2-500 md:mt-0"
            >
              เพิ่มผู้ใช้ใหม่
            </Link>
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
              onKeyDown={handleKeyPress}
            />
            <select
              name="role"
              className="w-full rounded border p-2 md:w-auto"
              value={role === undefined ? '' : role}
              onChange={e => setRole(parseInt(e.target.value) || undefined)}
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
          {isLoading && (
            <div className="flex h-full items-center justify-center">
              <Loader />
            </div>
          )}
          {data?.users && (
            <div className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
              <>
                <UsersTable usersData={data.users} />
                <div className="flex flex-row justify-between">
                  <p className="text-sm text-gray-500">
                    จำนวนทั้งหมด {data?.totalCount} ผู้ใช้
                  </p>

                  {/* Pagination */}
                  {data && (
                    <Pagination
                      count={Math.ceil(data.totalCount / perPage)}
                      page={page}
                      onChange={handlePageChange}
                    />
                  )}
                </div>
              </>
            </div>
          )}
        </article>
      </div>
    </>
  )
}

export default Page
