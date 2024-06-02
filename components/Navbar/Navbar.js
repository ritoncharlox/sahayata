import React from 'react'
import Link from 'next/link';
import logo from "./logo.png";
import "./Navbar.css"
const Navbar = () => {


  return (
    <nav className='navbar-wrapper'>
      <div className="navbar-left">
        <div className="navbar-logo">
          <img src={logo.src} alt="sayhayata" />
          <div className="home-page navbar-pages">Sahayata</div>
        </div>
        <div className="aboutus-page navbar-pages">About Us</div>
      </div>
      <div className="navbar-right">
        <div className="navbar-searchbar">
          <input type="search" name="search" id="search" placeholder='Search website'/>
        </div>
        <div className="navbar-joinus"><span className='joinus-content'>Become a Professional</span></div>
      </div>
    </nav>
  )
}

export default Navbar
