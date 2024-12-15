'use client';
import React, { useState } from 'react';
import { ReportProject } from '@/components/Forms/ReportProject/ReportProject';
import Link from 'next/link';

export default function Page() {
  const [reportType, setReportType] = useState<null | number>(null); 

  const handleOpenReport = (type: number) => {
    setReportType(type);
  };

  const handleCloseReport = () => {
    setReportType(null);
  };

  return (
    <div className='bg-bg_primary h-auto md:h-dvh flex justify-center items-start'>
      <div className='flex justify-center items-center flex-col md:mt-[5vh] bg-white w-4/5'>
        <div className='w-4/5'>
          <button className="bg-primary1 hover:bg-red-500 text-white py-0 px-3 rounded-md mb-4 mt-3">
            <Link href='/project'>กลับ</Link>
          </button>
          <div className="mb-3 border-b border-primary2-500"></div>
        </div>
        
        <div className='w-4/5 bg-white p-4 mt-5 text-center'>
          <button
            className="border border-primary1 hover:bg-green-500 text-primary1 py-2 px-40 rounded-md mb-2 mt-[-30px]"
            onClick={() => handleOpenReport(1)}
          >
            รายงานความคืบหน้าครั้งที่ 1<br/>
            ก่อน {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          </button>
          
          <div className="mb-3"></div>
          <div className="mb-3 border-b border-primary2-500"></div>
          
          <button
            className="border border-primary1 hover:bg-green-500 text-primary1 py-2 px-40 rounded-md mb-2 mt-2"
            onClick={() => handleOpenReport(2)}
          >
            รายงานความคืบหน้าครั้งที่ 2<br/>
            ก่อน {new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' })}
          </button>
        </div>

        {reportType !== null && (
          <div className='report-section'>
            <ReportProject reportType={reportType} onClose={handleCloseReport} />
          </div>
        )}
      </div>
    </div>
  );
}
