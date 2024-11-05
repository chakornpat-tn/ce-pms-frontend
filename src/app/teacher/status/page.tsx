'use client'
import React, { useState } from "react";

const TableComponent: React.FC = () => {
  const [toggleStatus, setToggleStatus] = useState([false, false]);

  const handleToggle = (index: number) => {
    const updatedToggleStatus = [...toggleStatus];
    updatedToggleStatus[index] = !updatedToggleStatus[index];
    setToggleStatus(updatedToggleStatus);
  };

  return (
    <div className="p-5">
      
      <div className="flex space-x-4 mb-4">
        <button className="bg-gray-200 px-4 py-2 rounded">เตรียมโครงงาน</button>
        <button className="bg-gray-200 px-4 py-2 rounded">โครงงาน</button>
      </div>

      
      <table className="min-w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">ลำดับ</th>
            <th className="border border-gray-400 px-4 py-2">สถานะ</th>
            <th className="border border-gray-400 px-4 py-2">สีตัวอักษร</th>
            <th className="border border-gray-400 px-4 py-2">สีพื้นหลัง</th>
            <th className="border border-gray-400 px-4 py-2">ปิดใช้งาน</th>
            <th className="border border-gray-400 px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: 1, status: "หาย", textColor: "#ffffff", bgColor: "#000000" },
            { id: 2, status: "หายจริง", textColor: "#ffffff", bgColor: "#000000" },
          ].map((item, index) => (
            <tr key={item.id}>
              <td className="border border-gray-400 px-4 py-2 text-center">{item.id}</td>
              <td className="border border-gray-400 px-4 py-2">{item.status}</td>
              <td className="border border-gray-400 px-4 py-2">{item.textColor}</td>
              <td className="border border-gray-400 px-4 py-2">{item.bgColor}</td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={toggleStatus[index]}
                    onChange={() => handleToggle(index)}
                  />
                </label>
              </td>
              <td className="border border-gray-400 px-4 py-2 text-center">
                <button className="text-xl">≡</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
