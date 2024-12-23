'use client'

import { useState } from 'react'
import {
  Combobox,
  ComboboxButton,
  ComboboxOptions,
  ComboboxOption,
} from '@headlessui/react'
import DocsCard from '@/components/Cards/DocsCard/DocsCard'
import { GetProjectFormToken } from '@/actions/project'
import courseStatus from '@/constants/course/courseStatus'
import course from '@/constants/course/course'
import useSWR from 'swr'
import { ProjectByIDRes } from '@/models/Project'
import { Document } from '@/models/Document'
import { ListDocument } from '@/actions/documents'
import { Loader } from '@/components/Loading'
import DocsList from './docsList'

const fetcher = (key: string, ...args: any[]) => {
  if (key === 'project') {
    return GetProjectFormToken()
  } else if (key === 'project-docs') {
    return ListDocument(args[0])
  }
  return Promise.reject('Unknown key')
}

const ProjectPage = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [projectCourseStatus, setProjectCourseStatus] = useState(0)
  const [findCourse, setFindCourse] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [projectID, setProjectID] = useState<number | undefined>(undefined)
  const [docsID, setDocsID] = useState<number | undefined>(undefined)

  const preProjectStatus = [
    courseStatus.ApprovePreExam,
    courseStatus.PreProject,
  ]

  const ProjectStatus = [courseStatus.ApproveProjectExam, courseStatus.Project]
  const openSubmitOnStatus = [...preProjectStatus, ...ProjectStatus]

  const handleCardClick = () => {
    if (selectedItem) {
      setIsModalOpen(true)
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type === 'application/pdf') {
        console.log('Uploaded PDF:', file)
      } else {
        alert('กรุณาอัปโหลดไฟล์ PDF เท่านั้น')
      }
    }
  }

  const ProjectFetcher = useSWR(
    'project',
    async () => {
      const projectData = (await fetcher('project')) as ProjectByIDRes
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
    findCourse
      ? [
          'project-docs',
          {
            course: findCourse,
            isActive: true,
            submissionOpen: true,
          },
        ]
      : null,
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
      <div className="relative mt-0 overflow-x-auto bg-white p-4 shadow-md sm:rounded-md sm:p-10">
        <article className="mx-auto text-center">
          ยังไม่สามารถส่งเอกสารได้
        </article>
      </div>
    )
  return (
    <section className="relative mt-0 min-h-[calc(100dvh-10dvh)] overflow-x-auto bg-white p-4 shadow-md sm:rounded-md sm:p-10">
      <article className="flex flex-col items-center">
        <div className="my-4 flex w-full flex-col items-center justify-center px-2 sm:px-0">
          <label
            id="listbox-label"
            className="block text-center text-base font-medium text-gray-700"
          >
            เลือกเอกสารที่ต้องการส่ง
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
            <div className="relative mx-auto mt-1 w-full max-w-screen-md px-4 sm:px-0">
              <ComboboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:bg-primary2-400 focus:outline-none focus:ring-1 sm:text-sm">
                <span className="block truncate">
                  {selectedItem || 'เลือกหัวข้อ'}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
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
              <ComboboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {DocsSelection.data &&
                  Array.isArray(DocsSelection.data) &&
                  DocsSelection.data.map((item: Document) => (
                    <ComboboxOption
                      key={item.id}
                      value={item.id?.toString()}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-primary2-400 text-white' : 'text-gray-900'}`
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

        <div className="my-4 w-full px-4">
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
