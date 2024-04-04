'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

type Props = {}

function UserModalForm({}: Props) {
  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const InputForm = () => (
    <form className="p-4">
      <div className="mb-4 flex">
        <div className="mr-2 w-1/2">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            ชื่อ
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
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
          />
        </div>
      </div>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="mb-2 block text-sm font-medium text-primary1"
        >
          ชื่อผู้ใช้
        </label>
        <input
          type="text"
          name="username"
          id="username"
          className="w-full rounded-lg border border-gray-300 p-2"
          required
        />
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
          required
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-primary1">
          ตำแหน่งอาจารย์
        </label>
        <div className="mb-2 flex items-center justify-around">
          <input
            type="radio"
            id="manager"
            name="position"
            value="manager"
            className="mr-1"
            required
          />
          <label htmlFor="manager" className="text-md mr-4">
            ทั่วไป
          </label>

          <input
            type="radio"
            id="supervisor"
            name="position"
            value="supervisor"
            className="mr-1"
            required
          />
          <label htmlFor="supervisor" className="text-md mr-4">
            เตรียมโครงงาน
          </label>

          <input
            type="radio"
            id="employee"
            name="position"
            value="employee"
            className="mr-1"
            required
          />
          <label htmlFor="employee" className="text-md mr-4">
            โครงงาน
          </label>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          type="submit"
          className=" mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
        >
          สร้างบัญชีผู้ใช้
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

  return (
    <>
      <button
        type="button"
        className=" my-2 scale-100 rounded-md bg-primary2-400 px-2 py-3 text-secondary1 shadow-md transition hover:bg-primary2-500 focus:scale-90"
        onClick={openModal}
      >
        เพิ่มบัญชีผู้ใช้
      </button>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                    สร้างบัญชีผู้ใช้
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

export { UserModalForm }
