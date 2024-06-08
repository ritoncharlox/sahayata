"use client"
import React from 'react'
import Image from "next/image";
import "./Homepage.css"
import { FaComputer } from "react-icons/fa6";

const Homepage = () => {
    return (
        <main className="homepage-first">
            {/* <div className="black-cover"></div> */}
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

            <div className="homepage-separator"></div>

            <div className="why-sahayata-section">
                <div className="why-sahayata-left">
                    <div className="why-sahayata-title">Why Sahayata ?</div>
                    <ul className="why-sahayata-answers">
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1361283850/vector/businessman-holding-a-weighing-scale-with-a-bag-of-money-and-a-watch-balance-of-time-and.jpg?s=612x612&w=0&k=20&c=u5knG0iTdTjqx_3NPAsd5ciADT5mdoPZQ_vvMxuIR-M=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <div className="answers-title">Transparent Pricing</div>
                                <div className="answers-desc">Honest pricing promotes clarity and trustworthiness.</div>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1133747810/vector/profile-with-checkmark-on-smartphone-vector-flat-mobile-phone-user-account-accepted-approved.jpg?s=612x612&w=0&k=20&c=lSb6ZcUwc6KJe93z4zMQEAoU_TjXH9kiKHhCxlQu-i4=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <div className="answers-title">Verified Experts</div>
                                <div className="answers-desc">Trained experts with 5+ years of experiences.</div>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1452344070/vector/house-insurance.jpg?s=612x612&w=0&k=20&c=XYZlxXJxngaD2PLeAIi2imJxwfW9TSU3YPGWHUYHxCw=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <div className="answers-title">Service Warranty</div>
                                <div className="answers-desc">Get 30 days warranty in all our services.</div>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1057051544/vector/isometric-businessman-hand-holding-smartphone-with-female-call-center-icon.jpg?s=612x612&w=0&k=20&c=MIAhCq9ArsfBLgeUEkwzb7DIQpoygg_NTTgSETqXc9A=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <div className="answers-title">Professional Support</div>
                                <div className="answers-desc">Skilled support tailored to your requirements.</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="why-sahayata-right">
                    <Image className='why-sahayata-cover' src="https://media.istockphoto.com/id/1588085993/photo/young-woman-painting-furniture.jpg?s=612x612&w=0&k=20&c=cRDWUbEN10hO-6vJVDR5hYMuVMgnjgb1c6DtyNups7E=" width={425} height={650} alt="" />
                </div>
                
            </div>
        </main>
    )
}

export default Homepage
