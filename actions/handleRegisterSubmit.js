"use server"

import { redirect } from 'next/navigation';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import connectDB from '@/config/db';
import { generateUniqueUsername } from '@/utils/usernameGenerator';

const handleRegister = async (credentials) => {
    // e.preventDefault();
    // console.log("Hello");
    try {

        const hasSpecialCharactersOrNumbers = (str) => {
            const regex = /[^a-zA-Z\s]/;
            return regex.test(str);
        };
    
        const isValidEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!credentials.registerEmail || !credentials.registerPassword || !credentials.confirmPassword || !credentials.name) {
            return ({
                error: "Please provide all fields"
            })
        }

        if (credentials.registerPassword !== credentials.confirmPassword) {
            return ({
                error: "Passwords do not match"
            })
            // return;
        }

        if (hasSpecialCharactersOrNumbers(credentials.name)) {
            return ({
                error: "Name cannnot contain special characters or nubmers"
            })
        }

        if (!isValidEmail(credentials.registerEmail)) {
            return ({
                error: "Invalid email"
            })
        }

        await connectDB();

        const user = await User.findOne({ email: credentials.registerEmail });

        if (user) {
            return ({
                error: "User already exists, proceed to login"
            })
        }

        const userName = await generateUniqueUsername(credentials.name);

        const hashedPassword = await hash(credentials.registerPassword, 10);

        await User.create({
            name: credentials.name,
            email: credentials.registerEmail,
            password: hashedPassword,
            userName: userName, // Set the generated username
            dateJoined: credentials.dateJoined
        })

        return {
            success: true
        };
    } catch (error) {
        console.log(error.message);
        return ({
            nextError: error.message
        });
    }
};

export const handleRegisterSubmit = async (credentials) => {
    const registerUser = await handleRegister(credentials);
    // console.log(registerUser);
    if (registerUser.success) {
        if (credentials.redirect !== false) {
            redirect('/login');
        }
    }
    return registerUser;
};