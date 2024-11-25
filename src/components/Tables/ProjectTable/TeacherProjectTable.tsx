'use client'
import React from 'react'
import { CheckBox } from '@/components/CheckBox'
import { Loader } from '@/components/Loading'
import TeacherProjectMenu from './TeacherProjectMenu'
import ProjectMenu from './TeacherProjectMenu'

type Project = {
  id: number
  projectName: string
  projectStatus: {
    name: string
    bgColor: string
    textColor: string
  }
}

type Props = {
  data: Project[] | undefined
  loading: boolean
}

const TeacherProjectTable: React.FC<Props> = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <section className="relative mt-4 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg">
      <article>
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <h2 className="mb-4 text-xl font-bold md:mb-0 md:text-2xl">
            ผลลัพธ์การค้นหา
          </h2>
          <button className="w-full rounded-md bg-primary2-400 px-3 py-1.5 text-sm text-white transition-colors hover:bg-primary2-500 md:w-auto md:px-4 md:py-2 md:text-base">
            จัดการโครงงาน
          </button>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="divide-y bg-gray-50">
              <tr>
                <th className="w-[20%] whitespace-nowrap px-4 py-2 text-sm md:text-base">
                  เลือก
                </th>
                <th className="w-[40%] whitespace-nowrap px-4 py-2 text-start text-sm md:text-base">
                  ชื่อโครงงาน
                </th>
                <th className="w-[40%] whitespace-nowrap px-4 py-2 text-start text-sm md:text-base">
                  สถานะ
                </th>
                <th scope="col" className="relative px-6 py-4 text-right">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {data &&
                data.map(project => (
                  <tr key={project.id} className="hover:bg-gray-100">
                    <td className="flex justify-center whitespace-nowrap px-4 py-2">
                      <CheckBox id={project.id} name={project.projectName} />
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <label
                        htmlFor={`project${project.id}`}
                        className="text-base md:text-lg"
                      >
                        {project.projectName}
                      </label>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <span
                        style={{
                          backgroundColor:
                            project.projectStatus?.bgColor || '#0f1035',
                          color: project.projectStatus?.textColor || '#FFFFFF',
                        }}
                        className="inline-block rounded-md px-2 py-1 text-xs md:text-sm"
                      >
                        {project.projectStatus?.name || 'ปกติ'}
                      </span>
                    </td>
                    <td className="tex-right relative whitespace-nowrap px-6 py-4 text-right text-base text-primary1">
                      <ProjectMenu projectId={project.id} projectName={''} />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  )
}

export default TeacherProjectTable
