import { ButtonWithArrow } from '@/components/Buttons'
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
    <div className="m-5  h-auto min-w-[220px] rounded-md bg-white shadow-2xl md:mt-0 md:min-h-[280px]  md:min-w-[320px] lg:m-[15%]">
      <div className="flex h-full flex-col items-center justify-around py-2">
        {!!pathImage && (
          <div className={`rounded-full ${bgColor} h-auto w-auto`}>
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
