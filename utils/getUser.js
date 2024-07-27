import prisma from '@/config/prisma';

export async function getUserByEmail(email) {
  
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user;
}

export async function getuserById(id) {
  
  const user = await prisma.user.findUnique({
    where: { id },
  });

  return user;
}