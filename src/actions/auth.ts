'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import config from '@/config'
import fetchAPI from '@/utils/useAPI'

// const Cookies = await cookies()

export async function login(prevState: unknown, formData: FormData) {
  const cookieStore = await cookies()
  const username = formData.get('username')
  const password = formData.get('password')
  try {
    const { data } = await fetchAPI<{ data: { token: string } }>(
      '/v1/auth/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    cookieStore.set('token', data.token, {
      expires,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })
  } catch (error) {
    cookieStore.set('token', '', { expires: new Date(0) })
    return {
      message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    }
  }

  redirect('/teacher')
}

export async function studentLogin(prevState: unknown, formData: FormData) {
  const username = formData.get('username')
  const password = formData.get('password')
  const bodyData = password ? { username, password } : { username }
  const cookieStore = await cookies()
  let token: string

  try {
    const { data } = await fetchAPI<{ data: { token: string } }>(
      '/v1/auth/login/project',
      {
        method: 'POST',
        body: JSON.stringify(bodyData),
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    cookieStore.set('token', data.token, {
      expires,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    token = data.token
  } catch (error) {
    cookieStore.set('token', '', { expires: new Date(0) })
    return {
      message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    }
  }
  const secret = new TextEncoder().encode(config.TOKEN_SECRET)
  const { payload } = await jwtVerify(token, secret)
  if (payload.firstLogin) redirect('/project/change-password')

  redirect('/project')
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', { expires: new Date(0) })
}
