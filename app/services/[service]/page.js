import React from 'react'
import Service from '@/components/Service/Service'
// import { auth } from "@/auth";
import prisma from '@/config/prisma';
import "./Service.css";


const page = async({params}) => {

  // const session = await auth();

  const getService = async ()=>{
    const title = decodeURIComponent(params.service);
    const service = await prisma.service.findUnique({
      where: { title: title },
      include: { subcategories: true },
    });

    if(!service){
      return;
    }
  
    return service;
  }
  const service = await getService();

  return (
    <>
      <Service serviceDetails={service}/>
    </>
  )
}

export default page
