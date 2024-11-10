import React from 'react'
import { DashboardCard, ColumnCard, ColumnCard2,} from '@/components/Cards'

type Props = {}

function page({}: Props) {
  return (
    <div className="h-full bg-bg_primary">
      <div className="flex items-center justify-center bg-primary2-300">
        <div className="grid h-full grid-cols-1 md:grid-cols-3 items-center justify-between gap-4 md:gap-8 py-8 md:py-16 px-4 md:px-0">
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
      </div>
      <ColumnCard /><ColumnCard2 />
      
    </div>
  )
}

export default page
