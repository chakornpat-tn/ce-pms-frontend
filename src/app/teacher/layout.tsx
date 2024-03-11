import Sidebar from '../components/Sidebar/Sidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row bg-bg_primary min-h-screen'>
      <Sidebar />
      {children}
    </div>
  )
}
