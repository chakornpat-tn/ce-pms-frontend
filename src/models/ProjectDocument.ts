import Project from '@/app/teacher/present/project/page'
import { Document } from './Document'
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

export type ProjectDocumentWaitUpdateRes = {
  project: ProjectByIDRes
  document: Document
  createdAt: Date
}
