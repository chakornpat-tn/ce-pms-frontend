'use client'
import { GetProjectByID, ListProjects } from '@/actions/project'
import NavbarWithSideBar from '@/components/Navbar/NavbarWithLayout'
import {
  ListProjectFilterQuery,
  ProjectByIDRes,
  ProjectRes,
} from '@/models/Project'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { FolderOff } from '@mui/icons-material'
import { useState } from 'react'
import useSWR from 'swr'
import dayjs from 'dayjs'
import { ProjectStatusBadge } from '@/components/Badge'
import { CourseStatusDesc } from '@/utils/courseStatusDesc'
import userProjectRole from '@/constants/userProjectRole/userProjectRole'
import Project from './teacher/present/project/page'
import { Loader } from '@/components/Loading'

export default function Home() {
  const currentYear = new Date().getFullYear() + 543
  const [filters, setFilters] = useState<ListProjectFilterQuery>({
    projectName: '',
    projectSemester: 0,
    semester: 0,
    academicYear: currentYear,
    projectAcademicYear: currentYear,
    projectStatus: '',
    // courseStatus: `${courseStatus.Project}, ${courseStatus.ApproveProjectExam},${courseStatus.Pass}`,
  })

  const [projectSelection, setProjectSelection] = useState<number | null>(null)

  const ProjectDetailFetcher = async () => {
    if (!projectSelection) return null
    const res = await GetProjectByID(projectSelection)
    return res
  }

  const projectList = useSWR('/list-user-project', async () => {
    let res = await ListProjects(filters)
    if (res.length == 0 && filters.academicYear == currentYear) {
      setFilters({
        ...filters,
        projectAcademicYear: currentYear - 1,
        academicYear: currentYear - 1,
      })
      projectList.mutate()
    }
    return res
  })

  const projectByID = useSWR(
    `/project/${projectSelection}`,
    () => ProjectDetailFetcher(),
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const handleSearch = () => {
    projectList.mutate()
    setProjectSelection(null)
  }
  return (
    <NavbarWithSideBar>
      <div className="hero mx-auto bg-primary2-400">
        <div className="hero-content text-center text-white">
          <div className="max-w-xl">
            <h1 className="py-2 text-3xl font-bold text-white">
              โครงงานวิศวกรรมไฟฟ้า
              <span className="whitespace-nowrap">
                สาขาวิศวกรรมคอมพิวเตอร์
              </span>
            </h1>{' '}
            <p className="hidden py-6 text-base sm:block">
              เว็บไซต์ที่รวบรวมและนำเสนอข้อมูลโครงงานด้านวิศวกรรมไฟฟ้า
              ในสาขาวิศวกรรมคอมพิวเตอร์
              ของนักศึกษามหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา เชียงใหม่
              เพื่อเผยแพร่ผลงานทางวิชาการและส่งเสริมการเรียนรู้ในวงการวิศวกรรม
            </p>
          </div>
        </div>{' '}
      </div>
      <div className="flex w-full justify-center bg-primary2-400 py-2">
        <div className="flex flex-col justify-around gap-2 rounded-lg bg-white p-4 shadow-lg sm:flex-row sm:flex-wrap sm:gap-2">
          <input
            type="text"
            name="projectName"
            placeholder="ค้นหาชื่อโครงงาน"
            onChange={e =>
              setFilters({
                ...filters,
                projectName: e.target.value,
              })
            }
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
            className="w-full rounded-md border p-2 text-sm sm:text-base md:w-96"
          />
          <div className="flex w-auto items-center gap-2">
            <input
              type="number"
              name="semester"
              min={1}
              max={2}
              placeholder="ทุกภาคเรียน"
              onChange={e =>
                setFilters({
                  ...filters,
                  projectSemester: Number(e.target.value),
                  semester: Number(e.target.value),
                })
              }
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="w-full min-w-[113px] rounded-md border p-2 text-sm sm:text-base md:w-32"
            />
            <p className="flex-shrink-0 text-sm sm:text-base">/</p>
            <input
              type="number"
              name="year"
              placeholder="ปีการศึกษา"
              min="0"
              defaultValue={filters.academicYear}
              onChange={e =>
                setFilters({
                  ...filters,
                  projectAcademicYear: Number(e.target.value),
                  academicYear: Number(e.target.value),
                })
              }
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
              className="w-full rounded-md border p-2 text-sm sm:w-40 sm:text-base md:w-44"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary2-400 p-2 text-sm text-secondary1 shadow-md transition duration-200 hover:bg-primary2-500 sm:w-full sm:text-base"
            onClick={handleSearch}
          >
            ค้นหา
          </button>
        </div>{' '}
      </div>
      {projectList.data && projectList.data.length > 0 ? (
        <section className="my-2 h-full w-full gap-2">
          <div className="container mx-auto flex h-full flex-col items-stretch justify-evenly md:flex-row">
            <section className="w-full md:w-1/3">
              <p className="mb-2 text-lg font-semibold text-gray-800">
                ผลการค้นหา
              </p>

              {projectList.data?.map((project: ProjectRes) => {
                return (
                  <article
                    key={project.id}
                    onClick={() => {
                      setProjectSelection(project.id)
                    }}
                    className={`my-2 hidden rounded-lg border bg-white shadow-md hover:border-primary2-400 md:block ${project.id === projectSelection ? 'border-2 border-primary2-400' : ''}`}
                  >
                    <div className="m-4 h-auto w-auto overflow-hidden">
                      <div className="flex w-full items-center justify-between">
                        <h2 className="truncate text-base font-bold text-gray-800">
                          {project.projectName}
                        </h2>
                        <div
                          className={`h-fit w-fit truncate rounded-md ${project.projectAcademicYear ? 'bg-primary2-400' : 'bg-primary2-200'} p-1 text-sm text-white`}
                        >
                          {project.projectAcademicYear != null
                            ? 'ดำเนินโครงงาน'
                            : 'เตรียมโครงงาน'}
                        </div>
                      </div>
                      <p className="truncate text-sm text-gray-400">
                        {project.projectNameEng
                          ? project.projectNameEng
                          : 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
                      </p>

                      <p className="mt-1 truncate text-xs font-medium text-gray-500">
                        ประเภท:
                        {project.type
                          ? project.type
                          : 'ไม่ได้ระบุประเภทโครงงาน'}
                      </p>
                      <p className="mt-3 truncate text-xs font-light text-gray-500">
                        อัปเดตล่าสุด:
                        {dayjs(project.updatedAt).format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </article>
                )
              })}
              {projectList.data?.map((project: ProjectRes) => {
                return (
                  <a
                    key={project.id}
                    href={`/${project.id}`}
                    target="_blank"
                    className={`m-2 block h-36 min-h-[144px] min-w-[280px] rounded-lg border bg-white shadow-md hover:border-primary2-400 md:hidden ${project.id === projectSelection ? 'border-2 border-primary2-400' : ''}`}
                  >
                    <div className="m-4 h-auto w-auto overflow-hidden">
                      <h2 className="truncate text-base font-bold text-gray-800">
                        {project.projectName}
                      </h2>
                      <p className="truncate text-sm text-gray-600">
                        {project.projectNameEng
                          ? project.projectNameEng
                          : 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
                      </p>
                      <div
                        className={`h-fit w-fit truncate rounded-md ${project.projectAcademicYear ? 'bg-primary2-400' : 'bg-primary2-200'} p-2 text-xs text-white`}
                      >
                        {project.projectAcademicYear != null
                          ? 'ดำเนินโครงงาน'
                          : 'เตรียมโครงงาน'}
                      </div>
                      <p className="mt-1 truncate text-xs font-medium text-gray-600">
                        ประเภท:
                        {project.type
                          ? project.type
                          : 'ไม่ได้ระบุประเภทโครงงาน'}
                      </p>
                      <p className="mt-2 truncate text-xs font-light text-gray-500">
                        อัปเดตล่าสุด:
                        {dayjs(project.updatedAt).format('DD/MM/YYYY')}
                      </p>
                    </div>
                  </a>
                )
              })}
            </section>
            <section className="relative mt-4 hidden w-2/3 flex-1 md:ml-[64px] md:mt-0 md:block">
              <div className="mb-2 h-6 font-semibold text-gray-800"></div>
              <div className="sticky top-2">
                {!projectSelection ? (
                  <article className="flex items-start justify-center rounded-lg bg-gray-200">
                    <div className="mt-2 w-80 rounded-lg p-6 text-center">
                      <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary2-400">
                        <ArrowBackIcon className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        เลือกโครงงาน
                      </h3>
                      <p className="mt-2 rounded-lg text-sm text-gray-600">
                        แสดงรายละเอียดที่นี่
                      </p>
                    </div>
                  </article>
                ) : (
                  <ProjectDetail
                    projectData={projectByID.data}
                    isLoading={projectByID.isLoading}
                  />
                )}
              </div>
            </section>
          </div>
        </section>
      ) : (
        <section className="my-2 h-full w-full gap-2">
          <div className="container mx-auto flex h-full flex-col items-stretch justify-evenly md:flex-row">
            <h1 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
              <FolderOff className="text-gray-600" /> ไม่พบโครงงาน
            </h1>
          </div>
        </section>
      )}
    </NavbarWithSideBar>
  )
}

const ProjectDetail = ({
  projectData,
  isLoading,
}: {
  projectData?: ProjectByIDRes | null
  isLoading: boolean
}) => {
  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader />
      </div>
    )
  }
  if (!projectData) {
    return (
      <div className="flex h-full items-center justify-center">
        <p>ไม่พบข้อมูลโครงงาน</p>
      </div>
    )
  }
  return (
    <section className="mt-0 h-screen flex-1 overflow-y-scroll rounded-md bg-white p-4 shadow-md md:p-10">
      <article className="container mx-auto px-2 md:px-4">
        <h1 className="text-center text-lg sm:text-xl md:text-3xl">
          {projectData.projectName}
        </h1>
        <h2 className="mb-5 text-center text-base text-gray-400 sm:text-lg md:text-2xl">
          {projectData.projectNameEng ?? 'ไม่ได้ระบุชื่อโครงงานภาษาอังกฤษ'}
        </h2>
        <div className="w-full">
          <div className="my-5 flex w-full flex-col items-center justify-around gap-4 sm:flex-row sm:gap-2">
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs sm:text-sm md:text-base">สถานะโครงงาน</p>
              <ProjectStatusBadge
                bgColor={projectData.projectStatus?.bgColor}
                textColor={projectData.projectStatus?.textColor}
                name={projectData.projectStatus?.name}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="text-xs font-semibold sm:text-sm md:text-base">
                ดำเนินการ
              </p>
              <p className="text-xs sm:text-sm md:text-base">
                {CourseStatusDesc(projectData.courseStatus)}
              </p>
            </div>
          </div>

          <br />

          <div className="mb-4 border-b border-primary2-400"></div>
          <div className="flex w-full flex-col gap-2 text-xs sm:text-sm md:text-base">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
                <h3 className="mt-4 font-bold">ประเภทโครงงาน</h3>
              </div>
              <p className="text-gray-500">{projectData.type ?? 'ไม่ระบุ'}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">ผู้พัฒนา</h3>
              {projectData.students?.map((item: any) => (
                <p key={item.student.id} className="text-gray-500">
                  {item.student.studentId} {item.student.name}
                </p>
              ))}
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">อาจารย์ที่ปรึกษา</h3>
              {projectData.users
                .filter(
                  (user: any) =>
                    user.userProjectRole == userProjectRole.ADVISOR,
                )
                .map((userData: any) => (
                  <p key={userData.user.id} className="text-gray-500">
                    {userData.user.name}
                  </p>
                ))}
              {projectData.users.filter(
                (user: any) =>
                  user.userProjectRole == userProjectRole.CO_ADVISOR,
              ).length > 0 && (
                <div className="flex flex-col">
                  <h3 className="font-bold">อาจารย์ที่ปรึกษาร่วม</h3>
                  {projectData.users
                    .filter(
                      (user: any) =>
                        user.userProjectRole == userProjectRole.CO_ADVISOR,
                    )
                    .map((userData: any) => (
                      <p key={userData.user.id} className="text-gray-500">
                        {userData.user.name}
                      </p>
                    ))}
                </div>
              )}
              <h3 className="mt-4 font-bold">ปีการศึกษา</h3>
              <p className="text-gray-500">
                {projectData.semester}/{projectData.academicYear}
              </p>
              {projectData.projectAcademicYear && (
                <>
                  <h3 className="mt-4 font-bold">ปีการศึกษาวิชาโครงงาน</h3>
                  <p className="text-gray-500">
                    {projectData.projectSemester}/
                    {projectData.projectAcademicYear}
                  </p>
                </>
              )}
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">บทคัดย่อ</h3>
              <p className="mb-4 text-gray-500">
                {projectData.abstract ?? 'ไม่ได้ระบุ'}
              </p>
              <h3 className="mb-2 font-bold">Abstract</h3>
              <p className="text-gray-500">
                {projectData.abstractEng ?? 'ไม่ได้ระบุ'}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mb-2 font-bold">รายละเอียด</h3>
              <p className="mb-4 text-gray-500">
                {projectData.detail ?? 'ไม่ได้ระบุ'}
              </p>
              <h3 className="mb-2 font-bold">Detail</h3>
              <p className="text-gray-500">
                {projectData.detailEng ?? 'ไม่ได้ระบุ'}
              </p>
            </div>
            <div className="flex flex-col">
              <h3 className="mt-4 font-bold">อัปเดตล่าสุด</h3>
              <p className="text-gray-500">
                {dayjs(projectData.updatedAt)
                  .add(543, 'year')
                  .format('DD/MM/YYYY เวลา HH.mmน.')}
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  )
}
