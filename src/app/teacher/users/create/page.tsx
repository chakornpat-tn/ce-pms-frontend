'use client'
import React, { useActionState, useState } from 'react'
import { createUser } from '@/actions/user'
import Link from 'next/link'

export default function CreateUserPage() {
  const [data, action, isPending] = useActionState(createUser, undefined)

  return (
    <div className="h-full p-4">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-primary1">
        สร้างบัญชีผู้ใช้
      </h1>

      <form className="p-4" action={action}>
        <div className="mb-4 flex">
          <div className="mr-2 w-1/2">
            <label
              htmlFor="firstName"
              className="mb-2 block text-sm font-medium text-primary1"
            >
              ชื่อ
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              className="w-full rounded-md border border-gray-300 p-2"
              required
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
              className="w-full rounded-md border border-gray-300 p-2"
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            ชื่อผู้ใช้
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
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
            className="w-full rounded-md border border-gray-300 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-primary1">
            ตำแหน่งอาจารย์
          </label>
          <div>
            <input
              type="radio"
              id="general"
              name="role"
              value="3"
              className="mr-1"
              required
              defaultChecked
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
            />
            <label htmlFor="pro" className="text-md mr-4">
              โครงงาน
            </label>
          </div>
        </div>
        <div className="flex items-center justify-around">
          <button
            disabled={isPending}
            type="submit"
            className="mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
          >
            สร้าง
          </button>
          <Link
            href="/teacher/users"
            className="px-auto mt-2 w-2/5 rounded-md border-2 border-red-200 bg-white py-2 text-center text-gray-500 hover:border-red-500 hover:text-primary1"
          >
            กลับ
          </Link>
        </div>
      </form>
    </div>
  )
}
