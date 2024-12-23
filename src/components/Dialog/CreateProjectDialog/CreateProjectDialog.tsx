'use client'

import React, { useActionState, useEffect, useState } from 'react'
import {
  AddCircleRounded,
  IndeterminateCheckBoxRounded,
} from '@mui/icons-material'
import { ProjectStudentRequest, ProjectUser } from '@/models/Project'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import { listUser } from '@/actions/user'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ResListUser } from '@/models/User'
import { CreateProject } from '@/actions/project'

type Props = {
  trigger: React.ReactNode
}

type userListSelect = {
  userId: number
  name: string
  userProjectRole: number
}

type IActionState = {
  success: string | null
  error: string | null
}

const CreateProjectDialog: React.FC<Props> = ({ trigger }: Props) => {
  const [error, action, isPending] = useActionState(CreateProject, null)
  const [students, setStudents] = useState<ProjectStudentRequest[]>([])
  const [users, setUsers] = useState<userListSelect[]>([])
  const [isDialogOpen, setDialogOpen] = useState(false)
  const [selectedUsers, setSelectedUsers] = useState<userListSelect[]>([])

  const addStudent = () => {
    if (students.length >= 3) return
    setStudents([...students, { studentId: '', name: '' }])
  }

  const removeStudent = (index: number) => {
    const newStudents = [...students]
    newStudents.splice(index, 1)
    setStudents(newStudents)
  }

  const addUser = () => {
    if (selectedUsers.length >= 1) return

    setSelectedUsers([
      ...selectedUsers,
      { userId: 0, name: '', userProjectRole: userProjectRole.CO_ADVISOR },
    ])
  }

  const removeUser = (index: number) => {
    const newUsers = [...selectedUsers]
    newUsers.splice(index, 1)
    setSelectedUsers(newUsers)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = (await listUser()) as ResListUser
        const data = response.users.map(user => ({
          userId: user.id,
          name: user.name,
          userProjectRole: userProjectRole.CO_ADVISOR,
        }))
        setUsers(data)
      } catch (error) {
        setUsers([])
      }
    }
    fetchUsers()
  }, [])

  return (
    <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">สร้างโครงงาน</DialogTitle>
          <DialogDescription>กรุณากรอกข้อมูลให้ครบถ้วน</DialogDescription>
        </DialogHeader>
        <div className="mx-auto w-full p-4">
          <form
            className="space-y-4"
            action={formData => {
              action(formData)

              setDialogOpen(false)
            }}
          >
            {/* Project Name */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ชื่อโครงงาน <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="projectName"
                className="w-[100%] rounded-md border px-3 py-2"
                required
              />
            </div>
            {/* Semester */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ภาคเรียน <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="semester"
                className="w-[100%] rounded-md border px-3 py-2"
                min={1}
                max={2}
                defaultValue={1}
                required
              />
            </div>
            {/* Academic Year */}
            <div>
              <label className="mb-2 block text-sm font-medium">
                ปีการศึกษา <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="academicYear"
                className="w-[100%] rounded-md border px-3 py-2"
                defaultValue={new Date().getFullYear() + 543}
                required
              />
            </div>
            {/* Students */}
            <div>
              <div className="mb-2 flex items-center">
                <label className="block text-sm font-medium">
                  นักศึกษา (สูงสุด 3 คน)
                </label>
                {students.length < 3 && (
                  <button
                    type="button"
                    onClick={addStudent}
                    className="ml-2 rounded-md p-1 text-primary2-400 transition-all duration-200 hover:text-primary2-500"
                  >
                    <AddCircleRounded />
                  </button>
                )}
              </div>
              {students.map((_, index) => (
                <div key={index} className="mb-2 flex space-x-2">
                  <input
                    type="text"
                    name={`students[${index}].studentId`}
                    placeholder="รหัสนักศึกษา"
                    className="w-[100%] rounded-md border px-3 py-2"
                    required
                  />
                  <input
                    type="text"
                    name={`students[${index}].name`}
                    placeholder="ชื่อ นามสกุล"
                    className="w-[100%] rounded-md border px-3 py-2"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => removeStudent(index)}
                    className="rounded-md px-2 text-red-300 transition-all duration-200 hover:text-red-500"
                  >
                    <IndeterminateCheckBoxRounded />
                  </button>
                </div>
              ))}
            </div>
            {/* Users */}
            <div>
              <div className="mb-2 flex items-center">
                <label className="block text-sm font-medium">
                  อาจารย์ที่ปรึกษาร่วม
                </label>
                {selectedUsers.length < 1 && (
                  <button
                    type="button"
                    onClick={addUser}
                    className="ml-2 rounded-md p-1 text-primary2-400 transition-all duration-200 hover:text-primary2-500"
                  >
                    <AddCircleRounded />
                  </button>
                )}
              </div>
              {selectedUsers.map((_, index) => (
                <div key={index} className="mb-2 flex space-x-2">
                  <select
                    name={`users[${index}].userId`}
                    className="w-[100%] rounded-md border px-3 py-2"
                    defaultValue=""
                    required
                  >
                    <option value="" disabled>
                      เลือกอาจารย์ที่ปรึกษาร่วม
                    </option>
                    {users.map(user => (
                      <option key={user.userId} value={user.userId}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="hidden"
                    name={`users[${index}].userProjectRole`}
                    value={userProjectRole.CO_ADVISOR}
                  />
                  <button
                    type="button"
                    onClick={() => removeUser(index)}
                    className="rounded-md px-2 text-red-300 transition-all duration-200 hover:text-red-500"
                  >
                    <IndeterminateCheckBoxRounded />
                  </button>
                </div>
              ))}
            </div>
            {/* Submit */}
            <button
              disabled={isPending}
              type="submit"
              className="w-[100%] rounded-md bg-primary2-400 px-4 py-2 text-secondary1 hover:bg-primary2-500"
            >
              {isPending ? 'กำลังสร้างโครงงาน' : 'สร้างโปรเจค'}
            </button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
export { CreateProjectDialog }
