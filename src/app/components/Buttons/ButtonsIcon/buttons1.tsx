import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

type Props = {
  Title: string
}

const ButtonWithArrow = ({ Title, Icon }: Props) => {
  return (
    <button className="bg-primary2-400 hover:bg-primary2-500 text-secondary1 font-bold py-2 px-4 rounded inline-flex items-center w-4/5 ">
      <span>{Title}</span>
      <ArrowForwardIcon className="fill-current w-6 h-6 ml-2" />
    </button>
  )
}

export { ButtonWithArrow }
