"use client"

import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoAnalytics } from "react-icons/io5";
import "./AdminDashboard.css";
import { FaUsers } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import Users from './Users/Users';
import Orders from './Orders/Orders'
import { useSearchParams, useRouter } from 'next/navigation';

const AdminDashboardClient = ({ data }) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const page = searchParams.get('page') || 'analytics';
    const [selected, setSelected] = useState(page);
    const [validPage, setValidPage] = useState(true);

    // List of valid pages
    const validPages = ['analytics', 'users', 'orders'];

    useEffect(() => {
        if (validPages.includes(page)) {
            setSelected(page);
            setValidPage(true);
        } else {
            setValidPage(false);
            // router.push('/dashboard?page=analytics');
        }
    }, [page]);

    // Handle sidebar clicks and URL updates
    const handleSidebarClick = (page) => {
        setSelected(page);
        router.push(`/dashboard?page=${page}`);
    };

    return (
        <main className="dashboard">
            <aside className="sidebar">
                <ul>
                    <li
                        className={selected === 'analytics' ? 'active' : ''}
                        onClick={() => handleSidebarClick('analytics')}
                    >
                        <div className="icon">
                            <IoAnalytics />
                        </div>
                        <div className="text">
                            Analytics
                        </div>
                    </li>
                    <li
                        className={selected === 'users' ? 'active' : ''}
                        onClick={() => handleSidebarClick('users')}
                    >
                        <div className="icon">
                            <FaUsers />
                        </div>
                        <div className="text">
                            Users
                        </div>
                    </li>
                    <li
                        className={selected === 'orders' ? 'active' : ''}
                        onClick={() => handleSidebarClick('orders')}
                    >
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
                {!validPage ? (
                    <div className="invalid-page">
                        <h1>Invalid Page</h1>
                        <p>The page you are looking for does not exist.</p>
                    </div>
                ) : (
                    <>
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
                            <Orders />
                        )}
                    </>
                )}
            </section>
        </main>
    )
}

export default AdminDashboardClient