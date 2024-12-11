'use client'
import { useState } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'
import { GetProject } from '@/actions/project'
import courseStatus from '@/constants/course/courseStatus'
import useSWR from 'swr'
import { ProjectByIDRes } from '@/models/Project'
import { Document } from '@/models/Document'
import { ListDocumentInProject } from '@/actions/documents'
import { Loader } from '@/components/Loading'
import DocsList from './docsList'
import { useParams } from 'next/navigation'
import course from '@/constants/course/course'

const ProjectPage = () => {
  const params = useParams<{ projectId: string }>()
  const projectId = params.projectId
  const fetcher = (key: string, ...args: any[]) => {
    if (key === 'project') {
      return GetProject(args[0])
    } else if (key === 'project-docs') {
      return ListDocumentInProject(args[0])
    }
    return Promise.reject('Unknown key')
  }

  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [projectCourseStatus, setProjectCourseStatus] = useState(0)
  const [findCourse, setFindCourse] = useState<number | null>(null)
  const [projectID, setProjectID] = useState<number | undefined>(undefined)
  const [docsID, setDocsID] = useState<number | undefined>(undefined)

  const preProjectStatus = [
    courseStatus.ApprovePreExam,
    courseStatus.PreProject,
  ]

  const ProjectStatus = [courseStatus.ApproveProjectExam, courseStatus.Project]
  const openSubmitOnStatus = [...preProjectStatus, ...ProjectStatus]

  const ProjectFetcher = useSWR(
    `project/${projectId}`,
    async () => {
      const projectData = (await fetcher(
        'project',
        Number(Number(projectId)),
      )) as ProjectByIDRes
      if (projectData.courseStatus && projectData.id) {
        if (preProjectStatus.includes(projectData.courseStatus)) {
          setProjectID(projectData.id)
          setFindCourse(course.PreProject)
        } else if (ProjectStatus.includes(projectData.courseStatus)) {
          setProjectID(projectData.id)
          setFindCourse(course.Project)
        }
        setProjectCourseStatus(projectData.courseStatus)
      }
      return projectData
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  const DocsSelection = useSWR(
    findCourse ? ['project-docs', Number(projectId)] : null,
    async ([_, req]) => await fetcher('project-docs', req),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )
  if (DocsSelection.isLoading || ProjectFetcher.isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (
    !openSubmitOnStatus.includes(projectCourseStatus) ||
    ProjectFetcher.error ||
    DocsSelection.error ||
    !DocsSelection.data ||
    (Array.isArray(DocsSelection.data) && DocsSelection.data.length === 0)
  )
    return (
      <div className="relative mt-0 overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg sm:p-10">
        <article className="mx-auto text-center">
          ไม่สามารถตรวจสอบเอกสารได้ในขณะนี้
        </article>
      </div>
    )

  return (
    <section className="relative mt-0 h-full overflow-x-auto bg-white p-4 shadow-md sm:rounded-lg sm:p-10">
      <article className="flex flex-col items-center">
        <div className="my-4 flex w-full flex-col items-center justify-center space-y-4 px-2 sm:my-8 sm:space-y-6 sm:px-0">
          <div className="w-full max-w-screen-md px-2 sm:px-0">
            <label
              id="course-listbox-label"
              className="mb-2 block text-sm font-semibold text-gray-700 sm:text-base"
            >
              เลือกวิชา
            </label>
            <Combobox
              value={selectedCourse}
              onChange={(value: string | null) => {
                setSelectedCourse(value)
                setSelectedItem(null)
                setDocsID(undefined)
              }}
            >
              <div className="relative">
                <ComboboxButton className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-left text-xs shadow-sm transition-colors hover:border-primary2-400 focus:border-primary2-400 focus:outline-none focus:ring-2 focus:ring-primary2-400/20 sm:py-3 sm:pl-4 sm:pr-10 sm:text-sm">
                  <span className="block truncate">
                    {Number(selectedCourse) === course.PreProject
                      ? 'เอกสารวิชาเตรียมโครงงาน'
                      : Number(selectedCourse) === course.Project
                        ? 'เอกสารวิชาโครงงาน'
                        : 'เลือกวิชา'}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                    <svg
                      className="h-3 w-3 text-gray-400 sm:h-4 sm:w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </ComboboxButton>
                <ComboboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-white py-1 text-xs shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-h-60 sm:text-sm">
                  <ComboboxOption
                    value={course.PreProject}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-8 pr-4 sm:py-3 sm:pl-10 ${active ? 'bg-primary2-400 text-white' : 'text-gray-900'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          เอกสารวิชาเตรียมโครงงาน
                        </span>
                      </>
                    )}
                  </ComboboxOption>
                  <ComboboxOption
                    value={course.Project}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-8 pr-4 sm:py-3 sm:pl-10 ${active ? 'bg-primary2-400 text-white' : 'text-gray-900'}`
                    }
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                        >
                          เอกสารวิชาโครงงาน
                        </span>
                      </>
                    )}
                  </ComboboxOption>
                </ComboboxOptions>
              </div>
            </Combobox>
          </div>
          {selectedCourse && (
            <div className="w-full max-w-screen-md px-2 sm:px-0">
              <label
                id="listbox-label"
                className="mb-2 block text-base font-semibold text-gray-700 sm:text-lg"
              >
                เลือกเอกสารที่ต้องการตรวจสอบ
              </label>
              <Combobox
                value={selectedItem}
                onChange={(value: string | null) => {
                  if (value) {
                    const selectedDocument = Array.isArray(DocsSelection.data)
                      ? DocsSelection.data.find(
                          (item: Document) => item.id?.toString() === value,
                        )
                      : undefined

                    if (selectedDocument) {
                      setSelectedItem(selectedDocument.name)
                      setDocsID(selectedDocument.id ?? undefined)
                    }
                  } else {
                    setSelectedItem(null)
                    setDocsID(undefined)
                  }
                }}
              >
                <div className="relative">
                  <ComboboxButton className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-left text-sm shadow-sm transition-colors hover:border-primary2-400 focus:border-primary2-400 focus:outline-none focus:ring-2 focus:ring-primary2-400/20 sm:py-3 sm:pl-4 sm:pr-10 sm:text-base">
                    <span className="block truncate">
                      {selectedItem || 'เลือกหัวข้อ'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                      <svg
                        className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </ComboboxButton>
                  <ComboboxOptions className="absolute z-10 mt-1 max-h-48 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-h-60 sm:text-base">
                    {DocsSelection.data &&
                      Array.isArray(DocsSelection.data) &&
                      DocsSelection.data
                        .filter(
                          (item: Document) =>
                            !selectedCourse ||
                            item.course === Number(selectedCourse),
                        )
                        .map((item: Document) => (
                          <ComboboxOption
                            key={item.id}
                            value={item.id?.toString()}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-8 pr-4 sm:py-3 sm:pl-10 ${active ? 'bg-primary2-400 text-white' : 'text-gray-900'}`
                            }
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                                >
                                  {item.name}
                                </span>
                              </>
                            )}
                          </ComboboxOption>
                        ))}
                  </ComboboxOptions>
                </div>
              </Combobox>
            </div>
          )}
        </div>

        <div className="my-2 w-full px-2 sm:my-4 sm:px-4">
          {docsID && (
            <DocsList
              projectId={projectID}
              documentId={docsID}
              documentName={selectedItem}
            />
          )}
        </div>
      </article>
    </section>
  )
}

export default ProjectPage