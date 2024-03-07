import { AllpjCard, ProjCard } from './components/Cards/ProjCard/ProjCard'
import Navbar from './components/Navbar'

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="bg-bg_primary min-h-screen">
        <div className="mx-auto max-2xl text-center my-5">
          <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
            โครงงานวิศวกรรมไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์
          </h2>
        </div>
        <div className="flex w-auto justify-center">
          <div className="px-4 py-2">
            <h5 className="text-2xl text-gray-900 mb-4">
              เลือกปีการศึกษาที่ต้องการตรวจสอบ
            </h5>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 h-full  ">
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
