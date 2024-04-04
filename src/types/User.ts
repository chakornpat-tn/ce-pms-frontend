export type User = {
  _id: string
  name: string
  username: string
  role: number
}

// type UserRole = 'อาจารย์โครงงาน' | 'อาจารย์เตรียมโครงงาน' | 'อาจารย์ทั่วไป'

export function getUserRole(role: number): string {
  switch (role) {
    case 1:
      return 'อาจารย์โครงงาน'
    case 2:
      return 'อาจารย์เตรียมโครงงาน'
    case 3:
      return 'อาจารย์ทั่วไป'
    default:
      throw new Error('Invalid role number')
  }
}
