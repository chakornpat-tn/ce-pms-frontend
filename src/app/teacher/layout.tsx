import Navbar from '@/components/Navbar'

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-bg_primary">
        <Navbar />
      <div className="container min-h-screen  w-full justify-center mx-auto">
        {children}
      </div>
    </div>
  )
}
