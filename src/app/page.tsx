import { AllpjCard, ProjCard } from '@/components/Cards/'
import Navbar from '@/components/Navbar/Navbar'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-bg_primary">
        <Navbar />
        <div className="container mx-auto hero min-h-40 bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-4xl font-bold py-2">โครงงานวิศวกรรมไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์</h1>
              <p className="py-6">
                เว็บไซต์แสดงข้อมูลโครงงานวิศวกรรมไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-auto justify-center">
          <div className="px-4 py-2">
            <h5 className="mb-4 text-2xl text-gray-900">
              เลือกปีการศึกษาที่ต้องการตรวจสอบ
            </h5>
            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3  ">
              <ProjCard path="/2555" />
              <ProjCard path="#" />
              <ProjCard path="#" />
              <ProjCard path="#" />
              <ProjCard path="#" />
              <AllpjCard path="#" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
