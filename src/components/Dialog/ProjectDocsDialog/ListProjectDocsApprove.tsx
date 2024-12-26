'use client'
import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Typography from '@mui/material/Typography'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import useSWR from 'swr'
import { ListProjectDocsApprove } from '@/actions/projectDocuments'

type Props = {
  children: React.ReactNode
  projectId: number
}

export function ListProjectDocsApproveDialog({ children, projectId }: Props) {
  const [open, setOpen] = useState(false)
  const { data, isLoading, error } = useSWR(
    `/project-document/advisor-approve/${projectId}`,
    () => ListProjectDocsApprove(projectId),
  )

  if (isLoading) return <div>Loading...</div>
  if (!data) return
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-6 rounded-lg">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">เอกสารที่อนุมัติจากที่ปรึกษา</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            {data.preProject.length > 0 ? (
              <Accordion className="shadow-sm">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                  className="hover:bg-gray-50"
                >
                  <Typography component="span" className="font-medium">วิชาเตรียมโครงงาน</Typography>
                </AccordionSummary>
                {data.preProject.map(project => (
                  <AccordionDetails key={project.id} className="border-t">
                    <a
                      href={project.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      <p className="py-1">{project.document.name}</p>
                    </a>
                  </AccordionDetails>
                ))}
              </Accordion>
            ) : null}
            {data.project.length > 0 ? (
              <Accordion className="shadow-sm">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2-content"
                  id="panel2-header"
                  className="hover:bg-gray-50"
                >
                  <Typography component="span" className="font-medium">วิชาโครงงาน</Typography>
                </AccordionSummary>
                {data.project.map(project => (
                  <AccordionDetails key={project.id} className="border-t">
                    <a
                      href={project.documentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-600 transition-colors"
                    >
                      <p className="py-1">{project.document.name}</p>
                    </a>
                  </AccordionDetails>
                ))}
              </Accordion>
            ) : null}
            {data.preProject.length === 0 && data.project.length === 0 && (
              <Typography className="text-center text-gray-500 py-8">
                ยังไม่มีเอกสารที่อนุมัติจากที่ปรึกษา
              </Typography>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
