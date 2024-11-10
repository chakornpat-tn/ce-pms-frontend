'use server'
import Link from 'next/link'
import { Login } from '@mui/icons-material'
import { cookies } from 'next/headers'

const Cookie = await cookies()
const token = Cookie.get('token')

const Navbar = () => {
  return (
    <div className="py-auto navbar justify-between bg-white shadow-md">
      <div className="flex-none"></div>
      <div className="flex flex-1 justify-center">
        <a className="btn btn-ghost text-xl">Project Management System</a>
      </div>
      {token ? (
        <Link href={'/teacher'}>
          <button className="btn btn-square btn-ghost">
            <Login className="h-5 w-5" />
          </button>
        </Link>
      ) : (
        <Link href={'/login'}>
          <button className="btn btn-square btn-ghost">
            <Login className="h-5 w-5" />
          </button>
        </Link>
      )}
    </div>
  )
}

export default Navbar
