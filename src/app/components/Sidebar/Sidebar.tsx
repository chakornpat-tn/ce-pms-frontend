"use client";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="invisible md:visible flex flex-col w-64 h-screen px-5 py-8 overflow-y-auto border-r rtl:border-r-0 rtl:border-l border-primary2-200 bg-bg_primary">
      <p className="mt-1 truncate text-base text-primary2-500 font-bold">
        นายไปเกาหลี ไปกินเกาเหลา
      </p>
      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav className="-mx-3 space-y-6 ">
        <hr className="w-auto h-1 mx-auto py-0 border-0 rounded bg-primary2-400" />
        <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg text-primary2-400 hover:bg-primary2-500 hover:text-primary2-100"
              href="#"
            >
              <span className="mx-5 text-sm font-medium">หน้าหลัก</span>
            </Link>
          <div className="space-y-3 ">
            <label className="px-3 text-base text-primary2-500">Title</label>

            <Link
              className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg  text-primary2-400 hover:bg-primary2-500 hover:text-primary2-100"
              href="#"
            >
              <span className="mx-5 text-sm font-medium">Body</span>
            </Link>

            <div className="space-y-3 ">
              <label className="px-3 text-base text-primary2-500">Title</label>
              <Link
                className="flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg  text-primary2-400 hover:bg-primary2-500 hover:text-primary2-100"
                href="#"
              >
                <span className="mx-5 text-sm font-medium">Body</span>
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
