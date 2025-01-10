'use server'

import { ListProjectStatusRequest, ProjectStatus } from '@/models/ProjectStatus'
import fetchAPI from '@/utils/useAPI'
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
    const res = await fetchAPI<{ data: ProjectStatus[] }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
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


    await fetchAPI('/v1/project-status', {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
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
    await fetchAPI('/v1/project-status/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      },
    })
  } catch (error) {
    throw error
  }
}
