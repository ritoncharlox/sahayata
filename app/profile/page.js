// app/profile/page.js

import { auth } from '@/auth';
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./Profile.css";

export default async function ProfilePage() {
  const session = await auth();

  if (!session) {
    redirect('/login?redirectTo=/profile');
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email },
  });
  
  if (!user) {
    redirect('/login?redirectTo=/profile');
    return null;
  }

  const role = user.isAdmin ? "Admin" : user.isFreelancer ? "Freelancer" : "User";

  return (
    <main className="profile">
      Profile
    </main>
  );
}
