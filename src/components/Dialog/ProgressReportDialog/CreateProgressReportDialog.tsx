'use client'
import { GetProjectByID, updateMultipleProjects } from '@/actions/project'
import { CloudUpload } from '@mui/icons-material'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useActionState, useState } from 'react'
import useSWR from 'swr'
import { CreateProgressReport } from '@/actions/progressReport'

type Props = {
  children: React.ReactNode
  progressCount: number
  onSuccess?: () => void
}
export function CreateProgressReportDialog({
  children,
  onSuccess,
  progressCount = 1,
}: Props) {
  const [open, setOpen] = useState(false)

  const handleAction = (prevState: unknown, formData: FormData) => {
    CreateProgressReport(prevState, formData)
    setProductFileName('')
    setDocsFileName('')
    onSuccess?.()
    setOpen(false)
  }
  const [error, action, isPending] = useActionState(handleAction, null)

  const [productFileName, setProductFileName] = useState('')
  const [docsFileName, setDocsFileName] = useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto rounded bg-white p-4 md:h-auto md:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg md:text-xl">
            ส่งรายงานความคืบหน้าครั้งที่ {progressCount}
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto max-w-2xl space-y-4 md:space-y-6">
          <form className="space-y-3 md:space-y-4" action={action}>
            <input
              type="hidden"
              name="title"
              value={`รายงานความคืบหน้าครั้งที่ ${progressCount}`}
            />
            <div className="space-y-2">
              <label htmlFor="section-1" className="text-sm md:text-base">
                1 แสดงรายละเอียดของผลการดำเนินงาน
                พร้อมสรุปและวิเคราะห์ผลที่ได้ดำเนินการไปแล้ว
              </label>
              <textarea
                id="section-1"
                name="section-1"
                className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base"
                placeholder="กรุณากรอกรายละเอียด..."
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="section-2" className="text-sm md:text-base">
                2 ระบุรายละเอียดที่ได้แก้ไขปรับปรุงข้อเสนอโครงงานวิศวกรรม
                (ถ้ามี) เนื่องจากมีปัญหาและอุปสรรคระหว่าง
                ดำเนินงานโครงงานวิศวกรรม(โปรดระบุ)
              </label>
              <textarea
                id="section-2"
                name="section-2"
                className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base"
                placeholder="กรุณากรอกรายละเอียด..."
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="section-3" className="text-sm md:text-base">
                3 งานตามแผนโครงงานวิศวกรรมที่จะทำต่อไป
              </label>
              <textarea
                id="section-3"
                name="section-3"
                className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base"
                placeholder="กรุณากรอกรายละเอียด..."
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="section-4" className="text-sm md:text-base">
                4 สรุปปริมาณงานที่ได้ดำเนินการแล้วเสร็จทั้งโครงงาน
                คิดเป็นเปอร์เซ็นต์
              </label>
              <ProgressForm />
            </div>
            <div className="space-y-2">
              <label className="text-sm md:text-base">
                อัปโหลดเอกสารและภาพชิ้นงานที่ได้ดำเนินการแล้วเสร็จ(pdf)
              </label>
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    name="docs_file"
                    required
                    accept=".pdf"
                    id="docs_file"
                    onChange={e =>
                      setDocsFileName(e.target.files?.[0]?.name || '')
                    }
                  />
                  <label
                    htmlFor="docs_file"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border-2 border-primary2-400 bg-white p-3 text-sm transition-all hover:bg-gray-50"
                  >
                    <CloudUpload className="h-5 w-5 text-primary2-400" />
                    <span className="text-primary2-400">
                      {docsFileName || 'อัปโหลดเอกสารรายงาน (บังคับ)'}
                    </span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    className="hidden"
                    name="product_file"
                    accept=".pdf"
                    id="product_file"
                    onChange={e =>
                      setProductFileName(e.target.files?.[0]?.name || '')
                    }
                  />
                  <label
                    htmlFor="product_file"
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-gray-300 bg-white p-3 text-sm transition-all hover:border-primary2-400 hover:bg-gray-50 hover:text-primary2-400"
                  >
                    <CloudUpload className="h-5 w-5" />
                    <span className="text-gray-500">
                      {productFileName ||
                        'อัปโหลดเอกสารตัวอย่างชิ้นงาน (ไม่บังคับ)'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-400"
            >
              {isPending ? 'กำลังส่ง...' : 'ส่งรายงาน'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProgressForm = () => {
  const [sections, setSections] = useState([
    {
      id: 'บทคัดย่อ / ปก / สารบัญ และอื่น',
      weight: 10,
      percent: 0,
    },
    { id: 'บทที่ 1', weight: 10, percent: 0 },
    { id: 'บทที่ 2', weight: 15, percent: 0 },
    { id: 'บทที่ 3', weight: 25, percent: 0 },
    { id: 'บทที่ 4', weight: 25, percent: 0 },
    { id: 'บทที่ 5', weight: 10, percent: 0 },
    { id: 'ภาคผนวก และ อื่นๆ', weight: 5, percent: 0 },
  ])
  const calculateTotal = () => {
    return sections.reduce((acc, section) => acc + section.percent, 0)
  }
  const handlePercentChange = (index: number, value: string) => {
    const newSections = [...sections]
    newSections[index].percent = Number(value) || 0
    setSections(newSections)
  }

  return (
    <div className="mx-auto max-w-3xl rounded-lg border bg-white p-2 shadow-sm md:p-4">
      <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 md:text-sm">
        <div className="border-b pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
          <h3 className="mb-2 text-center font-semibold md:mb-4">ด้านเอกสาร</h3>
          <div className="space-y-2 md:space-y-4">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className="flex flex-wrap items-center gap-1 md:flex-nowrap md:gap-3"
              >
                <span className="w-full text-sm md:w-auto md:flex-1">
                  {section.id} ({section.weight}%) คิดเป็น
                </span>
                <input
                  type="number"
                  name={`progress-${index + 1}`}
                  min="0"
                  max={section.weight}
                  value={section.percent}
                  onChange={e => handlePercentChange(index, e.target.value)}
                  className="w-16 rounded border text-right text-sm md:w-20"
                />
                <span>%</span>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 font-semibold md:pt-4">
              <span>รวมทั้งหมด (100%)</span>
              <div className="flex items-center gap-2">
                <span>{calculateTotal().toFixed(2)}</span>
                <span>%</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4 md:pl-4 md:pt-0">
          <h3 className="mb-2 text-center font-semibold md:mb-4">
            ด้านชิ้นงาน
          </h3>
          <div className="space-y-2 md:space-y-4">
            <p className="mb-4 text-center text-sm md:mb-8">
              คิดเป็นภาพรวม เมื่อเทียบกับ
              <br />
              ขอบเขตของงานทั้งหมด (100%)
            </p>
            <div className="flex items-center justify-center gap-2">
              <span>คิดเป็น</span>
              <input
                type="number"
                name="product-progress"
                required
                min={0}
                defaultValue={0}
                max={100}
                className="w-20 rounded border text-right text-sm md:w-24"
              />
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
