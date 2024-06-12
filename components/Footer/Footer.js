import React from 'react'
import Link from 'next/link'
import Image from 'next/image';
import { IoIosMail } from "react-icons/io";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaFacebookF, FaInstagram, FaTiktok, FaLinkedinIn, FaYoutube } from "react-icons/fa";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className='footer-wrapper'>
      <div className="footer-top">
        <div className="footer-top-left">
          <h4 className="footer-top-left-title footer-titles">More On Sahayata</h4>
          <ul className="more-on-sahayata footer-lists">
            <li className="more-on-item">About Us</li>
            <li className="more-on-item">Privacy Policy</li>
            <li className="more-on-item">Terms & Conditions</li>
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
            <div className="sahayta-details-icon"><FaPhoneVolume style={{ fontSize: "27px" }} /></div>
            <div className="sahayata-infos">
              <h5 className="sahayata-infos-title">Contact Number</h5>
              <p className="sahayata-infos-desc">9821253635</p>
            </div>
          </li>
          <li className="sahayata-details">
            <div className="sahayta-details-icon"><IoIosMail style={{ fontSize: "34px" }} /></div>
            <div className="sahayata-infos">
              <h5 className="sahayata-infos-title">Email Address</h5>
              <p className="sahayata-infos-desc">contact@sahayata.com</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="footer-separator"></div>
      <div className="footer-bottom">
        <div className="footer-bottom-upper">
          <Link href="/" className="footer-bottom-logo">
            <Image src="/transparent_logo.png" width={45} height={45} priority alt="Sahayata" />
            <div className="footer-bottom-logo-text">Sahayata</div>
          </Link>
          <div className="footer-bottom-text">Copyright &copy; www.sahayata.com - 2024 | All Right Reserved</div>
        </div>
        <ul className="footer-bottom-platforms">
          <li className="footer-platform-item"><FaFacebookF /></li>
          <li className="footer-platform-item"><FaInstagram /></li>
          <li className="footer-platform-item"><FaTiktok /></li>
          <li className="footer-platform-item"><FaLinkedinIn /></li>
          <li className="footer-platform-item"><FaYoutube /></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
