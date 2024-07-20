// app/profile/page.js

import { auth } from '@/auth';
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./Profile.css";
import { FaUser, FaUserCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Image from 'next/image';
import { FaEdit } from "react-icons/fa";
import Profile from '@/components/Profile/Profile';

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

  const handleAvatarChange = async (user, avatarUrl) => {
    "use server"

    try {
      await prisma.user.update({
        where: { id: user.id },
        data: { avatar: avatarUrl },
      });

      return {
        success: true
      }
    } catch (error) {
      return {
        error: true,
        message: error.message
      }
    }
  }

  const data = {
    user: user,
    role: role,
    handleAvatarChange: handleAvatarChange,
  }

  return (
    <Profile data={data} />
  );
}
