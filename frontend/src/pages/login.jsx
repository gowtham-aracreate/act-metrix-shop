import React from 'react'
import Auth from '../layout/auth'
import Message from '../assets/message.svg'
import lock from '../assets/lock.svg'

import AuthForm from '../components/AuthForm'

const LoginPage = () => {
  const handleLogin = (event) => {
    event.preventDefault()
    // Add login logic here
  }

  const fields = [
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
            title="Welcome Back!" 
            subtitle="Login to your account" 
            fields={fields} 
            buttonText="Login"   
            question="Don't have an account?"
            linkText="Sign Up"
            linkPath="/register"
            recover="Recover Password"
            onSubmit={handleLogin}
          />
    </Auth>
  )
}

export default LoginPage