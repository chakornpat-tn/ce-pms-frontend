import Navbar from '../components/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-bg_primary min-h-screen'>
      <Navbar />
      {children}
    </div>
  )
}
