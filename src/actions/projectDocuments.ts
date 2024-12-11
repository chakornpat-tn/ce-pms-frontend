'use server'

import { ProjectDocument, ProjectDocumentRes } from '@/models/ProjectDocument'
import useAPI from '@/utils/useAPI'
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