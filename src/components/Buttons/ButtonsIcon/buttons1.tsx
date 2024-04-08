import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

type Props = {
  Title: string
  path: string
}

const ButtonWithArrow = ({ Title, path }: Props) => {
  return (
    <button className="inline-flex w-4/5 items-center rounded bg-primary2-400 px-4 py-2 font-bold text-secondary1 hover:bg-primary2-500 ">
      <Link href={path} className="w-full">
        <span>{Title}</span>
        <ArrowForwardIcon className="ml-2 h-6 w-6 fill-current" />
      </Link>
    </button>
  )
}

const SmallButtonWithArrow = ({ Title, path }: Props) => {
  return (
    <button className="inline-flex w-2/6 items-center rounded bg-primary2-400 px-4 py-2 font-bold text-secondary1 hover:bg-primary2-500 ">
      <Link href={path} className="w-full">
        <span>{Title}</span>
        <ArrowForwardIcon className="ml-2 h-6 w-6 fill-current" />
      </Link>
    </button>
  )
}

const ButtonPrimary2 = ({ Title, path }: Props) => {
  return (
    <button className="inline-flex w-2/5 min-w-[220px] items-center rounded bg-primary2-400 px-4 py-2 font-bold text-secondary1 shadow-2xl hover:bg-primary2-500 ">
      <Link href={path} className="w-full">
        <span>{Title}</span>
      </Link>
    </button>
  )
}

export { ButtonWithArrow, ButtonPrimary2, SmallButtonWithArrow }
