"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer, useToast } from 'react-toastify';
import Image from 'next/image';
import 'react-toastify/dist/ReactToastify.css';
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();

    const [signUpMode, setSignUpMode] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
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
            toast.success("Registration successful!");
            if (isMounted) {
                router.push('/auth/signin');
            }
        } else {
            toast.error(data.error || "Something went wrong!");
        }
    };

    const signUpHandler = () => {
        setSignUpMode(true);
        console.log("Hello");
    }

    const signUpTwoHandler = () => {
        setSignUpMode(true);
    }

    const signInTwoHandler = () => {
        setSignUpMode(false);
    }

    const signInHandler = () => {
        setSignUpMode(false);
        console.log("Hello");
    }

    return (
        <main className='login-registration'>
            <div class={`container ${signUpMode ? `sign-up-mode sign-up-mode2` : ``}`}>
                <div class="signin-signup">
                    <form action="" class="sign-in-form">
                        <h2 class="title">Sign in</h2>
                        <div class="input-field">
                            <input type="text" className={`titleInput ${username !== '' ? `valid` : ''}`} name="username" onChange={(e) => setUsername(e.target.value)} required/>
                            <span>Username</span>
                            <i></i>
                        </div>
                        <div class="input-field">
                            <input type="text" className={`titleInput ${password !== '' ? `valid` : ''}`} name="password" onChange={(e) => setPassword(e.target.value)} required/>
                            <span>Password</span>
                            <i></i>
                        </div>
                        <input type="submit" value="Login" class="btn" />
                        <p class="social-text">Or Sign in with social platform</p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p class="account-text">Don't have an account? <a href="#" id="sign-up-btn2" onClick={signUpTwoHandler}>Sign up</a></p>
                    </form>
                    <form action="" class="sign-up-form">
                        <h2 class="title">Sign up</h2>
                        <div class="input-field">
                            <input type="text" className={`titleInput ${username !== '' ? `valid` : ''}`} name="username" onChange={(e) => setUsername(e.target.value)} required/>
                            <span>Username</span>
                            <i></i>
                        </div>
                        <div class="input-field">
                            <input type="text" className={`titleInput ${email !== '' ? `valid` : ''}`} name="email" onChange={(e) => setEmail(e.target.value)} required/>
                            <span>Email</span>
                            <i></i>
                        </div>
                        <div class="input-field">
                            <input type="text" className={`titleInput ${password !== '' ? `valid` : ''}`} name="password" onChange={(e) => setPassword(e.target.value)} required/>
                            <span>Password</span>
                            <i></i>
                        </div>
                        <input type="submit" value="Sign up" class="btn" />
                        <p class="social-text">Or Sign in with social platform</p>
                        <div class="social-media">
                            <a href="#" class="social-icon">
                                <i class="fab fa-facebook"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-twitter"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-google"></i>
                            </a>
                            <a href="" class="social-icon">
                                <i class="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p class="account-text">Already have an account? <a href="#" id="sign-in-btn2" onClick={signInTwoHandler}>Sign in</a></p>
                    </form>
                </div>
                <div class="panels-container">
                    <div class="panel left-panel">
                        <div class="content">
                            <h3>Member of Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button class="btn" id="sign-in-btn" onClick={signInHandler}>Sign in</button>
                        </div>
                        <img src="/signin.svg" alt="" class="image" />
                    </div>
                    <div class="panel right-panel">
                        <div class="content">
                            <h3>New to Brand?</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque accusantium dolor, eos incidunt minima iure?</p>
                            <button class="btn" id="sign-up-btn" onClick={signUpHandler}>Sign up</button>
                        </div>
                        <img src="/signup.svg" alt="" class="image" />
                    </div>
                </div>
            </div>
        </main>
    );
}
