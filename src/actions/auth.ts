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

  console.log(username, password, asTeacherLogin)
  const res = await fetch(apiUrl + '/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password, asTeacherLogin }),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status == 200) {
    const response = await res.json()
    cookies().set('token', response.token, { maxAge: 3 * 60 * 60 })
    if (asTeacherLogin) redirect('/teacher')
    else redirect('/project')
  }

  return {
    message: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  }
}
