'use server'

import Project from '@/app/teacher/present/project/page'
import config from '@/config'
import { Document } from '@/models/Document'
import {
  ProjectDocsAdvisorApproveRes,
  ProjectDocument,
  ProjectDocumentRes,
  ProjectDocumentWaitUpdateRes,
} from '@/models/ProjectDocument'
import useAPI from '@/utils/useAPI'
import { jwtVerify } from 'jose'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function ListProjectDocs(projectId: number, documentId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }
    const res = await useAPI<{ data: ProjectDocumentRes[] }>(
      `/v1/project-document?projectId=${projectId}&documentId=${documentId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      },
    )
    return res.data
  } catch (error) {
    throw error
  }
}
export async function CreateProjectDocs(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const projectId = formData.get('projectId')
    const documentId = formData.get('documentId')
    const documentName = formData.get('documentName')
    const document = formData.get('document') as File

    const form = new FormData()
    form.append('document', document)
    form.append(
      'data',
      JSON.stringify({
        projectId: Number(projectId),
        documentId: Number(documentId),
        documentName: documentName as string,
      }),
    )

    if (formData.getAll('selectedComments').length > 0) {
      form.append('commentIDs', formData.getAll('selectedComments').join(','))
    }

    await useAPI('/v1/project-document', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: form,
    })
    revalidatePath('/')
    return
  } catch (error) {
    throw error
  }
}

export async function UpdateProjectDocStatus(
  documentId: number,
  status: number,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const form = new FormData()
    form.append(
      'data',
      JSON.stringify({
        status,
      }),
    )

    await useAPI(`/v1/project-document/${documentId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: form,
    })
    revalidatePath('/')
    return
  } catch (error) {
    throw error
  }
}

export async function ListProjectDocsApprove(projectId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }
    const res = await useAPI<{
      data: {
        preProject: ProjectDocsAdvisorApproveRes[]
        project: ProjectDocsAdvisorApproveRes[]
      }
    }>(`/v1/project-document/advisor-approve/${projectId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export async function ListLastProjectDocsStatus(
  projectId: number,
  course: number,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }
    const res = await useAPI<{
      data: ProjectDocument[]
    }>(`/v1/project-document/project-docs-status/${projectId}/${course}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.value}`,
      },
    })
    return res.data
  } catch (error) {
    throw error
  }
}

export async function ListProjectDocsWaitUpdate() {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const res = await useAPI<{ data: ProjectDocumentWaitUpdateRes[] }>(
      `/v1/project-document/wait-update/${payload.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return res.data
  } catch (error) {
    throw error
  }
}
