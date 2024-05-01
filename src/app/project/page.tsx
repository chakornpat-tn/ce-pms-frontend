import React from 'react'
import { Stepper, Step, StepLabel } from '@mui/material'
import Box from '@mui/material/Box';
import { Progress } from '@/components/Stepper';

const steps = [
    'ใบขอสอบ2.0',
    'ใบซ้อมนำเสนอ3.0',
    'ใบประเมินคณะกรรมการ4.0',
    'ใบส่งชิ้นงาน5.0',
    'ส่งปริญญานิพนธ์'
];

type Props = {}
export default function page({}: Props) {
  return (
    <div className='bg-bg_primary h-auto md:h-dvh flex justify-center items-start'>
        <div className='flex justify-center items-center flex-col md:mt-[5vh] bg-white w-4/5'>
            <h1 className='text-3xl'>ระบบเจาะยางรถอาจารย์</h1>
            <h2 className='text-2xl mb-7'>Puncture a Teacher`s tire</h2>
            <div className='w-4/5'>
            <p className='mb-5'><span className='font-bold'> อัพเดทล่าสุดโดย :</span> นาย ไฟแดง แซงไฟเขียว</p>
            
            <Box sx={{ width: '100%' }}>
      <Stepper activeStep={1} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  
                <h3 className='inline-block'style={{ backgroundColor: 'yellow', marginRight:'50px' }}>สถานะโครงงาน</h3>
                <button className="bg-primary1 hover:bg-green-500 text-white py-0 px-4 rounded mb-5">คลิกเพื่อส่งเอกสาร</button>
                <button className="bg-red-500 hover:bg-green-500 text-white py-0 px-4 rounded" style={{ marginRight: "1px", float: "right" }}>ข้อความแนะนำจากอาจารย์</button>
                <div className="mb-3 border-b border-primary2-500"></div>
                <h3 className='font-bold'>รายงานความก้าวหน้าโครง</h3>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <p>เอกสาร</p>
                </div>
                <Progress value={50} />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                <p>ชิ้นงาน</p>
                </div>
                <Progress value={50} />
                <div className='flex justify-center items-center flex-col md:mt-[5vh] bg-white w-5/5' style={{ textAlign: 'center' }}>
                <button className="bg-primary1 hover:bg-green-500 text-white py-0 px-4 rounded mb-5">รายงานความก้าวหน้า</button>
                </div>

                <div className="mb-3 border-b border-primary2-400"></div>
            <section>
            <button className="bg-red-500 hover:bg-green-500 text-white py-0 px-4 rounded" style={{ marginRight: "1px", float: "right" }}>แก้ไขเอกสาร</button>
                <h3 className='font-bold'>ผู้พัฒนา</h3>
                <p>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
                <p>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
                <p className='mb-5'>นาย ธนพงษ์ ตั้งทวีเกียรติ</p>
            </section>
            <section>
                <h3 className='mb-5'><span className='font-bold'>อาจารย์ที่ปรึกษา :</span> นาย ไฟแดง แซงไฟเขียว</h3>
                <h3 className='mb-5'><span className='font-bold'>ปีการศึกษา :</span> 2077</h3>
            </section>
            <section>
                <h3 className='font-bold'>บทคัดย่อ</h3>
                <p className='mb-5'>ถ้าพูดถึงเมนูลาบรสชาติจัดจ้านสุดอร่อย หลายคนต้องนึกถึงเมนู ลาบหมู เราเลยขอนำสูตรอาหาร วิธีทำ ลาบหมู สูตรอาหารทำง่าย กับแกล้มรสชาติดี ทำกินได้ทั้งครอบครัว สูตรนี้จัดเต็ม มาทั้งเนื้อหมู ตับหมู และหนังหมู จะทำกินคู่กับข้าวสวย ข้าวเหนียวก็ได้ หรือจะทำเป็นกับแกล้มยามเย็นก็ดี แถมเป็นเมนูทำง่าย ทำไว ใช้เวลาไม่นาน วัตถุดิบไม่แพง ควรค่าแก่การเก็บสูตรไว้ทำกินทั้งครอบครัว พร้อมแล้วตามไปทำเมนูลาบหมู พร้อมกันเลย!</p>
                <h3 className='font-bold'>Abstract</h3>
                <p className='mb-5'>If talking about the spicy and delicious laab menu. Many people must think of the menu Laab Moo, so we would like to bring the recipe.How to make pork larb, an easy-to-make recipe Snacks taste good. Can make food for the whole family This recipe is complete. Comes with both porkPork liver and pork skin are eaten with steamed rice. Sticky rice is fine. Or you can make it as an evening snack. Plus, it`s an easy-to-make menu. It doesn`t take long to make quickly. Inexpensive ingredients It`s worth keeping the recipe for the whole family to cook. Ready, follow along and make the pork larb menu together!</p>
            </section>
            </div>
        </div>
    </div>
  )
}