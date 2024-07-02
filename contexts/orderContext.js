"use client";
import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);


export default function OrderProvider({ children }) {

    const [orders, setOrders] = useState([]);

    const addOrder = (order) => {
        const id = uuidv4();
        setOrders((prevOrders) => [
            ...prevOrders,
            {
                ...order,
                id: id
            }
        ]);
    };

    const removeOrder = (id) => {
        setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
            {children}
        </OrderContext.Provider>
    );
}
