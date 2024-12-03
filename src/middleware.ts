import { NextResponse, NextRequest } from 'next/server'
import { jwtVerify } from 'jose'
import config2 from './config'
import userRoles from './constants/userRoles/userRoles'

export async function middleware(request: NextRequest) {
  const TeacherRole = [
    userRoles.Teacher,
    userRoles.preProjectTeacher,
    userRoles.ProjectTeacher,
  ]

  try {
    const token = request.cookies.get('token')

    if (!token?.value) {
      return handleNoToken(request)
    }

    const secret = new TextEncoder().encode(config2.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (isTokenExpired(payload)) {
      return handleExpiredToken(request)
    }

    const pathname = request.nextUrl.pathname

    if (isUnauthorizedTeacherRole(payload, pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (isUnauthorizedProjectAccess(payload, pathname)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    if (TeacherAccess(payload, pathname)) {
      return NextResponse.redirect(new URL('/teacher', request.url))
    }

    if (pathname.startsWith('/login')) {
      if (payload.role === userRoles.Student)
        NextResponse.redirect(new URL('/project', request.url))
      if (TeacherRole.includes(payload.role as number))
        NextResponse.redirect(new URL('/teacher', request.url))
      return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

function handleNoToken(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/login', request.url))
}

function isTokenExpired(payload: any): boolean {
  return payload.exp && payload.exp * 1000 < Date.now()
}

function handleExpiredToken(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login', request.url))
  response.cookies.delete('token')
  return response
}

function TeacherAccess(payload: any, pathname: string): boolean {
  return (
    payload.role === userRoles.Teacher &&
    ['/teacher/users', '/teacher/docs', '/teacher/status'].some(
      restrictedPath => pathname.startsWith(restrictedPath),
    )
  )
}

function isUnauthorizedTeacherRole(payload: any, pathname: string): boolean {
  const TeacherRole = [
    userRoles.Teacher,
    userRoles.preProjectTeacher,
    userRoles.ProjectTeacher,
  ]

  return (
    pathname.startsWith('/teacher') &&
    !TeacherRole.includes(payload.role as number)
  )
}

function isUnauthorizedProjectAccess(payload: any, pathname: string): boolean {
  return (
    pathname.startsWith('/project') &&
    (payload.role as number) !== userRoles.Student
  )
}

export const config = {
  matcher: ['/teacher/:path*', '/project/:path*', '/login/:path*'],
}
