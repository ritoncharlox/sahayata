import { auth } from '@/auth';
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./Dashboard.css";
import React from 'react'
import Link from 'next/link';
import AdminDashboard from './_components/AdminDashboard/AdminDashboard';

export default async function Dashboard() {
    const session = await auth();

    if (!session) {
        redirect('/login?redirectTo=/dashboard');
        return null;
    }

    const user = await prisma.user.findUnique({
        where: { id: session?.user?.id },
    });

    if (!user) {
        redirect('/login?redirectTo=/dashboard');
        return null;
    }

    const role = user.isAdmin ? "Admin" : user.isFreelancer ? "Freelancer" : "User";

    return (
        <AdminDashboard />
    );
}