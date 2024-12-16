'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Comment, CreateCommentReq } from '@/models/Comment'
import {
  AddCircleRounded,
  IndeterminateCheckBoxRounded,
} from '@mui/icons-material'
import { useActionState, useState } from 'react'
import { CreateComments } from '@/actions/comment'

type Props = {
  trigger: React.ReactNode
  projectDocsId: number
  onSuccess?: () => void
}

export function CreateCommentsDialog({
  trigger,
  projectDocsId,
  onSuccess,
}: Props) {
  const [comments, setComments] = useState<CreateCommentReq[]>([
    { content: '', projectDocumentId: projectDocsId },
  ])
  const [open, setOpen] = useState(false)
  const [error, action, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        await CreateComments(null, formData)
        setOpen(false)
        setComments([{ content: '', projectDocumentId: projectDocsId }])
        if (onSuccess) onSuccess()
      } catch (err) {
        return 'เกิดข้อผิดพลาดในการสร้างโครงงาน'
      }
    },
    undefined,
  )

  const addComment = () => {
    setComments([
      ...comments,
      { content: '', projectDocumentId: projectDocsId },
    ])
  }

  const removeComment = (index: number) => {
    if (comments.length <= 1) return
    const newComments = [...comments]
    newComments.splice(index, 1)
    setComments(newComments)
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-dvw overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>แสดงความคิดเห็น</DialogTitle>
          <DialogDescription>เพิ่มความคิดเห็นให้กับเอกสารนี้</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <form action={action} className="space-y-4">
            <div>
              <div className="mb-2 flex items-center">
                <label className="block text-sm font-medium">
                  เพิ่มความคิดเห็น
                </label>
                <button
                  type="button"
                  onClick={addComment}
                  className="ml-2 rounded-md p-1 text-primary2-400 transition-all duration-200 hover:text-primary2-500"
                >
                  <AddCircleRounded />
                </button>
              </div>
              {comments.map((_, index) => (
                <div key={index} className="mb-2 flex space-x-2">
                  <textarea
                    name={`comments[${index}].content`}
                    placeholder={`แสดงความคิดเห็น ${index + 1}`}
                    className="w-[100%] rounded-md border px-3 py-2"
                    required
                  />
                  <input
                    type="hidden"
                    name={`comments[${index}].projectDocumentId`}
                    value={projectDocsId}
                  />
                  <button
                    type="button"
                    onClick={() => removeComment(index)}
                    className="rounded-md px-2 text-red-300 transition-all duration-200 hover:text-red-500"
                  >
                    <IndeterminateCheckBoxRounded />
                  </button>
                </div>
              ))}
            </div>
            <button
              disabled={isPending}
              type="submit"
              className="w-[100%] rounded-md bg-primary2-400 px-4 py-2 text-secondary1 hover:bg-primary2-500"
            >
              {isPending ? 'กำลังส่ง ....' : 'ส่ง'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
