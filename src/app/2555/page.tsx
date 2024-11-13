import { ProjCard, AllpjCard, SelectProjectCard } from '@/components/Cards'
import NavbarWithSideBar from '@/components/Navbar/NavbarWithLayout'
export default function selectproject() {
  return (
    <NavbarWithSideBar>
      <div className="flex w-auto justify-center">
        <div className="px-4 py-2">
          <h5 className="mb-4 text-2xl text-gray-900">
            เลือกโครงงานที่ต้องการตรวจสอบ
          </h5>
          <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
            <SelectProjectCard
              path="#"
              Title={''}
              showButton={false}
              showStatus={true}
              Status={''}
            />
          </div>
        </div>
      </div>
    </NavbarWithSideBar>
  )
}
