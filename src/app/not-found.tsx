import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-dvh items-center justify-center bg-primary2-500">
      <div className="flex flex-col items-center">
        <h1 className="text-6xl text-secondary1">ไม่พบหน้าที่ต้องการค้นหา</h1>
        <Link
          href="/"
          className="my-6 text-2xl text-secondary1 underline hover:text-secondary2-100 "
        >
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
