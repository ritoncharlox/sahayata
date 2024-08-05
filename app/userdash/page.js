import { auth } from '@/auth';
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
// import "./Dashboard.css";
import React from 'react'
import Link from 'next/link';
import Userdashboard from '@/components/Userdashboard/Userdashboard';

export default async function page() {
    const session = await auth();

    if (!session) {
        redirect('/login?redirectTo=/dashboard');
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id },
    });

    if (!user) {
        redirect('/login?redirectTo=/userdash');
        return null;
    }

    const role = user.isAdmin ? "Admin" : user.isFreelancer ? "Freelancer" : "User";

    return (
        <Userdashboard />
    );
}