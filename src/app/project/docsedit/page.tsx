'use client'
import { GetProjectFormToken } from '@/actions/project'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import useSWR from 'swr'

const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto'
    e.target.style.height = `${e.target.scrollHeight}px`
}

export default function DocsEdit() {

const fetcher = async () => {
  const data = await GetProjectFormToken()
  return data
}

const {data, error} = useSWR('project-form-token', fetcher)

  if( error ) return <> error </>
  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <section className="relative mt-0 overflow-x-auto bg-white p-10 shadow-md sm:rounded">
      <form className="container mx-auto max-w-3xl">
        <input type="hidden" name="id" value={data.id || ''} />
        <h1 className="mb-6 text-center text-xl md:text-3xl">
          <input
            type="text"
            name="projectName"
            defaultValue={data.projectName || ''}
            className="w-full rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
            placeholder="ชื่อโครงงาน"
          />
        </h1>
        <h2 className="mb-8 text-center text-lg text-gray-500 md:text-2xl">
          <input
            type="text"
            name="projectNameEng"
            defaultValue={data.projectNameEng || ''}
            className="w-full rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
            placeholder="ชื่อโครงงานภาษาอังกฤษ"
          />
        </h2>
        <div className="w-full">
          <div className="mb-8 border-b border-gray-300"></div>
          <div className="flex w-full flex-col gap-6 text-sm md:text-base">
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">ปีการศึกษา</h3>
              <div className="mt-2 flex gap-4">
                <input
                  type="text"
                  name="semester"
                  defaultValue={data.semester || ''}
                  className="w-1/3 rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  placeholder="ภาคการศึกษา"
                />
                <span className="text-gray-500">/</span>
                <input
                  type="text"
                  name="academicYear"
                  defaultValue={data.academicYear || ''}
                  className="w-2/3 rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  placeholder="ปีการศึกษา"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">บทคัดย่อ</h3>
              <textarea
                name="abstract"
                defaultValue={data.abstract || ''}
                className="w-full resize-none rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="กรอกบทคัดย่อ"
                onInput={handleResize}
                rows={1}
              />
              <h3 className="mb-2 mt-6 font-bold">Abstract</h3>
              <textarea
                name="abstractEng"
                defaultValue={data.abstractEng || ''}
                className="w-full resize-none rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                placeholder="Enter abstract in English"
                onInput={handleResize}
                rows={1}
              />
            </div>
            {/* <div className="flex flex-col">
                
              {data.users.filter(
                user => user.userProjectRole == userProjectRole.CO_ADVISOR,
              ).length > 0 && (
                <div className="flex flex-col mt-6">
                  <h3 className="mb-2 font-bold">อาจารย์ที่ปรึกษาร่วม</h3>
                  <select
                    name="coAdvisor"
                    className="w-full rounded border border-gray-300 p-2 shadow-sm focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary2-500"
                  >
                    {data.users
                      .filter(
                        user =>
                          user.userProjectRole == userProjectRole.CO_ADVISOR,
                      )
                      .map(userData => (
                        <option key={userData.user.id} value={userData.user.id}>
                          {userData.user.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div> */}
          </div>
        </div>
        <button
          type="submit"
          className="hover:bg-primary2-600 mt-8 w-full rounded bg-primary2-500 px-6 py-3 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary2-500 focus:ring-offset-2"
        >
          บันทึกข้อมูล
        </button>
      </form>
    </section>
  )
}