import NextAuth, { CredentialsSignin } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import User from "./models/User";
import { compare } from "bcryptjs";
import connectDB from "./config/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            authorize: async (credentials) => {

                const email = credentials.email;
                const password = credentials.password;

                throw new CredentialsSignin({ cause: "API Error" });

                return {
                    apiError: "API Error"
                }

                if (!email || !password) {
                    throw new CredentialsSignin("Please provide both email and password");
                }

                await connectDB();

                const user = await User.findOne({ email }).select("+password");

                if (!user) {
                    throw new CredentialsSignin("Invalid Email or Password");
                }

                if (!user.password) {
                    throw new CredentialsSignin("Invalid Email or Password");
                }

                const isMatch = await compare(password, user.password);

                if (!isMatch) {
                    throw new CredentialsSignin("Invalid Email or Password");
                }

                return {
                    name: user.name,
                    email: user.email,
                    id: user._id
                };
            }
        })
    ],
    pages: {
        signIn: "/login"
    }
})