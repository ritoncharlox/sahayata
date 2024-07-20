"use client"
import React, { useState, useRef } from 'react'
import "./OtpSection.css";
import { ScaleLoader } from 'react-spinners';
import { TiMinus } from "react-icons/ti";

const OtpSection = () => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [otpPending, setOtpPending] = useState(false);

    // Create a ref to hold references to each input field
    const otpRefs = useRef([]);

    const handleOtpInput = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value.replace(/\D/g, '').slice(0, 1);
        setOtp(newOtp);

        // Focus next field even if current field isn't full
        if (value.length > 0 && index < otpRefs.current.length - 1) {
            otpRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
            otpRefs.current[index - 1].focus();
        }
    };

    const handleVerifyOtp = (e) => {
        e.preventDefault();
        // Add your OTP verification logic here
        console.log("OTP entered:", otp.join(''));
    };

    return (
        <div className="verify-otp-section">
            <h4 className="form-item-title">Enter OTP:</h4>
            <form className="otp-verification-form" onSubmit={handleVerifyOtp}>
                <div className="otp-container">
                    {otp.map((digit, index) => (
                        <div className="order-otp-field-container" key={index}>
                            <div className="order-otp-field">
                                <input
                                    type="text"
                                    className={`titleInput ${digit !== '' ? 'valid-otp-input' : ''}`}
                                    value={digit}
                                    onInput={(e) => handleOtpInput(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    ref={(el) => otpRefs.current[index] = el}
                                    pattern="\d"
                                    maxLength="1"
                                    required
                                    onFocus={() => otpRefs.current[index].select()}
                                />
                                <i></i>
                            </div>
                            {index=="2" && <div className="otp-mid-line"><TiMinus /></div>}
                        </div>
                    ))}
                    
                </div>
                <div className="otp-verify-btn-container">
                    <button type="submit" className={`otp-verify-btn ${otpPending ? `otp-pending` : ``}`} disabled={otpPending}>
                        {otpPending ? <ScaleLoader height={20} color={"#fff"} /> : "Verify"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OtpSection;
