"use server"

import { signIn } from '@/auth';
import { compare } from 'bcryptjs';
import { redirect } from 'next/navigation';
import prisma from '@/config/prisma';

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

        // await connectDB();

        const user = await prisma.user.findUnique({
            where: { email: credentials.loginEmail }
          });

        //   console.log(user);

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
        console.log(error);

        function convertStringToObject(jsonString) {
            try {
                const jsonObject = JSON.parse(jsonString);
                return jsonObject;
            } catch (error) {
            }
        }

        const err = error?.cause?.err?.message;

        const errObj = convertStringToObject(err);

        // console.log(errObj);
        // console.log("The error is", error?.cause?.err?.message);

        if (errObj?.apiError) {
            return ({
                apiError: errObj.apiError
            });
        }

        if (errObj?.nextApiError) {
            return ({
                nextApiError: errObj.nextApiError
            });
        }

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
        if (credentials.redirect !== false) {
            redirect('/');
        }
    }
    return loginUser;
};