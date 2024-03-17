import React from 'react'
import { DashboardCard, ColumnCard } from '../components/Cards'

type Props = {}

function page({}: Props) {
  return (
    <div className="bg-bg_primary min-h-screen">
    <div className="flex bg-primary2-300 items-center justify-center">
    <div className="py-16 grid gap-48 grid-cols-2 h-full items-center justify-between ">
      <DashboardCard/>
      <DashboardCard/>
      </div>
    </div>
    <ColumnCard/>
    </div>
  )
}

export default page
