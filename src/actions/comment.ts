'use server'

import useAPI from "@/utils/useAPI"
import { Comment } from "@/models/Comment"
import { cookies } from "next/headers"

export async function ListComment(projectId?:number, documentId?:number):Promise<Comment[]> {
     try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (projectId) {
      queryParams.append('projectId', projectId.toString())
    }
    if (documentId) {
      queryParams.append('documentId', documentId.toString())
    }

    const url = `/v1/comment/get-by-project-document-id?${queryParams.toString()}`
    const res = await useAPI<{ data: Comment[] }>(url, {
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