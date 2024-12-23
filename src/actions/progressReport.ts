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

    const productFile = formData.get('product_file') as File | null
    const docsFile = formData.get('docs_file') as File | null
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
      title: 'ทดสอบรายงาน',
      projectId: Number(payload.id),
    }
    const form = new FormData()
    if (productFile) form.append('productFile', productFile)

    if (docsFile) form.append('docsFile', docsFile)

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
