'use client'

import { useState } from 'react'
// import { changePassword } from '@/actions/user'

type Props = {
  userId: number
}

const Page = ({ userId }: Props) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
      return
    }

    const formData = new FormData()
    formData.append('password', password)

    // const response = await changePassword(formData)
    // if (response.error) {
    //   setMessage(response.error)
    // } else {
    //   setMessage('Password changed successfully')
    // }
  }

  return (
    <>
      <div className="mb-2 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-4xl font-bold text-primary1">เปลี่ยนรหัสผ่าน</h1>
      </div>
      <div className="block rounded-lg border border-gray-200 p-8">
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              className="w-full rounded-lg border border-gray-300 p-2"
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
              className="w-full rounded-lg border border-gray-300 p-2"
              required
            />
          </div>
          {message && <p className="text-sm text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full rounded-lg bg-primary2-400 p-2 text-secondary1 shadow-md transition duration-200 hover:bg-primary2-500"
          >
            เปลี่ยนรหัสผ่าน
          </button>
        </form>
      </div>
    </>
  )
}

export default Page
