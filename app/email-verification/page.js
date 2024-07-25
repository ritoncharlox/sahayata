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
        where: { email: session?.user?.email },
    });

    if (!user) {
        redirect('/login?redirectTo=/number-verification');
        return null;
    }

    const sendOtp = async (user) => {
        "use server"

        const generateRandomOtp = () => {
            return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a random 6-digit number
        };

        try {

            // Check the last OTP request time
            const lastOtp = await prisma.otp.findFirst({
                where: {
                    userId: user.id,
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
                },
            });

            // Send OTP to user's email using Resend
            const { data, error } = await resend.emails.send({
                from: 'Sahayata <onboarding@sahayata.xyz>',
                to: [user.email],
                subject: 'Your OTP Code',
                react: EmailTemplate({ name: user.name, otp }),
            });


            if (error) {
                return {
                    error: error.message,
                };
            }

            return {
                success: true,
                otp: otp,
            }

        } catch (error) {
            console.log(error);
            return {
                error: error.message,
            };
        }
    }

    const data = {
        user: user,
        sendOtp: sendOtp
    }

    return (
        <EmailVerification data={data} />
    );
}
