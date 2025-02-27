import React from 'react'
import Auth from '../layout/auth'
import Message from '../assets/message.svg'
import lock from '../assets/lock.svg'

import AuthForm from '../components/AuthForm'

const LoginPage = () => {
  const fields = [
    {
      icon: Message,
      alt: 'Email',
      type: 'email',
      placeholder: 'Email Address',
      required: true,
      name: 'email',
    },
    {
      icon: lock,
      alt: 'Password',
      type: 'password',
      placeholder: 'Password',
      required: true,
      name: 'password',
    },
  ]
  return (
    <Auth>
      <AuthForm 
      mode="login"
            title="Welcome Back!" 
            subtitle="Login to your account" 
            fields={fields} 
            buttonText="Login"   
            question="Don't have an account?"
            linkText="Sign Up"
            linkPath="/register"
            recover="Recover Password"
          />
    </Auth>
  )
}

export default LoginPage