import React from 'react'
import Auth from '../layout/auth'
import { useNavigate } from 'react-router-dom'
import Profile from '../assets/profile.svg'
import Message from '../assets/message.svg'
import lock from '../assets/lock.svg'
import AuthForm from '../components/AuthForm'

const RegisterPage = () => {
  
   const handleRegister = (event) => {
    event.preventDefault()
    // Add login logic here
  }
const fields = [
  {
    icon: Profile,
    alt: 'Username',
    type: 'text',
    placeholder: 'Your Full Name',
    required: true,
  },
  {
      icon: Message,
      alt: 'Email',
      type: 'email',
      placeholder: 'Email Address',
      required: true,
    },
    {
      icon: lock,
      alt: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
    },
  ]

  return (
   <Auth>
    <AuthForm
      title="Get Started with Metrix"
      subtitle="Create Your free account"
      fields={fields}
      buttonText="Register"
      question="Already have an account?"
      linkText="Login"
      linkPath="/login"
      onSubmit={handleRegister}
      />
   </Auth>
  )
}

export default RegisterPage