import React, { createContext, useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const OrderContext = createContext();

export const showOrders = () => useContext(OrderContext);


export default function notificationProvider ({ children }) {
    const [orders, setOrders] = useState([])

    const addOrder = (order) => {
        const Id = uuidv4();
        setOrders((prevOrder) => [
            ...prevOrder,
            {
                ...order,
                id: Id
            }
        ]);

        setTimeout(() => {
            removeOrder(Id);
        }, 5000);

    }
    const removeOrder = (id) => {
        setOrders((prevOrder) => prevOrder.filter((order) => order.id !== id))
    }

    return (
        <OrderContext.Provider value={{ orders, addOrder, removeOrder }}>
            {children}
        </OrderContext.Provider>
    )
}