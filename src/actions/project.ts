'use server'

import { ListProjectFilterQuery, ProjectRes } from '@/models/Project'
import useAPI from '@/utils/useAPI'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
export async function ListProjects(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)

    const url = `/v1/project?${queryParams.toString()}`
    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}
export async function deleteProject(projectId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    await useAPI('/v1/project/' + projectId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })

    revalidatePath('/')
    return
  } catch (error) {
    return error
  }
}