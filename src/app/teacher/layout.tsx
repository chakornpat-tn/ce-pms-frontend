import Navbar from '@/components/Navbar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg_primary min-h-screen">
      <Navbar />
      <div className="container mx-auto h-full w-full justify-center">
        {children}
      </div>
    </div>  )
}
