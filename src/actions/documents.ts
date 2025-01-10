'use server'

import { ListDocumentRequest } from '@/models/Document'
import { Document } from '@/models/Document'
import fetchAPI from '@/utils/useAPI'
import { cookies } from 'next/headers'

export async function ListDocument(req: ListDocumentRequest) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (req?.course) queryParams.append('course', req.course.toString())
    if (req?.search) queryParams.append('search', req.search)
    if (req?.isActive !== undefined)
      queryParams.append('isActive', req.isActive.toString())
    if (req?.submissionOpen !== undefined)
      queryParams.append('submissionOpen', req.submissionOpen.toString())

    const url = `/v1/document?${queryParams.toString()}`
    const res = await fetchAPI<{ data: Document[] }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}
export async function ListDocumentInProject(projectID: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const res = await fetchAPI<{ data: Document[] }>(
      `/v1/document/in-project/${projectID}`,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          'Content-Type': 'application/json',
        },
      },
    )
    return res.data
  } catch (error) {
    throw error
  }
}
export async function UpdateDocument(req: Document[]) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    await fetchAPI('/v1/document', {
      method: 'PUT',
      body: JSON.stringify(req),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}

export async function DeleteDocument(id: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    await fetchAPI('/v1/document/' + id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    throw error
  }
}
