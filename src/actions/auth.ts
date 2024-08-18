'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type FormState = {
  message: string
}

export async function login(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
  const username = formData.get('username')
  const password = formData.get('password')
  const asTeacherLogin = Boolean(formData.get('asTeacherLogin'))

  const res = await fetch(apiUrl + '/v1/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, asTeacherLogin }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status === 200) {
    const response = await res.json()
    const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
    cookies().set('session', response.token, { expires, httpOnly: true })

    if (asTeacherLogin) {
      redirect('/teacher')
    } else {
      redirect('/project')
    }
  } else {
    return {
      message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
    }
  }
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) })
}
