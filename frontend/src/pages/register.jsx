import React from 'react'
import Auth from '../layout/auth'
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
   const navigate = useNavigate()
  
    const handleLoginNavigation = () => {
      navigate('/login')
    }
  return (
   <Auth>
    register
    <input placeholder='enter your name'/>
    <button onClick={handleLoginNavigation}>Go to Login</button>
   </Auth>
  )
}

export default RegisterPage