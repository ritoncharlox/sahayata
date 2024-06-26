"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import data from "@/app/services.json";
import DateSection from '@/components/DateSection/DateSection';
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import "./Service.css";

const Page = ({ params }) => {

  const [serviceDetails, setServiceDetails] = useState();
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [orders, setOrders] = useState([]);
  const [showpopup, setShowpopup] = useState(false);
  const [animate, setAnimate] = useState();

  const timeList = ["7 AM - 9 AM", "9 AM - 11 AM", "11 AM - 1 PM", "1 AM - 3 PM", "3 PM - 5 PM", "5 PM - 7 PM"];

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

  const popupcrossClick = () => {
    setAnimate({ popupOut: "popupOut .3s forwards", overlayOut: "overlayOut .8s forwards" });
    setTimeout(() => {
      setShowpopup(false);
      setAnimate();
    }, 800);
  }


  if (serviceDetails) {
    return (
      <>
        {showpopup && (
          <div className="overlay" style={{ animation: animate?.overlayOut }}>
            <div className="popup-for-service" style={{ animation: animate?.popupOut }}>
              <form action="#" className="service-order-form">
                <div className="date-section service-order-form-item">
                  <div className="form-item-up">
                    <h3 className="form-item-title">Date:</h3>
                    <p className="form-item-selected">{orderDate}</p>
                  </div>
                  <DateSection orderDate={orderDate} setOrderDate={setOrderDate} />
                </div>
                <div className="time-section service-order-form-item">
                  <div className="form-item-up">
                    <h3 className="form-item-title">Time:</h3>
                    <p className="order-form-item-desc">Team will arrive within the selected time.</p>
                  </div>
                  <div className="time-section-list">
                    {timeList.map((item, index) => {
                      return (
                        <button key={index} type="button" className='time-section-list-item' onClick={(e) => { setOrderTime(item) }}>{item}</button>
                      )
                    })}
                  </div>
                </div>
                <div className="description-section service-order-form-item">
                  <div className="form-item-up">
                    <h3 className="form-item-title">Description:</h3>
                    <p className="order-form-item-desc">Describe issue/information in your words.</p>
                  </div>
                  <textarea value={orderDescription} onChange={(e) => { setOrderDescription(e.target.value) }} required></textarea>
                </div>
                <button type="submit">Confirm</button>
              </form>
              <button className='popup-cross' onClick={() => { popupcrossClick(); }}><RxCross2 /></button>
            </div>
          </div>
        )}
        <main className="service-container">
          <div className="service-container-first">
            <div className='service-container-first-top'>
              <Image className='service-container-first-top-icon' src={serviceDetails.icon} width={60} height={60} priority alt="" />
              <h1 className="service-container-first-left-title">{serviceDetails.title}</h1>
            </div>
            <p className="service-container-first-left-desc">{serviceDetails.description}</p>
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
                  return (
                    <li key={item.id} className="service-category">
                      <div className="service-category-info">
                        <h3 className="service-category-title">{item.title}</h3>
                        <p className="service-category-desc">{item.description}</p>
                      </div>
                      <button className="learnmore-btn" onClick={(e) => { setShowpopup(true) }}>Book Now</button>
                      <Image className='service-category-image' src={item.imageAddress} width={300} height={450} priority alt="" />
                    </li>
                  )
                })}
                <div className="other-services" onClick={(e) => { setShowpopup(true) }}>
                  Others
                  <FaArrowRightLong />
                </div>
              </ul>
            </div>
          </div>
          <div className="service-container-faqs">
            <h2 className="faqs-title">Frequently Asked Qns</h2>
            <ul className="faqs-container">
              <li className="faqs-item">Sudip Lamichhane <FaChevronDown /></li>
              <li className="faqs-item">Maddath Subedi <FaChevronDown /></li>
              <li className="faqs-item">Oasis Regmi <FaChevronDown /></li>
              <li className="faqs-item">Ayush Pandey <FaChevronDown /></li>
            </ul>
          </div>
        </main>
      </>
    )
  }
  else {
    return (<></>)
  }
}

export default Page
