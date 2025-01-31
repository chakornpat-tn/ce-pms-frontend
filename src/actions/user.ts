'use server'
import { revalidatePath } from 'next/cache'
import { UserQueryRequest, ResListUser, User } from '@/models/User'
import { cookies } from 'next/headers'
import config from '@/config'
import fetchAPI from '@/utils/useAPI'
import { jwtVerify } from 'jose'

export async function createUser(previousState: unknown, formData: FormData) {
  try {
    const name = `${formData.get('firstName')} ${formData.get('lastName')}`
    const username = String(formData.get('username'))
    const password = String(formData.get('password'))
    const role = Number(formData.get('role'))

    const usernameRegex = /^[a-zA-Z0-9_-]*$/

    if (!usernameRegex.test(username)) {
      return { error: 'usernameไม่ถูกต้อง' }
    }

    const userData = {
      name,
      username,
      password,
      role,
    }

    const Cookie = await cookies()
    const token = Cookie.get('token')

    const res = await fetchAPI<{ message: string }>('/v1/user', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/teacher/users')
    if (res) {
      return { message: 'สร้างผู้ใช้เสร็จสิ้น' }
    }
  } catch (error) {
    return { error: 'เกิดข้อผิดพลาด' }
  }
}

export async function updateUser(formData: FormData) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

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

    const res = await fetchAPI('/v1/user/' + id, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/teacher/users')
    return { message: 'แก้ไขผู้ใช้เสร็จสิ้น' }
  } catch (error) {
    return error
  }
}
export async function changePassword(formData: FormData) {
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

    const password = formData.get('password')
    const userData = { password }

    const res = await fetchAPI('/v1/user/' + payload.id, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/')

    return { success: true, message: 'เปลี่ยนรหัสผ่านสำเร็จ' }
  } catch (error) {
    // Ensure a consistent response structure
    return {
      success: false,
      error: error instanceof Error ? error.message : 'เกิดข้อผิดพลาด ',
    }
  }
}

export async function deleteUser(userId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }
    await fetchAPI(`/v1/user/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/')
  } catch (error) {
    console.log(error)
    throw error
  }
}
export async function listUser(req?: UserQueryRequest) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (req?.name) queryParams.append('search', req.name)
    if (req?.role) queryParams.append('role', req.role.toString())
    if (req?.page) queryParams.append('page', req.page.toString())
    if (req?.perPage) queryParams.append('perPage', req.perPage.toString())

    const url = `/v1/user?${queryParams.toString()}`

    const res = await fetchAPI<{ data: ResListUser }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    return error
  }
}

export async function GetUser(Id: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    const url = `/v1/user/${Id}`

    const res = await fetchAPI<{ data: User }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    return error
  }
}
