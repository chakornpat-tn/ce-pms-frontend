import { ContentLayout } from '@/components/Layout'
import NavbarWithSideBar from '@/components/Navbar/NavbarWithLayout'

export default function ProjectLayout({
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
