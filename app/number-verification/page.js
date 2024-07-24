// app/profile/page.js

import { auth } from '@/auth';
import NumberVerification from "@/components/NumberVerification/NumberVerification";
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./NumberVerification.css";

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
        <NumberVerification data={data} />
    );
}
