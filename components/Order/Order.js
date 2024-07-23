"use client"
import React, { useState, useEffect, useRef } from 'react'
import "./Order.css";
import "./OtpSection.css";
// import Link from 'next/link';
// import { RxCross2 } from "react-icons/rx";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ScaleLoader } from 'react-spinners';
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdError } from 'react-icons/md';
import { FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TiMinus } from "react-icons/ti";

import { useOrders } from '@/contexts/orderContext';
// import { validate } from 'uuid';

const Order = () => {

  const { orders, removeOrder, cancelOrder } = useOrders();

  const [user, setUser] = useState(null);
  const [showBig, setShowBig] = useState(true);
  const [animate, setAnimate] = useState();

  const [orderAddress, setOrderAddress] = useState("");
  const [orderContact, setOrderContact] = useState("");

  const [orderPending, setOrderPending] = useState(false);

  const [orderError, setOrderError] = useState("");
  const [orderInfo, setOrderInfo] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpPending, setOtpPending] = useState(false);

  const otpRefs = useRef([]);

  const handleRemove = (id) => {
    if (orders.length <= 1) {
      popupcrossClick()
    }
    else {
      removeOrder(id);
    }
  }

  useEffect(() => {
    setShowBig(true);

  }, [orders])

  const popupminusClick = () => {
    setAnimate({ popupOut: "popupOut .3s forwards", overlayOut: "overlayOut .8s forwards" });
    setTimeout(() => {
      setAnimate();
      setShowBig(false);
    }, 800);
  }
  const popupcrossClick = () => {
    popupminusClick();
    setTimeout(() => {
      cancelOrder();
    }, 800);
  }

  const isValidNumber = (input) => {
    if (typeof input !== 'string' || input.length !== 10) {
      return false;
    }
    if (!input.startsWith('97') && !input.startsWith('98')) {
      return false;
    }
    const digitRegex = /^\d{10}$/;
    return digitRegex.test(input);
  }

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (orderPending) {
      return;
    }

    setOrderPending(true);
    setOrderError("");
    setOrderInfo("");

    if (!orderAddress || !orderContact) {
      setOrderError("Please provide all the fields");
      setOrderPending(false);
      return;
    }

    if (!isValidNumber(orderContact)) {
      setOrderError("Please provide valid Phone no.");
      setOrderPending(false);
      return;
    }
    //Now call the OTP action
    // Example usage below
    setOrderPending(false);
    setCurrentIndex(currentIndex + 1);

  }

  const handleOtpInput = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, '').slice(0, 1);
    setOtp(newOtp);

    // Focus next field even if current field isn't full
    if (value.length > 0 && index < otpRefs.current.length - 1 && /^\d+$/.test(value)) {
      otpRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    setOtpPending(true);
    setTimeout(() => {
      console.log("OTP entered:", otp.join(''));
      setOtpPending(false)
      setOtp(["", "", "", "", "", ""]);
      otpRefs.current[0].focus();
    }, 1000);
  };


  return (
    <>
      {(orders.length !== 0 && showBig) && <div className="order-details-overlay" style={{ animation: animate?.overlayOut }}>
        <div className="order-details-container-big" style={{ animation: animate?.popupOut }}>
          <div className="orders-details-container">
            <div className="form-item-up">
              <h3 className="form-item-title">Orders:</h3>
              <p className="selected-order-count">{orders.length}</p>
              <button className='order-addmore-btn' onClick={(e) => { popupminusClick(); }}><FaPlus /></button>
            </div>
            <div className="orders-details-container-details">
              {orders.map((item, index) => {
                return (
                  <div key={index} className="orders-details-item">
                    <div className="orders-details-item-top">
                      <div className="order-service">{index + 1}. {item.orderService}</div>
                      <div className="order-date-time">
                        <div className="order-date">{item.orderDate}</div>
                        <div className="order-date-time-separator"></div>
                        <div className="order-time">{item.orderTime}</div>
                      </div>
                    </div>
                    <div className="order-details-item-middle"></div>
                    <div className="order-remove-btn" onClick={(e) => { handleRemove(item.id); }}><RiDeleteBack2Fill /></div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="order-confirmation-form-container">
            <div className="orderbox-slider">
              <div className="orderbox-container" style={{ transform: `translateX(${(currentIndex) * -100}%)` }}>
                <div className={`orderbox-card-wrapper`}>
                  <div className="order-confirm-section">
                    <div className="form-item-up">
                      <div className="form-item-title">Confirm Orders:</div>
                      <p style={{ fontSize: ".9rem", fontWeight: "400", color: "#363636" }}><i>Example address: | Pragati Marga, Hakimchwok, Bharatpur-11 |</i></p>
                    </div>
                    <form action="" className="order-confirmation-form" onSubmit={(e) => { handleConfirmOrder(e); }}>
                      <div className="order-confirmation-form-inputs">
                        <div className="order-input-field">
                          <input type="text" className={`titleInput ${orderAddress !== '' ? `valid-order-input` : ''}`} name="orderaddress" onChange={(e) => setOrderAddress(e.target.value)} required />
                          <span>Address</span>
                          <i></i>
                        </div>
                        <div className="order-input-field">
                          <input type="text" className={`titleInput ${orderContact !== '' ? `valid-order-input` : ''}`} name="ordercontact" onChange={(e) => setOrderContact(e.target.value)} required />
                          <span>Phone No.</span>
                          <i></i>
                        </div>
                      </div>
                      {
                        orderError ? (
                          <>
                            <div className="order-error-field">
                              <div className="error-icon">
                                <MdError />
                              </div>
                              <div className="error-text">
                                {orderError}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                          </>
                        )
                      }
                      {
                        orderInfo ? (
                          <>
                            <div className="order-info-field">
                              <div className="info-icon">
                                <FaCheckCircle />
                              </div>
                              <div className="info-text">
                                {orderInfo}
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                          </>
                        )
                      }
                      <div className="order-submit-btn-container">
                        <button type="submit" className={`order-submit-btn ${orderPending ? `order-pending` : ``}`} disabled={orderPending}>
                          {
                            orderPending ?
                              <ScaleLoader height={20} color={"#fff"} />
                              :
                              "Confirm"
                          }
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className={`orderbox-card-wrapper`}>
                  <div className="verify-otp-section">
                    <div className="form-item-up">
                      <div className="form-item-title">Enter Code:</div>
                      <p style={{ fontSize: ".9rem", fontWeight: "400", color: "#363636" }}><i>Provide OTP that we have sent to - {orderContact}</i></p>
                    </div>
                    <form className="otp-verification-form" onSubmit={handleVerifyOtp}>
                      <div className="otp-container">
                        {otp.map((digit, index) => (
                          <div className="order-otp-field-container" key={index}>
                            <div className="order-otp-field">
                              <input
                                type="text"
                                className={`titleInput ${digit !== '' ? 'valid-otp-input' : ''}`}
                                value={digit}
                                onInput={(e) => handleOtpInput(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => otpRefs.current[index] = el}
                                pattern="\d"
                                maxLength="1"
                                required
                                onFocus={() => otpRefs.current[index].select()}
                              />
                              <i></i>
                            </div>
                            {index == "2" && <div className="otp-mid-line"><TiMinus /></div>}
                          </div>
                        ))}

                      </div>
                      <div className="otp-verify-btn-container">
                        <button type="submit" className={`otp-verify-btn ${otpPending ? `otp-pending` : ``}`} disabled={otpPending}>
                          {otpPending ? <ScaleLoader height={20} color={"#fff"} /> : "Verify"}
                        </button>
                      </div>
                    </form>

                    <div className="resend-otp-section">
                      <p className="resend-text">Didn't get code?</p>
                      <button className='resend-otp-btn'>Resend code</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <button className='popup-minus' onClick={() => { popupminusClick(); }}><FiMinus /></button>
          <button className='popup-cross' onClick={() => { popupcrossClick(); }}><IoClose /></button>
        </div>
      </div>}
      {(orders.length !== 0 && !showBig) && <div className='order-details-container-small' onClick={(e) => { setShowBig(true) }}>
        <div className="order-details-container-small-text">Orders</div>
        <div className="order-details-container-small-count">{orders.length}</div>
      </div>}
    </>
  )
}

export default Order

