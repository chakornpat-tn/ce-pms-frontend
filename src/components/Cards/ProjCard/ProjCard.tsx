import Link from 'next/link'
import React from 'react'
type Props = {
  path: string
}

const ProjCard = ({ path }: Props) => {
  return (
    <Link
      href={path}
      className="block max-w-sm rounded-lg border bg-white p-6 shadow-sm hover:border-2  hover:border-primary2-500 hover:bg-gray-100"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
        ปีการศึกษา 2xxx
      </h5>
      <p className="font-normal text-gray-700">9,999 โครงงาน</p>
    </Link>
  )
}
const AllpjCard = ({ path }: Props) => {
  return (
    <Link
      href={path}
      className="flex max-w-sm items-center justify-center rounded-lg border bg-white p-6 shadow-sm hover:border-2  hover:border-primary2-500 hover:bg-gray-100"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 md:text-3xl">
        ดูทั้งหมด
      </h5>
    </Link>
  )
}

const Selectprojectcard = ({ path }: Props) => {
  return (
    <Link
      href={path}
      className="block max-w-sm rounded-lg border bg-white p-6 shadow-sm hover:border-2  hover:border-primary2-500 hover:bg-gray-100"
    >
      <div className="flex-1 truncate">
        <div className="flex items-center justify-between">
          <h3 className="max-w-48 truncate text-sm font-bold text-gray-800">
            ชื่อโครงงาน
          </h3>
          <span className="inline-flex flex-shrink-0 items-center rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-yellow-500">
            สถานะ
          </span>
        </div>
        <p className="mt-1 truncate text-sm text-gray-500">
          นายไปเกาหลี ไปกินเกาเหลา
        </p>
        <p className="mt-1 truncate text-sm text-gray-500">
          นายไปเที่ยวจีน ไปกินตีนไก่
        </p>
        <p className="mt-1 truncate text-sm text-gray-500">
          นางสาวมานี ปิติชูใจ
        </p>
        <p className="mt-1 truncate text-sm text-gray-500">
          <b>อาจารย์ที่ปรึกษา</b> นายไฟแดง แซงไฟเขียว
        </p>
      </div>
    </Link>
  )
}
export { ProjCard, AllpjCard, Selectprojectcard }
