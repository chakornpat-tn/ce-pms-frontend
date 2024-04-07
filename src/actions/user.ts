'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

type FormState = {
  message: string
}

export async function createUser(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.API_URL || ''

  const name = `${formData.get('firstName')} ${formData.get('lastName')}`
  const username = formData.get('username')
  const password = formData.get('password')
  const role = Number(formData.get('role'))

  const userData = {
    name,
    username,
    password,
    role,
  }
  console.log(userData)
  //   const res = await fetch(apiUrl + '/auth/login', {
  //     method: 'POST',
  //     body: JSON.stringify({ username, password }),
  //     headers: { 'Content-Type': 'application/json' },
  //   })

  //   if (res.status == 200) {
  //     const response = await res.json()
  //     cookies().set('token', response.token, { maxAge: 3 * 60 * 60 })
  //     redirect('/teacher')
  //   }

  return {
    message: '',
  }
}
