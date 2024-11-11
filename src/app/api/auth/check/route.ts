import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'
import config from '@/config'

export async function GET() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  try {
    if (!token) {
      return NextResponse.json({
        isAuthenticated: false,
      })
    }

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    return NextResponse.json({
      isAuthenticated: true,
      user: payload
    })
  } catch (error) {
    return NextResponse.json({
      isAuthenticated: false,
      error: 'Invalid token'
    })
  }
}