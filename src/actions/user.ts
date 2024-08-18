'use server'

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

  const res = await fetch(apiUrl + '/v1/user', {
    method: 'POST',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status != 201) {
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

  const res = await fetch(apiUrl + '/v1/user/' + id, {
    method: 'PUT',
    body: JSON.stringify(userData),
    headers: { 'Content-Type': 'application/json' },
  })

  if (res.status != 201) {
    return {
      message: '* ไม่สามารถอัพเดทบัญชีผู้ใช้ได้',
    }
  }

  return
}

export async function deleteUser(userId: string) {
  await fetch(apiUrl + '/v1/user/' + userId, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return
}
