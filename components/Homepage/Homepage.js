"use client"
import React, { useState, useEffect } from 'react'
import Image from "next/image";
import Link from 'next/link';
import "./Homepage.css"
import data from "@/app/services.json"
import { FaChevronCircleRight, FaCaretRight, FaCaretLeft, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

const Homepage = () => {

    const [services, setServices] = useState([])
    const [currentIndex, setCurrentIndex] = useState(2)
    const [orders, setOrders] = useState([]);

    const slides = [
        {
            name: "Shom Prasad Kami",
            address: "Bharatpur-8, Chitwan",
            profileurl: "https://media.istockphoto.com/id/538652087/photo/thinking-businessman-photo.jpg?s=612x612&w=0&k=20&c=j8ibqkUk1t6bOHYcmz0RumlKxNWF1iEv9WeLP3QBid4=",
            comment: "My laptop works perfectly fine now after the repair by SMS technicians. Good communication, delivery on time, skillful technician, and reasonable price for the repair is what I found after getting the SMS service. Thank you guys for the wonderful work and keep it up. You guys are doing great.",
            date: "January 1, 2024"
        },
        {
            name: "Ramesh Parsai",
            address: "Bharatpur-16, Chitwan",
            profileurl: "https://media.istockphoto.com/id/1182247394/photo/model-smiling-in-front-of-black-backdrop.jpg?s=612x612&w=0&k=20&c=I8AB-e-0Jwt0knPRNi9NRHZokDWcgS7LY9OEpNYSLjA=",
            comment: "There was great communication in regards to what happened to my computer and what could be done. I was informed of everything before hand in regards to the price. My computer got fixed in a reasonable price. Would highly recommend for any electronic problems.",
            date: "October 25, 2022"
        },
        {
            name: "Apekshya Khatri",
            address: "Bharatpur-1, Chitwan",
            profileurl: "https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.jpg?s=612x612&w=0&k=20&c=AOylBL01joI0zphCAFr6YVrsOgp_jd2XtVUychLXYho=",
            comment: "This week I truly experienced the 'Sahayata' in Sahayata Marmat Sewa. I had my laptop served by them. Everything, from the possible servicing options I had to the pick/delivery of laptop and the servicing itself, was seamless. Thank you to the computer expert and the entire team.",
            date: "May 12, 2023"
        },
        {
            name: "Renu Dahal",
            address: "Bharatpur-10, Chitwan",
            profileurl: "https://media.istockphoto.com/id/1598311636/photo/thinking-face-and-a-black-woman-on-a-red-background-with-a-smile-for-fashion-style-or-ideas.jpg?s=612x612&w=0&k=20&c=gg73udkhjfIHhhh9mLiLPmxWl5_AGI0gviF17KHK9no=",
            comment: "Getting household repair work done is becoming very hard these days. I find Sahayata as a blessing to Chitwan. This young and energetic group of entrepreneurs react quickly to calls and perform quality work at a reasonable price. Kudos to you guys, keep up with the good work.",
            date: "August 4, 2022"
        },
        {
            name: "David Warner",
            address: "Bharatpur-5, Chitwan",
            profileurl: "https://media.istockphoto.com/id/1520181504/photo/thinking-serious-and-profile-of-asian-man-in-studio-isolated-on-a-blue-background-idea-side.jpg?s=612x612&w=0&k=20&c=9ALLR47PYSIMptsRAXAPAOUBcyTaMEZh6Q7tSw9GgE8=",
            comment: "I had our solar water heating system completely serviced by SMS and now it's running very smoothly. Can have hot water 2 floors down within minutes. It's made our winter very comfortable. Highly recommended!",
            date: "June 7, 2023",
        },
    ];

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

    const goToPrevious = () => {
        let currentTestimonial = (currentIndex - 1 + slides.length) % slides.length;
        console.log(currentTestimonial);
        setCurrentIndex(currentTestimonial);
    }

    const goToNext = () => {
        let currentTestimonial = (currentIndex + 1) % slides.length;
        console.log(currentTestimonial);
        setCurrentIndex(currentTestimonial);
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    }


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
                    <Image className='why-sahayata-cover' src="https://media.istockphoto.com/id/1481209153/photo/young-female-artist-painting-mural-in-the-attic.jpg?s=612x612&w=0&k=20&c=pnPK_G7TPAZ0zrxzEle5vHQ7qOk8NZmBjVqa60D3Jfg=" width={425} height={650} alt="" />
                </div>

            </div>

            <div className="homepage-separator"></div>

            <div className="testimonial-slider-wrapper">
                <h2 className="testimonial-section-title">Testimonials</h2>
                <div className="testimonial-slider">
                    <div className="testimonial-container" style={{ transform: `translateX(${(currentIndex - 1) * -30}%)` }}>
                        {slides.map((slide, slideIndex) => (
                            <div key={slideIndex} className={`testimonial-card-wrapper ${currentIndex === slideIndex ? 'slide-active' : ''}`}>
                                <div className="testimonial-card">
                                    <div className="testimonial-card-top">
                                        <Image className='testimonial-card-profile' src={slide.profileurl} width={70} height={70} alt="" />
                                        <div className="testimonial-card-infos">
                                            <h3 className="card-infos-name">{slide.name}</h3>
                                            <p className='card-infos-about'>{slide.address}</p>
                                        </div>
                                    </div>
                                    <div className="testimonial-card-bottom">
                                        <div className="testimonial-card-iconleft"><FaQuoteLeft /></div>
                                        <div className="testimonial-card-message">{slide.comment}</div>
                                        <div className="testimonial-card-iconright"><FaQuoteRight /></div>
                                    </div>
                                    <div className="testimonial-date">{slide.date && slide.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="left-arrow" onClick={goToPrevious}><FaCaretLeft /></div>
                    <div className="right-arrow" onClick={goToNext}><FaCaretRight /></div>
                </div>
                <div className="dots-container">
                    {slides.map((slide, slideIndex) => (
                        <div
                            key={slideIndex}
                            className={`dots-item ${currentIndex === slideIndex ? 'active' : ''}`}
                            onClick={() => goToSlide(slideIndex)}
                        >
                        </div>
                    ))}
                </div>
            </div>

            {/* <div className="homepage-separator"></div> */}

            <div className="homepage-totaldetails-section">
                <div className="homepage-totaldetails-infos">
                    <p className="totaldetails-counting">20000+</p>
                    <h3 className="totaldetails-title">Bookings</h3>
                </div>

                <div className="totaldetails-separator"></div>

                <div className="homepage-totaldetails-infos">
                    <p className="totaldetails-counting">200+</p>
                    <h3 className="totaldetails-title">Verified Experts</h3>
                </div>

                <div className="totaldetails-separator"></div>

                <div className="homepage-totaldetails-infos">
                    <p className="totaldetails-counting">50+</p>
                    <h3 className="totaldetails-title">Services</h3>
                </div>
            </div>
        </main >
    )
}

export default Homepage
