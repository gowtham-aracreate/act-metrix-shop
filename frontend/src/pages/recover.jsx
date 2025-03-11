import React, { useState, useEffect } from "react";
import OtpInput from "react-otp-input";
import Auth from '../layout/auth'

const Recover = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(45);
  const [canResend, setCanResend] = useState(false);
  const [editing, setEditing] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");


  return (
<Auth>
    <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg w-auto h-auto">
      <h2 className="text-balck text-3xl font-bold mb-12 pt-6">Email Verification</h2>

      <p className="text-gray-600 mb-4">
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
        {!editing ? (
          <span className="text-blue-6 cursor-pointer ml-2" onClick={handleEmailChange}>
            Change
          </span>
        ) : (
          <span className="text-green-600 cursor-pointer ml-2" onClick={handleSaveEmail}>
            Save
          </span>
        )}
      </p>

      <div className="flex justify-center mb-4">
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "50px",
            height: "50px",
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

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <p className="text-green-600 text-sm mb-4">
        {canResend ? (
          <span className="text-green-600 cursor-pointer" onClick={handleResend}>
            Resend OTP
          </span>
        ) : (
         `${timer} seconds remaining`
        )}
      </p>

      <button
        onClick={handleVerifyOtp}
        className="bg-green-600 text-white w-full py-3 rounded-lg font-semibold text-lg"
      >
        Verify Email
      </button>
      </div>
    </div>
    </Auth>
  );
};

export default Recover;