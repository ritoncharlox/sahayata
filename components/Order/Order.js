"use client"
import React, { useState, useEffect } from 'react'
import "./Order.css";
import { RxCross2 } from "react-icons/rx";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

import { useOrders } from '@/contexts/orderContext';

const Order = () => {
  const { orders, removeOrder } = useOrders();
  const [showBig, setShowBig] = useState(true);
  const [animate, setAnimate] = useState();

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

  return (
    <>
      {(orders.length !== 0 && showBig) && <div className="order-details-overlay" style={{ animation: animate?.overlayOut }}>
        <div className="order-details-container-big" style={{ animation: animate?.popupOut }}>
          <div className="orders-details-container">
            <div className="form-item-title">Orders:</div>
            <div className="orders-details-container-details">
              {orders.map((item, index) => {
                return (
                  <div key={index} className="orders-details-item">
                    <div className="orders-details-item-top">
                      <div className="order-service">{item.orderService}</div>
                      <div className="order-date-time">
                        <div className="order-date">{item.orderDate}</div>
                        <div className="order-date-time-separator"></div>
                        <div className="order-time">{item.orderTime}</div>
                      </div>
                    </div>
                    <div className="order-details-item-middle"></div>
                    <div className="orders-details-item-bottom">" {item.orderDescription} "</div>

                    <div className="three-dots"><HiOutlineDotsHorizontal/></div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="order-confirmation-form-container">
            order-confirmation form
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

