import { ButtonWithArrow } from '@/app/components/Buttons'
import Image from 'next/image'

type Props = {
  title: string
  imageName: string
  pathImage?: string
  bgColor: string
  urlPath: string
}

const LoginCard = ({
  title,
  imageName,
  pathImage,
  bgColor,
  urlPath,
}: Props) => {
  return (
    <div className="h-auto  md:min-h-[280px] w-auto md:min-w-[320px] m-5  bg-white  rounded-lg shadow-2xl">
      <div className="flex flex-col justify-around items-center h-full py-2">
        {!!pathImage && (
          <div className={`rounded-full ${bgColor} w-auto h-auto`}>
            <Image
              src={`/Images/${pathImage}.png`}
              alt={imageName}
              width="124"
              height="124"
            />
          </div>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
        <ButtonWithArrow Title="เข้าสู่ระบบ" path={urlPath} />
      </div>
    </div>
  )
}

export { LoginCard }
