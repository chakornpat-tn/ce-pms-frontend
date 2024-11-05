'use client';

import { useState } from 'react';
import { Combobox, ComboboxButton, ComboboxOptions, ComboboxOption } from '@headlessui/react';
import DocsCard from '@/components/Cards/DocsCard/DocsCard';

const ProjectPage = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const items = ['ใบขอสอบ 2.0', 'ใบซ้อมนำเสนอ 3.0', 'ใบประเมินคณะกรรมการ 4.0', 'ใบส่งชิ้นงาน 5.0', 'ส่งปริญญานิพนธ์'];

  const handleCardClick = () => {
    if (selectedItem) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate that the uploaded file is a PDF
      if (file.type === 'application/pdf') {
        // Handle file upload
        console.log('Uploaded PDF:', file);
      } else {
        alert('กรุณาอัพโหลดไฟล์ PDF เท่านั้น');
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-4">
        <label id="listbox-label" className="block text-sm font-medium text-gray-700">เลือกเอกสารที่ต้องการส่ง</label>
        <Combobox value={selectedItem} onChange={setSelectedItem}>
          <div className="relative mt-1">
            <ComboboxButton className="relative w-96 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="block truncate">{selectedItem || "เลือกหัวข้อ"}</span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 01-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </span>
            </ComboboxButton>
            <ComboboxOptions className="absolute z-10 mt-1 w-96 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {items.map((item) => (
                <ComboboxOption key={item} value={item} className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-10 pr-4 ${active ? 'text-white bg-indigo-600' : 'text-gray-900'}`}
                >
                  {({ selected }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item}</span>
                    </>
                  )}
                </ComboboxOption>
              ))}
            </ComboboxOptions>
          </div>
        </Combobox>
      </div>
      
      <div className="my-4">
        {selectedItem && (
          <div className="w-full max-w-2xl">
            <DocsCard 
              title={selectedItem} 
              description={`รายละเอียดสำหรับ ${selectedItem}`} 
              onCardClick={handleCardClick} 
            />
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">อัพโหลดเอกสาร</h2>
            <p className="mb-4">กรุณาอัพโหลดไฟล์ PDF สำหรับเอกสาร {selectedItem}</p>
            <input type="file" accept="application/pdf" onChange={handleUpload} className="mb-4" />
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded mr-2">ปิด</button>
              <button onClick={handleCloseModal} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">อัพโหลด</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
