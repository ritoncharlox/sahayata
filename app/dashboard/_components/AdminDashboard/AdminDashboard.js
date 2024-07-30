"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { IoAnalytics } from "react-icons/io5";
import "./AdminDashboard.css";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Users from './Users/Users';

const AdminDashboardClient = ({ data }) => {

    const [selected, setSelected] = useState('analytics');

    return (
        <main className="dashboard">
            <aside className="sidebar">
                <ul>
                    <li onClick={() => setSelected('analytics')}>
                        <div className="icon">
                            <IoAnalytics />
                        </div>
                        <div className="text">
                            Analytics
                        </div>
                    </li>
                    <li onClick={() => setSelected('users')}>
                        <div className="icon">
                            <FaUsers />
                        </div>
                        <div className="text">
                            Users
                        </div>
                    </li>
                    <li onClick={() => setSelected('orders')}>
                        <div className="icon">
                            <FaShoppingCart />
                        </div>
                        <div className="text">
                            Orders
                        </div>
                    </li>
                </ul>
            </aside>
            <section className="content">
                {selected === 'analytics' && (
                    <>
                        <h1>Analytics</h1>
                        <p>Here you can view analytics data.</p>
                        {/* Add more analytics content here */}
                    </>
                )}
                {selected === 'users' && (
                    <Users />
                )}
                {selected === 'orders' && (
                    <>
                        <h1>Orders</h1>
                        <p>View and manage orders here.</p>
                        {/* Add more orders content here */}
                    </>
                )}
            </section>
        </main>
    )
}

export default AdminDashboardClient