// app/profile/page.js

import { auth } from '@/auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import User from '@/models/User';
import connectDB from '@/config/db';
import "./Profile.css";

export default async function ProfilePage() {
  await connectDB();
  const session = await auth();

  if (!session) {
    redirect('/login?redirectTo=/profile');
    return null;
  }

  const user = await User.findOne({ email: session?.user?.email }).lean();

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
