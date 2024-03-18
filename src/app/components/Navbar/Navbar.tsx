import * as React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

export default function Navbar() {
  return (
    <div className="bg-bg_primary">
      <nav className="top-0 flex w-full items-center justify-between  px-3 py-3 md:px-20 ">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="whitespace-nowrap font-semibold text-primary2-500 md:text-2xl">
            Project Management System
          </span>
        </Link>
        <div className="ml-auto flex max-h-16 max-w-16 items-center md:max-h-32 md:max-w-52 rtl:space-x-reverse">
          <span>
            <Button className="rounded-lg bg-primary2-100 text-xs text-primary2-300 md:text-base">
              <Link href="/login">Login/เข้าสู่ระบบ</Link>
            </Button>
          </span>
        </div>
      </nav>
      <hr className="mx-auto h-1 w-[85vw] rounded border-0 bg-primary2-400 py-0" />
    </div>
  );
}
