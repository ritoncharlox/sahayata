"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube, FaMailBulk } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

import "./Footer.css";

const Footer = () => {

  const pathname = usePathname();
  const pathClass = pathname.replace('/', '') || 'home';

  return (
    <footer className={`footer-wrapper ${pathClass}`}>
      <div className="footer-top">
        <div className="footer-top-left">
          <h4 className="footer-top-left-title footer-titles">More On Sahayata</h4>
          <ul className="more-on-sahayata footer-lists">
            <Link href={"/about-us"}><li className="more-on-item">About Us</li></Link>
            <Link href={"/privacy-policy"}><li className="more-on-item">Privacy Policy</li></Link>
            <Link href={"/terms-and-conditions"}><li className="more-on-item">Terms & Conditions</li></Link>
          </ul>
        </div>
        <div className="footer-top-middle">
          <h4 className="footer-top-mid-title footer-titles">Locations</h4>
          <ul className="sahayata-locations footer-lists">
            <li className="more-on-item">Chitwan</li>
          </ul>
        </div>
        <ul className="footer-top-right">
          <li className="sahayata-details">
            <div className="sahayta-details-icon"><FaPhoneVolume /></div>
            <div className="sahayata-infos">
              <h5 className="sahayata-infos-title">Contact Number</h5>
              <p className="sahayata-infos-desc">9824184175 | 9869021750</p>
            </div>
          </li>
          <li className="sahayata-details">
            <div className="sahayta-details-icon"><FaMailBulk /></div>
            <div className="sahayata-infos">
              <h5 className="sahayata-infos-title">Email Address</h5>
              <Link href={"mailto: sahayata811@gmail.com"} className="sahayata-infos-desc">sahayata811@gmail.com</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="footer-separator"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-upper">
        <Link href="/" className="footer-bottom-logo">
          <Image src="/logo_white_bg.jpeg" width={45} height={45} priority alt="sahayata footer" />
          <div className="footer-bottom-logo-text">Sahayata</div>
        </Link>
          <div className="footer-bottom-text">Copyright &copy; | www.sahayata.com - 2024 | All Right Reserved</div>
        </div>
        <ul className="footer-bottom-platforms">
          <Link href={"https://www.facebook.com/profile.php?id=61558157289786"} target='_blank'><li className="footer-platform-item"><FaFacebookF /></li></Link>
          <Link href={"https://www.instagram.com/sahayata811"} target='_blank'><li className="footer-platform-item"><FaInstagram /></li></Link>
          {/* <Link href={"/"} target='_blank'><li className="footer-platform-item"><FaTiktok /></li></Link> */}
          {/* <Link href={"https://www.linkedin.com/in/sudeep-lamichhane-a22613271"} target='_blank'><li className="footer-platform-item"><FaLinkedinIn /></li></Link> */}
          {/* <Link href={"https://www.youtube.com/@sunnyleone"} target='_blank'><li className="footer-platform-item"><FaYoutube /></li></Link> */}
        </ul>
      </div>
    </footer>
  )
}

export default Footer
