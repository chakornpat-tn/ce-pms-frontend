'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { updateUser } from '@/actions/user'
import useSWR from 'swr'

type Props = {
  children: React.ReactNode
  handleClose?: () => void
  userId: string
}

function UpdateUserModalForm({ children, handleClose, userId }: Props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    handleClose ? handleClose() : null
  }

  function openModal() {
    setIsOpen(true)
  }

  const InputForm = () => (
    <form
      className="p-4"
      action={(formData: FormData) => {
        if (
          formData.get('firstName') != data?.name.split(' ')[0] ||
          formData.get('lastName') != data?.name.split(' ')[1] ||
          formData.get('role') != data?.role ||
          formData.get('password') != ''
        ) {
          updateUser(formData)
          closeModal()
        }
      }}
    >
      <div className="mb-4 flex">
        <div className="mr-2 w-1/2">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            ชื่อ
          </label>
          <input type="hidden" name="id" value={userId} />
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
            defaultValue={data?.name.split(' ')[0]}
          />
        </div>
        <div className="ml-2 w-1/2">
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            นามสกุล
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
            defaultValue={data?.name.split(' ')[1]}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-primary1"
        >
          รหัสผ่าน
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-primary1">
          ตำแหน่งอาจารย์
        </label>
        <div className="mb-2 flex items-center justify-around">
          <input
            type="radio"
            id="general"
            name="role"
            value="3"
            className="mr-1"
            required
            defaultChecked={data?.role === 3}
          />
          <label htmlFor="general" className="text-md mr-4">
            ทั่วไป
          </label>

          <input
            type="radio"
            id="pre"
            name="role"
            value="2"
            className="mr-1"
            required
            defaultChecked={data?.role === 2}
          />
          <label htmlFor="pre" className="text-md mr-4">
            เตรียมโครงงาน
          </label>

          <input
            type="radio"
            id="pro"
            name="role"
            value="1"
            className="mr-1"
            required
            defaultChecked={data?.role === 1}
          />
          <label htmlFor="pro" className="text-md mr-4">
            โครงงาน
          </label>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          type="submit"
          className=" mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
        >
          อัพเดท
        </button>
        <button
          type="button"
          onClick={closeModal}
          className=" mt-2 w-2/5 rounded-md border-2 border-red-200 bg-white px-4 py-2 text-gray-500 hover:border-red-500 hover:text-primary1"
        >
          ยกเลิก
        </button>
      </div>
    </form>
  )

  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data } = useSWR(`${apiUrl}/admin/users/${userId}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 bg-slate-500"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h1"
                    className="text-2xl font-medium leading-6 text-primary1"
                  >
                    แก้ไขบัญชีผู้ใช้ : {data?.username}
                  </Dialog.Title>
                  <InputForm />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { UpdateUserModalForm }
