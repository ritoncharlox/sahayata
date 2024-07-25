import React from 'react'
import "./NumberVerification.css";
import Link from 'next/link';

const NumberVerification = ({ data }) => {
  return (
    <main className='number-verification'>
        {
            !data.user.number ?
            <div className="number-not-set">
                <div className="text">
                    Your number is not set, go to profile to set phone number
                </div>
                <Link href={`/profile`} className='link-button'>Go to profile</Link>
            </div>
            : 
            <>
            Number Verification
            </>
        }
    </main>
  )
}

export default NumberVerification