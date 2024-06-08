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

                try {

                    const email = credentials.email;
                    const password = credentials.password;

                    if (!email || !password) {
                        return {
                            apiError: "Please provide both email and password"
                        }
                    }

                    await connectDB();

                    const user = await User.findOne({ email }).select("+password");

                    if (!user) {
                        return {
                            apiError: "User not found"
                        }
                    }

                    if (!user.password) {
                        return {
                            apiError: "Invalid Email or Password"
                        }
                    }

                    const isMatch = await compare(password, user.password);

                    if (!isMatch) {
                        return {
                            apiError: "Invalid Email or Password"
                        }
                    }

                    return {
                        name: user.name,
                        email: user.email,
                        id: user._id
                    };

                } catch (error) {
                    return {
                        nextApiError: error.message || `nextError`
                    }
                }

            }
        })
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) 
           {
            // console.log(user);
            if (user?.apiError) {
              throw new Error(JSON.stringify({
                apiError: user.apiError
              }));
            }
            if (user?.nextApiError) {
              throw new Error(JSON.stringify({
                nextApiError: user.nextApiError
              }));
            }
            // return {hi: "Hello"}
            return true;
        //    if(user?.error === 'my custom error') {
        //       throw new Error('custom error to the client')
        //    }
        //    return true
        }
     },
    pages: {
        signIn: "/login"
    }
})