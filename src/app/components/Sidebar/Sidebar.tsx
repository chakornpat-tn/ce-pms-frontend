"use client";
import Link from "next/link";
import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="invisible flex h-screen w-64 flex-col overflow-y-auto border-r border-primary2-200 bg-bg_primary px-5 py-8 md:visible rtl:border-l rtl:border-r-0">
      <p className="mt-1 truncate text-base font-bold text-primary2-500">
        นายไปเกาหลี ไปกินเกาเหลา
      </p>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <hr className="mx-auto h-1 w-auto rounded border-0 bg-primary2-400 py-0" />
          <Link
            className="flex transform items-center rounded-lg px-3 py-2 text-primary2-400 transition-colors duration-300 hover:bg-primary2-500 hover:text-primary2-100"
            href="#"
          >
            <span className="mx-5 text-sm font-medium">หน้าหลัก</span>
          </Link>
          <div className="space-y-3 ">
            <label className="px-3 text-base text-primary2-500">Title</label>

            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-primary2-400 transition-colors  duration-300 hover:bg-primary2-500 hover:text-primary2-100"
              href="#"
            >
              <span className="mx-5 text-sm font-medium">Body</span>
            </Link>

            <div className="space-y-3 ">
              <label className="px-3 text-base text-primary2-500">Title</label>
              <Link
                className="flex transform items-center rounded-lg px-3 py-2 text-primary2-400 transition-colors  duration-300 hover:bg-primary2-500 hover:text-primary2-100"
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
