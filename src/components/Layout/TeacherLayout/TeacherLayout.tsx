import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const LayoutScreenTeacher = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="container mx-auto h-full w-full justify-center">
      <div className="flex w-full justify-center">
        <article className="w-5/6 p-2 md:p-4">{children}</article>
      </div>
    </div>
  )
}

export  {LayoutScreenTeacher}