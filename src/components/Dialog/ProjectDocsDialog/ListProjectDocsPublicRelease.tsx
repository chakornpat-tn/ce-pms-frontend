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
import {
  ListProjectDocsApprove,
  ListProjectDocsPublicRelease,
} from '@/actions/projectDocuments'

type Props = {
  children: React.ReactNode
  projectId: number
}

export function ListProjectDocsPublicReleaseDialog({
  children,
  projectId,
}: Props) {
  const [open, setOpen] = useState(false)
  const { data, error } = useSWR(
    `/project-document/public-release/${projectId}`,
    () => ListProjectDocsPublicRelease(projectId),
  )

  if (!data || error) return
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{data.length > 0 && children}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-lg bg-white p-6">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-semibold">
          เอกสารโครงงาน
          </DialogTitle>
        </DialogHeader>
        <section className="space-y-4">
          <article>
            {data.map(project => (
              <div key={project.id} className="border-t">
                <a
                  href={project.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-blue-600"
                >
                  <p className="py-1">{project.document.name}</p>
                </a>
              </div>
            ))}
          </article>
        </section>
      </DialogContent>
    </Dialog>
  )
}
