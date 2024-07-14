"use client"
import React, { useState, useEffect } from 'react'
import "./Order.css";
import { FaMinus } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useOrders } from '@/contexts/orderContext';

import { RxCross2 } from "react-icons/rx";

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
              {orders.map((item, index)=>{
                return (
                  <div key={index} className="orders-item">
                    <form action="#" className="order-confirmation-form">
                      <div className="order-confirmation-form-item">
                        <label htmlFor="address">Address</label>
                        <input type="text" required/>
                      </div>
                    </form>
                    <div className="orders-item-right">
                      
                    </div>
                  </div>
                )
              })}
              <button className='popup-cross' onClick={() => { popupcrossClick(); }}><FaMinus /></button>
            </div>
          </div>}
      {(orders.length !== 0 && !showBig) && <div className='order-details-container-small' onClick={(e)=>{setShowBig(true)}}>
        <div className="order-details-container-small-text">Orders</div>
        <div className="order-details-container-small-count">{orders.length}</div>
      </div>}
    </>
  )
}

export default Order

