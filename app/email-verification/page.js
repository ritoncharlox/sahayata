import { auth } from '@/auth';
import EmailVerification from "@/components/EmailVerification/EmailVerificaiton";
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./EmailVerification.css";
import { Resend } from 'resend';
import EmailTemplate from '@/components/EmailTemplate/EmailTemplate';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function ProfilePage() {
    const session = await auth();

    if (!session) {
        redirect('/login?redirectTo=/number-verification');
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id },
    });

    if (!user) {
        redirect('/login?redirectTo=/number-verification');
        return null;
    }

    const sendOtp = async (user, type) => {
        "use server"

        const generateRandomOtp = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

        try {

            // Check the last OTP request time
            const lastOtp = await prisma.otp.findFirst({
                where: {
                    userId: user.id,
                    type: type, // Ensure you only consider OTPs of the same type
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            if (lastOtp && new Date() - lastOtp.createdAt < 60000) { // 1 minute cooldown
                return {
                    otpError: "You can only request a new OTP every minute",
                };
            }

            // Delete existing OTPs for the user
            await prisma.otp.deleteMany({
                where: {
                    userId: user.id,
                    type: type,
                },
            });

            // Generate a new OTP
            const otp = generateRandomOtp();
            const expiresAt = new Date(Date.now() + 10 * 60000); // 10 minutes from now

            // Save the new OTP in the database
            await prisma.otp.create({
                data: {
                    otp,
                    expiresAt,
                    userId: user.id,
                    type: type, // Set the type of OTP
                },
            });

            // Send OTP to user's email using Resend
            const { data, error } = await resend.emails.send({
                from: 'Sahayata <onboarding@sahayata.xyz>',
                to: [user.email],
                subject: type === 'email-verification' ? 'Your OTP Code' : 'Your Password Reset OTP',
                react: EmailTemplate({ name: user.name, otp }),
            });


            if (error) {
                return {
                    error: error.message,
                };
            }

            return {
                success: true,
                // otp: otp,
            }

        } catch (error) {
            console.log(error);
            return {
                error: error.message,
            };
        }
    }

    const verifyOtp = async (user, otp, type) => {
        "use server"

        try {

            // Find the most recent OTP for the user
            const otpRecord = await prisma.otp.findFirst({
                where: {
                    userId: user.id,
                    otp: otp,
                    used: false, // Check if OTP has not been used
                    type: type,  // Ensure the OTP type matches
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });

            // Check if OTP was found
            if (!otpRecord) {
                return {
                    otpError: "No valid OTP found or OTP has expired",
                };
            }

            // Check if OTP is expired
            if (new Date() > otpRecord.expiresAt) {
                return {
                    otpError: "OTP has expired. Please request a new one",
                };
            }

            // Mark the OTP as used
            await prisma.otp.update({
                where: { id: otpRecord.id },
                data: { used: true },
            });

            // Update the user's email verification status or handle password reset
            if (type === 'email-verification') {
                await prisma.user.update({
                    where: { id: user.id },
                    data: { isEmailVerified: true },
                });
            }

            if (type === 'password-reset') {
                // Handle password reset logic, such as prompting user to set a new password
                // You might want to send an email with a password reset link or handle it in another way
            }


            return {
                success: true,
            }

        } catch (error) {
            // console.log(error);
            return {
                error: error.message,
            };
        }
    }

    const data = {
        user: user,
        sendOtp: sendOtp,
        verifyOtp: verifyOtp
    }

    return (
        <EmailVerification data={data} />
    );
}
