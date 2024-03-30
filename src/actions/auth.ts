'use server'

import { cookies } from 'next/headers'

type FormState = {
  message: string
}

export async function login(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.API_URL || ''
  const username = formData.get('username')
  const password = formData.get('password')
  const res = await fetch(apiUrl + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status == 200) {
    const response = await res.json()
    cookies().set('token', response.token, { maxAge: 3 * 60 * 60 })
    return {
      message: '',
    }
  }

  return {
    message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  }
}
