"use client"
import React, { useState, useEffect, useRef } from 'react'
import "./Order.css";

import { RiDeleteBack2Fill } from "react-icons/ri";
import { ScaleLoader } from 'react-spinners';
import { FaPlus, FaCheckCircle, FaCaretRight } from "react-icons/fa";
import { MdError } from 'react-icons/md';
import { FiMinus } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { TiMinus } from "react-icons/ti";
import { GrFormPreviousLink, GrFormNextLink } from "react-icons/gr";

import { useOrders } from '@/contexts/orderContext';
import { useRouter } from 'next/navigation';

const Order = ({ session }) => {

  const { orders, removeOrder, cancelOrder } = useOrders();

  const router = useRouter();

  const [user, setUser] = useState();
  const [showBig, setShowBig] = useState(false);
  const [animate, setAnimate] = useState();

  const [streetAddress, setStreetAddress] = useState("");
  const [wardAddress, setWardAddress] = useState("");
  const [cityAddress, setCityAddress] = useState("");
  // const [orderContact, setOrderContact] = useState("");

  const [orderPending, setOrderPending] = useState(false);
  const [notVerifiedPending, setNotVerifiedPending] = useState(false);

  const [orderError, setOrderError] = useState("");
  const [orderInfo, setOrderInfo] = useState("");

  const popupContentRef = useRef(null);

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

  useEffect(() => {
    setShowBig(true);
  }, [orders])


  const handleRemove = (id) => {
    if (orders.length <= 1) {
      popupcrossClick()
    }
    else {
      removeOrder(id);
    }
  }

  const popupminusClick = () => {
    setAnimate({ popupOut: "popupOut .3s forwards", overlayOut: "overlayOut .8s forwards" });
    setTimeout(() => {
      setAnimate();
      setShowBig(false);
    }, 800);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupContentRef.current && !popupContentRef.current.contains(event.target)) {
        popupminusClick();
      }
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const popupcrossClick = () => {
    popupminusClick();
    setTimeout(() => {
      cancelOrder();
    }, 800);
    setStreetAddress("");
    setWardAddress("");
    setCityAddress("");
  }

  const isValidWardNo = (input) => {
    const regex = /^\d+$/;
    return regex.test(input) && (input.length === 1 || input.length === 2);
  }
  const isValidCity = (input) => {
    const regex = /^[A-Za-z\s]+$/;
    return regex.test(input);
  }

  const handleConfirmOrder = async (e) => {
    e.preventDefault();

    if (orderPending) {
      return;
    }

    setOrderPending(true);
    setOrderError("");
    setOrderInfo("");

    if (!streetAddress || !wardAddress || !cityAddress) {
      setOrderError("Please provide all the fields!");
      setOrderPending(false);
      return;
    }

    if (!isValidWardNo(wardAddress)) {
      setOrderError("Invalid ward no.!");
      setOrderPending(false);
      return;
    }

    if (!isValidCity(cityAddress)) {
      setOrderError("Invalid city!");
      setOrderPending(false);
      return;
    }

    if (user) {
      if (user.number) {
        if (!user.isNumberVerified) {
          router.push(`/number-verification?redirectTo=/`);
          return;
        }
        console.log("order completed");
      }
      router.push(`/number-verification?redirectTo=/`);
      return;
    }

    setOrderError("");
    setOrderInfo("");

    setOrderPending(false);
  }

  const handleNotVerified = () => {
    setNotVerifiedPending(true);
    if (!user || !user.number || !user.isNumberVerified) {
      router.push(`/number-verification?redirectTo=/`);
      setNotVerifiedPending(false);
      popupminusClick();
      return;
    }

  }

  return (
    <>
      {(orders.length !== 0 && showBig) && <div className="order-details-overlay" style={{ animation: animate?.overlayOut }}>
        <div className="order-details-container-big" ref={popupContentRef} style={{ animation: animate?.popupOut }}>
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
            {(user && user.number && user.isNumberVerified) ? <div className="order-confirm-section">
              <div className="form-item-up-left">
                <div className="form-item-title">Confirm Orders:</div>
                <p style={{ fontSize: ".9rem", fontWeight: "400", color: "#363636" }}><i>Provide below details.</i></p>
              </div>
              <form action="" className="order-confirmation-form" onSubmit={(e) => { handleConfirmOrder(e); }}>
                <div className="order-address-fields">
                  <div className="order-input-field">
                    <input type="text" className={`titleInput ${streetAddress !== '' ? `valid-order-input` : ''}`} name="streetaddress" onChange={(e) => setStreetAddress(e.target.value)} required />
                    <span>Street Address</span>
                    <i></i>
                  </div>
                  <div className="order-input-field">
                    <input type="text" className={`titleInput ${wardAddress !== '' ? `valid-order-input` : ''}`} name="wardaddress" onChange={(e) => setWardAddress(e.target.value)} required />
                    <span>Ward No.</span>
                    <i></i>
                  </div>
                  <div className="order-input-field">
                    <input type="text" className={`titleInput ${cityAddress !== '' ? `valid-order-input` : ''}`} name="cityaddress" onChange={(e) => setCityAddress(e.target.value)} required />
                    <span>City</span>
                    <i></i>
                  </div>
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
              </form>
            </div> : <div className="order-not-verified-btn-container">
              <button type="button" onClick={(e) => { handleNotVerified(); }} className={`order-submit-btn ${notVerifiedPending ? `order-pending` : ``}`} disabled={notVerifiedPending}>
                {
                  notVerifiedPending ?
                    <ScaleLoader height={20} color={"#fff"} />
                    :
                    "Confirm"
                }
              </button>
            </div>}
          </div>
          <button className='popup-order-minus' onClick={() => { popupminusClick(); }}><IoClose /></button>
          <button className='popup-order-cross' onClick={() => { popupcrossClick(); }}>Cancel Order</button>
        </div>
      </div>}
      {(orders.length !== 0 && !showBig) && <div className='order-details-container-small'>
        <div className="order-details-small-box" onClick={(e) => { setShowBig(true) }}>
          <div className="order-details-container-small-text">Orders</div>
          <div className="order-details-container-small-count">{orders.length}</div>
          <div className="hover-order-info"><span>Orders in progress</span> <FaCaretRight style={{ fontSize: "25px", color: "#010717", position: "relative", left: "-10px" }} /></div>
        </div>
      </div>}
    </>
  )
}

export default Order

