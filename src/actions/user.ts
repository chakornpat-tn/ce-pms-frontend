'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { UserQueryRequest, ResListUser, User } from '@/models/User'
import { cookies } from 'next/headers'
import useAPI from '@/utils/useAPI'

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

    const res = await useAPI<{ message: string }>('/v1/user', {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (res) {
      return { message: 'สร้างผู้ใช้เสร็จสิ้น' }
    }
  } catch (error) {
    return { error: 'เกิดข้อ' }
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

    const res = await useAPI('/v1/user/' + id, {
      method: 'PUT',
      body: JSON.stringify(userData),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    revalidatePath('/')
    return { message: 'แก้ไขผู้ใช้เสร็จสิ้น' }
  } catch (error) {
    return error
  }
}
export async function deleteUser(userId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    await useAPI('/v1/user/' + userId, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    revalidatePath('/')
    return
  } catch (error) {
    return error
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

    const res = await useAPI<{ data: ResListUser }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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

    const res = await useAPI<{ data: User }>(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.data
  } catch (error) {
    return error
  }
}
