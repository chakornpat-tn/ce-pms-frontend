'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UserQueryRequest, ResListUser } from '@/models/User'
import { cookies } from 'next/headers'
import useAPI from '@/utils/useAPI'

type FormState = {
  message: string
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

export async function createUser(prevState: FormState, formData: FormData) {
  const name = `${formData.get('firstName')} ${formData.get('lastName')}`
  const username = String(formData.get('username'))
  const password = String(formData.get('password'))
  const role = Number(formData.get('role'))

  const usernameRegex = /^[a-zA-Z0-9_-]*$/

  if (!usernameRegex.test(username)) {
    return {
      message: '* ไม่สามารถกรอกภาษาไทยหรืออักขระพิเศษได้',
    }
  }

  const userData = {
    name,
    username,
    password,
    role,
  }

  const res = await useAPI<{ message: string }>(
    '/v1/user',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' },
    },
  )


  if (res.message === '* ชื่อผู้ใช้ซ้ำในระบบ') {
    return {
      message: '* ชื่อผู้ใช้ซ้ำในระบบ',
    }
  }

  return {
    message: '* สร้างบัญชีผู้เสร็จสิ้น',
  }
}

export async function updateUser(formData: FormData) {
  const id = formData.get('id')
  const name = `${formData.get('firstName')} ${formData.get('lastName')}`
  const password = formData.get('password')
  const role = Number(formData.get('role'))

  const passwordToSend = password === '' ? undefined : password

  const userData = {
    name,
    ...(passwordToSend && { password: passwordToSend }),
    role,
  }

  const res = await useAPI('/v1/user/' + id, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res) {
    revalidatePath('/teacher/users')
    redirect('/teacher/users')
  }

  return {
    message: '* ไม่สามารถอัพเดทบัญชีผู้ใช้ได้',
  }
}

export async function deleteUser(userId: number) {
  await useAPI('/v1/user/' + userId, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return
}

export async function listUser(req?: UserQueryRequest): Promise<ResListUser> {
  const Cookie = await cookies()
  const token = Cookie.get('token')

  const queryParams = new URLSearchParams()
  if (req?.name) queryParams.append('search', req.name)
  if (req?.role) queryParams.append('role', req.role.toString())
  if (req?.page) queryParams.append('page', req.page.toString())
  if (req?.perPage) queryParams.append('perPage', req.perPage.toString())

  const url = `/v1/user?${queryParams.toString()}`

  const res = await useAPI<{ data: ResListUser }>(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return res.data
}
