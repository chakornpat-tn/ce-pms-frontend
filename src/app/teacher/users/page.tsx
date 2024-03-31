import React from 'react'

type Props = {}

function page({}: Props) {
  return (
    <div className="flex min-h-svh justify-center ">
      <article className="h-full w-4/5   p-8">
        <h1 className="text-3xl font-bold text-primary1">จัดการบัญชีผู้ใช้</h1>
        {/* ---------------------------------------------Search Option--------------------------------------------- */}

        {/* ---------------------------------------------Users List------------------------------------------------ */}

        <div className="relative mt-4 overflow-x-auto p-4 shadow-md sm:rounded-lg">
          <table className="w-full text-left text-sm ">
            <thead className="bg-white text-xs uppercase text-primary1  ">
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
              <tr className="border-b border-t-2 bg-white  hover:bg-slate-100">
                <td
                  scope="row"
                  className="whitespace-nowrap px-6 py-4 text-base text-primary1"
                >
                  นายไปเกาหลี ไปกินเกาเหลา
                </td>
                <td className="px-6 py-4  text-base text-primary1">username</td>
                <td className="px-6 py-4  text-base text-primary1">ทั่วไป</td>
                <td className="px-6 py-4 text-right text-base text-primary1">
                  <a
                    href="#"
                    className="font-medium text-blue-600 hover:underline "
                  >
                    Edit
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  )
}

export default page
