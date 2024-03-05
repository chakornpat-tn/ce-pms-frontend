import Link from 'next/link'
import Image from 'next/image'

type Props = {}

function page({}: Props) {
  return (
    <section className="bg-secondary2-200 h-dvh max-sm:grid max-sm:justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="grid justify-center">
          <Image
            src="/Images/Teacher.png"
            alt="อาจารย์"
            width="124"
            height="124"
            className=" bg-primary2-400 rounded-full m-0 p-0 z-10"
          />
        </div>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 relative bottom-12">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className=" text-xl sm:text-3xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 grid justify-center mt-6">
              สำหรับอาจารย์
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  type="text"
                  name="ชื่อผู้ใช้"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  "
                  placeholder="ชื่อผู้ใช้"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="รหัสผ่าน"
                  id="password"
                  placeholder="รหัสผ่าน"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium  hover:underline text-gray-500  hover:text-gray-700"
                >
                  กลับหน้าแรก
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium hover:underline text-gray-500 hover:text-gray-700"
                >
                  เปลี่ยนรหัสผ่าน
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary2-400 hover:bg-primary2-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default page
