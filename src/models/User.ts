export type User = {
  id: number
  name: string
  username: string
  password: string
  role: number
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
}

export type UserQueryRequest = {
  name?: string
  role?: number
  page?: number
  perPage?: number
}

export type ResListUser = {
  users: User[]
  totalCount: number
}

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
