'use server'

type FormState = {
  message: string
}

export async function createUser(prevState: FormState, formData: FormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

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

  const res = await fetch(apiUrl + '/admin/users', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status != 200) {
    return {
      message: 'ชื่อผู้ใช้ซ้ำในระบบ',
    }
  }

  return {
    message: '',
  }
}

export async function updateUser(formData: FormData) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''

  const name = `${formData.get('firstName')} ${formData.get('lastName')}`
  const password = formData.get('password')
  const role = Number(formData.get('role'))

  const passwordToSend = password === '' ? undefined : password

  const userData = {
    name,
    ...(passwordToSend && { password: passwordToSend }),
    role,
  }

  // const res = await fetch(apiUrl + '/admin/users', {
  //   method: 'POST',
  //   body: JSON.stringify(userData),
  //   headers: { 'Content-Type': 'application/json' },
  // })

  // if (res.status != 200) {
  //   return {
  //     message: 'ชื่อผู้ใช้ซ้ำในระบบ',
  //   }
  // }

  return {
    message: '',
  }
}
