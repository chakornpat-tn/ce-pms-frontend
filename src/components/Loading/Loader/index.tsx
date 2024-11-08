import React from 'react'

type Props = {
    
}

const Loader = ({}: Props) => {
  return (
    <div className="flex items-center justify-center">
      <span className="loading loading-ring loading-xs sm:loading-sm md:loading-md lg:loading-lg"></span>
    </div>
  )
}

export { Loader }