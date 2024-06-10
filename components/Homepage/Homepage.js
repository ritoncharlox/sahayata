"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import "./Homepage.css"
import data from "@/app/services.json"
import { v4 as uuidv4 } from 'uuid';

const Homepage = () => {

    const [services, setServices] = useState([])

    useEffect(() => {
        const getdata = () => {
            let newdata = [...data];
            for (let i = 0; i < newdata.length; i++) {
                let service = newdata[i];
                service.id = uuidv4();
            }
            setServices(newdata);
        }

        return () => {
            getdata();
        }
    }, [])


    return (
        <main className="homepage-first">
            <Image className="homepage-coverpic" width={1000} height={350} src="https://i0.wp.com/cmgtoronto.com/wp-content/uploads/2017/03/Repairs.jpg?resize=1210%2C423&ssl=1" priority alt="sahayata cover" />
            <div className="homepage-slogan">
                <h1 className="homepage-slogan-title">Expert Home Fixes - Trusted Solutions</h1>
                <p className="homepage-slogan-desc">Professional home repairs you can trust, delivering expert solutions for all your household needs.</p>
            </div>

            <div className="services-section">
                <h2 className="services-section-title">Our Services</h2>
                <ul className="services-lists">
                    {
                        services.map((service, index) => {
                            return (
                                <Link rel='preload' key={service.id} href={`/services/${service.title}`}>
                                    <li className="services-listitems">
                                        <div className="service-icon">
                                            <Image className='service-icon-image' src={service.icon} width={50} height={50} priority alt={service.title} />
                                        </div>
                                        <h4 className="service-title">{service.title}</h4>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
            </div>

            <div className="homepage-separator"></div>

            <div className="why-sahayata-section">
                <div className="why-sahayata-left">
                    <h2 className="why-sahayata-title">Why Sahayata ?</h2>
                    <ul className="why-sahayata-answers">
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1361283850/vector/businessman-holding-a-weighing-scale-with-a-bag-of-money-and-a-watch-balance-of-time-and.jpg?s=612x612&w=0&k=20&c=u5knG0iTdTjqx_3NPAsd5ciADT5mdoPZQ_vvMxuIR-M=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <h3 className="answers-title">Transparent Pricing</h3>
                                <p className="answers-desc">Honest pricing promotes clarity and trustworthiness.</p>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1133747810/vector/profile-with-checkmark-on-smartphone-vector-flat-mobile-phone-user-account-accepted-approved.jpg?s=612x612&w=0&k=20&c=lSb6ZcUwc6KJe93z4zMQEAoU_TjXH9kiKHhCxlQu-i4=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <h3 className="answers-title">Verified Experts</h3>
                                <p className="answers-desc">Trained experts with 5+ years of experiences.</p>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1452344070/vector/house-insurance.jpg?s=612x612&w=0&k=20&c=XYZlxXJxngaD2PLeAIi2imJxwfW9TSU3YPGWHUYHxCw=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <h3 className="answers-title">Service Warranty</h3>
                                <p className="answers-desc">Get 30 days warranty in all our services.</p>
                            </div>
                        </li>
                        <li className="why-answers">
                            <div className="answers-icon">
                                <Image className='answer-icon-image' src="https://media.istockphoto.com/id/1057051544/vector/isometric-businessman-hand-holding-smartphone-with-female-call-center-icon.jpg?s=612x612&w=0&k=20&c=MIAhCq9ArsfBLgeUEkwzb7DIQpoygg_NTTgSETqXc9A=" width={80} height={80} alt="" />
                            </div>
                            <div className="answers-info">
                                <h3 className="answers-title">Professional Support</h3>
                                <p className="answers-desc">Skilled support tailored to your requirements.</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="why-sahayata-right">
                    <Image className='why-sahayata-cover' src="https://media.istockphoto.com/id/1588085993/photo/young-woman-painting-furniture.jpg?s=612x612&w=0&k=20&c=cRDWUbEN10hO-6vJVDR5hYMuVMgnjgb1c6DtyNups7E=" width={425} height={650} alt="" />
                </div>

            </div>

            <div className="homepage-separator"></div>


        </main >
    )
}

export default Homepage
