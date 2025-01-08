'use server'

import useAPI from '@/utils/useAPI'
import { Comment, CreateCommentReq } from '@/models/Comment'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

export async function ListComment(
  projectId?: number,
  documentId?: number,
): Promise<Comment[]> {
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

export async function CreateComments(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const comments = []
    let index = 0
    while (formData.get(`comments[${index}].content`)) {
      comments.push({
        content: formData.get(`comments[${index}].content`)?.toString() || '',
        projectDocumentId: Number(
          formData.get(`comments[${index}].projectDocumentId`),
        ),
      })
      index++
    }

    const Cookie = await cookies()
    const token = Cookie.get('token')

    let commentReq: CreateCommentReq[] = []

    if (comments.length > 0) {
      commentReq = comments.map(comment => ({
        content: comment.content,
        projectDocumentId: Number(comment.projectDocumentId),
      }))
    }

    if (commentReq.length > 0) {
      await useAPI('/v1/comment', {
        method: 'POST',
        body: JSON.stringify(commentReq),
        headers: {
          Authorization: `Bearer ${token?.value}`,
          'Content-Type': 'application/json',
        },
      })
    }

    revalidatePath('/')
  } catch (error) {
    return 'เกิดข้อผิดพลาดในการสร้างโครงงาน'
  }
}
