'use client'
import { GetUser, updateUser } from '@/actions/user'
import userRoles from '@/constants/userRoles/userRoles'
import { User } from '@/models/User'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'

export default function UpdateUserPage() {
  const params = useParams()
  const userId = Number(params.id)
  const router = useRouter()

  const fetchUser = async (userId: number) => {
    const res = await GetUser(userId)
    return res as User
  }

  const { data, error, isLoading } = useSWR(
    userId ? `/v1/user?${userId}` : null,
    () => fetchUser(userId),
  )

  const handleCancel = () => {
    router.back()
  }

  if (error) {
    handleCancel()
    return null
  }

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (formData: FormData) => {
    const role = Number(formData.get('role'))
    if (
      formData.get('firstName') !== data.name.split(' ')[0] ||
      formData.get('lastName') !== data.name.split(' ')[1] ||
      role !== data.role ||
      formData.get('password') !== ''
    ) {
      await updateUser(formData)
      router.back()
    }
  }

  return (
    <div className="min-h-svh p-4">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-primary1">
        แก้ไขบัญชีผู้ใช้ {data.username}
      </h1>

      <form className="p-4" action={handleSubmit}>
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
              className="w-full rounded-md border border-gray-300 p-2"
              required
              defaultValue={data.name.split(' ')[0]}
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
              className="w-full rounded-md border border-gray-300 p-2"
              required
              defaultValue={data.name.split(' ')[1]}
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
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-primary1">
            ตำแหน่งอาจารย์
          </label>
          <div className="mb-2 flex content-start items-center">
            <input
              type="radio"
              id="general"
              name="role"
              value="3"
              className="mr-1"
              required
              defaultChecked={data.role === userRoles.Teacher}
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
              defaultChecked={data.role === userRoles.preProjectTeacher}
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
              defaultChecked={data.role === userRoles.ProjectTeacher}
            />
            <label htmlFor="pro" className="text-md mr-4">
              โครงงาน
            </label>
          </div>
        </div>

        <div className="flex items-center justify-around">
          <button
            type="submit"
            className="mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
          >
            อัปเดต
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-2 w-2/5 rounded-md border-2 border-red-200 bg-white px-4 py-2 text-gray-500 hover:border-red-500 hover:text-primary1"
          >
            ยกเลิก
          </button>
        </div>
      </form>
    </div>
  )
}
