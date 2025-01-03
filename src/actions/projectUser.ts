'use server'

import config from '@/config'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import {
  ListProjectFilterQuery,
  ProjectRes,
  ProjectUser,
  ProjectUserWithUser,
} from '@/models/Project'
import {
  CheckRegisExamDateRes,
  ProjectUserExamDateRes,
} from '@/models/ProjectUser'
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

export async function ListProjectByUserID(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)
    if (req?.projectAcademicYear)
      queryParams.append(
        'projectAcademicYear',
        req.projectAcademicYear.toString(),
      )
    if (req?.projectSemester)
      queryParams.append('projectSemester', req.projectSemester.toString())

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project-user/${Number(payload.id)}?${queryParams.toString()}`

    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function GetProjectInCommittee(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project-user/committee/${Number(payload.id)}?${queryParams.toString()}`

    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function GetProjectInCompleteUsers(req: ListProjectFilterQuery) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const queryParams = new URLSearchParams()
    if (req?.projectName) queryParams.append('projectName', req.projectName)
    if (req?.academicYear)
      queryParams.append('academicYear', req.academicYear.toString())
    if (req?.semester) queryParams.append('semester', req.semester.toString())
    if (req?.projectStatus)
      queryParams.append('projectStatus', req.projectStatus)
    if (req?.courseStatus) queryParams.append('courseStatus', req.courseStatus)

    const secret = new TextEncoder().encode(config.TOKEN_SECRET)
    const { payload } = await jwtVerify(token.value, secret)

    if (!payload.id) {
      throw new Error('Token payload is invalid or missing user ID.')
    }

    const url = `/v1/project-user/in-complete-users/${payload.id}?${queryParams.toString()}`

    const res = await useAPI<{ data: ProjectRes[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function CheckStatusRegisExamDateTime(projectId: number) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const url = `/v1/project-user/check-regis-exam-date/${projectId}`
    const res = await useAPI<{ data: CheckRegisExamDateRes }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function UpdateProjectUser(
  previousState: unknown,
  formData: FormData,
) {
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

    const projectId = formData.get('projectId')
    const prepDocs = formData.get('prepDocs') as File
    const projectDocs = formData.get('projectDocs') as File
    const prepPoint = formData.get('prepPoint')
    const projectPoint = formData.get('projectPoint')

    const form = new FormData()
    if (prepDocs) form.append('prepDocs', prepDocs)
    if (projectDocs) form.append('projectDocs', projectDocs)
    form.append(
      'data',
      JSON.stringify({
        ...(projectId && { projectId: Number(projectId) }),
        ...(payload.id && { userId: Number(payload.id) }),
        ...(prepPoint && { prepPoint: Number(prepPoint) }),
        ...(projectPoint && { projectPoint: Number(projectPoint) }),
      }),
    )
    await useAPI('/v1/project-user', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
      body: form,
    })
    revalidatePath('/')
    return
  } catch (error) {
    throw error
  }
}

export async function GetProjectUserByProjectIdUserComplete(projectId: number) {
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

    const url = `/v1/project-user/detail?userId=${payload.id}&projectId=${projectId}`

    const res = await useAPI<{ data: ProjectUserWithUser[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })

    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}
export async function GetProjectUserDetail(
  projectId?: number,
  userId?: number,
) {
  try {
    const Cookie = await cookies()
    const token = Cookie.get('token')
    if (!token?.value) {
      throw new Error('Authentication token is missing.')
    }

    const queryParams = new URLSearchParams()
    if (projectId) queryParams.append('projectId', projectId.toString())
    if (userId) queryParams.append('userId', userId.toString())

    const url = `/v1/project-user/detail?${queryParams.toString()}`

    const res = await useAPI<{ data: ProjectUserWithUser[] }>(url, {
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
    })
    return res.data
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function RegisCommittee(projectId: number) {
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

    const req = {
      projectId: projectId,
      userId: payload.id,
      userProjectRole: userProjectRole.COMMITTEE,
    }

    await useAPI('/v1/project-user', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
    revalidatePath('/')
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || 'Failed to fetch project list.',
    )
  }
}

export async function CheckUserIsAdvisor(projectId: number) {
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
    const url = `/v1/project-user/check-advisor/${payload.id}/${projectId}`
    const res = await useAPI<{ data: boolean }>(url, {
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

export async function CheckExamDateTimeUserToken() {
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

    const res = await useAPI<{ data: ProjectUserExamDateRes[] }>(
      `/v1/project-user/check-exam-date/${payload.id}`,
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return res.data
  } catch (error) {
    throw error
  }
}

export async function CountProjectInYear(academicYear: number) {
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

    const url = `/v1/project-user/count-project/${payload.id}/${academicYear}`
    const res = await useAPI<{
      data: {
        CountPreProp: number
        CountOnProject: number
        CountAllProject: number
      }
    }>(url, {
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
