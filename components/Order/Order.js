"use client"
import React, { useState, useEffect } from 'react'
import "./Order.css";
import Link from 'next/link';
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { ScaleLoader } from 'react-spinners';
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdError } from 'react-icons/md';
import { TiMinus } from "react-icons/ti";


import { useOrders } from '@/contexts/orderContext';
import { validate } from 'uuid';

const Order = () => {
  const { orders, removeOrder } = useOrders();
  const [showBig, setShowBig] = useState(true);
  const [animate, setAnimate] = useState();

  const [orderAddress, setOrderAddress] = useState("");
  const [orderContact, setOrderContact] = useState("");

  const [orderPending, setOrderPending] = useState(false);

  const [orderError, setOrderError] = useState("");
  const [orderInfo, setOrderInfo] = useState("");

  const [otpFirst, setOtpFirst] = useState("");
  const [otpSecond, setOtpSecond] = useState("");
  const [otpThird, setOtpThird] = useState("");
  const [otpFourth, setOtpFourth] = useState("");
  const [otpFifth, setOtpFifth] = useState("");
  const [otpSixth, setOtpSixth] = useState("");

  const handleRemove = (id) => {
    removeOrder(id);
  }

  useEffect(() => {
    setShowBig(true);
  }, [orders])


  const popupcrossClick = () => {
    setAnimate({ popupOut: "popupOut .3s forwards", overlayOut: "overlayOut .8s forwards" });
    setTimeout(() => {
      setAnimate();
      setShowBig(false);
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

  }

  const handleOtpInput = (e) => {
    e.target.value = e.target.value.replace(/\D/g, '');

    if (e.target.value.length > 1) {
      e.target.value = e.target.value.slice(0, 1);
    }
  }

  return (
    <>
      {(orders.length !== 0 && showBig) && <div className="order-details-overlay" style={{ animation: animate?.overlayOut }}>
        <div className="order-details-container-big" style={{ animation: animate?.popupOut }}>
          <div className="orders-details-container">
            <div className="form-item-up">
              <h3 className="form-item-title">Orders:</h3>
              <p className="selected-order-count">{orders.length}</p>
              <button className='order-addmore-btn' onClick={(e) => { popupcrossClick(); }}><FaPlus /></button>
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
            <div className="order-confirm-section">
              <div className="form-item-title">Confirm Orders:</div>
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

            <div className="verify-otp-section">
              <h4 className="form-item-title">Enter OTP:</h4>
              <form action="" className="otp-verification-form">
                <div className="otp-container">
                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpFirst !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpFirst(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>
                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpSecond !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpSecond(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>
                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpThird !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpThird(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>

                  <div className="otp-mid-line"><TiMinus /></div>

                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpFourth !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpFourth(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>
                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpFifth !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpFifth(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>
                  <div className="order-otp-field">
                    <input
                      type="text"
                      className={`titleInput ${otpSixth !== '' ? 'valid-otp-input' : ''}`}
                      onChange={(e) => setOtpSixth(e.target.value)}
                      onInput={(e) => { handleOtpInput(e); }}
                      pattern="\d"
                      maxLength="1"
                      required
                    />                    <i></i>
                  </div>
                </div>
                <div className="otp-verify-btn-container">

                </div>
              </form>
            </div>
          </div>
          <button className='popup-cross' onClick={() => { popupcrossClick(); }}><RxCross2 /></button>
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

