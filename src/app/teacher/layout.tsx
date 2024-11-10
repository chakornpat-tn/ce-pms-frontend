import { ContentLayout } from '@/components/Layout'
import TeacherNavbarWithSideBar from '@/components/Layout/SideBarLayout'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <TeacherNavbarWithSideBar>
      <ContentLayout>{children}</ContentLayout>
    </TeacherNavbarWithSideBar>
  )
}
