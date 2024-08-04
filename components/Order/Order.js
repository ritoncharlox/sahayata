import React from 'react'
import Order from './Client/Order';
import { auth } from "@/auth";

const page = async () => {

  const session = await auth();

  return (
    <>
      <Order/>
    </>
  )
}

export default page
