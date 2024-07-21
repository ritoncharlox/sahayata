import React from 'react'
import Service from '@/components/Service/Service'
import { auth } from "@/auth";
import "./Service.css";


const page = async({params}) => {

  const session = await auth();

  return (
    <>
      <Service params={params} session={session}/>
    </>
  )
}

export default page
