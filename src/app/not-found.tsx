import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-dvh bg-primary2-500 flex justify-center items-center">
      <div className="flex flex-col items-center">
        <h1 className="text-secondary1 text-6xl">ไม่พบหน้าที่ต้องการค้นหา</h1>
        <Link
          href="/"
          className="my-6 text-secondary1 text-2xl underline hover:text-secondary2-100 "
        >
          กลับหน้าแรก
        </Link>
      </div>
    </div>
  )
}
