'use client'
import { GetProjectFormToken, UpdateProjectFormToken } from '@/actions/project'
import useSWR from 'swr'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  e.target.style.height = 'auto'
  e.target.style.height = `${e.target.scrollHeight}px`
}

export default function DocsEdit() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const fetcher = async () => {
    const data = await GetProjectFormToken()
    return data
  }

  const { data, error } = useSWR('project-form-token', fetcher)

  if (error) return <>Error loading data</>
  if (!data) {
    return <div>Loading...</div>
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)
    setSuccessMessage(null)

    const formData = new FormData(e.currentTarget)

    try {
      await UpdateProjectFormToken(data, formData)
      setSuccessMessage('Project updated successfully!')
    } catch (error: any) {
      setSubmitError(error.message || 'Failed to update project.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative min-h-[90dvh] mt-0 overflow-x-auto bg-white p-10 shadow-md rounded">
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-gray-600 hover:text-gray-900"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        ย้อนกลับ
      </button>
      <form className="container mx-auto max-w-3xl" onSubmit={handleSubmit}>
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
          </div>
        </div>
        <button
          type="submit"
          className={`hover:bg-primary2-600 mt-8 w-full rounded bg-primary2-500 px-6 py-3 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-primary2-500 focus:ring-offset-2 ${
            isSubmitting ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'บันทึกข้อมูล'}
        </button>
        {submitError && <p className="mt-4 text-red-500">{submitError}</p>}
        {successMessage && (
          <p className="mt-4 text-green-500">{successMessage}</p>
        )}
      </form>
    </section>
  )
}
