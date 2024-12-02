'use server'

import { ListProjectStatusRequest, ProjectStatus } from '@/models/ProjectStatus'
import useAPI from '@/utils/useAPI'
import { cookies } from 'next/headers'

export async function ListProjectStatus(req: ListProjectStatusRequest) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (req?.course) queryParams.append('course', req.course.toString())
    if (req?.search) queryParams.append('search', req.search)
    if (req?.isActive !== undefined)
      queryParams.append('isActive', req.isActive.toString())

    const url = `/v1/project-status?${queryParams.toString()}`
    const res = await useAPI<{ data: ProjectStatus[] }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export async function UpdateProjectStatus(req: ProjectStatus[]) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')


    await useAPI('/v1/project-status', {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
  } catch (error) {
    throw error
  }
}

export async function DeleteProjectStatus(id: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    await useAPI('/v1/project-status/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    })
  } catch (error) {
    throw error
  }
}
