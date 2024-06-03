import React from 'react'
import Link from 'next/link';
import logo from "./logo.png";
import "./Navbar.css"
const Navbar = () => {


  return (
    <nav className='navbar-wrapper'>
      <div className="nav-left">
        <Link href="/" html className="logo">
          <img src={logo.src} alt="Sahayata" />
          {/* <div className="logo-text">Sahayata</div> */}
        </Link>
        <Link href='/about' className='aboutus'>About Us</Link>
      </div>
      <div className="nav-right">
        <input type='text' className="nav-right-item search" placeholder='search' />
        <Link href={'/'} className="nav-right-item joinus">Become a professional</Link>
        <Link href={'/'} className="nav-right-item joinus">Sign In</Link>
      </div>
    </nav>
  )
}

export default Navbar
