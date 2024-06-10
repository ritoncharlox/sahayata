"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import data from "@/app/services.json";
import "./Service.css";

const page = ({ params }) => {

  useEffect(() => {
    const getDetails = ()=>{
      let newdata = [...data];
      let index = newdata.findIndex((item)=>{
        return item.title === decodeURIComponent(params.service);
      })
      let newService = newdata[index];
      
      newService.description = "Transform your home with our professional painting services. Whether you need interior or exterior painting, our skilled painters deliver high-quality results with meticulous attention to detail. From choosing the perfect color to ensuring a flawless finish, we make your home look fresh, vibrant, and inviting. Enhance the beauty and value of your property with our reliable and efficient painting services.";
      newService.imageAddress = "https://media.istockphoto.com/id/1290265261/photo/home-renovation-and-wall-painting.jpg?s=612x612&w=0&k=20&c=zD0bELb_kpN-lBjmjB2-4MP5--aPM3wzQBhAYZSD-eQ=";

      for(let i=0; i<newService.subcategories.length; i++){
        let item = newService.subcategories[i];
        item.id = uuidv4();
      }
      setServiceDetails(newService);
    }
  
    return () => {
      getDetails();
    }
  }, [])
  

  const [serviceDetails, setServiceDetails] = useState({})
  return (
    <main className='service-container'>
      <div className="service-container-left">

      </div>
      <div className="service-container-right">
        {serviceDetails.title}
        {serviceDetails.description}
        {serviceDetails.imageAddress}
        {serviceDetails.icon}
      </div>
    </main>
  )
}

export default page
