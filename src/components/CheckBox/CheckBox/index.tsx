import React from 'react'

type Props = {
  id: number
  name: string
}

const CheckBox = ({ id, name }: Props) => {
  return (
        <input
          type="checkbox"
          id={`${id}`}
          name={name}
          className="checkbox-primary checkbox checkbox-xs sm:checkbox-sm "
        />
  )
}

export { CheckBox }
