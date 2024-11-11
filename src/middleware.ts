import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import config2 from './config'
import userRoles from './constants/userRoles/userRoles'

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get('token')

    if (!token?.value) {
      if (request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.next()
      } else {
        return NextResponse.redirect(new URL('/login', request.url))
      }
    }

    const secret = new TextEncoder().encode(config2.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    const pathname = request.nextUrl.pathname

    const TeacherRole = [
      userRoles.Teacher,
      userRoles.preProjectTeacher,
      userRoles.ProjectTeacher,
    ]

    if (
      pathname.startsWith('/teacher') &&
      !TeacherRole.includes(payload.role as number)
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (
      pathname.startsWith('/project') &&
      (payload.role as number) !== userRoles.Student
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/login')) {
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
export const config = {
  matcher: ['/teacher/:path*', '/project/:path*', '/login/:path*'],
}
