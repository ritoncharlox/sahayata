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
      <main className="service-container">
        <div className="service-container-first">
          <div className='service-container-first-top'>
            <Image src={serviceDetails.icon} width={60} height={60} priority alt="" />
            <h1 className="service-container-first-left-title">{serviceDetails.title}</h1>
          </div>
          <p className="service-container-first-left-desc">{serviceDetails.description}</p>
          {/* <div className="service-container-first-buttons">
            <button className='readmore-btn'>Read More</button>
            <button className='readmore-btn'>View More</button>
          </div> */}
        </div>
        <div className="service-container-separator"></div>
        <div className="service-container-second">
          <div className="service-container-second-coverpic">
            <Image className='service-cover' src={serviceDetails.imageAddress} width={400} height={300} alt="" />
          </div>
          <div className="service-container-second-inner">
            <h2 className="service-categories-title">Related Services</h2>
            <ul className="service-categories">
              {serviceDetails.subcategories.map((item, index) => {
                // console.log(serviceDetails.subcategories.length);
                return (
                  <li key={item.id} className="service-category">
                    <div className="service-category-info">
                      <h2 className="service-category-title">{item.title}</h2>
                      <p className="service-category-desc">{item.description}</p>
                    </div>
                    <button className="learnmore-btn">Learn More</button>
                    <Image className='service-category-image' src={item.imageAddress} width={300} height={450} priority alt="" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </main>
    )
  }
  else {
    return (<></>)
  }


}

export default page
