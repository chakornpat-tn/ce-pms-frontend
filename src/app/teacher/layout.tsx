import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar/Sidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-row bg-bg_primary">
      <Sidebar />
      <div className="flex min-h-screen w-full flex-col bg-bg_primary">
        <Navbar />
        {children}
      </div>
    </div>
  )
}
