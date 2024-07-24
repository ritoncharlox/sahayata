// app/profile/page.js

import { auth } from '@/auth';
import EmailVerification from "@/components/EmailVerification/EmailVerificaiton";
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./EmailVerification.css";

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

    const data = {
        user: user,
    }

    return (
        <EmailVerification data={data} />
    );
}
