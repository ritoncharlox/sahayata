"use client"

import React, { useRef, useState } from 'react'
import "./EmailVerification.css";
import Link from 'next/link';
import Image from 'next/image';
import { FaCheckCircle, FaSave } from "react-icons/fa";
import { ScaleLoader } from 'react-spinners';
import { MdError } from 'react-icons/md';
import { TiMinus } from 'react-icons/ti';
import { useRouter, useSearchParams } from 'next/navigation';

const NumberVerification = ({ data }) => {

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [verifyInfo, setVerifyInfo] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [otpInfo, setOtpInfo] = useState('');
  const [otpError, setOtpError] = useState('');

  const [optInputMode, setOtpInputMode] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpRefs = useRef([]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get('redirectTo') || '/';

  const verifyOtpClickHandler = async () => {

    const otpString = otp.join('');

    if (loading) {
      return;
    }

    setOtpLoading(true);

    setOtpInfo('');
    setOtpError('');

    const verifyOtp = await data.verifyOtp(data.user, otpString, 'email-verification');

    // console.log(verifyOtp);

    if (verifyOtp.success) {
      setOtpInfo(`Email verified successfully`);

      setTimeout(() => {
        router.push(redirectTo);
        router.refresh();
        setOtpLoading(false);
        // setOtpInputMode(true);
      }, 2000);

      return;
    }

    if (verifyOtp.error) {

      setOtpError("Something went wrong, please try again after a while");

      setOtpLoading(false);

      return;

    }

    if (verifyOtp.otpError) {

      setOtpError(verifyOtp.otpError);

      setOtpLoading(false);

      return;

    }

    setOtpLoading(false);
  }

  const verifyClickHandler = async () => {

    if (loading) {
      return;
    }

    setLoading(true);

    setVerifyInfo('');
    setVerifyError('');

    const sendOtp = await data.sendOtp(data.user, "email-verification");

    // console.log(sendOtp);

    if (sendOtp.success) {
      setVerifyInfo(`OTP sent successfully`);

      setTimeout(() => {
        setLoading(false);
        setOtpInputMode(true);
      }, 2000);

      return;
    }

    if (sendOtp.error) {

      setVerifyError("Something went wrong, please try again after a while");

      setLoading(false);

      return;

    }

    if (sendOtp.otpError) {

      setVerifyError(sendOtp.otpError);

      setLoading(false);

      return;

    }

    setLoading(false);
  }

  const handleOtpInput = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '').slice(0, 1);
    setOtp(newOtp);

    // Focus next field even if current field isn't full
    if (value.length > 0 && index < otpRefs.current.length - 1 && /^\d+$/.test(value)) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpRefs.current[index - 1].focus();
    }
  };

  // console.log(otp);

  return (
    <main className='email-verification'>
      <div className="email-verificaiton-section">
        {
          optInputMode ?
            <div className="otp-section">
              <div className="title">
                <div className="title-image">
                  <Image src={`/email-verification.png`} width={100} height={100} className='title-image-img' alt='Email Verification' />
                </div>
                <div className="title-text">Email Verification</div>
              </div>

              <div className="otp-verification-section">
                <div className="info">
                  Enter the otp sent to {data.user.email}
                </div>
                <div className="otp-input-field">
                  {otp.map((digit, index) => (
                    <div className="otp-field-container" key={index}>
                      <div className="otp-field">
                        <input
                          type="text"
                          className={`optInput ${digit !== '' ? 'valid-otp-input' : ''}`}
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
                      {index == "2" && <div className="otp-mid-line"><TiMinus /></div>}
                    </div>
                  ))}
                </div>
                {
                  otpInfo ? (
                    <>
                      <div className="info-field">
                        <div className="icon">
                          <FaCheckCircle />
                        </div>
                        <div className="text">
                          {otpInfo}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    </>
                  )
                }
                {
                  otpError ? (
                    <>
                      <div className="error-field">
                        <div className="icon">
                          <MdError />
                        </div>
                        <div className="text">
                          {otpError}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    </>
                  )
                }
                <button className={`button ${otpLoading ? `loading` : ``}`} onClick={verifyOtpClickHandler}>
                  {
                    otpLoading ?
                      <ScaleLoader height={20} color={"#fff"} />
                      :
                      <>
                        <div className="icon">
                          <FaSave />
                        </div>
                        <div className="text">
                          Verify
                        </div>
                      </>
                  }
                </button>
              </div>

            </div>
            :
            <>
              <div className="title">
                <div className="title-image">
                  <Image src={`/email-verification.png`} width={100} height={100} className='title-image-img' alt='Email Verification' />
                </div>
                <div className="title-text">Email Verification</div>
              </div>
              <div className="verification-section">
                <div className="info">
                  Click verify to send OTP to the registered email
                </div>
                <div className="user-info">
                  <div className="user-info-title">
                    Your Email
                  </div>
                  <div className="user-info-data">
                    {data.user.email}
                  </div>
                </div>
                {
                  verifyInfo ? (
                    <>
                      <div className="info-field">
                        <div className="icon">
                          <FaCheckCircle />
                        </div>
                        <div className="text">
                          {verifyInfo}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    </>
                  )
                }
                {
                  verifyError ? (
                    <>
                      <div className="error-field">
                        <div className="icon">
                          <MdError />
                        </div>
                        <div className="text">
                          {verifyError}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                    </>
                  )
                }
                <button className={`button ${loading ? `loading` : ``}`} onClick={verifyClickHandler}>
                  {
                    loading ?
                      <ScaleLoader height={20} color={"#fff"} />
                      :
                      <>
                        <div className="icon">
                          <FaSave />
                        </div>
                        <div className="text">
                          Verify
                        </div>
                      </>
                  }
                </button>
              </div>
            </>
        }
      </div>
    </main>
  )
}

export default NumberVerification