"use client"
import React from 'react'
import "./Order.css";
import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useOrders } from '@/contexts/orderContext';

const Order = () => {
  const { orders, removeOrder } = useOrders();

  const handleRemove = (id) => {
    removeOrder(id);
  }

  return (
    <>
      {orders.length !== 0 && <div className="order-details-container">
        {orders.map(item => {
          return (
            <div key={item.id} className="order-detail">
              {item.orderService}
            </div>
          )
        })}
      </div>}
    </>
  )
}

export default Order

