import { Stepper, Step, StepLabel } from '@mui/material'
import Box from '@mui/material/Box'
import { Progress } from '@/components/Stepper'
import Link from 'next/link'
import { GetProjectFormToken } from '@/actions/project'
import { ProjectByIDRes } from '@/models/Project'
import { ProjectStatusBadge } from '@/components/Badge'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import dayjs from 'dayjs'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'

const steps = [
  'ใบขอสอบ2.0',
  'ใบซ้อมนำเสนอ3.0',
  'ใบประเมินคณะกรรมการ4.0',
  'ใบส่งชิ้นงาน5.0',
  'ส่งปริญญานิพนธ์',
]

type Props = {}
export default async function Page({}: Props) {
  let data: ProjectByIDRes = await GetProjectFormToken()
  if (!data) return
  return (
    <section className="relative mt-0 overflow-x-auto bg-white p-10 shadow-md sm:rounded-lg">
      <article className="container">
        <h1 className="text-center text-xl md:text-3xl">{data.projectName}</h1>
        <h2 className="mb-5 text-center text-lg text-gray-400 md:text-2xl">
          {data.projectNameEng ?? 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
        </h2>
        <div className="w-full">
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          <div className="m-1 mr-4 mt-5 flex items-center gap-2">
            <h3 className="text-sm md:text-base">สถานะโครงงาน:</h3>
            <ProjectStatusBadge
              bgColor={data.projectStatus?.bgColor}
              textColor={data.projectStatus?.textColor}
              name={data.projectStatus?.name}
            />
          </div>
          <button className="mb-4 rounded bg-primary1 px-3 py-1 text-xs text-white md:px-4 md:text-base">
            <Link href="/project/studentdocs">คลิกเพื่อส่งเอกสาร</Link>
          </button>
          <br></br>

          <div className="mb-4 border-b border-primary2-500"></div>
          <h3 className="text-sm font-bold md:text-base">
            รายงานความก้าวหน้าโครง
          </h3>
          <div className="mt-2 flex items-center justify-center">
            <p>เอกสาร</p>
          </div>
          <Progress value={1} />
          <div className="mt-2 flex items-center justify-center">
            <p>ชิ้นงาน</p>
          </div>
          <Progress value={1} />
          <div className="mt-4 flex w-full flex-col items-center justify-center">
            <button className="mb-4 rounded bg-primary1 px-3 py-2 text-xs text-white md:px-4 md:text-base">
              <Link href="/project/studentprogress">รายงานความก้าวหน้า</Link>
            </button>
          </div>
          <div className="mb-4 border-b border-primary2-400"></div>
          <div className="flex w-full flex-col gap-2 text-sm md:text-base">
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">การดำเนินการ</h3>
              <p className="text-gray-500">
                {CourseStatusDesc(Number(data.courseStatus))}
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">ผู้พัฒนา</h3>
              {data.students?.map(item => (
                <p key={item.student.id} className="text-gray-500">
                  {item.student.studentId} {item.student.name}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">อาจารย์ที่ปรึกษา</h3>
              {data.users
                .filter(user => user.userProjectRole == userProjectRole.ADVISOR)
                .map(userData => (
                  <p key={userData.user.id} className="text-gray-500">
                    {userData.user.name}
                  </p>
                ))}
              {data.users.filter(
                user => user.userProjectRole == userProjectRole.CO_ADVISOR,
              ).length > 0 && (
                <div className="flex flex-col">
                  <h3 className="font-bold">อาจารย์ที่ปรึกษาร่วม</h3>
                  {data.users
                    .filter(
                      user =>
                        user.userProjectRole == userProjectRole.CO_ADVISOR,
                    )
                    .map(userData => (
                      <p key={userData.user.id} className="text-gray-500">
                        {userData.user.name}
                      </p>
                    ))}
                </div>
              )}
              <h3 className="mt-4 font-bold">ปีการศึกษา</h3>
              <p className="text-gray-500">
                {data.semester} /{data.academicYear}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">บทคัดย่อ</h3>
              <p className="mb-4 text-gray-500">
                {data.abstract ?? 'ไม่ได้ระบุ'}
              </p>
              <h3 className="mb-2 font-bold">Abstract</h3>
              <p className="text-gray-500">
                {data.abstractEng ?? 'ไม่ได้ระบุ'}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">อัปเดตล่าสุด</h3>
              <p className="text-gray-500">
                {dayjs(data.updatedAt)
                  .add(543, 'year')
                  .format('DD/MM/YYYY เวลา HH.mmน.')}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
