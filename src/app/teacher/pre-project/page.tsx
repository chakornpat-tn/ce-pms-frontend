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
            <h2 className="mb-4 text-2xl font-bold">ผลลัพธ์การค้นหา</h2>
            <h3>ภาคเรียน 1/67 </h3>
          </article>
        </section>
      </article>
    </div>
  )
}

export default page
