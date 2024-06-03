"use client"

import React from 'react'
import Link from 'next/link';
import logo from "./logo.png";
import { signOut, useSession } from "next-auth/react"
import "./Navbar.css"
const Navbar = () => {
  // const { data: session } = useSession();

  return (
    <nav className='navbar-wrapper'>
      <div className="nav-left">
        <Link href="/" className="logo">
          <img src={logo.src} alt="Sahayata" />
          {/* <div className="logo-text">Sahayata</div> */}
        </Link>
        <Link href='/about' className='aboutus'>About Us</Link>
      </div>
      <div className="nav-right">
        <input type='text' className="nav-right-item search" placeholder='search' />
        <Link href='/' className="nav-right-item joinus">Become a professional</Link>
        <Link href='/' className="nav-right-item joinus">Sign In</Link>
      </div>
    </nav>
  )
}

export default Navbar
