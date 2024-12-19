'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState, useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/th'
import { UpdateProjectFormToken } from '@/actions/project'

type Props = {
  children: React.ReactNode
  projectId: number
  onSuccess?: () => void
}

export function ProjectSelectExamDate({
  children,
  projectId,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false)

    const [error, action, isPending] = useActionState(
      async (state: void | null, formData: FormData) => {
        await UpdateProjectFormToken(null,formData)
        setOpen(false)
        if (onSuccess) onSuccess()
        return null
      },
      null
    )
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-dvw bg-white">
        <DialogHeader>
          <DialogTitle>กำหนดวันและเวลาสอบ</DialogTitle>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <div className="w-full max-w-screen-md px-2">
            <label
              htmlFor="datetime"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              เลือกวันและเวลา
            </label>
            <input
              id="datetime"
              type="datetime-local"
              name="examDateTime"
              placeholder="เลือกวันและเวลาสอบ"
              className="mt-1 block w-full rounded-md border border-gray-300 bg-white px-2 py-1 text-sm text-gray-700 focus:border-blue-500 focus:ring-blue-500"
              lang="th"
              data-date-format="th-TH"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="primary-hover rounded-md border border-gray-300 px-4 py-2 text-gray-700"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-md bg-primary2-400 px-4 py-2 text-secondary1 transition-colors duration-200 hover:bg-primary2-500"
            >
              {isPending ? 'อัปเดต...' : 'อัปเดต'}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
