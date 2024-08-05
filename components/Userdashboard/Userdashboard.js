"use client"
import React, { useEffect, useState } from 'react'
import "./Userdashboard.css";
import Link from 'next/link';
import { IoAnalytics } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useSearchParams, useRouter } from 'next/navigation';

import Orders from './Orders/Orders';

const Userdashboard = () => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const page = searchParams.get('page') || 'analytics';
    const [selected, setSelected] = useState(page);
    const [validPage, setValidPage] = useState(true);

    // List of valid pages
    const validPages = ['analytics','orders'];

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
        router.push(`/userdash?page=${page}`);
    };

    return (
        <>
            <main className='user-dashboard-container'>
                <aside className="user-dashboard-sidebar">
                    <ul>
                        <li
                            className={`sidebar-element ${selected === 'analytics' && 'sidebar-active'}`}
                            onClick={() => handleSidebarClick('analytics')}
                        >
                            <div className="sidebar-element-icon">
                                <IoAnalytics />
                            </div>
                            <div className="sidebar-element-text">
                                Analytics
                            </div>
                        </li>
                        <li
                            className={`sidebar-element ${selected === 'orders' && 'sidebar-active'}`}
                            onClick={() => handleSidebarClick('orders')}
                        >
                            <div className="sidebar-element-icon">
                                <FaShoppingCart />
                            </div>
                            <div className="sidebar-element-text">
                                Orders
                            </div>
                        </li>
                    </ul>
                </aside>
                <section className="user-dashboard">
                    {!validPage ? (
                        <div className="invalid-dashboard">
                            <h1>Invalid Page</h1>
                            <p>The page you are looking for does not exist.</p>
                        </div>
                    ) : (
                        <>
                            {selected === 'analytics' && (
                                <>
                                    <h1>Analytics</h1>
                                    <p>Here you can view analytics data.</p>
                                </>
                            )}
                            {selected === 'orders' && (
                                <>
                                    <Orders />
                                </>
                            )}
                        </>
                    )}
                </section>
            </main>
        </>
    )
}

export default Userdashboard
