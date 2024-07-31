"use client"
import React, { useState, useEffect } from 'react'
import "./Order.css";

import { RiDeleteBack2Fill } from "react-icons/ri";
import { ScaleLoader } from 'react-spinners';
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import { MdError } from 'react-icons/md';
import { FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TiMinus } from "react-icons/ti";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

import { useOrders } from '@/contexts/orderContext';

const Order = ({ session }) => {

  const { orders, removeOrder, cancelOrder } = useOrders();

  const [user, setUser] = useState(null);
  const [showBig, setShowBig] = useState(true);
  const [animate, setAnimate] = useState();

  const [orderAddress, setOrderAddress] = useState("");
  const [orderContact, setOrderContact] = useState("");

  const [orderPending, setOrderPending] = useState(false);

  const [orderError, setOrderError] = useState("");
  const [orderInfo, setOrderInfo] = useState("");


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
    setOrderAddress("");
    setOrderContact("");
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
  }

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
            <div className="order-confirm-section">
              <div className="form-item-up-left">
                <div className="form-item-title">Confirm Orders:</div>
                <p style={{ fontSize: ".9rem", fontWeight: "400", color: "#363636" }}><i>Provide below details.</i></p>
              </div>
              <form action="" className="order-confirmation-form" onSubmit={(e) => { handleConfirmOrder(e); }}>
                <div className="order-confirmation-form-inputs">
                  <div className="order-input-field">
                    <input type="text" className={`titleInput ${orderAddress !== '' ? `valid-order-input` : ''}`} name="orderaddress" onChange={(e) => setOrderAddress(e.target.value)} required />
                    <span>Address</span>
                    <i></i>
                  </div>
                  {/* <div className="order-input-field">
                    <input type="text" className={`titleInput ${orderContact !== '' ? `valid-order-input` : ''}`} name="ordercontact" onChange={(e) => setOrderContact(e.target.value)} required />
                    <span>Phone No.</span>
                    <i></i>
                  </div> */}
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
                {(user && user.isNumberVerified) && <div className="order-submit-btn-container">
                  <button type="submit" className={`order-submit-btn ${orderPending ? `order-pending` : ``}`} disabled={orderPending}>
                    {
                      orderPending ?
                        <ScaleLoader height={20} color={"#fff"} />
                        :
                        "Confirm"
                    }
                  </button>
                </div>}
              </form>
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

