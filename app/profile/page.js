// app/profile/page.js

import { auth } from '@/auth';
import prisma from '@/config/prisma';
import { redirect } from 'next/navigation';
import "./Profile.css";
import { FaUser } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Image from 'next/image';

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
      <div className="profile-section">
        <div className="sidebar">
          <div className="sidebar-item">
            <div className="icon">
              <FaUser />
            </div>
            <div className="text">
              Personal Details
            </div>
          </div>
          <div className="sidebar-item">
            <div className="icon">
              <FaGear />
            </div>
            <div className="text">
              Settings
            </div>
          </div>
        </div>
        <div className="line"></div>
        <div className="content">
          <div className="user-card">
            <Image className="profile-avatar-image" width={100} height={100} src={user.avatar} alt="sahayata cover" />
            <div className="label">admin</div>
            <div className="name">Name</div>
          </div>
        </div>
      </div>
    </main>
  );
}
