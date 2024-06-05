"use server"

import { redirect } from 'next/navigation';
import User from '@/models/User';
import { hash } from 'bcryptjs';
import connectDB from '@/config/db';
import { generateUniqueUsername } from '@/utils/usernameGenerator';

export const handleRegisterSubmit = async (credentials) => {
    // e.preventDefault();
    // console.log("Hello");
    try {
        if (credentials.registerPassword !== credentials.confirmPassword) {
            return ({
                error: "Passwords do not match"
            })
            // return;
        }

        if (!credentials.registerEmail || !credentials.registerPassword || !credentials.confirmPassword || !credentials.name) {
            return ({
                error: "Please provide all fields"
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

        redirect('/login');
    } catch (error) {
        // console.log(error.message);
        return({
            nextError: error.message
        });
    }
};