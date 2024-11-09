import Navbar from '@/components/Navbar'
import { LayoutScreenTeacher } from '@/components/Layout'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg_primary">
      <Navbar />
      <LayoutScreenTeacher>{children}</LayoutScreenTeacher>
    </div>
  )
}
