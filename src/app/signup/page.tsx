'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [loading, setLoading] = useState(false);

  const onSignup = async () => { 
    try {
      setLoading(true);
      console.log('Signing up', user);
      const response = await axios.post('/api/users/signup', user);
      console.log('Signup successful', response.data);
      toast.success('Signup Successful', response.data.message);
      router.push('/login');
    } catch (error) {
      console.log('Signup failed', error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl'>
        {loading ? 'Processing' : 'Sign Up'}
      </h1>
      <hr />
      <label
        className='p-2'
        htmlFor='username'>
        Username
      </label>
      <input
        className=' text-black text p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='text'
        id='username'
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='Username'
      />
      <label
        className='p-2'
        htmlFor='email'>
        Email
      </label>
      <input
        className=' text-black text p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='text'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='Email'
      />
      <label
        className='p-2'
        htmlFor='password'>
        Password
      </label>
      <input
        className=' text-black text p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        type='password'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='Password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb04 focus:outline-none focus:border-gray-600'
        onClick={onSignup}>
        {buttonDisabled ? 'No Sign Up' : 'Sign Up'}
      </button>
      <Link href='/login'>Visit Login Page</Link>
    </div>
  );
}
