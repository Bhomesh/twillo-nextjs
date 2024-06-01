"use client";
import axios from 'axios';
import { response } from 'express';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Profilepage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const logout = async () => {
    try {
      const response = await axios.get('/api/users/logout');
      if (response.status === 200) {
        console.log('Logout successful');
        toast.success('Logout Successful');
        router.push('/login');
      } else {
        console.log('Logout failed');
      }
    } catch (error) {
      console.log('Logout failed', error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log('Getting user details', res.data);
    setData(res.data.data._id);
  }


  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile
      </h1>
        <hr />
        <p>Profile Page</p>
        <h2 className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4'>{data === 'nothing' ? 'No data' : data}</h2>
      <hr />
      <button
      onClick={logout}
      className='bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Logout
      </button>

      <button
      onClick={getUserDetails}
      className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4'
      >
        Get User Details
      </button>

    </div>
  );
}
