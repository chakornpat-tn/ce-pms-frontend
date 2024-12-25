'use client'
import { GetProjectByID, updateMultipleProjects } from '@/actions/project'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import { useState } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { ProjectByIDRes } from '@/models/Project'
import Link from 'next/link'
import userRoles from '@/constants/userRoles/userRoles'
import { UpdateCourseStatusDialog } from '../CourseStatusDialog/UpdateCourseStatusDIalog'
import courseStatus from '@/constants/course/courseStatus'
import course from '@/constants/course/course'
import AssignmentIcon from '@mui/icons-material/Assignment'
import ProgressIcon from '@mui/icons-material/ShowChart'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import GradeIcon from '@mui/icons-material/Grade'
import PreviewIcon from '@mui/icons-material/Preview'
import { UpdateExamDocsDialog } from '../CommitteeDialog/UpdateExamDocsDialog'
import PointTeacherDialog from '../PointTeacherDialog/PointTeacherDialog'

type Props = {
  children: React.ReactNode
  projectId: number
  userRole: number
  courseMenu: number
  onSuccess?: () => void
}

export function ProjectDetailDialog({
  children,
  projectId,
  userRole,
  courseMenu,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false)

  const { data, error, isLoading } = useSWR(`get-project-by-${projectId}`, () =>
    GetProjectByID(projectId),
  )

  if (!data) return <>{children}</>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[80vh] w-[90vw] max-w-4xl overflow-y-auto rounded bg-white md:h-auto">
        <DialogHeader>
          <DialogTitle>ข้อมูลโครงการ</DialogTitle>
        </DialogHeader>
        <section className="flex flex-col-reverse gap-4 md:flex-row">
          <article className="mx-2 w-full md:w-2/3">
            {projectDetail(data)}
          </article>
          <article className="mx-2 w-full md:w-1/3">
            {menuSelection(userRole, projectId, courseMenu, onSuccess)}
          </article>
        </section>
      </DialogContent>
    </Dialog>
  )
}

const projectDetail = (data: ProjectByIDRes) => {
  return (
    <div>
      <div className="mb-2">
        <h1 className="text-lg md:text-xl">{data.projectName}</h1>
        <h2 className="text-md text-gray-400 md:text-lg">
          {data.projectNameEng ?? 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
        </h2>
      </div>

      <div className="w-full">
        <div className="">
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-bold">เสนอหัวข้อปีการศึกษา</h3>
              <p className="text-gray-500">
                {data.semester} /{data.academicYear}
              </p>
            </div>

            <h3 className="mb-2 font-bold">ผู้พัฒนา</h3>
            {data.students?.map(item => (
              <p key={item.student.id} className="text-gray-500">
                {item.student.studentId} {item.student.name}
              </p>
            ))}
            <div className="flex flex-col gap-2">
              {data.users
                .filter(
                  user => user.userProjectRole === userProjectRole.ADVISOR,
                )
                .map(userData => (
                  <p key={userData.user.id} className="text-gray-500">
                    <span className="font-bold text-black">ที่ปรึกษา : </span>
                    {userData.user.name}
                  </p>
                ))}
              {data.users.some(
                user => user.userProjectRole === userProjectRole.CO_ADVISOR,
              ) && (
                <div>
                  {data.users
                    .filter(
                      user =>
                        user.userProjectRole === userProjectRole.CO_ADVISOR,
                    )
                    .map(userData => (
                      <p key={userData.user.id} className="text-gray-500">
                        <span className="font-bold text-black">
                          {' '}
                          ที่ปรึกษาร่วม :{' '}
                        </span>
                        {userData.user.name}
                      </p>
                    ))}
                </div>
              )}
              {data.users.some(
                user => user.userProjectRole === userProjectRole.COMMITTEE,
              ) && (
                <div>
                  {data.users
                    .filter(
                      user =>
                        user.userProjectRole === userProjectRole.COMMITTEE,
                    )
                    .map(userData => (
                      <p key={userData.user.id} className="text-gray-500">
                        <span className="font-bold text-black">กรรมการ : </span>
                        {userData.user.name}
                      </p>
                    ))}
                </div>
              )}
            </div>
            <div>
              <p className="text-gray-500">
                <span className="font-bold text-black">อัปเดตล่าสุด : </span>
                {dayjs(data.updatedAt)
                  .add(543, 'year')
                  .format('DD/MM/YYYY เวลา HH.mmน.')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const menuSelection = (
  userRole: number,
  projectId: number,
  courseMenu: number,
  onSuccess?: () => void,
) => {
  const commonButtonClasses =
    'btn w-full rounded-md bg-primary2-400 text-white transition-colors duration-200 hover:bg-primary2-500 flex items-center justify-center gap-2 px-4'

  return (
    <div className="flex w-full flex-col gap-2">
      {userRole === userRoles.Teacher ? (
        <Link href={`/teacher/consultant/${projectId}/docs`}>
          <button className={commonButtonClasses}>
            <AssignmentIcon className="shrink-0" />{' '}
            <span className="flex-1 text-center">ตรวจสอบเอกสาร</span>
          </button>
        </Link>
      ) : (
        <Link href={`/teacher/project-detail/${projectId}/docs`}>
          <button className={commonButtonClasses}>
            <AssignmentIcon className="shrink-0" />{' '}
            <span className="flex-1 text-center">ตรวจสอบเอกสาร</span>
          </button>
        </Link>
      )}
      {courseMenu === course.Project && (
        <Link href={`/teacher/project-detail/${projectId}/progress-report`}>
          <button className={commonButtonClasses}>
            <ProgressIcon className="shrink-0" />{' '}
            <span className="flex-1 text-center">ตรวจสอบความคืบหน้า</span>
          </button>
        </Link>
      )}

      {userRole === userRoles.Teacher ? (
        <div className="space-y-2">
          <UpdateCourseStatusDialog
            ids={[projectId]}
            newCourseStatus={
              courseMenu === course.PreProject
                ? courseStatus.ApprovePreExam
                : courseMenu === course.Project
                  ? courseStatus.ApproveProjectExam
                  : courseStatus.ApprovePreExam
            }
            onSuccess={onSuccess}
          >
            <button className={commonButtonClasses}>
              <CheckCircleIcon className="shrink-0" />{' '}
              <span className="flex-1 text-center">อนุมัติสอบ</span>
            </button>
          </UpdateCourseStatusDialog>

          <UpdateExamDocsDialog projectId={projectId} courseId={courseMenu}>
            <button className={commonButtonClasses}>
              <GradeIcon className="shrink-0" />
              <span className="flex-1 text-center">ส่งคะแนนสอบ</span>
            </button>
          </UpdateExamDocsDialog>
        </div>
      ) : (
        <PointTeacherDialog projectId={projectId} >
          <button className={commonButtonClasses}>
            <PreviewIcon className="shrink-0" />
            <span className="flex-1 text-center">ตรวจคะแนนสอบ</span>
          </button>
        </PointTeacherDialog>
      )}
    </div>
  )
}
