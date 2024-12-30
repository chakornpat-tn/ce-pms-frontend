import projectDocumentStatus from '@/constants/projectDocumentStatus/projectDocumentStatus'
import { Document } from '@/models/Document'
import { ProjectDocument } from '@/models/ProjectDocument'
import React from 'react'

type CourseStepperProps = {
  steps: Document[]
  projectDocsProgress?: ProjectDocument[]
}

const CourseStepper: React.FC<CourseStepperProps> = ({
  steps,
  projectDocsProgress,
}) => {
  const getStepStatus = (step: Document) => {
    const stepDocsStatus = projectDocsProgress?.find(
      doc => doc.documentId === step.id,
    )?.status

    if (stepDocsStatus) {
      return stepDocsStatus === projectDocumentStatus.APPROVED
        ? 'border-green-500 bg-green-50 text-green-500'
        : stepDocsStatus === projectDocumentStatus.REJECTED
          ? 'border-red-500 bg-red-50 text-red-500'
          : stepDocsStatus === projectDocumentStatus.SEEN
            ? 'border-blue-500 bg-blue-50 text-blue-500'
            : 'border-black bg-gray-50 text-black'
    }
    return step.submissionOpen
      ? 'border-yellow-500 bg-yellow-50 text-yellow-500'
      : 'border-gray-200 bg-gray-50 text-gray-500'
  }

  const getStatusDescription = (status: string) => {
    switch (status) {
      case 'border-green-500 bg-green-50 text-green-500':
        return 'อนุมัติแล้ว'
      case 'border-red-500 bg-red-50 text-red-500':
        return 'ไม่อนุมัติ'
      case 'border-blue-500 bg-blue-50 text-blue-500':
        return 'ดำเนินการตรวจสอบ'
      case 'border-yellow-500 bg-yellow-50 text-yellow-500':
        return 'รอส่งงาน'
      case 'border-black bg-gray-50 text-black':
        return 'รอตรวจสอบ'
      case 'border-gray-200 bg-gray-50 text-gray-500':
        return 'ยังไม่เปิดให้ส่งงาน'
      default:
        return 'รอดำเนินการ'
    }
  }
  return (
    <div className="w-full px-4 py-6">
      <div className="block overflow-x-auto">
        <div className="flex min-w-max items-center justify-between">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all duration-200 cursor-help ${getStepStatus(
                    step,
                  )}`}
                  title={getStatusDescription(getStepStatus(step))}
                >
                  {index + 1}
                </div>
                <div className="mt-2 text-center">
                  <h3
                    className={`text-sm font-medium ${
                      step.submissionOpen ? 'text-blue-500' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </h3>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="mx-4 mt-5 h-0.5 flex-1 bg-gray-200" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-4 justify-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-green-500 bg-green-50"></div>
          <span className="text-sm">อนุมัติแล้ว</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-red-500 bg-red-50"></div>
          <span className="text-sm">ไม่อนุมัติ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-blue-500 bg-blue-50"></div>
          <span className="text-sm">ดำเนินการตรวจสอบ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-black bg-gray-50 text-black"></div>
          <span className="text-sm">รอตรวจสอบ</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-yellow-500 bg-yellow-50"></div>
          <span className="text-sm">รอส่งงาน</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-full border-2 border-gray-200 bg-gray-50"></div>
          <span className="text-sm">ยังไม่เปิดให้ส่งงาน</span>
        </div>
      </div>
    </div>
  )
}

export default CourseStepper