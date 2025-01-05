import { ProjectStatus } from './ProjectStatus'

export type Project = {
  id: number
  username: string
  password?: string | null
  projectName: string
  projectNameEng?: string | null
  abstract?: string | null
  abstractEng?: string | null
  detail?: string | null
  detailEng?: string | null
  semester: number
  academicYear: number
  projectSemester?: number
  projectAcademicYear?: number
  type?: string | null
  projectStatusId?: number | null
  courseStatus: number
  students: ProjectStudent[]
  users: ProjectUser[]
  createdAt: Date
  updatedAt: Date
  examDateTime: Date
}
export type CreateProjectRequest = {
  id: number
  username: string
  password?: string
  projectName: string
  projectNameEng?: string
  abstract?: string
  abstractEng?: string
  detail?: string
  detailEng?: string
  semester?: number
  academicYear: number
  type?: string
  projectStatusId?: number
  students: ProjectStudentRequest[]
  users: ProjectUser[]
}

export type UpdateProjectRequest = {
  id?: number
  password?: string
  projectName?: string
  projectNameEng?: string
  abstract?: string
  abstractEng?: string
  detail?: string
  detailEng?: string
  semester?: number
  academicYear?: number
  projectSemester?: number
  projectAcademicYear?: number
  type?: string | null
  projectStatusId?: number | null
  courseStatus?: number
  students?: ProjectStudentRequest[]
  users?: { userId: number; userProjectRole: number }[]
  examDateTime?: Date
}

export type UpdateProjectsRequest = {
  ids: number[]
  courseStatus?: number
  projectStatusId?: number | null
  semester?: number
  academicYear?: number
  type?: string | null
}

export type ProjectStudentRequest = {
  studentId?: string
  name?: string
}

export type ListProjectsFilter = {
  academicYear?: number
  semester?: number
  projectName?: string
  projectStatus?: number[]
  courseStatus?: number[]
  projectSemester?: number
  projectAcademicYear?: number
}

export type ProjectStudent = {
  projectId: number
  studentId: number
}
export type ProjectUser = {
  projectId: number
  userId: number
  prepDocs?: string | null
  projectDocs?: string | null
  projectPoint?: number | null
  prepPoint?: number | null
  userProjectRole?: number
}

export type ProjectUserWithUser = {
  projectId: number
  userId: number
  prepDocs: string | null
  projectDocs: string | null
  userProjectRole: number
  prepPoint: number | null
  projectPoint: number | null
  user: {
    id: number
    name: string
  }
}

export type ProjectRes = {
  id: number
  username: string
  password?: string | null
  projectName: string
  projectNameEng?: string | null
  abstract?: string | null
  abstractEng?: string | null
  detail?: string | null
  detailEng?: string | null
  semester: number
  academicYear: number
  type?: string | null
  projectStatusId?: number | null
  courseStatus: number
  students: ProjectStudent[]
  users: ProjectUser[]
  createdAt: Date
  updatedAt: Date
  examDateTime: Date
  projectStatus: ProjectStatus
}
export type ListProjectFilterQuery = {
  academicYear?: number
  semester?: number
  projectName?: string
  projectStatus?: string
  courseStatus?: string
  projectSemester?: number
  projectAcademicYear?: number
}

export type ProjectByIDRes = {
  id: number
  username: string
  password?: string | null
  projectName: string
  projectNameEng?: string | null
  abstract?: string | null
  abstractEng?: string | null
  detail?: string | null
  detailEng?: string | null
  semester: number
  academicYear: number
  projectSemester?: number
  projectAcademicYear?: number
  type?: string | null
  projectStatusId?: number | null
  courseStatus: number
  students: StudentEntry[]
  users: UserEntry[]
  createdAt: Date
  updatedAt: Date
  examDateTime: Date
  examLocation?: string
  projectStatus: ProjectStatus
}

export type StudentEntry = {
  student: {
    id?: number
    studentId?: string
    name?: string
  }
}

export type UserEntry = {
  userProjectRole: number
  user: {
    id: number
    name: string
  }
}
