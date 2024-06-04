"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [registerMobile, setRegisterMobile] = useState('');
    const [loginMobile, setLoginMobile] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const [signUpMode, setSignUpMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                name,
                mobile,
                password,
                confirmPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            if (isMounted) {
                router.push('/auth/signin');
            }
        } else {
        }
    };

    const signUpHandler = () => {
        setSignUpMode(true);
    }

    const signUpTwoHandler = () => {
        setSignUpMode(true);
    }

    const signInTwoHandler = () => {
        setSignUpMode(false);
    }

    const signInHandler = () => {
        setSignUpMode(false);
    }

    return (
        <main className='login-registration'>
            <div className={`container ${signUpMode ? `sign-up-mode sign-up-mode2` : ``}`}>
                <div className="signin-signup">
                    <form action="" className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${loginMobile !== '' ? `valid` : ''}`} name="loginmobile" onChange={(e) => setLoginMobile(e.target.value)} required/>
                            <span>Number</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${loginPassword !== '' ? `valid` : ''}`} name="loginpassword" onChange={(e) => setLoginPassword(e.target.value)} required/>
                            <span>Password</span>
                            <i></i>
                        </div>
                        <input type="submit" value="Login" className="btn" />
                        <p className="account-text">Don't have an account? <a href="#" id="sign-up-btn2" onClick={signUpTwoHandler}>Sign up</a></p>
                    </form>
                    <form action="" className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${username !== '' ? `valid` : ''}`} name="username" onChange={(e) => setUsername(e.target.value)} required/>
                            <span>Username</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${email !== '' ? `valid` : ''}`} name="email" onChange={(e) => setEmail(e.target.value)} required/>
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${registerMobile !== '' ? `valid` : ''}`} name="registermobile" onChange={(e) => setRegisterMobile(e.target.value)} required/>
                            <span>Number</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${registerPassword !== '' ? `valid` : ''}`} name="registerpassword" onChange={(e) => setRegisterPassword(e.target.value)} required/>
                            <span>Password</span>
                            <i></i>
                        </div>
                        <input type="submit" value="Sign up" className="btn" />
                        <p className="account-text">Already have an account? <a href="#" id="sign-in-btn2" onClick={signInTwoHandler}>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Member of Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className="btn" id="sign-in-btn" onClick={signInHandler}>Sign in</button>
                        </div>
                        <img src="/signin.svg" alt="" className="image" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>New to Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className="btn" id="sign-up-btn" onClick={signUpHandler}>Sign up</button>
                        </div>
                        <img src="/signup.svg" alt="" className="image" />
                    </div>
                </div>
            </div>
        </main>
    );
}
