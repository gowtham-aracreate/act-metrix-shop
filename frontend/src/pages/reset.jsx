import React, { useState, useEffect } from 'react'
import Auth from '../layout/auth'
import lock from '../assets/lock.svg'
import { Eye, EyeOff } from "lucide-react";
import { useNavigate, useLocation  } from "react-router-dom";


const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation(); 
    const { email, otp } = location.state || {};
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword(!showNewPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setError("");
        setMessage("");

        if (!email || !otp) {
            setError("Invalid session. Please request a new OTP.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, otp, newPassword }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Password reset successfully! Redirecting...");
                setTimeout(() => navigate("/login"), 2000);
            } else {
                setError(data.error || "Something went wrong. Please try again.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };


    return (
        <Auth>
            <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
                <div className="bg-white p-8 rounded-lg w-auto h-auto">
                    <div className="text-center pt-[25px] mb-[10px]">
                        <h2 className="text-balck text-3xl font-bold mb-4 pt-4">
                            Enter New Password</h2>
                    </div>
                    <form onSubmit={handleResetPassword}>
                        <div className='relative'>
                            <img
                                src={lock}
                                alt="lock"
                                className="absolute left-3 top-18 transform -translate-y-1/2"
                            />
                            <h1 className='text-lg text-gray-900'>New Password</h1>
                            <input
                                type={showNewPassword ? "text" : "password"}
                                className="bg-gray-100 text-lg border border-gray-100 text-black rounded-lg py-[15px] pr-[150px] pl-[50px] mt-3"
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder='Enter Your New Password'
                            />
                            <div className="absolute right-3 top-15 cursor-pointer" onClick={toggleNewPasswordVisibility}>
                                {showNewPassword ? <EyeOff /> : <Eye />}
                            </div>
                        </div>
                        <div className='relative pt-4'>
                            <img
                                src={lock}
                                alt="lock"
                                className="absolute left-3 top-22 transform -translate-y-1/2"
                            />
                            <h1 className='text-lg text-gray-900'>Confirm Password</h1>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                className="bg-gray-100 text-lg border border-gray-100 text-black rounded-lg py-[15px] pr-[150px] pl-[50px] mt-3"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder='Confirm Your Password'
                            />
                            <div className="absolute right-3 top-19 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {message && <p className="text-green-500 text-sm mt-2">{message}</p>}

                        <div className="pt-[20px] text-center">
                        <button
                                type="submit"
                                className="cursor-pointer bg-blue-600 text-white w-full py-3 rounded-lg font-semibold text-lg"
                            >
                                Reset Password
                            </button>

                        </div>
                    </form>
                </div >
            </div >
        </Auth>
    )
}
export default ResetPassword;
