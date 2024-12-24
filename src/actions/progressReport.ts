'use server'

import config from '@/config'
import { ProgressReport } from '@/models/ProgressReport'
import useAPI from '@/utils/useAPI'
import { jwtVerify } from 'jose'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

export async function ListProgressReportFormToken() {
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

    const res = await useAPI<{ data: ProgressReport[] }>(
      `/v1/progress-report?projectId=${payload.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    )

    return res.data
  } catch (error) {
    throw error
  }
}

export async function ListProgressReport(projectId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const res = await useAPI<{ data: ProgressReport[] }>(
      `/v1/progress-report?projectId=${projectId}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    )

    return res.data
  } catch (error) {
    throw error
  }
}

export async function GetProgressReportById(id: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const res = await useAPI<{ data: ProgressReport }>(
      `/v1/progress-report/${id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    )

    return res.data
  } catch (error) {
    throw error
  }
}

export async function UpdateProgressReport(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }
    const progressId = Number(formData.get('id'))
    const data: any = {}

    if (formData.get('comment')) {
      data.reportResult = {
        comment: formData.get('comment'),
        questionSections: {},
      }

      if (formData.get('question0')) {
        data.reportResult.questionSections['question0'] = Number(
          formData.get('question0'),
        )
      }
      if (formData.get('question1')) {
        data.reportResult.questionSections['question1'] = Number(
          formData.get('question1'),
        )
      }
      if (formData.get('question2')) {
        data.reportResult.questionSections['question2'] = Number(
          formData.get('question2'),
        )
      }
      if (formData.get('question3')) {
        data.reportResult.questionSections['question3'] = Number(
          formData.get('question3'),
        )
      }
    }

    if (formData.get('product_progress')) {
      data.productProgress = Number(formData.get('product_progress'))
    }
    if (formData.get('docs_progress')) {
      data.docsProgress = Number(formData.get('docs_progress'))
    }
    if (formData.get('status')) {
      data.status = Number(formData.get('status'))
    }

    const form = new FormData()
    form.append('data', JSON.stringify(data))
    const url = `/v1/progress-report/${progressId}`
    await useAPI(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: form,
    })

    revalidatePath('/')
  } catch (error) {
    throw error
  }
}

export async function changeProgressReportStatus(id: number, status: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    let data: { status: number } = {
      status: status
    }
   
    const form = new FormData()
    form.append('data', JSON.stringify(data))
    const url = `/v1/progress-report/${id}`
    await useAPI(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: form,
    })
    revalidatePath('/')
  } catch (error) {
    throw error
  }
}
export async function CreateProgressReport(
  prevState: unknown,
  formData: FormData,
) {
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

    const productFile = formData.get('product_file') as File || null
    const docsFile = formData.get('docs_file') as File || null    
    const data = {
      report: {
        section1: formData.get('section-1'),
        section2: formData.get('section-2'),
        section3: formData.get('section-3'),
        documentSections: [
          {
            id: 'บทคัดย่อ / ปก / สารบัญ และอื่น',
            percent: formData.get('progress-1'),
          },
          {
            id: 'บทที่ 1',
            percent: formData.get('progress-2'),
          },
          {
            id: 'บทที่ 2',
            percent: formData.get('progress-3'),
          },
          {
            id: 'บทที่ 3',
            percent: formData.get('progress-4'),
          },
          {
            id: 'บทที่ 4',
            percent: formData.get('progress-5'),
          },
          {
            id: 'บทที่ 5',
            percent: formData.get('progress-6'),
          },
          {
            id: 'ภาคผนวก และ อื่นๆ',
            percent: formData.get('progress-7'),
          },
        ],
        productProgress: formData.get('product-progress'),
      },
      title: formData.get('title'),
      projectId: Number(payload.id),
    }
    const form = new FormData()
    if (productFile && productFile.size > 0) form.append('productFile', productFile)

    if (docsFile && docsFile.size > 0) form.append('docsFile', docsFile)
    form.append('data', JSON.stringify(data))

    await useAPI('/v1/progress-report', {
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
