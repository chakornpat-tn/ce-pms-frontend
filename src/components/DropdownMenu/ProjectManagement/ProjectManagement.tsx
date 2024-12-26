'use client'
import { TuneRounded, Send, Close } from '@mui/icons-material'
import { UpdateCourseStatusDialog } from '@/components/Dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UpdateStatusDialog } from '@/components/Dialog/StatusDialog/UpdateStatusDialog'
import courseStatus from '@/constants/course/courseStatus'
import course from '@/constants/course/course'

type Props = {
  children: React.ReactNode
  courseList: number
  idSelection: number[]
  onSuccess: () => void
}

export function ProjectManagementMenu({
  children,
  idSelection,
  onSuccess,
  courseList,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="flex cursor-pointer justify-start gap-2">
            <UpdateStatusDialog
              courseList={courseList}
              ids={idSelection}
              onSuccess={onSuccess}
            >
              <div className="flex items-center gap-2">
                <TuneRounded className="h-4 w-4" />
                <span>อัปเดตสถานะ</span>
              </div>
            </UpdateStatusDialog>
          </DropdownMenuItem>
          {courseList === course.PreProject && (
            <DropdownMenuItem className="flex cursor-pointer justify-start gap-2">
              <UpdateCourseStatusDialog
                newCourseStatus={courseStatus.PassPre}
                ids={idSelection}
                onSuccess={onSuccess}
                nullOnSuccess={true}
              >
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>ผ่านวิชาเตรียมโครงงาน</span>
                </div>
              </UpdateCourseStatusDialog>
            </DropdownMenuItem>
          )}
          {courseList === course.Project && (
            <DropdownMenuItem className="flex cursor-pointer justify-start gap-2">
              <UpdateCourseStatusDialog
                newCourseStatus={courseStatus.Pass}
                ids={idSelection}
                onSuccess={onSuccess}
                nullOnSuccess={true}
              >
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  <span>ผ่านวิชาโครงงาน</span>
                </div>
              </UpdateCourseStatusDialog>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem className="flex cursor-pointer justify-start gap-2">
            <UpdateCourseStatusDialog
              newCourseStatus={courseStatus.Fail}
              ids={idSelection}
              onSuccess={onSuccess}
              nullOnSuccess={true}
            >
              <div className="flex items-center gap-2">
                <Close className="h-4 w-4" />
                <span>โครงงานไม่ผ่าน</span>
              </div>
            </UpdateCourseStatusDialog>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
