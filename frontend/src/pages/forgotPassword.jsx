import React, { useState } from 'react'
import Auth from '../layout/auth'
import Message from '../assets/message.svg'
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);


  const handleEmail = async (event) => {
    event.preventDefault();
    setError(""); 
    setMessage("");
    setLoading(true);

    if (!Email.trim()) {
      console.log("Required Email");
      setLoading(false);
      return;
    }
  
    try {
      const response = await fetch("http://localhost:3000/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: Email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage("OTP is being sent...");
        setTimeout(() => {
          setMessage("OTP sent successfully! Check your email.");
          localStorage.setItem("email", Email);
          setError("");
          navigate("/verify");
        }, 2000);
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setMessage("");
        console.log(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage(""); 
      setError("Server error. Please try again later.");
    }
    finally {
      setLoading(false); // Stop loading
    }
  };
  

return (
  <Auth>
    <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg w-auto h-auto">
        <div className="text-center pt-[25px] mb-[10px]">
          <h2 className="text-balck text-3xl font-bold mb-4 pt-4 text-left">Recover Password</h2>
        </div>
        <form onSubmit={handleEmail}>
          <div className='relative'>
            <img
              src={Message}
              alt="mail"
              className="absolute left-3 top-17 transform -translate-y-1/2"
            />
            <h1 className='text-lg text-gray-900'>Email</h1>
            <input type="email" placeholder='Enter Your Email' required
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-100 text-lg border border-gray-100 text-black rounded-lg py-[15px] pr-[140px] pl-[50px] mt-3 mr-7 w-full"
            />
          </div>
          {loading && <p className="text-blue-500 text-sm mt-2">Sending OTP...</p>}
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {message && <p className="text-green-500 text-sm mt-2">{message}</p>}
            <div className="pt-[25px] text-center">
            <button
              type='submit'
              className="cursor-pointer bg-blue-600 text-white w-full py-3 rounded-lg font-semibold text-lg">
              Send OTP
            </button>
          </div>
        </form>
        {error && error.includes("Email not found") && (
            <div className="mt-4 text-center">
              <p className="text-gray-600 text-sm">
                Don't have an account? <a href="/register" className="text-blue-500 font-semibold">Register here</a>
              </p>
            </div>
          )}
      </div >
    </div >
  </Auth>
)
}
export default ForgotPassword;