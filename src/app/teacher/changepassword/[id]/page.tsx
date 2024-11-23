'use client';

import { GetUser, changePassword } from '@/actions/user';
import { User } from '@/models/User'
import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function ChangePasswordPage() {
  const router = useRouter();
  const params = useParams();
  const userId = Number(params.id);
  const [message, setMessage] = useState('');
  
  const fetchUser = async (userId: number) => {
    const res = await GetUser(userId)
    return res as User
  }
  
  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = async (formData: FormData) => {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    const submitData = new FormData();
    submitData.append('password', password);

    const response = await changePassword(submitData);
    if (response && typeof response === 'object' && 'error' in response) {
      setMessage((response as { error: string }).error);
    } else {
      setMessage('Password changed successfully');
    }
  };
  return (
    <div className="min-h-svh p-4">
      <h1 className="mb-4 text-2xl font-medium leading-6 text-primary1">
        Change Password
      </h1>
      <p>User ID: {params.id}</p>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form className="p-4" action={handleSubmit}>
        <input type="hidden" name="id" value={userId} />
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            New Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-sm font-medium text-primary1"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="w-full rounded-lg border border-gray-300 p-2"
            required
          />
        </div>
        <div className="flex items-center justify-around">
          <button
            type="submit"
            className="mt-2 w-2/5 rounded-md bg-primary2-400 px-4 py-2 text-white hover:bg-primary2-500"
          >
            Update Password
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="mt-2 w-2/5 rounded-md border-2 border-red-200 bg-white px-4 py-2 text-gray-500 hover:border-red-500 hover:text-primary1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
