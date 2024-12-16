'use server'

import config from '@/config'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import {
  ListProjectFilterQuery,
  Project,
  ProjectByIDRes,
  ProjectRes,
  UpdateProjectRequest,
} from '@/models/Project'
import useAPI from '@/utils/useAPI'
import { jwtVerify } from 'jose'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
export async function ListProjects(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)

    const url = `/v1/project?${queryParams.toString()}`
    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}
export async function deleteProject(projectId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    await useAPI(`/v1/project/${projectId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/project')
    return { success: true }
  } catch (error) {
    throw error
  }
}
export async function CreateProject(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const projectName = formData.get('projectName')?.toString()
    const semester = Number(formData.get('semester'))
    const academicYear = Number(formData.get('academicYear'))

    const students = []
    let index = 0
    while (formData.get(`students[${index}].studentId`)) {
      students.push({
        studentId: formData.get(`students[${index}].studentId`)?.toString(),
        name: formData.get(`students[${index}].name`)?.toString(),
      })
      index++
    }

    const users = []
    index = 0
    while (formData.get(`users[${index}].userId`)) {
      users.push({
        userId: Number(formData.get(`users[${index}].userId`)),
        userProjectRole: userProjectRole.CO_ADVISOR,
      })
      index++
    }

    const Cookie = await cookies()
    const token = Cookie.get('token')

    const requestBody: any = {
      projectName,
      semester,
      academicYear,
    }

    if (students.length > 0) {
      requestBody.students = students
    }

    if (users.length > 0) {
      requestBody.users = users
    }

    await useAPI<{ message: string }>('/v1/project', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/')
  } catch (error) {
    return 'เกิดข้อผิดพลาดในการสร้างโครงงาน'
  }
}
export async function GetProject(Id: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    const url = `/v1/project/${Id}`

    const res = await useAPI<{ data: Project }>(url, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    return error
  }
}

export async function updateProject(formData: FormData) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')

    const id = formData.get('id')
    const projectName = formData.get('projectName')
    const password = formData.get('password')

    const projectData = {
      ...(projectName && { projectName }),
      ...(password && { password }),
    }

    if (Object.keys(projectData).length === 0) {
      return { error: 'ไม่มีข้อมูลที่ต้องการแก้ไข' }
    }

    const res = await useAPI('/v1/project/' + id, {
      method: 'PATCH',
      body: JSON.stringify(projectData),
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json',
      },
    })

    revalidatePath('/')
    return { message: 'แก้ไขข้อมูลโปรเจกต์เสร็จสิ้น' }
  } catch (error) {
    return { error: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูลโปรเจกต์' }
  }
}

export async function GetProjectFormToken(): Promise<ProjectByIDRes> {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project/${Number(payload.id)}`

    const res = await useAPI<{ data: ProjectByIDRes }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error) {
    throw error
  }
}

export async function UpdateProjectFormToken(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const projectName = formData.get('projectName')
    const projectNameEng = formData.get('projectNameEng')
    const abstract = formData.get('abstract')
    const abstractEng = formData.get('abstractEng')
    const detail = formData.get('detail')
    const detailEng = formData.get('detailEng')
    const semester = formData.get('semester')
    const academicYear = formData.get('academicYear')
    const type = formData.get('type')
    const projectStatusId = formData.get('projectStatusId')
    const courseStatus = formData.get('courseStatus')
    const password = formData.get('password')
    const examDateTime = formData.get('examDateTime')

    const projectData: UpdateProjectRequest = {
      ...(projectName && { projectName: projectName as string }),
      ...(projectNameEng && { projectNameEng: projectNameEng as string }),
      ...(abstract && { abstract: abstract as string }),
      ...(abstractEng && { abstractEng: abstractEng as string }),
      ...(detail && { detail: detail as string }),
      ...(detailEng && { detailEng: detailEng as string }),
      ...(semester && { semester: Number(semester) }),
      ...(academicYear && { academicYear: Number(academicYear) }),
      ...(type && { type: type as string }),
      ...(projectStatusId && { projectStatusId: Number(projectStatusId) }),
      ...(courseStatus && { courseStatus: Number(courseStatus) }),
      ...(password && { password: password as string }),
      ...(examDateTime && { examDateTime: new Date(examDateTime as string) }),
    }

    if (Object.keys(projectData).length === 0) {
      throw new Error('No data to update')
    }

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project/${Number(payload.id)}`

    await useAPI(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })
  } catch (error) {
    throw error
  }
}

export async function updateMultipleProjects(
  previousState: unknown,
  formData: FormData,
) {
  try {
    const idsString = formData.get('ids')?.toString()
    if (!idsString) throw new Error('No data to update')
    const ids = JSON.parse(idsString) as number[]
    if (!Array.isArray(ids) || !ids.every(id => typeof id === 'number')) {
      throw new Error('Invalid ids format. Expected array of numbers')
    }
    const semester = formData.get('semester')
    const academicYear = formData.get('academicYear')
    const type = formData.get('type')
    const projectStatusId = formData.get('projectStatusId')
    const courseStatus = formData.get('courseStatus')

    const projectData = {
      ids,
      ...(semester && { semester: Number(semester) }),
      ...(academicYear && { academicYear: Number(academicYear) }),
      ...(type && { type: type as string }),
      ...(projectStatusId && { projectStatusId: Number(projectStatusId) }),
      ...(courseStatus && { courseStatus: Number(courseStatus) }),
    }

    if (Object.keys(projectData).length === 0) {
      throw new Error('No data to update')
    }

    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    await useAPI('/v1/project', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projectData),
    })

    revalidatePath('/')
  } catch (error) {
    throw error
  }
}
