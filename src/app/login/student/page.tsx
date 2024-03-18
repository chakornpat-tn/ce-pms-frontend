import Link from "next/link";
import Image from "next/image";

type Props = {};

function page({}: Props) {
  return (
    <section className="h-dvh bg-primary2-500 max-sm:grid max-sm:justify-center">
      <div className="mx-auto flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <div className="grid justify-center">
          <Image
            src="/Images/Student.png"
            alt="นักศึกษา"
            width="124"
            height="124"
            className=" z-10 m-0 rounded-full bg-secondary2-100 p-0"
          />
        </div>
        <div className="relative bottom-12 w-full rounded-lg  bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6 ">
            <h1 className=" mt-6 grid justify-center text-xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-5xl">
              สำหรับนักศึกษา
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <input
                  type="text"
                  name="ชื่อผู้ใช้"
                  id="username"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 sm:text-sm  "
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
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50  p-2.5 text-gray-900 sm:text-sm "
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="text-sm font-medium  text-gray-500 hover:text-gray-700  hover:underline"
                >
                  กลับหน้าแรก
                </Link>
                <Link
                  href="#"
                  className="text-sm font-medium text-gray-500 hover:text-gray-700 hover:underline"
                >
                  เปลี่ยนรหัสผ่าน
                </Link>
              </div>
              <button
                type="submit"
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-primary2-400 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary2-500 focus:outline-none focus:ring-4"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
