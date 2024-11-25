import React, { useState } from 'react';

type Props = {
  reportType: number;
  onClose: () => void;
};

function ReportProject({ reportType, onClose }: Props) {
  const [percentages, setPercentages] = useState({
    part0: '',
    part1: '',
    part2: '',
    part3: '',
    part4: '',
    part5: '',
    part6: '',
    total: '',
    projectPart: '',
    workDetails: '',
  });
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    key: string
  ) => {
    const newPercentages = { ...percentages, [key]: e.target.value };
    
    // คำนวณผลรวมของช่องที่ต้องการ
    const sum = ['part0', 'part1', 'part2', 'part3', 'part4', 'part5', 'part6']
      .reduce((acc, partKey) => {
        const value = Number(newPercentages[partKey as keyof typeof newPercentages] || 0);
        return acc + value;
      }, 0);

    // อัพเดตค่าในช่อง "รวมทั้งหมด"
    setPercentages({
      ...newPercentages,
      total: sum.toString()
    });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="relative bg-white p-6 rounded-lg w-full max-w-lg mx-auto my-6 max-h-[80vh] overflow-y-auto">
        <button
          className="absolute top-2 right-2 text-2xl text-gray-500"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="text-center text-xl font-semibold mb-6">
          {`รายงานความคืบหน้าครั้งที่ ${reportType}`}
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold">ด้านเอกสาร</h3>
            {['ปก/คำนำ/สารบัญ (10%)', 'บทที่ 1 (10%)', 'บทที่ 2 (15%)', 'บทที่ 3 (25%)', 'บทที่ 4 (25%)', 'บทที่ 5 (10%)', 'ภาคผนวกอื่นๆ (5%)'].map((label, index) => (
              <div key={`part${index}`} className="flex items-center space-x-2 my-2">
                <span>{label}</span>
                <input
                  type="text"
                  value={percentages[`part${index}` as keyof typeof percentages]}
                  onChange={(e) => {
                    const maxPercentage = [10, 10, 15, 25, 25, 10, 5][index];
                    const value = Number(e.target.value);
                    if (value > maxPercentage) return;
                    handleChange(e, `part${index}`);
                  }}
                  placeholder="คิดเป็น... %"
                  className="ml-2 p-1 border rounded w-1/2"
                />
              </div>
            ))}
            <div className="flex items-center space-x-2 my-2">
              <span>รวมทั้งหมด (100%)</span>
              <input
                type="text"
                value={percentages.total}
                placeholder="คิดเป็น... %"
                className="ml-2 p-1 border rounded w-1/2"
                readOnly
              />
            </div>
          </div>

          <div>
            <h3 className="font-bold">ด้านชิ้นงาน</h3>
            <div className="flex items-center space-x-2 my-2">
              <span>ภาพรวมเกี่ยวกับขอบเขตโครงงาน (100%)</span>
              <input
                type="text"
                value={percentages.projectPart}
                onChange={(e) => handleChange(e, 'projectPart')}
                placeholder="คิดเป็น... %"
                className="ml-2 p-1 border rounded w-1/2"
              />
            </div>
            <textarea
              placeholder="รายละเอียดของผลการดำเนินงาน"
              value={percentages.workDetails}
              onChange={(e) => handleChange(e, 'workDetails')}
              className="w-full p-2 border rounded h-20"
            />
          </div>

          <div>
            <span>ไฟล์เอกสาร .pdf เท่านั้น</span>
            <div className="flex items-center mt-2">
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="fileInput"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0];
                    if (file.type === 'application/pdf') {
                      setSelectedFileName(file.name);
                    } else {
                      alert('กรุณาเลือกไฟล์ PDF เท่านั้น');
                      e.target.value = '';
                    }
                  }
                }}
              />
              <button
                onClick={() => document.getElementById('fileInput')?.click()}
                className="px-4 py-1 bg-blue-500 text-white rounded"
              >
                เลือกไฟล์
              </button>
              {selectedFileName && (
                <>
                  <span className="ml-2">{selectedFileName}</span>
                  <button
                    onClick={() => {
                      setSelectedFileName('');
                      if (document.getElementById('fileInput')) {
                        (document.getElementById('fileInput') as HTMLInputElement).value = '';
                      }
                    }}
                    className="ml-2 px-4 py-1 bg-red-500 text-white rounded"
                  >
                    ลบไฟล์
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-bold">ความคิดเห็นของอาจารย์ที่ปรึกษา</h3>
            <input type="text" placeholder="ความคิดเห็น" className="w-full p-1 border rounded" />
          </div>

          <div className="mt-4">
            <h3 className="font-bold">ความคิดเห็นเพิ่มเติม</h3>
            <textarea placeholder="ความคิดเห็นเพิ่มเติม" className="w-full p-2 border rounded h-20" />
          </div>
        </div>
        <button
          onClick={handleClose}
          className="mt-6 px-4 py-2 bg-green-500 text-white rounded w-full"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

export { ReportProject };
