export type ProjectUser = {
  projectId: number
  userId: number
  userProjectRole?: number
  projectDocs?: string | null
  prepDocs?: string | null
}

export type ProjectUserUploadRequest = {
  projectDocs?: File
  prepDocs?: File
  data: string
}

export type UpdateProjectUserRequest = {
  projectId: number
  userId: number
  userProjectRole?: number
  projectDocs?: string
  prepDocs?: string
}

export type CheckRegisExamDateRes = {
  projectExamApprove: boolean
  projectCommitteeCountApprove: boolean
}

export type ProjectUserExamDateRes = {
  id: number
  projectName: string
  projectNameEng: string | null
  examDateTime: Date
  examLocation: string
  academicYear: number
  projectAcademicYear: number | null
}
