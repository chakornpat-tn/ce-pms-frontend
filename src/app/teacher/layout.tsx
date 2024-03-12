import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar/Sidebar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='flex flex-row bg-bg_primary min-h-screen'>
      <Sidebar />
    <div className='flex flex-col bg-bg_primary min-h-screen'>
      <Navbar/>
    
      {children}
    </div>
    </div>
  )
}
