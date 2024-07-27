"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import DateSection from '@/components/DateSection/DateSection';
import { IoClose } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaQuoteLeft, FaQuoteRight, FaChevronDown } from "react-icons/fa";
import { ScaleLoader } from 'react-spinners';
import { useOrders } from '@/contexts/orderContext';
import { useRouter } from 'next/navigation';

const Service = ({ params, session }) => {

  const { orders, addOrder } = useOrders();
  const router = useRouter();

  const [user, setUser] = useState(null);

  const [pageLoader, setPageLoader] = useState(true);

  const [serviceDetails, setServiceDetails] = useState();
  const [orderDate, setOrderDate] = useState('');
  const [orderTime, setOrderTime] = useState('');
  const [orderDescription, setOrderDescription] = useState('');
  const [animate, setAnimate] = useState();

  const [clickedService, setClickedService] = useState();
  const [alreadyBooked, setAlreadyBooked] = useState(false);

  const [nextPending, setNextPending] = useState(false);

  const [faqs, setFaqs] = useState([
    {
      question: "How to book any service?",
      answer: "Click on the desired service and fill up the required details and verify. Then after you will get a call from Sahayata about your order.",
      showAnswer: false,
    },
    {
      question: "What is the pricing for any service?",
      answer: "After you book the service, The price will be discussed later according to the work done and time.",
      showAnswer: false,
    },
    {
      question: "What payment method you provide?",
      answer: "The payment will be done physically at your home either on cash or via online face to face with Sahayata member.",
      showAnswer: false,
    },
  ])

  const timeList = ["7 AM - 9 AM", "9 AM - 11 AM", "11 AM - 1 PM", "1 AM - 3 PM", "3 PM - 5 PM", "5 PM - 7 PM"];

  useEffect(() => {
    if (params.service) {
      fetch(`/api/service?title=${params.service}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            setServiceDetails(data);
          }
        })
        .catch((error) => console.error('Error fetching service details:', error));
    }
  }, [params]);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${session.user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            setUser(data);
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [session]);

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
    setNextPending(true);
    if (!user) {
      router.push("/login");
      return;
    }
    const currentService = orders.find(item => {
      return item.orderService == clickedService;
    })
    if (!currentService) {
      addOrder({
        orderService: clickedService,
        orderDate: orderDate,
        orderTime: orderTime,
        orderDescription: orderDescription,
      });
    }
    popupcrossClick();
    setNextPending(false);
  }

  const handleBookNow = (service) => {
    const currentService = orders.filter(item => {
      return item.orderService == service;
    })
    // console.log(currentService);
    if (currentService.length == 0) {
      setClickedService(service)
    }
    else {
      setAlreadyBooked(true);
    }
  }

  const handleFaqClick = (index)=>{
    let newFaq = [...faqs];
    newFaq[index].showAnswer = !newFaq[index].showAnswer;
    setFaqs(newFaq);
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
                        <button key={index} type="button" className={orderTime == item ? "time-section-list-item selected-btn" : "time-section-list-item"} onClick={(e) => { orderTime == item ? setOrderTime("") : setOrderTime(item) }}>{item}</button>
                      )
                    })}
                  </div>
                </div>
                <div className="description-section service-order-form-item">
                  <div className="form-item-up">
                    <h3 className="form-item-title">Description:</h3>
                    <p style={{ fontSize: ".9rem", fontWeight: "400", color: "#363636" }}><i>Describe issue/information in your words below.</i></p>
                  </div>
                  <textarea className='order-description-box' value={orderDescription} onChange={(e) => { setOrderDescription(e.target.value) }} required></textarea>
                </div>
              </div>
              <div className="next-btn-container">
                <button onClick={(e) => { handleOrderNext(); }} type='button' className={`order-next-btn ${nextPending ? `next-pending` : ``}`} disabled={nextPending || orderDate == "" || orderTime == "" || orderDescription == ""}>
                  {
                    nextPending ?
                      <ScaleLoader height={20} color={"#fff"} />
                      :
                      "Next"
                  }
                </button>
              </div>
              <button className='popup-cross' onClick={() => { popupcrossClick(); }}><IoClose /></button>
            </div>
          </div>
        )}
        {alreadyBooked && <div className="overlay" style={{ animation: animate?.overlayOut }}>
          <div className="popup-for-service already-booked-container" style={{ animation: animate?.popupOut }}>
            <div className="already-booked-text">You have already booked this service.</div>
            <button className='already-booked-ok-btn' onClick={(e) => { popupcrossClick(); }}>OK</button>
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
                {serviceDetails.subcategories.map((item) => {
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
              {faqs.map((item, index) => {
                return (
                  <li className="faqs-item" key={index} style={{animation: item.showAnswer ? "showAns .4s forwards" : "hideAns .4s forwards"}}>
                    <div className="fa-question" onClick={(e)=>{handleFaqClick(index);}}>
                      <div className="fa-question-text">{item.question}</div>
                      <div className="fa-question-icon" style={{animation: item.showAnswer ? "rotateUp .3s forwards" : "rotateDown .3s forwards"}}><FaChevronDown /></div>
                    </div>
                    <div className="fa-answer">
                      <div className="fa-answer-line"></div>
                      <div className="fa-answer-text">{item.answer}</div>
                    </div>
                  </li>
                )
              })}
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

export default Service
