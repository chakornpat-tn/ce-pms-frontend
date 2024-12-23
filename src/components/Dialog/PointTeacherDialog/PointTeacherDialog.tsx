'use client'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'

type Props = {
  trigger: React.ReactNode
  projectId: number
  projectName: string // Add projectName prop to display the project name
}

const PointTeacherDialog = ({ trigger, projectId, projectName }: Props) => {
  const [open, setOpen] = useState(false)

  // Example raw data for teacher feedback (replace with actual data from your application)
  const feedbackData = [
    {
      teacherName: "อาจารย์สมชาย", 
      score: "85", 
      preparationScore: "90", 
      projectScore: "95", // Added project score
      scoreUrl: "http://example.com/score", 
      projectUrl: "http://example.com/project" // Added project URL
    },
    {
      teacherName: "อาจารย์สุภาพ", 
      score: "88", 
      preparationScore: "92", 
      projectScore: "94", // Added project score
      scoreUrl: "http://example.com/score2",
      projectUrl: "http://example.com/project2" // Added project URL
    },
    {
      teacherName: "อาจารย์สุกัญญา", 
      score: "80", 
      preparationScore: "85", 
      projectScore: "88", // Added project score
      scoreUrl: "http://example.com/score3",
      projectUrl: "http://example.com/project3" // Added project URL
    }
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-full overflow-y-auto bg-white"> {/* Removed fixed height */}
        <DialogHeader>
          <DialogTitle>{projectName || 'โครงงานต่อยฟันร่วง'}</DialogTitle> {/* Default project name */}
          <DialogDescription>ข้อมูลสำหรับโครงงานนี้</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            {feedbackData.map((data, index) => (
              <div key={index} className="grid grid-cols-6 gap-4"> {/* 6 columns for all fields */}
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>ชื่ออาจารย์:</strong> {data.teacherName}
                </div>
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>คะแนน:</strong> {data.score}
                </div>
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>ใบคะแนนวิชาเตรียม:</strong> {data.preparationScore}
                </div>
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>URL (PreProject):</strong> <a href={data.scoreUrl} target="_blank" rel="noopener noreferrer">{data.scoreUrl}</a>
                </div>
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>ใบคะแนนวิชาโครงงาน:</strong> {data.projectScore}
                </div>
               
                <div className="w-full rounded-md border px-3 py-2">
                  <strong>URL (Project):</strong> <a href={data.projectUrl} target="_blank" rel="noopener noreferrer">{data.projectUrl}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PointTeacherDialog
