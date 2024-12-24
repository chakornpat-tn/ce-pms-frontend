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
import {
  GetProgressReportById,
} from '@/actions/progressReport'
import { Loader } from '@/components/Loading'
import { ProgressReport, ReportResultType } from '@/models/ProgressReport'

type Props = {
  children: React.ReactNode
  progressId: number
  onSuccess?: () => void
}

export function ProgressDetailDialog({ children, progressId }: Props) {
  const [open, setOpen] = useState(false)

  const { data, error, isLoading, mutate } = useSWR(
    `/progress-report/${progressId}`,
    () => GetProgressReportById(progressId),
  )

  if (error) return

  if (isLoading)
    <section className="relative mt-0 flex min-h-[85dvh] items-center justify-center overflow-x-auto rounded bg-white p-10 shadow-md">
      <Loader />
    </section>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] max-w-4xl overflow-y-auto rounded bg-white p-4 md:h-auto md:p-6">
        <DialogHeader>
          <DialogTitle>
          
          </DialogTitle>
        </DialogHeader>
        <div className="mx-auto max-w-2xl space-y-4 md:space-y-6">
          <div className="space-y-2">
            {data?.reportResult && <EvaluationForm data={data} />}
          </div>
          <div className="space-y-3 md:space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold md:text-base">
                1 แสดงรายละเอียดของผลการดำเนินงาน
                พร้อมสรุปและวิเคราะห์ผลที่ได้ดำเนินการไปแล้ว
              </label>
              <div className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base">
                {data?.report?.section1 ?? '-'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold md:text-base">
                2 ระบุรายละเอียดที่ได้แก้ไขปรับปรุงข้อเสนอโครงงานวิศวกรรม
                (ถ้ามี)
              </label>
              <div className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base">
                {data?.report?.section2 ?? '-'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold md:text-base">
                3 งานตามแผนโครงงานวิศวกรรมที่จะทำต่อไป
              </label>
              <div className="min-h-[80px] w-full rounded-md border p-2 text-sm md:min-h-[100px] md:text-base">
                {data?.report?.section3 ?? '-'}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold md:text-base">
                4 สรุปปริมาณงานที่ได้ดำเนินการแล้วเสร็จทั้งโครงงาน
                คิดเป็นเปอร์เซ็นต์
              </label>
              <ProgressDisplay
                productProgress={data?.report?.productProgress ?? 0}
                documentSections={data?.report?.documentSections ?? []}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold md:text-base">
                เอกสารและภาพชิ้นงานที่ได้ดำเนินการแล้วเสร็จ
              </label>
              <div className="space-y-2">
                {data?.productUrl && (
                  <a
                    href={data?.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-2 rounded-md border p-3 text-sm hover:bg-gray-50"
                  >
                    <CloudUpload className="h-5 w-5" />
                    <span>ดูเอกสารตัวอย่างชิ้นงาน</span>
                  </a>
                )}
                {data?.docsUrl && (
                  <a
                    href={data?.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center gap-2 rounded-md border-2 border-primary2-400 p-3 text-sm hover:bg-gray-50"
                  >
                    <CloudUpload className="h-5 w-5 text-primary2-400" />
                    <span className="text-primary2-400">ดูเอกสารรายงาน</span>
                  </a>
                )}
              </div>
            </div>

            <div className="mt-8 border-t"></div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProgressDisplay = ({
  productProgress,
  documentSections,
}: {
  documentSections: {
    id: string
    percent: number
  }[]
  productProgress: number
}) => {
  const [docsSection, setDocsSection] = useState(documentSections)
  const sections = [
    { id: 'บทคัดย่อ / ปก / สารบัญ และอื่น', weight: 10 },
    { id: 'บทที่ 1', weight: 10 },
    { id: 'บทที่ 2', weight: 15 },
    { id: 'บทที่ 3', weight: 25 },
    { id: 'บทที่ 4', weight: 25 },
    { id: 'บทที่ 5', weight: 10 },
    { id: 'ภาคผนวก และ อื่นๆ', weight: 5 },
  ]

  return (
    <div className="mx-auto max-w-3xl rounded-lg border bg-white p-2 shadow-sm md:p-4">
      <div className="grid grid-cols-1 gap-4 text-xs md:grid-cols-2 md:text-sm">
        <div className="border-b pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-4">
          <h3 className="mb-2 text-center font-semibold md:mb-4">ด้านเอกสาร</h3>
          <div className="space-y-2 md:space-y-4">
            {docsSection.map((docs, index) => (
              <div
                key={docs.id}
                className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap"
              >
                <span className="w-full text-sm md:w-auto md:flex-1">
                  {sections[index].id} ({sections[index].weight}%) คิดเป็น
                </span>
                <div className="flex items-center gap-2">
                  <span className="w-16 text-right">{docs.percent}</span>
                  <span>%</span>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between border-t pt-2 font-semibold md:pt-4">
              <span>รวมทั้งหมด (100%)</span>
              <div className="flex items-center gap-2">
                <span>
                  {docsSection.reduce(
                    (sum, doc) => sum + Number(doc.percent),
                    0,
                  )}
                </span>
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
              <span className="w-20 text-right">{productProgress}</span>
              <span>%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const EvaluationForm = ({ data }: { data: ProgressReport }) => {
  return (
    <div className="mx-auto max-w-4xl rounded-md bg-white p-6 shadow-md">
      <h1 className="mb-4 text-xl font-bold">
        ผลการประเมินรายงานความก้าวหน้า โครงการวิศวกรรม/วิจัย
      </h1>
      <div>
        {/* สรุปความเห็นของอาจารย์ที่ปรึกษา */}
        <div className="mb-4">
          {[
            'ความสามารถในการทำงานเป็นกลุ่ม',
            'ระดับความเข้าใจของนักศึกษาในข้อเสนอโครงการวิศวกรรม',
            'ความสามารถในการแก้ไขปัญหาเฉพาะหน้า',
            'ความถี่ในการมาขอคำปรึกษา',
          ].map((question, index) => (
            <div key={index} className="mt-4 md:mt-6">
              <div className="flex flex-col gap-1 md:flex-row md:gap-2">
                <div className="flex w-full items-center justify-between">
                  <label className="font-medium">{question}:</label>
                  <div className="flex gap-1 md:gap-2">
                    <span className="text-sm text-gray-700 md:text-base">
                      {(() => {
                        const score =
                          data?.reportResult?.questionSections?.[
                            `question${index}` as keyof typeof data.reportResult.questionSections
                          ]
                        switch (score) {
                          case 3:
                            return 'น้อย'
                          case 4:
                            return 'ปานกลาง'
                          case 5:
                            return 'มาก'
                          default:
                            return ''
                        }
                      })()}
                    </span>
                    <span className="text-sm text-gray-700 md:text-base">
                      (
                      {
                        data?.reportResult?.questionSections?.[
                          `question${index}` as keyof typeof data.reportResult.questionSections
                        ]
                      }
                      คะแนน)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="mt-2 md:mt-4">
            <label className="font-medium">ข้อเสนอแนะ</label>
            <div className="mt-1 md:mt-2">
              <p className="min-h-[80px] w-full rounded-md bg-gray-50 p-2 text-sm text-gray-700 md:min-h-[100px] md:text-base">
                {data.reportResult?.comment}
              </p>
            </div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="font-semibold">สรุปปริมาณงานกลุ่ม</h2>
          <div className="flex items-center gap-4">
            <label>เอกสารการโครงการ:</label>
            {data.docsProgress}
            <span>%</span>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <label>ชิ้นงาน / ระบบ:</label>
            {data.productProgress}
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
