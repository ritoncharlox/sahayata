import React from 'react'
import Order from './Client/Order';
import { auth } from "@/auth";
import prisma from '@/config/prisma';

const page = async () => {

  const session = await auth();

  return (
    <>
      <Order session={session}/>
    </>
  )
}

export default page
