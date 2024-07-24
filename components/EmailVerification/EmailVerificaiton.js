import React from 'react'
import "./EmailVerification.css";
import Link from 'next/link';

const NumberVerification = ({ data }) => {
  return (
    <main className='email-verification'>
        <div className="email-verificaiton-section">
          <div className="title">
            Email Verification
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
            <button className="button">
              Verify
            </button>
          </div>
        </div>
    </main>
  )
}

export default NumberVerification