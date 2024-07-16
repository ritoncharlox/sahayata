"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import data from "@/app/services.json";
import DateSection from '@/components/DateSection/DateSection';
import { RxCross2 } from "react-icons/rx";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaQuoteLeft, FaQuoteRight, FaChevronDown } from "react-icons/fa";
import { useOrders } from '@/contexts/orderContext';

import "./Service.css";

const Page = ({ params }) => {

  const { orders, addOrder } = useOrders();
  const [serviceDetails, setServiceDetails] = useState();
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [animate, setAnimate] = useState();

  const [clickedService, setClickedService] = useState();
  const [alreadyBooked, setAlreadyBooked] = useState(false);

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
      setClickedService();
      setAlreadyBooked(false);
      setAnimate();
      resetOrderDetails();
    }, 800);
  }

  const resetOrderDetails = () => {
    setOrderDate("");
    setOrderTime("");
    setOrderDescription("");
  }

  const handleOrderNext = () => {
    const currentService = orders.find(item=>{
      return item.orderService == clickedService;
    })
    if(!currentService){
      addOrder({
        orderService: clickedService,
        orderDate: orderDate,
        orderTime: orderTime,
        orderDescription: orderDescription,
      });
    }
    popupcrossClick();
  }

  const handleBookNow = (service)=>{
    const currentService = orders.filter(item=>{
      return item.orderService == service;
    })
    // console.log(currentService);
    if(currentService.length == 0){
      setClickedService(service)
    }
    else{
      setAlreadyBooked(true);
    }
  }


  if (serviceDetails) {
    return (
      <>
        {clickedService && (
          <div className="overlay" style={{ animation: animate?.overlayOut }}>
          <div className="popup-for-service" style={{ animation: animate?.popupOut }}>
            <h3 className="popup-header-title">
              <div className="popup-title-top">
                <FaQuoteLeft style={{ fontSize: "10px", color: "var(--theme-color2)" }} /> {clickedService && clickedService} <FaQuoteRight style={{ fontSize: "10px", color: "var(--theme-color2)" }} />
              </div>
              <div className="popup-title-bottom"></div>
            </h3>
            <div className="service-order-form">
              <div className="order-note-section"><i><span style={{ fontWeight: "bold", fontSize: ".95rem" }}>Note:</span> Fill the details and click on next for further process.</i></div>
              <div className="date-section service-order-form-item">
                <div className="form-item-up">
                  <h3 className="form-item-title">Date (AD):</h3>
                  {orderDate !== "" ? <p className="form-item-selected">{orderDate}</p> : <p className="order-form-item-desc">Choose a date for the service.</p>}
                </div>
                <DateSection orderDate={orderDate} setOrderDate={setOrderDate} />
              </div>
              <div className="time-section service-order-form-item">
                <div className="form-item-up">
                  <h3 className="form-item-title">Time:</h3>
                  {orderTime !== "" ? <p className="form-item-selected">{orderTime}</p> : <p className="order-form-item-desc">Choose a time period.</p>}
                </div>
                <div className="time-section-list date-time-containers">
                  {timeList.map((item, index) => {
                    return (
                      <button key={index} type="button" className={orderTime == item ? "time-section-list-item date-day-btn selected-btn" : "time-section-list-item date-day-btn"} onClick={(e) => { orderTime == item ? setOrderTime("") : setOrderTime(item) }}>{item}</button>
                    )
                  })}
                </div>
              </div>
              <div className="description-section service-order-form-item">
                <div className="form-item-up">
                  <h3 className="form-item-title">Description:</h3>
                  <p style={{fontSize: ".9rem", fontWeight: "400", color: "#363636"}}><i>Describe issue/information in your words below.</i></p>
                </div>
                <textarea className='order-description-box' value={orderDescription} onChange={(e) => { setOrderDescription(e.target.value) }} required></textarea>
              </div>
            </div>
            <div className="next-btn-container">
              <button onClick={(e) => { handleOrderNext(); }} type='button' className='order-next-btn' disabled={orderDate == "" || orderTime == "" || orderDescription == ""}>Next</button>
            </div>
            <button className='popup-cross' onClick={() => { popupcrossClick(); }}><RxCross2 /></button>
          </div>
        </div>
        )}
        {alreadyBooked && <div className="overlay" style={{ animation: animate?.overlayOut }}>
          <div className="popup-for-service already-booked-container" style={{ animation: animate?.popupOut }}>
            <div className="already-booked-text">You have already booked this service.</div>
            <button className='already-booked-ok-btn' onClick={(e)=>{popupcrossClick();}}>OK</button>
          </div>
        </div>}
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
              <Image className='service-cover' src={serviceDetails.imageAddress} width={400} height={300} priority alt="" />
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
                      <button className="learnmore-btn" onClick={(e) => { handleBookNow(item.title); }}>Book Now</button>
                      <Image className='service-category-image' src={item.imageAddress} width={300} height={450} priority alt="" />
                    </li>
                  )
                })}
                <div className="other-services" onClick={(e) => { setClickedService("Others") }}>
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
