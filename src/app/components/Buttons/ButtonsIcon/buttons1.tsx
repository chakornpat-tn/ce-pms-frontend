import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Link from 'next/link'

type Props = {
  Title: string
  path: string
}

const ButtonWithArrow = ({ Title, path }: Props) => {
  return (
    <button className="bg-primary2-400 hover:bg-primary2-500 text-secondary1 font-bold py-2 px-4 rounded inline-flex items-center w-4/5 ">
      <Link href={path} className="w-full">
        <span>{Title}</span>
        <ArrowForwardIcon className="fill-current w-6 h-6 ml-2" />
      </Link>
    </button>
  )
}

const ButtonPrimary2 = ({ Title, path }: Props) => {
  return (
    <button className="bg-primary2-400 hover:bg-primary2-500 text-secondary1 font-bold py-2 px-4 rounded inline-flex items-center w-4/5 ">
      <Link href={path} className="w-full">
        <span>{Title}</span>
        <ArrowForwardIcon className="fill-current w-6 h-6 ml-2" />
      </Link>
    </button>
  )
}

export { ButtonWithArrow, ButtonPrimary2 }
