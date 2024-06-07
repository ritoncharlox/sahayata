"use client"
import React from 'react'
import Image from "next/image";
import "./Homepage.css"
import { FaComputer } from "react-icons/fa6";

const Homepage = () => {
    return (
        <main className="homepage-first">
            <Image className="homepage-coverpic" width={1000} height={350} src="https://i0.wp.com/cmgtoronto.com/wp-content/uploads/2017/03/Repairs.jpg?resize=1210%2C423&ssl=1" alt="sahayata cover" />
            <div className="homepage-slogan">
                <div className="homepage-slogan-title">Expert Home Fixes - Trusted Solutions</div>
                <div className="homepage-slogan-desc">Professional home repairs you can trust, delivering expert solutions for all your household needs.</div>
            </div>

            <div className="services-section">
                <div className="services-section-title">Book Services</div>
                <ul className="services-lists">
                    <li className="services-listitems">
                        <div className="service-icon"><FaComputer /></div>
                        <div className="service-title">Electrician</div>
                    </li>
                    <li className="services-listitems">
                        <div className="service-icon"><FaComputer /></div>
                        <div className="service-title">Computer & Networking</div>
                    </li>
                    <li className="services-listitems">
                        <div className="service-icon"><FaComputer /></div>
                        <div className="service-title">Computer & Networking</div>
                    </li>
                    <li className="services-listitems">
                        <div className="service-icon"><FaComputer /></div>
                        <div className="service-title">Computer & Networking</div>
                    </li>
                </ul>
            </div>
        </main>
    )
}

export default Homepage
