'use client';
import React, { useState ,useEffect} from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);

  const [buttonDisabled,setButtonDisabled] = useState(false);

const {lable,setLable} = useState('Login');

  const onLogin = async () => {
    try{
      setLoading(true);

      const response = await axios.post('/api/users/login', user);
      console.log('Response', response);
      if (response.data.message === 'Login successful') {
        console.log('Login successful');
      }
      else {
        console.log('Login failed');
      }
      router.push('/profile');
    }
    catch (error) {
      console.log('Login failed', error.message);
      toast.error(error.message);
      
      }
      finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      if (
        user.email.length > 0 &&
        user.password.length > 0 
      ) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }, [user]);

  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-center text-white text-2xl'>{loading ? 'Processing' : "Login"}</h1>
      <hr />
      <label htmlFor='email'>Email</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='text'
        id='email'
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
      />
      <label htmlFor='password'>Password</label>
      <input
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black'
        type='text'
        id='password'
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb04 focus:outline-none focus:border-gray-600'
        onClick={onLogin}>
          {buttonDisabled ?"No Login": "Login" }
      </button>
      <Link href='/signup'>Visit Sign up Page</Link>
    </div>
  );
}
