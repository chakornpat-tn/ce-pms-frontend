'use client';

import React, { useEffect } from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { Progress } from '@/components/Stepper';
import Link from 'next/link';
import { jwtVerify } from 'jose';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
const tokenSecret = process.env.NEXT_PUBLIC_TOKEN_SECRET || '';

const steps = [
    'ใบขอสอบ2.0',
    'ใบซ้อมนำเสนอ3.0',
    'ใบประเมินคณะกรรมการ4.0',
    'ใบส่งชิ้นงาน5.0',
    'ส่งปริญญานิพนธ์'
];

const secretKey = new TextEncoder().encode(tokenSecret);

async function decodeToken(token: string) {
    try {
        const { payload } = await jwtVerify(token, secretKey);
        console.log('Decoded Token:', payload);
        return payload;
    } catch (error) {
        console.error('Token verification failed:', error);
        return null;
    }
}

type Props = {};
export default function Page({}: Props) {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            decodeToken(token).then(decoded => {
                console.log('Decoded data:', decoded);
            });
        }
    }, []);

    return (
        <div className='bg-bg_primary min-h-screen flex justify-center items-start'>
            <div className='flex flex-col items-center bg-white w-full max-w-3xl p-4 md:mt-[5vh] md:px-8 rounded-lg'>
                <h1 className='text-xl md:text-3xl text-center'>ระบบเจาะยางรถอาจารย์</h1>
                <h2 className='text-lg md:text-2xl mb-5 text-center'>Puncture a Teacher's tire</h2>
                <div className='w-full'>
                    
                    <Box sx={{ width: '100%' }}>
                        <Stepper activeStep={1} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                    </Box>
                    <h3 className='inline-block bg-yellow-200 text-sm md:text-base mr-4 mt-5'>สถานะโครงงาน</h3>
                    <button className="bg-primary1 hover:bg-green-500 text-white text-xs md:text-base py-1 px-3 md:px-4 rounded mb-4"><Link href="/project/studentdocs">คลิกเพื่อส่งเอกสาร</Link></button>
                    <button className="bg-red-500 hover:bg-green-500 text-white text-xs md:text-base py-1 px-3 md:px-4 rounded mb-4 float-right">ข้อความแนะนำจากอาจารย์</button>
                    <br></br>
                    <h3 className='inline-block bg-yellow-200 text-sm md:text-base mr-4'>สถานะโครงงาน</h3>
                    <div className="mb-4 border-b border-primary2-500"></div>
                    <h3 className='font-bold text-sm md:text-base'>รายงานความก้าวหน้าโครง</h3>
                    <div className='flex justify-center items-center mt-2'>
                        <p>เอกสาร</p>
                    </div>
                    <Progress value={1} />
                    <div className='flex justify-center items-center mt-2'>
                        <p>ชิ้นงาน</p>
                    </div>
                    <Progress value={1} />
                    <div className='flex justify-center items-center flex-col mt-4 w-full'>
                        <button className="bg-primary1 hover:bg-green-500 text-white text-xs md:text-base py-2 px-3 md:px-4 rounded mb-4">
                            <Link href="/project/studentprogress">รายงานความก้าวหน้า</Link>
                        </button>
                    </div>
                    <div className="mb-4 border-b border-primary2-400"></div>
                    <section className="w-full text-sm md:text-base">
                        <button className="bg-red-500 hover:bg-green-500 text-white py-2 px-3 rounded float-right mb-4">แก้ไขเอกสาร</button>
                        <h3 className='font-bold'>ผู้พัฒนา</h3>
                        <p>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
                        <p>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
                        <p className='mb-5'>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
                    </section>
                    <section className="text-sm md:text-base">
                        <h3 className='mb-4'><span className='font-bold'>อาจารย์ที่ปรึกษา:</span> นาย ไฟแดง แซงไฟเขียว</h3>
                        <h3 className='mb-4'><span className='font-bold'>ปีการศึกษา:</span> 2077</h3>
                    </section>
                    <section className="text-sm md:text-base">
                        <h3 className='font-bold'>บทคัดย่อ</h3>
                        <p className='mb-5'>ถ้าพูดถึงเมนูลาบ...</p>
                        <h3 className='font-bold'>Abstract</h3>
                        <p className='mb-5'>If talking about the spicy...</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
