import Link from 'next/link';
import React from 'react'
import { IoAnalytics } from "react-icons/io5";
import "./AdminDashboard.css";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";

const AdminDashboard = () => {
    return (
        <main className="dashboard">
            <aside className="sidebar">
                <ul>
                    <li>
                        <div className="icon">
                            <IoAnalytics />
                        </div>
                        <div className="text">
                            Analytics
                        </div>
                    </li>
                    <li>
                        <div className="icon">
                            <FaUsers />
                        </div>
                        <div className="text">
                            Users
                        </div>
                    </li>
                    <li>
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
                <h1>Dashboard</h1>
                <p>Welcome to the dashboard.</p>
                {/* Add more content here */}
            </section>
        </main>
    )
}

export default AdminDashboard