"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);


export default function OrderProvider({ children }) {

    const [orders, setOrders] = useState([]);
    const [showBig, setShowBig] = useState(false);

    useEffect(() => {
      let myOrders = localStorage.getItem("order");
      const newOrders = JSON.parse(myOrders);
      if(myOrders){
        setOrders(newOrders);
      }
    }, [])

    const saveToLs = (ordersToSave)=>{
        localStorage.setItem("order", JSON.stringify(ordersToSave));
    }
    const RemoveFromLs = ()=>{
        localStorage.removeItem("order");
    }

    const addOrder = (order) => {
        const id = uuidv4();
        // setOrders((prevOrders) => [
        //     ...prevOrders,
        //     {
        //         ...order,
        //         id: id
        //     }
        // ]);
        let newOrders = [...orders];
        order.id = id;
        newOrders.push(order);
        setOrders(newOrders)
        saveToLs(newOrders);
        
    };

    const removeOrder = (id) => {
        // setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
        let newOrders = [...orders];
        let reaminingOrders = newOrders.filter((item)=>{
            return item.id !== id;
        })
        setOrders(reaminingOrders);
        saveToLs(reaminingOrders);
    };

    const cancelOrder = ()=>{
        setOrders([]);
        RemoveFromLs();
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder, cancelOrder, showBig, setShowBig }}>
            {children}
        </OrderContext.Provider>
    );
}
