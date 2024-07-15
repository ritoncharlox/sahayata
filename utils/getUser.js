"use server"

import prisma from '@/config/prisma';

export async function getUserByEmail(email) {
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}