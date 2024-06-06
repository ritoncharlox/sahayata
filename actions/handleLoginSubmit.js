"use server"

import { redirect } from 'next/navigation';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import connectDB from '@/config/db';
import { generateUniqueUsername } from '@/utils/usernameGenerator';
import { signIn } from '@/auth';

const handleLogin = async (credentials) => {
    // e.preventDefault();
    // console.log("Hello");
    // try {

        await signIn("credentials", {
            email: credentials.loginEmail,
            password: credentials.loginPassword
        })

        return {
            success: true
        };
    // } catch (error) {
    //     console.log(error);
    //     return ({
    //         nextError: error.message
    //     });
    // }
};

export const handleLoginSubmit = async (credentials) => {
    // console.log("Hello");
    const logInUser = await handleLogin(credentials);
    console.log(logInUser);
    if (logInUser.success) {
        redirect('/');
    }
    return logInUser;
};