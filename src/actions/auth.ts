'use server'

import { jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import config from '@/config'

const Cookies = await cookies()

type FormState = {
  message: string
}

export async function login(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const username = formData.get('username')
  const password = formData.get('password')

  const res = await fetch(apiUrl + '/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status === 200) {
    const response = await res.json()
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    Cookies.set('token', response.data.token, {
      expires,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    redirect('/teacher')
  } else {
    return {
      message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    }
  }
}

export async function studentlogin(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const username = formData.get('username')
  const password = formData.get('password')
  const bodyData = password ? { username, password } : { username }

  const res = await fetch(apiUrl + '/v1/auth/login/project', {
    method: 'POST',
    body: JSON.stringify(bodyData),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status === 200) {
    const response = await res.json()
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    Cookies.set('token', response.data.token, {
      expires,
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
    })

    if (response.data.token) {
      const secret = new TextEncoder().encode(config.TOKEN_SECRET)
      const { payload } = await jwtVerify(response.data.token, secret)
      if (!payload.id) {
        throw new Error('Token payload is invalid or missing user ID.')
      }

      if (payload.firstLogin) {
        redirect('/project/change-password')
      }
    }
    redirect('/project')
  } else {
    return {
      message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    }
  }
}

export async function logout() {
  Cookies.set('token', '', { expires: new Date(0) })
}
