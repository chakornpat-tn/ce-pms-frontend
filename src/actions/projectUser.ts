'use server'

import config from '@/config'
import { ListProjectFilterQuery, ProjectRes } from '@/models/Project'
import useAPI from '@/utils/useAPI'
import { jwtVerify } from 'jose'
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
        'Content-Type': 'application/json'
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export async function ListProjectByUserID(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project-user/${Number(payload.id)}?${queryParams.toString()}`

    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json'
      },
    })

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}
