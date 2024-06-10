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
      newService.imageAddress = "https://media.istockphoto.com/id/1297724495/photo/family-painting-walls-in-their-new-house.jpg?s=612x612&w=0&k=20&c=JIPBIj3GbSMT188GP1igZ0wSa7aAf1jSxlgz7CwL17w=";

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
            <div className="service-container-left-icon-title">
              {/* <Image src={serviceDetails.icon} width={50} height={50} priority alt="" /> */}
              <h2 className='service-container-first-left-title'>Services Regarding {serviceDetails.title}</h2>
            </div>
            {/* <p className="service-container-first-left-desc">{serviceDetails.description}</p> */}
            <ul className="service-categories">
              {serviceDetails.subcategories.map((item)=>{
                return (
                  <li className="service-category">
                    <div className="service-category-icon">
                      <Image src={serviceDetails.icon} width={40} height={40} priority alt="" />
                    </div>
                    <div className="service-category-title">{item.title}</div>
                    <button className="service-category-book">Book Now</button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="service-container-first-right">
            <div className="service-container-first-right-inner">
              <Image src={serviceDetails.imageAddress} width={410} height={410} priority alt="painting" />
            </div>
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
