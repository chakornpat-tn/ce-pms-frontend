import { ButtonWithArrow, SmallButtonWithArrow } from '@/components/Buttons'
import { Presentprojectcard } from '@/components/Cards'
export default function selectproject() {
  return (
    <div className="min-h-screen bg-bg_primary">
      <div className="max-2xl mx-auto my-5 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
          โครงงานวิศวกรรมไฟฟ้า สาขาวิศวกรรมคอมพิวเตอร์
        </h2>
      </div>
      <div className="flex w-auto justify-center">
        <div className="py-2">
          <h5 className="mb-4 text-2xl text-gray-900">
            โครงงานที่ยังขาดกรรมการสอบ
          </h5>
          <div className="mb-4 mt-4 flex flex-wrap justify-end">
            <SmallButtonWithArrow
              Title={'ดูโครงงานที่เป็นกรรมการสอบ'}
              path={'/teacher/present/mypresent'}
            />
          </div>
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
            <Presentprojectcard
              path="#"
              Title={''}
              showButton={true}
              showStatus={true}
              Status={''}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
