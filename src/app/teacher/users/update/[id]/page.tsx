'use client'
import React, { useState, useEffect } from 'react'
import { createUser } from '@/actions/user'
import { useFormState } from 'react-dom'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import useSWR from 'swr'

export default function UpdateUserPage() {
  const params = useParams()
  const userId = params.id


  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  const fetcher = (url: string) => fetch(url).then(res => res.json())
  const { data } = useSWR(`${apiUrl}/v1/user/${userId}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
   
  console.log(userId)

  return (
    <div className="min-h-svh p-4">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-primary1">
        แก้ไขบัญชีผู้ใช้ {data?.username}
      </h1>
    
    <form
      className="p-4"
     
    >
      <div className="mb-4 flex">
        <div className="mr-2 w-1/2">
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            ชื่อ
          </label>
          <input type="hidden" name="id" value={userId} />
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
            defaultValue={data?.name.split(' ')[0]}
          />
        </div>
        <div className="ml-2 w-1/2">
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            นามสกุล
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
            defaultValue={data?.name.split(' ')[1]}
          />
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-primary1"
        >
          รหัสผ่าน
        </label>
        <input
          type="password"
          name="password"
          id="password"
          className="w-full rounded-lg border border-gray-300 p-2"
        />
      </div>
      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-primary1">
          ตำแหน่งอาจารย์
        </label>
        <div className="mb-2 flex items-center justify-around">
          <input
            type="radio"
            id="general"
            name="role"
            value="3"
            className="mr-1"
            required
            defaultChecked={data?.role === 3}
          />
          <label htmlFor="general" className="text-md mr-4">
            ทั่วไป
          </label>

          <input
            type="radio"
            id="pre"
            name="role"
            value="2"
            className="mr-1"
            required
            defaultChecked={data?.role === 2}
          />
          <label htmlFor="pre" className="text-md mr-4">
            เตรียมโครงงาน
          </label>

          <input
            type="radio"
            id="pro"
            name="role"
            value="1"
            className="mr-1"
            required
            defaultChecked={data?.role === 1}
          />
          <label htmlFor="pro" className="text-md mr-4">
            โครงงาน
          </label>
        </div>
      </div>
      <div className="flex items-center justify-around">
        <button
          type="submit"
          className=" mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
        >
          อัพเดท
        </button>
        <button
          type="button"
    
          className=" mt-2 w-2/5 rounded-md border-2 border-red-200 bg-white px-4 py-2 text-gray-500 hover:border-red-500 hover:text-primary1"
        >
          ยกเลิก
        </button>
      </div>
    </form>
    </div>
  )
}
