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

  const isValidImageUrl = async (url) => {
    "use server"

    try {
      const res = await fetch(url);
      const contentType = res.headers.get('content-type');
      return res.ok && contentType && contentType.startsWith('image/');
    } catch (error) {
      return false;
    }
  };

  const handleAvatarChange = async (user, avatarUrl) => {
    "use server"

    try {

      const isValid = await isValidImageUrl(avatarUrl);

      if (!isValid) {
        return {
          avatarError: "Avatar URL is not valid, please use a valid URL",
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { avatar: avatarUrl },
      });

      return {
        success: true
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

  const handleNameChange = async (user, name) => {
    "use server"

    const hasSpecialCharactersOrNumbers = (str) => {
      const regex = /[^a-zA-Z\s]/;
      return regex.test(str);
    };

    try {

      if (hasSpecialCharactersOrNumbers(name)) {
        return {
          nameChangeError: "Name cannnot contain special characters or numbers",
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { name: name },
      });

      return {
        success: true
      }
    } catch (error) {
      return {
        error: error.message
      }
    }
  }

  const data = {
    user: user,
    role: role,
    handleAvatarChange: handleAvatarChange,
    handleNameChange: handleNameChange,
  }

  return (
    <Profile data={data} />
  );
}
