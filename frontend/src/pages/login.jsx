import React from 'react'
import Auth from '../layout/auth'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const navigate = useNavigate()

  const handleRegisterNavigation = () => {
    navigate('/register')
  }
  return (
   <Auth>
    <h1 className=''>Login</h1>
    <h2>hello</h2>
    <input placeholder='enter your name login'/>
    <button onClick={handleRegisterNavigation}>Go to Register</button>
   </Auth>
  )
}

export default LoginPage