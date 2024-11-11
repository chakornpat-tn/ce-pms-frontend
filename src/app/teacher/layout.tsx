import { ContentLayout } from '@/components/Layout'
import NavbarWithSideBar from '@/components/Navbar/NavbarWithLayout'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <NavbarWithSideBar>
      <ContentLayout>{children}</ContentLayout>
    </NavbarWithSideBar>
  )
}
