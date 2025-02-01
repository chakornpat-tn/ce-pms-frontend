'use client'
import { useEffect, useState } from 'react'
import PreProject from './pre-project/page'
import Project from './project/page'
import Regis from './regis/page'
export default function SelectProject() {
  const [activeTab, setActiveTab] = useState('pre-project')

  return (
    <div className="">
      <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
        <h1 className="text-2xl font-bold text-primary1 md:text-4xl">
          กรรมการสอบ
        </h1>
      </div>
      <div className="h-full min-h-[80dvh] w-full rounded-md bg-white shadow-md">
        <div className="my-[15px] w-full rounded-md bg-white shadow-sm">
          <ul className="-mb-px flex flex-wrap">
            <li className="me-2">
              <button
                onClick={() => setActiveTab('pre-project')}
                className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${activeTab === 'pre-project' ? 'border-primary1' : 'border-transparent'}`}
              >
                เตรียมโครงงาน
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab('project')}
                className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${activeTab === 'project' ? 'border-primary1' : 'border-transparent'}`}
              >
                โครงงาน
              </button>
            </li>
            <li className="me-2">
              <button
                onClick={() => setActiveTab('regis-pre-project')}
                className={`primary-hover inline-block rounded-t-lg border-b-2 p-4 text-primary1 ${activeTab === 'regis-pre-project' ? 'border-primary1' : 'border-transparent'}`}
              >
                เข้าร่วมเป็นกรรมการ
              </button>
            </li>
          </ul>
          <div className="flex flex-row items-center justify-center p-4">
            {activeTab === 'pre-project' && <PreProject />}
            {activeTab === 'project' && <Project />}
            {activeTab === 'regis-pre-project' && <Regis />}
          </div>
        </div>
      </div>
    </div>
  )
}
