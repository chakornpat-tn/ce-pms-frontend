'use client'

export const GetDateTime = () => {
  if (typeof window !== 'undefined') return
  const nowDate = new Date()
  return nowDate
}
