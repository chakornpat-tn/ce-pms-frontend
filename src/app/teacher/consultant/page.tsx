'use client'
import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  const [value, setValue] = React.useState(0)

  const CenteredTabs = () => {
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={(event: React.SyntheticEvent, newValue: number) =>
            setValue(newValue)
          }
          centered
          TabIndicatorProps={{ style: { background: '#0F1035' } }}
          sx={{
            '& button.Mui-selected': { color: '#0F1035' },
          }}
        >
          <Tab className="text-base" value={0} label="รายวิชาเตรียมโครงงาน" />
          <Tab className="text-base" value={1} label="รายวิชาโครงงาน" />
        </Tabs>
      </Box>
    )
  }

  return (
    <>
      <section className="flex min-h-svh w-full justify-center">
        <article className="h-full w-4/5 p-8">
          <div className="mb-2 flex  flex-col items-start justify-between md:flex-row md:items-center">
            <h1 className="text-4xl font-bold text-primary1">
              โครงงานที่เป็นที่ปรีกษา
            </h1>
          </div>
          <div className=" my-[15px] w-full rounded-md bg-white shadow-sm">
            <CenteredTabs />
            {/* ------------------------Contents------------------------------------ */}
            <div className="flex items-center justify-center py-4">
              {value === 1 ? <div> เตรียมโครงงาน</div> : <div> โครงงาน</div>}
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default page
