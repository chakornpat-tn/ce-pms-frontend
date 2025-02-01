import Project from '@/app/teacher/present/project/page'
import { ProjectByIDRes } from './Project'

export type ProjectDocument = {
  id: number
  projectId: number
  documentId: number
  documentName: string
  documentUrl: string
  status: number
  createdAt: Date
  updatedAt: Date
}

export type ProjectDocumentRequest = {
  document: File
  data: string
}

type Comment = {
  id: number
  content: string
  projectDocumentId: number
}

type CommentBasedEdit = {
  id: number
  content: string
  projectDocumentId: number
}

export type ProjectDocumentRes = {
  id: number
  projectId: number
  documentId: number
  documentName: string
  documentUrl: string
  status: number
  createdAt: Date
  updatedAt: Date
  comments: Comment[]
  CommentBasedEdits: CommentBasedEdit[]
  advisorDocsUrl?: string
  releaseDocs: boolean
}

export type ProjectDocsAdvisorApproveRes = {
  id: number
  projectId: number
  documentId: number
  documentName: string
  documentUrl: string
  status: number
  createdAt: Date
  updatedAt: Date
  document: {
    course: number
    name: string
  }
}

export type ProjectDocsPublicRelease = {
  id: number
  projectId: number
  documentId: number
  documentName: string
  documentUrl: string
  advisorDocsUrl: null
  status: number
  createdAt: Date
  updatedAt: Date
  releaseDocs: boolean
  document: DocsPublicRelease
}

export type DocsPublicRelease = {
  course: number
  name: string
}

export type ProjectDocumentWaitUpdateRes = {
  project: ProjectByIDRes
  document: Document
  createdAt: Date
}
