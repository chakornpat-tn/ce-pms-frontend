'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import WarningIcon from '@mui/icons-material/Warning'
import { useRouter } from 'next/navigation'
import { deleteProject } from '@/actions/project'
import { useState } from 'react'
import { useTransition } from 'react'

type Props = {
  trigger: React.ReactNode
  handleClose?: () => void
  projectInfo: {
    projectId: number
    projectName: string
  }
}

const DeleteProjectModalForm: React.FC<Props> = ({
  trigger,
  handleClose,
  projectInfo,
}: Props) => {
  const [_, startTransition] = useTransition()
  const router = useRouter()
  const [isDialogOpen, setDialogOpen] = useState(false)

  const closeModal = () => {
    setDialogOpen(false)
    handleClose?.()
  }

  const handleDelete = () => {
    startTransition(async () => {
      await deleteProject(projectInfo.projectId)
      closeModal()
      router.refresh() // Refresh to reflect changes
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setDialogOpen(true)}>{trigger}</div>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-md-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center">
          <WarningIcon className="text-9xl text-red-500" />
          <DialogHeader className="flex items-center w-full text-center mt-4">
            <DialogTitle className="text-3xl font-medium text-primary1">
              ลบโปรเจกต์
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-2">
              คุณต้องการลบโปรเจกต์{' '}
              <span className="font-bold underline">
                {projectInfo.projectName}
              </span>{' '}
              ใช่หรือไม่?
          </DialogDescription>
        </div>
        <div className="mt-4 flex justify-around">
          <button
            type="button"
            onClick={handleDelete}
            className="w-2/5 rounded-md bg-red-400 px-4 py-2 text-white hover:bg-red-600"
          >
            ลบ
          </button>
          <button
            type="button"
            onClick={closeModal}
            className="w-2/5 rounded-md bg-primary2-200 px-4 py-2 text-white hover:bg-primary2-500"
          >
            ยกเลิก
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export { DeleteProjectModalForm }
