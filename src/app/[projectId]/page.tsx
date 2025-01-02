import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import dayjs from 'dayjs'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'
import { GetProjectByID } from '@/actions/project'
import { ProjectStatusBadge } from '@/components/Badge'
import { redirect } from 'next/navigation'


export default async function Page({
  params,
}: {
  params: Promise<{ projectId: string }>
}) { 
  const projectId = (await params).projectId

  const projectData = await GetProjectByID(Number(projectId))

  if (!projectData) {
    redirect('..')
  }
  return (
    <section className="relative mt-0 overflow-x-auto rounded-md bg-white p-4 shadow-md md:p-10">
      <article className="container mx-auto px-2 md:px-4">
        <h1 className="text-center text-lg sm:text-xl md:text-3xl">
          {projectData.projectName}
        </h1>
        <h2 className="mb-5 text-center text-base text-gray-400 sm:text-lg md:text-2xl">
          {projectData.projectNameEng ?? 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
        </h2>
        <div className="w-full">
          <div className="my-5 flex w-full flex-col items-center justify-around gap-4 sm:flex-row sm:gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm md:text-base">สถานะโครงงาน</p>
              <ProjectStatusBadge
                bgColor={projectData.projectStatus?.bgColor}
                textColor={projectData.projectStatus?.textColor}
                name={projectData.projectStatus?.name}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-semibold sm:text-sm md:text-base">
                ดำเนินการ
              </p>
              <p className="text-xs sm:text-sm md:text-base">
                {CourseStatusDesc(projectData.courseStatus)}
              </p>
            </div>
          </div>

          <br />

          <div className="mb-4 border-b border-primary2-400"></div>
          <div className="flex w-full flex-col gap-2 text-xs sm:text-sm md:text-base">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <h3 className="mt-4 font-bold">ประเภทโครงงาน</h3>
              </div>
              <p className="text-gray-500">{projectData.type ?? 'ไม่ระบุ'}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">ผู้พัฒนา</h3>
              {projectData.students?.map((item: any) => (
                <p key={item.student.id} className="text-gray-500">
                  {item.student.studentId} {item.student.name}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">อาจารย์ที่ปรึกษา</h3>
              {projectData.users
                .filter(
                  (user: any) =>
                    user.userProjectRole == userProjectRole.ADVISOR,
                )
                .map((userData: any) => (
                  <p key={userData.user.id} className="text-gray-500">
                    {userData.user.name}
                  </p>
                ))}
              {projectData.users.filter(
                (user: any) =>
                  user.userProjectRole == userProjectRole.CO_ADVISOR,
              ).length > 0 && (
                <div className="flex flex-col">
                  <h3 className="font-bold">อาจารย์ที่ปรึกษาร่วม</h3>
                  {projectData.users
                    .filter(
                      (user: any) =>
                        user.userProjectRole == userProjectRole.CO_ADVISOR,
                    )
                    .map((userData: any) => (
                      <p key={userData.user.id} className="text-gray-500">
                        {userData.user.name}
                      </p>
                    ))}
                </div>
              )}
              <h3 className="mt-4 font-bold">ปีการศึกษา</h3>
              <p className="text-gray-500">
                {projectData.semester} /{projectData.academicYear}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">บทคัดย่อ</h3>
              <p className="mb-4 text-gray-500">
                {projectData.abstract ?? 'ไม่ได้ระบุ'}
              </p>
              <h3 className="mb-2 font-bold">Abstract</h3>
              <p className="text-gray-500">
                {projectData.abstractEng ?? 'ไม่ได้ระบุ'}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">รายละเอียด</h3>
              <p className="mb-4 text-gray-500">
                {projectData.detail ?? 'ไม่ได้ระบุ'}
              </p>
              <h3 className="mb-2 font-bold">Detail</h3>
              <p className="text-gray-500">
                {projectData.detailEng ?? 'ไม่ได้ระบุ'}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">อัปเดตล่าสุด</h3>
              <p className="text-gray-500">
                {dayjs(projectData.updatedAt)
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