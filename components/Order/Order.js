"use client"
import React, { useState } from 'react'
import "./Order.css";
import { FaCheckCircle } from "react-icons/fa";
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
                    <div className="orders-item-left">

                    </div>
                    <div className="orders-item-right">
                      
                    </div>
                  </div>
                )
              })}
              <button className='popup-cross' onClick={() => { popupcrossClick(); }}><RxCross2 /></button>
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

