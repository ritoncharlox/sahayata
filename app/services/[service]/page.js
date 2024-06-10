"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import data from "@/app/services.json";
import "./Service.css";

const page = ({ params }) => {

  const [serviceDetails, setServiceDetails] = useState()

  useEffect(() => {
    const getDetails = () => {
      let newdata = [...data];
      let index = newdata.findIndex((item) => {
        return item.title === decodeURIComponent(params.service);
      })
      let newService = newdata[index];

      newService.description = "Transform your home with our professional painting services. Whether you need interior or exterior painting, our skilled painters deliver high-quality results with meticulous attention to detail. From choosing the perfect color to ensuring a flawless finish, we make your home look fresh, vibrant, and inviting. Enhance the beauty and value of your property with our reliable and efficient painting services.";
      newService.imageAddress = "https://media.istockphoto.com/id/1227342775/vector/home-repair-set-with-different-workers-in-uniform-with-equipment-painting-wall-drilling.jpg?s=612x612&w=0&k=20&c=1DIcLKsFGcfxidksKfkgSEBYr-5iRBKBnK7InOGnIzA=";

      for (let i = 0; i < newService.subcategories.length; i++) {
        let item = newService.subcategories[i];
        item.id = uuidv4();
      }
      setServiceDetails(newService);
    }

    return () => {
      getDetails();
    }
  }, [])


  if (serviceDetails) {
    return (
      <main className='service-container'>
        <div className="service-container-first">
          <div className="service-container-first-left">
            <h2 className='service-container-first-left-title'>{serviceDetails.title}</h2>
            <p className="service-container-first-left-desc">{serviceDetails.description}</p>
          </div>
          <div className="service-container-first-right">
            <Image src={serviceDetails.imageAddress} width={450} height={300} priority alt="painting" />
          </div>
        </div>
        <div className="service-separator"></div>
      </main>
    )
  }
  else {
    return (<></>)
  }


}

export default page
