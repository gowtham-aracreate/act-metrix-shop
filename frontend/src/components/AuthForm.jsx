import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { Eye, EyeOff } from 'lucide-react'

export const AuthForm = ({ title, subtitle, fields, buttonText,question, linkText, linkPath,recover, onSubmit}) => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handleLinkClick = () => {
        navigate(linkPath)
    }
    const Passwordvisible = () => {
        setShowPassword(!showPassword)
    }
    return (
            <div className='flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen'>
                <div className='bg-white p-8 rounded-lg w-auto h-auto'>
                <img src={logo} className='mx-auto' alt="logo" />
                <div className='text-center pt-[25px] mb-[10px]'>
                    <h1 className='text-2xl font-semibold'>{title}</h1>
                    <p className='text-gray-400'>{subtitle}</p>
                </div>
                <form onSubmit={onSubmit}>
                    {fields.map((field, index) => (
                        <div className='pt-[25px]' key={index}>
                            <div className='relative'>
                                <img src={field.icon} alt={field.alt} className='absolute left-3 top-1/2 transform -translate-y-1/2' />
                                <input
                                    type={field.type === 'password' && showPassword ? 'text' : field.type}
                                    className='bg-gray-100 border border-gray-100 text-black text-sm rounded-lg py-[15px] pr-[150px] pl-[50px]'
                                    placeholder={field.placeholder}
                                    required={field.required}
                                />
                                {field.type === 'password' && (
                                    <div className='absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer' onClick={Passwordvisible}>
                                        {showPassword ? <EyeOff /> : <Eye />}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </form>
                <div className='pt-3 pl-[229px]'>
                  <a className='text-blue-600 right-0' href="#">{recover}</a>
              </div>
                <div className='pt-[20px] text-center'>
                    <p className='pb-[20px]'>{question} <a className='text-blue-600' href="#" onClick={handleLinkClick}>{linkText}</a> </p>
                    <button type='submit' className='bg-blue-600 text-white px-8 py-3 rounded-lg' >{buttonText}</button>
                </div>
             </div>
            </div>
    )
}

export default AuthForm