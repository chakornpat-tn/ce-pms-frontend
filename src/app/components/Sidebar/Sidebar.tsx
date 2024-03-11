"use client";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="invisible md:visible flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l bg-gray-900 border-gray-700">
      <p className="mt-1 truncate text-lg text-gray-500 font-bold">
        นายไปเกาหลี ไปกินเกาเหลา
      </p>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <label className="px-3 text-base text-gray-400">analytics</label>

            <a
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-200 hover:bg-gray-800 hover:text-gray-700"
              href="#"
            >
              <span className="mx-5 text-sm font-medium">Dashboard</span>
            </a>

            <div className="space-y-3 ">
              <label className="px-3 text-base text-gray-400">content</label>
              <a
                className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-gray-200 hover:bg-gray-800 hover:text-gray-700"
                href="#"
              >
                <span className="mx-5 text-sm font-medium">Guides</span>
              </a>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
