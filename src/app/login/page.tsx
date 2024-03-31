import React from 'react'
import { LoginCard } from '@/components/Cards'
import { ButtonPrimary2 } from '@/components/Buttons'

type Props = {}

function page({}: Props) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-start bg-bg_primary p-10 ">
      <div className="flex flex-col items-center justify-center md:mt-[5vh]">
        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          ระบบจัดการโครงงานทางวิศวกรรมคอมพิวเตอร์
        </h1>
        <h2 className="text-xl md:text-3xl">
          มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </h2>
      </div>
      <article className="mt-[3vh] flex flex-col justify-center md:flex-row ">
        <LoginCard
          bgColor="bg-secondary2-100"
          title="นักศึกษา"
          imageName="นักศึกษา"
          pathImage="Student"
          urlPath="/login/student"
        />
        <LoginCard
          bgColor="bg-primary2-400"
          title="อาจารย์"
          imageName="อาจารย์"
          pathImage="Teacher"
          urlPath="/login/teacher"
        />
      </article>
      <ButtonPrimary2 Title="กลับหน้าหลัก" path="/" />
    </div>
  )
}

export default page
