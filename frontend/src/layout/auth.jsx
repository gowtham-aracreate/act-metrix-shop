import React from 'react'
import logo from '../assets/logo.svg' 
const Auth = ({children}) => {
  return (
    <div className='h-screen'>
        <header className='top-0 left-0 w-full h-[65px] bg-white border-t border-gray-800'>
         <img className="absolute w-[52px] h-[52px] top-[8px] left-[82px]" src={logo} alt="logo" />
        </header>

        {children}

    </div>
  )
}

export default Auth