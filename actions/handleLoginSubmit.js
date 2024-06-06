"use server"

import { redirect } from 'next/navigation';
import User from '@/models/User';
import { compare, hash } from 'bcryptjs';
import connectDB from '@/config/db';
import { generateUniqueUsername } from '@/utils/usernameGenerator';
import { signIn } from '@/auth';
import { CredentialsSignin } from 'next-auth';

const handleLogin = async (credentials) => {
    // e.preventDefault();
    // console.log("Hello");
    try {

        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!credentials.loginEmail || !credentials.loginPassword) {
            return ({
                error: "Please provide all fields"
            })
        }

        // if (credentials.registerPassword !== credentials.confirmPassword) {
        //     return ({
        //         error: "Passwords do not match"
        //     })
        //     // return;
        // }

        if (!isValidEmail(credentials.loginEmail)) {
            return ({
                error: "Invalid email"
            })
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.loginEmail }).select("+password");

        if (!user) {
            return ({
                error: "User not found"
            })
        }

        if (!user.password) {
            return ({
                error: "Invalid Email or Password"
            })
        }

        const isMatch = await compare(credentials.loginPassword, user.password);

        if (!isMatch) {
            return ({
                error: "Invalid Email or Password"
            })
        }

        await signIn("credentials", {
            email: credentials.loginEmail,
            password: credentials.loginPassword,
            redirect: false,
        })

        return {
            success: true
        };
    } catch (error) {
        console.log("The error is", error);
        return ({
            nextError: error.message
        });
    }
};

export const handleLoginSubmit = async (credentials) => {
    // console.log("Hello");
    const loginUser = await handleLogin(credentials);
    // console.log(loginUser);
    if (loginUser.success) {
        redirect('/');
    }
    return loginUser;
};