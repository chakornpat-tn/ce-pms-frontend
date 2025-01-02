import { Progress } from '@/components/Stepper'
import Link from 'next/link'
import { GetProjectFormToken } from '@/actions/project'
import { ProjectByIDRes } from '@/models/Project'
import { ProjectStatusBadge } from '@/components/Badge'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import dayjs from 'dayjs'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'
import { CheckRegisExamDateRes } from '@/models/ProjectUser'
import { CheckStatusRegisExamDateTime } from '@/actions/projectUser'
import { CalendarIcon, SendIcon } from 'lucide-react'
import { ProjectSelectExamDate } from '@/components/Dialog/ProjectDialog/ProjectSelectExamDate'
import { ProjectProgressReportRes } from '@/models/ProgressReport'
import { GetProjectProgressReport } from '@/actions/progressReport'
import { ListDocument } from '@/actions/documents'
import course from '@/constants/course/course'
import { Document } from '@/models/Document'
import CourseStepper from '@/components/Stepper/CourseStepper/CourseStepper'
import { ProjectDocument } from '@/models/ProjectDocument'
import { ListLastProjectDocsStatus } from '@/actions/projectDocuments'

type Props = {}
export default async function Page({}: Props) {
  let projectData: ProjectByIDRes | undefined
  let regisExamDate: CheckRegisExamDateRes | undefined
  let projectProgressReport: ProjectProgressReportRes | null | undefined
  let documentStepper: Document[] | undefined
  let projectDocsProgress: ProjectDocument[] | undefined
  try {
    projectData = await GetProjectFormToken()
    if (!projectData) return
    regisExamDate = await CheckStatusRegisExamDateTime(projectData.id)
    projectProgressReport = await GetProjectProgressReport(projectData.id)

    documentStepper = await ListDocument({
      course: projectData.projectAcademicYear
        ? course.Project
        : course.PreProject,
      isActive: true,
    })
    projectDocsProgress = await ListLastProjectDocsStatus(
      projectData.id,
      projectData.projectAcademicYear ? course.Project : course.PreProject,
    )
  } catch (error) {
    console.error('Error fetching project data')
    return
  }

  if (!projectData) return null

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
          <CourseStepper steps={documentStepper} projectDocsProgress={projectDocsProgress} />
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
            <button className="btn rounded-md bg-primary2-400 text-xs text-white transition-colors duration-200 hover:bg-primary2-500 sm:text-sm md:text-base">
              <Link href="/project/docs" className="flex items-center gap-2">
                <SendIcon className="h-4 w-4 sm:h-5 sm:w-5" />{' '}
                คลิกเพื่อส่งเอกสาร
              </Link>
            </button>
          </div>
          {regisExamDate?.projectCommitteeCountApprove &&
            regisExamDate.projectExamApprove && (
              <div className="my-5 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="flex flex-col items-center justify-center">
                  <p className="text-xs font-semibold sm:text-sm md:text-base">
                    วันสอบ
                  </p>
                  <p className="text-xs sm:text-sm md:text-base">
                    {projectData.examDateTime
                      ? dayjs(projectData.examDateTime)
                          .add(543, 'year')
                          .format('DD/MM/YYYY เวลา HH.mmน.')
                      : 'ยังไม่ได้เลือก'}
                  </p>
                  {projectData.examLocation && (
                    <p className="overflow-hidden break-words text-xs sm:text-sm md:text-base">
                      {projectData.examLocation}
                    </p>
                  )}
                </div>
                <ProjectSelectExamDate projectId={projectData.id}>
                  <button className="btn bg-primary2-400 text-xs text-white transition-colors duration-200 hover:bg-primary2-500 sm:text-sm md:text-base">
                    <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5" />{' '}
                    เลือกวันสอบ
                  </button>
                </ProjectSelectExamDate>
              </div>
            )}

          <br />
          {(!projectProgressReport || projectProgressReport != null) && (
            <div>
              <div className="mb-4 border-b border-primary2-500"></div>
              <h3 className="text-xs font-bold sm:text-sm md:text-base">
                รายงานความก้าวหน้าโครง
              </h3>
              <div className="mt-2 flex items-center justify-center">
                <p className="text-xs sm:text-sm md:text-base">เอกสาร</p>
              </div>
              <Progress value={projectProgressReport?.productProgress || 0} />
              <div className="mt-2 flex items-center justify-center">
                <p className="text-xs sm:text-sm md:text-base">ชิ้นงาน</p>
              </div>
              <Progress value={projectProgressReport?.docsProgress || 0} />
              <div className="mt-4 flex w-full flex-col items-center justify-center">
                <button className="mb-4 rounded-md bg-primary2-400 px-3 py-2 text-xs text-white hover:bg-primary2-500 sm:text-sm md:px-4 md:text-base">
                  <Link href="/project/student-progress">
                    รายงานความก้าวหน้า
                  </Link>
                </button>
              </div>
            </div>
          )}

          <div className="mb-4 border-b border-primary2-400"></div>
          <div className="flex w-full flex-col gap-2 text-xs sm:text-sm md:text-base">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <h3 className="mt-4 font-bold">ประเภทโครงงาน</h3>
                <button className="btn rounded-md bg-primary2-400 text-xs text-white transition-colors duration-200 hover:bg-primary2-500 sm:text-sm md:text-base">
                  <Link href="/project/docs-edit">แก้ไขเอกสาร</Link>
                </button>
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
