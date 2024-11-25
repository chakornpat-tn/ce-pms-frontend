'use client'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useTransition } from 'react'
import { deleteProject } from '@/actions/project'
import WarningIcon from '@mui/icons-material/Warning'
import { useRouter } from 'next/navigation'

type Props = {
  children: React.ReactNode
  handleClose?: () => void
  projectInfo: {
    projectId: number
    projectName: string
  }
}

function DeleteProjectModalForm({ children, handleClose, projectInfo }: Props) {
  const [_, startTransition] = useTransition()
  const router = useRouter()

  let [isOpen, setIsOpen] = useState(false)

  function closeModal() {
    setIsOpen(false)
    handleClose ? handleClose() : null
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <div onClick={openModal}>{children}</div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 bg-slate-500"
          onClose={closeModal}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 cursor-default overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-md transform flex-col items-center justify-center overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <WarningIcon className="text-9xl text-red-500" />
                  <Dialog.Title
                    as="h1"
                    className="py-2 text-3xl font-medium leading-6 text-primary1"
                  >
                    ลบโปรเจกต์
                  </Dialog.Title>
                  <p>
                    ลบโปรเจกต์{' '}
                    <span className="text-lg font-bold text-primary1 underline">
                      {projectInfo.projectName}
                    </span>
                  </p>
                  <div className="flex w-full items-center justify-around pt-2">
                    <button
                      type="submit"
                      className="mt-2 w-2/5 rounded-md bg-red-300 px-4 py-2 text-white hover:bg-red-500"
                      onClick={() => {
                        startTransition(async () => {
                          console.log(projectInfo.projectId)
                          await deleteProject(projectInfo.projectId)
                          closeModal()
                          window.location.reload()
                        })
                      }}
                    >
                      ลบ
                    </button>
                    <button
                      type="button"
                      onClick={closeModal}
                      className="mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
                    >
                      ยกเลิก
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export { DeleteProjectModalForm }
