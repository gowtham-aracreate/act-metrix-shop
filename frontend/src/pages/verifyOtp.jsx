import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Auth from '../layout/auth';
import { useNavigate } from "react-router-dom";

const Verify = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(45);
    const [canResend, setCanResend] = useState(false);
    const [editing, setEditing] = useState(false);
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [loadingVerify, setLoadingVerify] = useState(false);
    const [loadingResend, setLoadingResend] = useState(false);

    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleResend = async () => {
        setLoadingResend(true);
        setError("");
        setMessage("Resending OTP...");

        try {
            const response = await fetch("http://localhost:3000/resend-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            if (data.success) {
                setMessage("OTP resent successfully.");
                setTimer(45);
                setCanResend(false);
            } else {
                setError("Failed to resend OTP. Please try again.");
            }
        } catch (error) {
            setError("Error resending OTP. Please try again.");
        } finally {
            setLoadingResend(false);
        }
    };

    const handleVerify = async () => {
        if (otp.length !== 6) {
            setError("Please enter a valid 6-digit OTP.");
            return;
        }
        setError("");
        setMessage("Verifying OTP...");
        try {
            const response = await fetch("http://localhost:3000/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, otp }),
            });
            const data = await response.json();
            console.log("Verify OTP Response:", data);
            if (data.success) {
                setTimeout(() => {
                    setMessage("OTP Verified Successfully!");
                    navigate("/reset", { state: { email, otp } });
                }, 2000);
            } else {
                setError("Invalid OTP, please try again.");
            }
        } catch (error) {
            setError("Error verifying OTP. Please try again.");
        }
        finally {
            setLoadingVerify(false);
        }
    };

    return (
        <Auth>
            <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
                <div className="bg-white p-8 rounded-lg w-auto h-auto">
                    <h2 className="text-black text-3xl font-bold mb-4 pt-6">Email Verification</h2>
                    <p className="text-gray-600 pb-4">
                        {editing ? (
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-300 px-2 py-1 rounded"
                            />
                        ) : (
                            <>A 6-digit code has been sent to your email {email}</>
                        )}
                        
                            <span className="text-blue-600 cursor-pointer ml-2"
                                onClick={() => navigate("/forgotPassword")}>
                                Change
                            </span>
                    </p>

                    <div className="flex justify-center mb-4">
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            inputStyle={{
                                width: "40px",
                                height: "40px",
                                margin: "0 20px",
                                fontSize: "20px",
                                textAlign: "center",
                                borderRadius: "8px",
                                border: "2px solid #8A8A8A",
                                boxShadow: "0px 0px 10px rgba(240, 240, 240, 0.84)",
                                outline: "none",
                            }}
                            renderInput={(props) => <input {...props} />}
                        />
                    </div>

                    {loadingVerify && <p className="text-blue-500 text-sm mb-4">Verifying OTP...</p>}
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

                    <p className="text-blue-600 text-sm mb-4">
                        {canResend ? (
                            <span className="text-blue-600 cursor-pointer"
                                onClick={handleResend}>
                                Resend OTP
                            </span>
                        ) : (
                            `${timer} seconds remaining`
                        )}
                    </p>
                    <div className="pt-[10px] text-center">
                        <button
                            className="bg-blue-600 text-white w-full py-3 rounded-lg font-semibold text-lg"
                            onClick={handleVerify}
                        >
                            Verify Email
                        </button>
                    </div>
                </div>
            </div>
        </Auth>
    );
};

export default Verify;