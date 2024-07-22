"use server"

// import connectDB from '@/config/db';
import prisma from '@/config/prisma';
import { generateUniqueUsername } from '@/utils/usernameGenerator';
import { hash } from 'bcryptjs';
import { redirect } from 'next/navigation';

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
                error: "Name cannnot contain special characters or numbers"
            })
        }

        if (!isValidEmail(credentials.registerEmail)) {
            return ({
                error: "Invalid email"
            })
        }

        // await connectDB();

        const user = await prisma.user.findUnique({
            where: { email: credentials.registerEmail },
        });

        if (user) {
            return ({
                error: "User already exists, proceed to login"
            })
        }

        const userName = await generateUniqueUsername(credentials.name);

        const hashedPassword = await hash(credentials.registerPassword, 10);

        await prisma.user.create({
            data: {
                name: credentials.name,
                email: credentials.registerEmail,
                password: hashedPassword,
                userName: userName,
                dateJoined: new Date(),
            },
        });

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