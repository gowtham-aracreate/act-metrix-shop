import React from 'react'
import Auth from '../layout/auth'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import Message from '../assets/message.svg'
import lock from '../assets/lock.svg'

import { Eye, EyeOff } from 'lucide-react'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleRegisterNavigation = () => {
    navigate('/register')
  }
  return (
    <Auth>
      <div className='bg-gray-100'>
        <div className='flex flex-col items-center justify-center h-screen'>
          <div className='bg-white p-8 rounded-lg'>
            <img src={logo} className='mx-auto' alt="logo" />
            <div className='text-center pt-[30px]'>
              <h1 className=''>Welcome Back!</h1>
              <p className='text-gray-400'>Login to your account</p>
            </div>
            <form>
              <div className='pt-[60px]'>
                <div className='absolute'>
                  <img src={Message} alt="message" />
                </div>
                <div className=''>
                  <input className='bg-gray-100 border border-gray-100 text-black text-sm rounded-lg py-[8px] px-[16px] pl-[16px]' placeholder='Email Address' />
                </div>
              </div>
              <div>
                <div>
                  <img src={lock} alt="lock" />
                </div>
                <div>
                  <input className='bg-gray-100 border border-gray-100 text-black text-sm rounded-lg py-[8px] px-[16px] pl-[16px]' placeholder='Password' />
                </div>
              </div>
              <div>
              <a className='text-blue-600' href="#">Recover Password</a>
              </div>
              <div>
                <p>Dont't have an account? <a className='text-blue-600' href="#">Sign Up</a> </p>
                <button className='bg-blue-600 text-white px-8 py-3 rounded-lg'>Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Auth>
  )
}

export default LoginPage