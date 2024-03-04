import React from 'react'
import LoginCard from '@/app/components/Cards'

type Props = {}

function page({}: Props) {
  return (
    <div className="h-dvh flex flex-col justify-start p-10 bg-bg_primary ">
      <div className="flex justify-center items-center flex-col mt-[20vh]">
        <h1 className="text-2xl sm:text-6xl">
          ระบบจัดการโครงงานทางวิศวกรรมคอมพิวเตอร์
        </h1>
        <h2 className="text-lg sm:text-4xl">
          มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </h2>
      </div>
      <article className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-[40px]">
        <LoginCard />
        <LoginCard />
      </article>
    </div>
  )
}

export default page
