import React from 'react'
import LoginCard from '@/app/components/Cards'

type Props = {}

function page({}: Props) {
  return (
    <div className="h-dvh flex flex-col justify-start p-10 bg-bg_primary ">
      <div className="flex justify-center items-center flex-col md:mt-[15vh]">
        <h1 className="text-3xl sm:text-6xl font-bold">
          ระบบจัดการโครงงานทางวิศวกรรมคอมพิวเตอร์
        </h1>
        <h2 className="text-xl sm:text-4xl">
          มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </h2>
      </div>
      <article className="flex flex-col md:flex-row justify-evenly mt-[10vh] ">
        <LoginCard title="นักศึกษา" />
        <LoginCard title="อาจารย์" />
      </article>
    </div>
  )
}

export default page
