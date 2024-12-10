'use client'
import { CreateProjectDocs } from '@/actions/projectDocuments'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState } from 'react'
import { CloudUpload } from '@mui/icons-material'
import { useState } from 'react'

type Props = {
  trigger: React.ReactNode
  projectId?: number
  documentId?: number
  documentName: string
}

export function UploadDocsDialog(props: Props) {
  const [error, action, isPending] = useActionState(CreateProjectDocs, null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [open, setOpen] = useState(false)
  const { trigger, projectId, documentId, documentName } = props
  if (!projectId || !documentId) return
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">อัพโหลดเอกสาร PDF</DialogTitle>
        </DialogHeader>
        <div className="mx-auto w-full p-4">
          <form className="space-y-4" action={ (formData) => {
            action(formData)
            setOpen(false)
            setSelectedFile(null)
          }} onSubmit={(e) => {
            if (!selectedFile) {
              e.preventDefault()
              return
            }
          }}>
            <input type="hidden" name="projectId" value={projectId} />
            <input type="hidden" name="documentId" value={documentId} />
            <input type="hidden" name="documentName" value={documentName} />
            <div className="flex flex-col items-center justify-center">
              <input
                type="file"
                id="document"
                name="document"
                accept=".pdf"
                className="hidden"
                onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              />
              <label
                htmlFor="document"
                className="flex flex-col items-center gap-2 cursor-pointer"
              >
                <CloudUpload className="w-12 h-12 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {selectedFile ? selectedFile.name : 'คลิกเลือกไฟล์ PDF'}
                </span>
              </label>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isPending || !selectedFile}
                className="inline-flex items-center gap-2 rounded-md bg-primary2-400 px-4 py-2 text-sm font-medium text-white hover:bg-primary2-500 focus:outline-none"
              >
                <CloudUpload className="w-4 h-4" />
                อัพโหลด
              </button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}