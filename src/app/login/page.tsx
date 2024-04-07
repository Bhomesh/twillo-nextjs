'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });

  const onLogin = async () => {};
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl'>Login</h1>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
        type='text'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>Password</label>
      <input
        type='text'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb04 focus:outline-none focus:border-gray-600'
        onClick={onLogin}>
        Logn
      </button>
      <Link href='/signup'>Visit Sign up Page</Link>
    </div>
  );
}
