'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useActionState } from 'react'
import { studentlogin, login } from '@/actions/auth'
import { useState } from 'react'
import { Loader } from '@/components/Loading'

export default function LoginPage() {
  const [isTeacher, setIsTeacher] = useState(false)

  const initState = {
    message: '',
  }

  const [studentState, studentFormAction, studentLoginPending] = useActionState(
    studentlogin,
    initState,
  )
  const [teacherState, teacherFormAction, teacherLoginPending] = useActionState(
    login,
    initState,
  )

  const currentState = isTeacher ? teacherState : studentState
  const currentFormAction = isTeacher ? teacherFormAction : studentFormAction

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const form = e.currentTarget.closest('form')
      if (form) {
        form.requestSubmit()
      }
    }
  }

  const handleSubmit = async (formData: FormData) => {
    currentFormAction(formData)
  }

  return (
    <section
      className={`h-dvh ${isTeacher ? 'bg-secondary2-200' : 'bg-primary2-500'} transition-colors duration-300 max-sm:grid max-sm:justify-center`}
    >
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="grid justify-center">
          <Image
            src={isTeacher ? '/Images/Teacher.png' : '/Images/Student.png'}
            alt={isTeacher ? 'อาจารย์' : 'นักศึกษา'}
            width="124"
            height="124"
            className={`z-10 m-0 rounded-full p-0 ${
              isTeacher ? 'bg-primary2-400' : 'bg-secondary2-100'
            } transition-colors duration-300`}
          />
        </div>

        <div className="relative bottom-12 w-full rounded-md bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <div className="mt-6 grid justify-center text-lg leading-tight tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
              {/* Toggle Switch */}

              <div className="flex w-full gap-4 rounded-md bg-white p-2 shadow">
                <button
                  onClick={() => setIsTeacher(false)}
                  className={`rounded-md px-4 py-2 transition-colors ${
                    !isTeacher
                      ? 'bg-primary2-400 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  นักศึกษา
                </button>
                <button
                  onClick={() => setIsTeacher(true)}
                  className={`rounded-md px-4 py-2 transition-colors ${
                    isTeacher
                      ? 'bg-primary2-400 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  อาจารย์
                </button>
              </div>
            </div>

            <form className="space-y-2 md:space-y-4" action={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  placeholder="ชื่อผู้ใช้"
                  required
                  onKeyDown={handleKeyPress}
                />
              </div>
              <div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="รหัสผ่าน"
                  className="block w-full rounded-md border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm"
                  onKeyDown={handleKeyPress}
                />
                <input
                  type="hidden"
                  name="asTeacherLogin"
                  value={isTeacher ? 'true' : ''}
                />
              </div>

              {currentState.message && (
                <p className="text-red-500">{currentState.message}</p>
              )}

              <button
                type="submit"
                disabled={studentLoginPending || teacherLoginPending}
                className="focus:ring-primary-300 w-full rounded-md bg-primary2-400 px max-h-[25px]-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary2-500 focus:outline-none focus:ring-4"
             
              >
                {studentLoginPending || teacherLoginPending ? (
                  <div>
                    <Loader />
                  </div>
                ) : (
                  'เข้าสู่ระบบ'
                )}
              </button>

              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline"
                >
                  กลับหน้าแรก
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
