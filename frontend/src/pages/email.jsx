import React, { useState } from 'react'
import Auth from '../layout/auth'
import Message from '../assets/message.svg'
import { useNavigate } from "react-router-dom";

export const Email = () => {
    const navigate = useNavigate();
    const [Email, setEmail] = useState("");

    const handleEmail = async () => {
        if(Email==" "){
          console.log("Required Email");
          return;
        }
        navigate("/recover")
    }
    return (
        <Auth>
            <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
                <div className="bg-white p-8 rounded-lg w-auto h-auto">
                    <div className="text-center pt-[25px] mb-[10px]">
                        <h1 className="text-2xl font-semibold">Recover Password</h1>
                    </div>
                    <form onSubmit={handleEmail}>
                        <div className='relative'>
                            <img
                                src={Message}
                                alt="mail"
                                className="absolute left-3 top-15 transform -translate-y-1/2"
                            />
                            <h1>Email</h1>
                            <input type="email" placeholder='Enter Your Email' required='true'
                            value={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-gray-100 border border-gray-100 text-black text-sm rounded-lg py-[15px] pr-[150px] pl-[50px] mt-3"
                            />
                        </div>
                        <div className="pt-[20px] text-center">
                            <button
                                type='submit'
                                className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg">
                                Reset Password
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </Auth>
    )
}
