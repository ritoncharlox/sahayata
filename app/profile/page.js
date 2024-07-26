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
    where: { id: session?.user?.id },
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

      if (!name.trim()) {
        return {
          changeError: "Name cannot be empty",
        };
      }

      if (hasSpecialCharactersOrNumbers(name)) {
        return {
          changeError: "Name cannnot contain special characters or numbers",
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

  const handleUsernameChange = async (user, userName) => {
    "use server"

    const hasInvalidCharacters = (str) => {
      const regex = /[^a-zA-Z0-9_]/;
      return regex.test(str);
    };

    try {

      if (!userName.trim()) {
        return {
          changeError: "Username cannot be empty",
        };
      }

      if (hasInvalidCharacters(userName)) {
        return {
          changeError: "Username can only contain letters, numbers, and underscores, and cannot contain spaces",
        };
      }

      if (user.userName === userName) {
        return {
          success: true,
        };
      }

      const existingUser = await prisma.user.findUnique({
        where: { userName: userName },
      });

      if (existingUser) {
        return {
          changeError: "Username already taken",
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { userName: userName },
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

  const handleNumberChange = async (user, number) => {
    "use server"

    const isValidNumber = (str) => {
      const regex = /^(98|97)\d{8}$/;
      return regex.test(str);
    };

    try {
      if (!number.trim()) {
        return {
          changeError: "Number cannot be empty",
        };
      }

      if (!isValidNumber(number)) {
        return {
          changeError: "Invalid number format. Number must be 10 digits and start with 98 or 97",
        };
      }

      if (user.number === number) {
        return {
          success: true,
        };
      }

      const existingUser = await prisma.user.findUnique({
        where: { number: number },
      });

      if (existingUser && existingUser.id !== user.id) {
        return {
          changeError: "Number already in use",
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          number: number,
          isNumberVerified: false
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  const handleEmailChange = async (user, email) => {
    "use server"

    const isValidEmail = (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    };

    try {
      if (!email.trim()) {
        return {
          changeError: "Email cannot be empty",
        };
      }

      if (!isValidEmail(email)) {
        return {
          changeError: "Invalid email format. please use valid email",
        };
      }

      if (user.email === email) {
        return {
          success: true,
        };
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: email },
      });

      if (existingUser && existingUser.id !== user.id) {
        return {
          changeError: "Email already in use",
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: {
          email: email,
          isEmailVerified: false
        },
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  const handleLocationChange = async (user, location) => {
    "use server"

    try {
      if (!location.trim()) {
        return {
          changeError: "Location cannot be empty",
        };
      }

      if (user.location === location) {
        return {
          success: true,
        };
      }

      await prisma.user.update({
        where: { id: user.id },
        data: { location: location },
      });

      return {
        success: true,
      };
    } catch (error) {
      return {
        error: error.message,
      };
    }
  }

  const data = {
    user: user,
    role: role,
    handleAvatarChange: handleAvatarChange,
    handleNameChange: handleNameChange,
    handleUsernameChange: handleUsernameChange,
    handleNumberChange: handleNumberChange,
    handleEmailChange: handleEmailChange,
    handleLocationChange: handleLocationChange,
  }

  return (
    <Profile data={data} />
  );
}
