import React from 'react'
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { showOrders } from '@/contexts/orderContext';

const Notification = () => {
  const { orders, removeOrder } = showOrders();

  const handleRemove = (id) => {
    removeOrder(id);
  }

  return (
    <>
      {orders.length !== 0 && <div className="notifications">
        {orders.map(item => {
          return (
            <div key={item.id} className="notifyme">
              <div className="notifyme-top">
                <div className="notifyme-left">
                  {/* <button className='check notifyme-btn1'><FaCheckCircle /></button> */}
                  <div className="notifyme-text">✅ Hello babe</div>
                </div>
                <button className='notifyme-btn2 uncheck' onClick={() => { handleRemove(item.id) }}><MdCancel /></button>
              </div>
              <div className="notifyme-buttom"></div>
            </div>
          )
        })}
      </div>}
    </>
  )
}

export default Notification

