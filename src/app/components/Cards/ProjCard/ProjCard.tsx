import Link from "next/link";
import React from "react";
type Props = {
    path:string
}

const ProjCard = ({path}:Props) => {
    return (
      <Link href={path} className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Noteworthy technology acquisitions 2021</h5>
        <p className="font-normal text-gray-700">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
      </Link>
    );
  }
  const AllpjCard = ({path}:Props) => {
      return (
      <Link href={path} className="flex justify-center items-center max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
      <h5 className="mb-2 text-xl md:text-3xl font-bold tracking-tight text-gray-900">ดูทั้งหมด</h5>
      </Link>
      )
  }
  export {ProjCard, AllpjCard}