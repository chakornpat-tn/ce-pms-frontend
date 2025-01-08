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
  CloudUpload,
  IndeterminateCheckBoxRounded,
} from '@mui/icons-material'
import { useActionState, useState } from 'react'
import { CreateComments } from '@/actions/comment'
import { UpdateAdvisorDocs } from '@/actions/projectDocuments'

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
  const [comments, setComments] = useState<CreateCommentReq[]>([])
  const [docsFileName, setDocsFileName] = useState('')
  const [open, setOpen] = useState(false)
  const [error, action, isPending] = useActionState(
    async (previousState: unknown, formData: FormData) => {
      try {
        if (docsFileName) await UpdateAdvisorDocs(null, formData)

        if (comments.length > 0) await CreateComments(null, formData)

        setOpen(false)
        setComments([])
        setDocsFileName('')
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
    if (comments.length == 0) return
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
        <div className="grid gap-4 py-2">
          <form action={action} className="space-y-4">
            <input
              type="hidden"
              name="projectDocumentId"
              value={projectDocsId}
            />
            <div>
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  เอกสารรายงานจุดผิดพลาด
                </label>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    name="advisor_docs_file"
                    accept=".pdf"
                    id="advisor_docs_file"
                    onChange={e =>
                      setDocsFileName(e.target.files?.[0]?.name || '')
                    }
                  />
                  <label
                    htmlFor="advisor_docs_file"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-3 text-sm transition-all hover:border-primary2-400 hover:bg-gray-50 hover:text-primary2-400"
                  >
                    <CloudUpload className="h-5 w-5" />
                    <span className="text-gray-500">
                      {docsFileName ||
                        'อัปโหลดเอกสารตัวอย่างชิ้นงาน (ไม่บังคับ)'}
                    </span>
                  </label>
                </div>
              </div>
              <div className="my-2 flex items-center">
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
              disabled={isPending || (!docsFileName && comments.length === 0)}
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
