import React from 'react'
import { LoginCard } from '@/app/components/Cards'
import { ButtonPrimary2 } from '../components/Buttons'

type Props = {}

function page({}: Props) {
  return (
    <div className="min-h-dvh flex flex-col justify-start items-center p-10 bg-bg_primary ">
      <div className="flex justify-center items-center flex-col md:mt-[15vh]">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          ระบบจัดการโครงงานทางวิศวกรรมคอมพิวเตอร์
        </h1>
        <h2 className="text-xl md:text-3xl">
          มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา
        </h2>
      </div>
      <article className="flex flex-col md:flex-row justify-evenly mt-[10vh] ">
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
