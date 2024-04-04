import { AllpjCard, ProjCard } from '@/components/Cards/'
import Navbar from '@/components/Navbar/Navbar'

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-bg_primary">
        <Navbar />
        <div className="max-2xl mx-auto my-5 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            โครงงานวิศวกรรมไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์
          </h2>
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
