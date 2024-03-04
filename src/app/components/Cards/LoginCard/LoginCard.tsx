import { ButtonWithArrow } from '@/app/components/Buttons'

type Props = {
  title: string
}

const LoginCard = ({ title }: Props) => {
  return (
    <div className="h-5 min-w-[180px] md:w-[380px] min-h-[180px] m-5 bg-white border-[2px] border-primary2-500  rounded-lg shadow-lg">
      <div className="flex flex-col justify-around items-center h-full">
        <h1 className="text-2xl font-bold">{title}</h1>
        <ButtonWithArrow Title="เข้าสู่ระบบ" />
      </div>
    </div>
  )
}

export default LoginCard
