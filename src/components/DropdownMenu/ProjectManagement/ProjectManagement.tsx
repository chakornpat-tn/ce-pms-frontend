'use client'
import { TuneRounded, Send } from '@mui/icons-material'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UpdateStatusDialog } from '@/components/Dialog/StatusDialog/UpdateStatusDialog'


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
          <div className="primary-hover flex cursor-pointer justify-start px-2 py-1">
            <UpdateStatusDialog
              courseList={courseList}
              ids={idSelection}
              onSuccess={onSuccess}
            >
              <div className="flex items-center gap-2">
                <TuneRounded />
                <span>อัพเดทสถานะ</span>
              </div>
            </UpdateStatusDialog>
          </div>
          <div className="primary-hover flex cursor-pointer justify-start px-2 py-1">
            <div className="flex items-center gap-2">
              <Send />
              <span>ส่งไปยังวิชาโครงงาน</span>
            </div>
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
