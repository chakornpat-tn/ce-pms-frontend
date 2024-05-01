'use client'
import useSWR from 'swr'
import { ProjectDetail } from '@/types/Project'
import { Box, Tab, Tabs } from '@mui/material'
import React from 'react'

type Props = {}

const page = (props: Props) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
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

  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data, isLoading } = useSWR<ProjectDetail[], null>(
    `${apiUrl}/project`,
    fetcher,
    {
      refreshInterval: 2000,
    },
  )

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
            <div className="flex items-center justify-center p-4">
              {value === 0 ? (
                <section className="flex w-full justify-center">
                  <article className="flex w-full flex-row justify-start rounded-md border p-2 lg:w-5/6">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="mx-2 w-[18px] accent-primary2-500"
                    />
                    <div className="w-full">
                      {/* //?-------------------------------ProjectDetail------------------------- */}
                      <div className=" flex flex-col items-start justify-center">
                        <div className="flex w-full flex-col justify-between lg:flex-row">
                          <h1 className="truncate text-sm font-bold underline underline-offset-2 max-md:w-3/5 md:text-lg ">
                            ชื่อโครงการ Lorem, ipsum dolor. Lorem, ipsum dolor.
                          </h1>
                          <h1 className="text-md max-w-full rounded-full border bg-orange-500  px-3 font-bold">
                            Lorem, ipsum dolor.
                          </h1>
                        </div>
                        <div className="hidden text-gray-500 md:block">
                          <p className="text-xs text-inherit">
                            firstName lastName
                          </p>
                          <p className="text-xs text-inherit">
                            firstName lastName
                          </p>
                          <p className="text-xs text-inherit">
                            firstName lastName
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                </section>
              ) : (
                <div> โครงงาน</div>
              )}
              {/* {data &&
                data.map((project: ProjectDetail) => (
                  <div>{project.projectName}</div>
                ))} */}
            </div>
          </div>
        </article>
      </section>
    </>
  )
}

export default page
