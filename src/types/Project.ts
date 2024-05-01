import { User } from './User'

export type ProjectDetail = User & {
  projectName?: string
  academicYear?: number
  abstract?: string
  projectNameEng?: string
  abstractEng?: string
  status?: StatusTypes
  developers?: Developers[]
  advisors?: Advisor[]
  umpires?: string[3]
  umpiresPoint?: UmpiresPoint[]
  project_doc?: Project_Doc[]
  progress?: Progress[]
  updateBy?: string
  createdAt?: string
  updatedAt?: string
}

export type Developers = {
  studentId: string
  studentName: string
}
export type Advisor = {
  advisorId: string
  name: string
}

export type UmpiresPoint = {
  UmpiresId: string
  teacherId: string
  pointDoc: File
  createdAt: string
}

export type Project_Doc = {
  project_doc: File
  improvements?: string[]
  comments?: string[]
  send_status: string
}

export interface Progress {
  documents: number[]
  product: number[]
  details?: string

  createAt: string
  updateAt: string
}

export type File = {
  fileName: string
  filePath: string
  size: string
}

export type StatusTypes = ProjectStatus | PreProjectStatus

type ProjectStatus = {
  documentStatus:
    | 'ใบขอสอบ2.0'
    | 'ใบซ้อมนำเสนอ3.0'
    | 'ใบประเมินคณะกรรมการ4.0'
    | 'ใบส่งชิ้นงาน5.0'
    | 'ส่งปริญญานิพนธ์'
  projectStatus:
    | 'ผ่านการเตรียมโครงงาน'
    | 'ดำเนินการจัดทำโครงงาน'
    | 'อนุญาติสอบ'
    | 'อยู่ระหว่างดำเนินการสอบ'
    | 'ดำเนินการสอบแล้ว'
    | 'แก้ไขเอกสารและชิ้นงาน'
    | 'ผ่านรายวิชาโครงงาน'
    | 'ดำเนินการยื่นเรื่องขอติด i'
    | 'ตรวจเอกสาร'
}

type PreProjectStatus = {
  documentStatus:
    | ''
    | 'CE02-ฉบับร่าง'
    | 'CE02-ฉบับสมบูรณ์'
    | 'CE03-อนุมัติการขอสอบ'
    | 'CE04-เสร็จสิ้นกระบวนการขอสอบ'
    | 'CE02 ฉบับสมบูรณ์ '

  projectStatus:
    | 'ดำเนินการเตรียมโครงงาน'
    | 'ไม่ผ่านการเตรียมโครงงาน'
    | 'ผ่านการเตรียมโครงงาน'
}
