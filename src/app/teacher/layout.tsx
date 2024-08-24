import Navbar from '@/components/Navbar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg_primary">
      <Navbar />
      <div className="container mx-auto  min-h-screen w-full justify-center">
        {children}
      </div>
    </div>
  )
}
