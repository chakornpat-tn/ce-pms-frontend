'use client'
import { updateMultipleProjects } from '@/actions/project'
import { ListProjectStatus } from '@/actions/projectStatus'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import course from '@/constants/course/course'
import { ProjectStatus } from '@/models/ProjectStatus'
import {
  Combobox,
  ComboboxButton,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react'

import { useActionState } from 'react'
import useSWR from 'swr'
import { useState } from 'react'

type Props = {
  children: React.ReactNode
  courseList: number
  ids: number[]
  onSuccess?: () => void
}

export function UpdateStatusDialog({
  children,
  courseList,
  ids = [],
  onSuccess,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState('')
  const { data, mutate, isLoading } = useSWR(
    `/v1/project-status?course=${courseList}`,
    () => ListProjectStatus({ course: courseList, isActive: true }),
  )

  const [open, setOpen] = useState(false)

  const [error, action, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        if (!selectedStatus || ids.length === 0) {
          return 'กรุณาเลือกสถานะโครงงาน'
        }
        await updateMultipleProjects(null, formData)
        setOpen(false)
        if (onSuccess) onSuccess()
      } catch (err) {
        return 'เกิดข้อผิดพลาดในการสร้างโครงงาน'
      }
    },
    undefined,
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-dvw bg-white">
        <DialogHeader>
          <DialogTitle>อัปเดตสถานะโครงงาน</DialogTitle>
          <DialogDescription>
            อัปเดตสถานะโครงงานทั้งหมดที่เลือก
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="space-y-4">
          <input type="hidden" name="ids" value={JSON.stringify(ids)} />
          <div>
            <div className="w-full max-w-screen-md px-2">
              <Combobox
                name="projectStatusId"
                value={selectedStatus}
                onChange={(value: string) => setSelectedStatus(value)}
              >
                <div className="relative">
                  <ComboboxButton className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-left text-xs shadow-sm transition-colors hover:border-primary2-400 focus:border-primary2-400 focus:outline-none focus:ring-2 focus:ring-primary2-400/20 sm:py-3 sm:pl-4 sm:pr-10 sm:text-sm">
                    <span className="block truncate">
                      {selectedStatus
                        ? data?.find(
                            (item: ProjectStatus) =>
                              item.id?.toString() === selectedStatus,
                          )?.name
                        : 'เลือกหัวข้อ'}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3">
                      <svg
                        className="h-4 w-4 text-gray-400 sm:h-5 sm:w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </ComboboxButton>
                  <ComboboxOptions className="absolute mt-1 max-h-48 w-full overflow-auto rounded-md bg-white py-1 text-xs shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none sm:max-h-60 sm:text-sm">
                    {data &&
                      data.map((item: ProjectStatus) => (
                        <ComboboxOption
                          key={item.id}
                          value={item.id?.toString()}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-8 pr-4 sm:py-3 sm:pl-10 ${active ? 'bg-primary2-400 text-white' : 'text-gray-900'}`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}
                              >
                                {item.name}
                              </span>
                            </>
                          )}
                        </ComboboxOption>
                      ))}
                  </ComboboxOptions>{' '}
                </div>
              </Combobox>
            </div>
          </div>
          <button
            disabled={isPending || ids.length === 0 || !selectedStatus}
            type="submit"
            className="w-[100%] rounded-md bg-primary2-400 px-4 py-2 text-secondary1 hover:bg-primary2-500"
          >
            {isPending ? 'อัปเดต....' : 'อัปเดต'}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
