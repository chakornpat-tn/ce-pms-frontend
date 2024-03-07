import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div className='bg-bg_primary h-auto md:h-dvh flex justify-center items-start'>
        <div className='flex justify-center items-center flex-col md:mt-[5vh] bg-white w-4/5'>
            <h1 className='text-3xl'>ระบบเจาะยางรถอาจารย์</h1>
            <h2 className='text-2xl mb-7'>Puncture a Teacher`s tire</h2>
            <div className='w-4/5'>
                <h3 className='inline-block'style={{ backgroundColor: 'yellow' }}>สถานะโครงงาน</h3>
            <section>
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
                <p className='mb-5'><span className='font-bold'> อัพเดทล่าสุดโดย :</span> นาย ไฟแดง แซงไฟเขียว</p>
            </section>
            </div>
        </div>
    </div>
  )
}