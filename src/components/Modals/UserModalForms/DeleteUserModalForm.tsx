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
import { deleteUser } from '@/actions/user'
import { useState } from 'react'
import { useTransition } from 'react'

type Props = {
  children: React.ReactNode
  handleClose?: () => void
  onUpdate?: () => void
  userInfo: {
    userId: number
    userName: string
  }
}

const DeleteUserModalForm: React.FC<Props> = ({
  children,
  handleClose,
  onUpdate,
  userInfo,
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
      await deleteUser(userInfo.userId)
      onUpdate?.()
      closeModal()
    })
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <div onClick={() => setDialogOpen(true)}>{children}</div>
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-md-2xl bg-white p-6 shadow-xl">
        <div className="flex flex-col items-center">
          <WarningIcon className="text-9xl text-red-500" />
          <DialogHeader className="flex items-center w-full text-center mt-4">
            <DialogTitle className="text-3xl font-medium text-primary1">
              ลบบัญชีผู้ใช้
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="mt-2">
            คุณต้องการลบบัญชีผู้ใช้{' '}
            <span className="font-bold underline">
              {userInfo.userName}
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

export { DeleteUserModalForm }
