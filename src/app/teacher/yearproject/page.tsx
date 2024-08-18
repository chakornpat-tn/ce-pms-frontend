'use client'
import { ProjectFilterForm } from '@/components/Forms'

type Props = {}

function page({}: Props) {
  return (
    <div className="flex min-h-svh justify-center">
      <article className="h-full w-11/12 p-4 md:w-4/5 md:p-8">
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-primary1">จัดการโครงงาน</h1>
        </div>

        {/* Search Form */}
        <ProjectFilterForm />

        {/* Search Results */}
        <section className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
          <article>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                        <h2 className="text-2xl font-bold mb-4 md:mb-0">ผลลัพธ์การค้นหา</h2>
                        <button className="bg-primary1 text-white px-3 py-1.5 rounded-md hover:bg-primary1/80 transition-colors text-sm md:text-base md:px-4 md:py-2 w-full md:w-auto">
                          จัดการโครงงาน
                        </button>
                      </div>
            <h3>ภาคเรียน 1/67 </h3>
            
            {/* Project List */}
            <div className="mt-4">
              <table className="w-full text-left">
                <thead>
                  <tr>
                    <th className="px-4 py-2">เลือก</th>
                    <th className="px-4 py-2">ชื่อโครงงาน</th>
                    <th className="px-4 py-2">สถานะ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        id="project1"
                        name="project1"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <label htmlFor="project1" className="text-lg">
                        ระบบจัดการโครงการ
                      </label>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm text-green-500">ผ่าน</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        id="project2"
                        name="project2"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <label htmlFor="project2" className="text-lg">
                        ระบบติดตามงาน
                      </label>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm text-red-500">ไม่ผ่าน</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        id="project3"
                        name="project3"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <label htmlFor="project3" className="text-lg">
                        ระบบบริหารจัดการเวลา
                      </label>
                    </td>
                    <td className="px-4 py-2">
                      <span className="text-sm text-yellow-500">รอดำเนินการ</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </article>
        </section>
      </article>
    </div>
  )
}

export default page
