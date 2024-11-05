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