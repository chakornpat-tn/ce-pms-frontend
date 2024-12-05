import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

const ContentLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <div className="container mx-auto h-full w-full justify-center">
      <div className="flex w-full justify-center">
        <article className="w-full h-full p-4">{children}</article>
      </div>
    </div>
  )
}

export { ContentLayout }
