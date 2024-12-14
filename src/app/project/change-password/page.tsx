'use client'
import { useState } from 'react'
import { UpdateProjectFormToken } from '@/actions/project'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'

const Page = () => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  return (
    <>
      <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-4xl font-bold text-primary1">เปลี่ยนรหัสผ่าน</h1>
      </div>
      <div className="block rounded border border-gray-200 bg-white p-8 shadow">
        <form
          className="space-y-4"
          action={async (formData: FormData) => {
            if (password === confirmPassword) {
              await UpdateProjectFormToken('', formData)
              toast.success('อัพเดทรหัสผ่านเสร็จสิ้น')
              redirect('/project')
            }
          }}
        >
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-primary1"
            >
              รหัสผ่านใหม่
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-medium text-primary1"
            >
              ยืนยันรหัสผ่านใหม่
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full rounded bg-primary2-400 p-2 text-secondary1 shadow-md transition duration-200 hover:bg-primary2-500"
            onClick={e => {
              if (password !== confirmPassword) {
                e.preventDefault()
                toast.error('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง')
              }
            }}
          >
            เปลี่ยนรหัสผ่าน
          </button>
        </form>
      </div>
    </>
  )
}

export default Page
