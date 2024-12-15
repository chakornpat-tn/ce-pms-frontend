import React from 'react';

interface DocsCardProps {
  title: string;
  description: string;
  onCardClick: () => void; // เพิ่มการรับ prop สำหรับการคลิก
}

const DocsCard: React.FC<DocsCardProps> = ({ title, description, onCardClick }) => {
  return (
    <div 
      onClick={onCardClick} // เพิ่มการจัดการการคลิก
      className="bg-white p-6 shadow rounded-md cursor-pointer hover:bg-gray-100 transition duration-200"
    >
      <div className="flex items-center">
        <svg
          className="h-6 w-6 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4h16M4 12h16M4 20h16"
          />
        </svg>
        <h2 className="ml-2 text-xl font-semibold">{title}</h2>
      </div>
      <p className="mt-4 text-gray-600">{description}</p>
    </div>
  );
};

export default DocsCard;
