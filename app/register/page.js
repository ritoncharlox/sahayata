"use client"

import { useState, useEffect } from 'react';
import { redirect, useRouter } from 'next/navigation';
import Image from 'next/image';
import "./Register.css";
import User from '@/models/User';
import { hash } from 'bcryptjs';
import connectDB from '@/config/db';
import { handleRegisterSubmit } from '@/actions/handleRegisterSubmit';
import { handleLoginSubmit } from '@/actions/handleLoginSubmit';
import { MdError } from "react-icons/md";
import { signIn } from '@/auth';
import { ScaleLoader } from 'react-spinners';

export default function Register() {
    const [username, setUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [name, setName] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [signUpMode, setSignUpMode] = useState(true);
    const [registerError, setRegisterError] = useState('');
    const [loginError, setLoginError] = useState('');

    const [loginPending, setLoginPending] = useState(false);
    const [registerPending, setRegisterPending] = useState(false);

    const hasSpecialCharactersOrNumbers = (str) => {
        const regex = /[^a-zA-Z\s]/;
        return regex.test(str);
    };

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        // console.log("hello");

        if (loginPending) {
            return;
        }

        setLoginPending(true);

        setLoginError('');

        if (!loginEmail || !loginPassword) {
            setLoginError("Please provide all the fields");
            setLoginPending(false);
            return;
        }

        if (!isValidEmail(loginEmail)) {
            setLoginError("Invalid email");
            setLoginPending(false);
            return;
        }

        const loginUser = await handleLoginSubmit({
            loginEmail,
            loginPassword
        })

        setLoginPending(false);

        // console.log(loginUser);

        if (loginUser?.error) {
            setLoginError(loginUser.error);
            return;
        }

        if (loginUser?.nextError) {
            setLoginError("Internal server error. Please try again after a while");
            return;
        }

        if (loginUser?.nextApiError) {
            setLoginError("Internal server error. Please try again after a while");
            return;
        }

        if (loginUser?.apiError) {
            setLoginError(loginUser.apiError);
            return;
        }

    };

    // const handleRegisterSubmit = async (e) => {
    //     "use server"
    //     e.preventDefault();
    //     // console.log("Hello");
    //     if (registerPassword !== confirmPassword) {
    //         throw new Error("Passwords do not match");
    //         // return;
    //     }

    //     if (!registerEmail || !registerPassword || !confirmPassword || !name) {
    //         throw new Error("Please provide all fields");
    //     }

    //     await connectDB();

    //     const user = await User.findOne({ email: registerEmail });

    //     if (user) {
    //         throw new Error("User already exists");
    //     }

    //     const hashedPassword = await hash(registerPassword, 10);

    //     await User.create({
    //         name : name,
    //         email: registerEmail,
    //         password : hashedPassword
    //     })

    //     redirect('/login');
    // };

    const handleRegister = async (e) => {
        e.preventDefault();

        if (registerPending) {
            return;
        }

        setRegisterPending(true);

        setRegisterError('');

        if (!name || !registerEmail || !registerPassword || !confirmPassword) {
            setRegisterError("Please provide all the fields");
            setRegisterPending(false);
            return;
        }

        if (hasSpecialCharactersOrNumbers(name)) {
            setRegisterError("Name cannnot contain special characters or nubmers");
            setRegisterPending(false);
            return;
        }

        if (!isValidEmail(registerEmail)) {
            setRegisterError("Invalid email");
            setRegisterPending(false);
            return;
        }

        // if (registerPassword !== confirmPassword) {
        //     setRegisterError("Passwords do not match");
        //     setRegisterPending(false);
        //     return;
        // }

        let trimmedName = name.trim();

        const dateJoined = new Date();

        const registerUser = await handleRegisterSubmit({
            registerEmail,
            registerPassword,
            confirmPassword,
            name: trimmedName,
            dateJoined
        });

        setRegisterPending(false);

        // console.log(registerUser);

        if (registerUser?.error) {
            setRegisterError(registerUser.error);
            return;
        }

        if (registerUser?.nextError) {
            setRegisterError("Internal server error. Please try again after a while");
            return;
        }
    }

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
                    <form action="" className="sign-in-form" onSubmit={(e) => handleLogin(e)}>
                        <h2 className="title">Log in</h2>
                        <div className="input-field">
                            <input type="email" className={`titleInput ${loginEmail !== '' ? `valid` : ''}`} name="loginemail" onChange={(e) => setLoginEmail(e.target.value)} required />
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="password" className={`titleInput ${loginPassword !== '' ? `valid` : ''}`} name="loginpassword" onChange={(e) => setLoginPassword(e.target.value)} required />
                            <span>Password</span>
                            <i></i>
                        </div>
                        {
                            loginError ? (
                                <>
                                    <div className="error-field">
                                        <div className="icon">
                                            <MdError />
                                        </div>
                                        <div className="text">
                                            {loginError}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        <button type="submit" className={`btn ${ loginPending ? `pending` : `` }`} disabled={loginPending}>
                            {
                                loginPending ?
                                    <ScaleLoader height={20} color={"#fff"} />
                                    :
                                    "Login"
                            }
                        </button>
                        <p className="account-text">Don't have an account? <a href="#" id="sign-up-btn2" onClick={signUpTwoHandler}>Sign up</a></p>
                    </form>
                    <form action="" className="sign-up-form" onSubmit={(e) => handleRegister(e)}>
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <input type="text" className={`titleInput ${name !== '' ? `valid` : ''}`} name="name" onChange={(e) => setName(e.target.value)} required />
                            <span>Name</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="email" className={`titleInput ${registerEmail !== '' ? `valid` : ''}`} name="email" onChange={(e) => setRegisterEmail(e.target.value)} required />
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="password" className={`titleInput ${registerPassword !== '' ? `valid` : ''}`} name="registerpassword" onChange={(e) => setRegisterPassword(e.target.value)} required />
                            <span>Password</span>
                            <i></i>
                        </div>
                        <div className="input-field">
                            <input type="password" className={`titleInput ${confirmPassword !== '' ? `valid` : ''}`} name="registerpassword" onChange={(e) => setConfirmPassword(e.target.value)} required />
                            <span>Confirm Password</span>
                            <i></i>
                        </div>
                        {
                            registerError ? (
                                <>
                                    <div className="error-field">
                                        <div className="icon">
                                            <MdError />
                                        </div>
                                        <div className="text">
                                            {registerError}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }
                        <button type="submit" className={`btn ${ registerPending ? `pending` : `` }`} disabled={registerPending}>
                            {
                                registerPending ?
                                    <ScaleLoader height={20} color={"#fff"} />
                                    :
                                    "Sign up"
                            }
                        </button>
                        <p className="account-text">Already have an account? <a href="#" id="sign-in-btn2" onClick={signInTwoHandler}>Sign in</a></p>
                    </form>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Member of Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className={`btn ${ registerPending ? `pending` : `` }`} id="sign-in-btn" onClick={signInHandler} disabled={registerPending}>Log in</button>
                        </div>
                        <img src="/signin.svg" alt="" className="image" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>New to Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button className={`btn ${ loginPending ? `pending` : `` }`} id="sign-up-btn" onClick={signUpHandler} disabled={loginPending}>Sign up</button>
                        </div>
                        <img src="/signup.svg" alt="" className="image" />
                    </div>
                </div>
            </div>
        </main>
    );
}
