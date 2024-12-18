'use client'
import { GetProject, updateProject } from '@/actions/project'
import { Project } from '@/models/Project'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'

export default function UpdateProjectPage() {
  const params = useParams()
  const projectId = Number(params.id)
  const router = useRouter()

  const fetchProject = async (projectId: number) => {
    const res = await GetProject(projectId)
    return res as Project
  }

  const { data, error, isLoading } = useSWR(
    projectId ? `/v1/project?${projectId}` : null,
    () => fetchProject(projectId),
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
    const password = formData.get('password') as string
    console.log(password)
    if (password !== '') {
      await updateProject(formData)
      router.back()
    }
  }

  return (
    <div className="min-h-svh p-4">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-primary1">
        แก้ไขโปรเจกต์ {data.projectName}
      </h1>
      <p className="mb-4 text-sm text-gray-600">ชื่อผู้ใช้: {data.username}</p>

      <form className="p-4" action={handleSubmit}>
        <input type="hidden" name="id" value={projectId} />

        <div className="mb-4">
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
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>

        <div className="flex items-center justify-around">
          <button
            type="submit"
            className="mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
          >
            อัพเดท
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
