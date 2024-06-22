"use client"

import React, { useState, useRef } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import "./Navbar.css"
import { FaSearch } from "react-icons/fa";
const Navbar = () => {
  // const { data: session } = useSession();

  const [searchItem, setSearchItem] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const inputRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  }
  const handleBlur = () => {
    setShowSearch(true);
  };

  const handleFocus = () => {
    setShowSearch(false);
  };

  return (
    <nav className='navbar-wrapper'>
      <div className="nav-left">
        <Link href="/" className="logo">
          <Image src="/logo.png" width={50} height={50} priority alt="Sahayata" />
          <div className="logo-text">Sahayata</div>
        </Link>
        <div className="nav-left-item search" onClick={() => inputRef.current.focus()}>
          <div className="search-icon" style={{ animation: showSearch ? "slideIn .4s forwards" : "slideOut .4s forwards" }}><FaSearch /></div>
          <input
            ref={inputRef}
            type='text'
            onChange={(e) => { handleSearchChange(e); }}
            value={searchItem}
            placeholder='search services'
            onBlur={handleBlur}
            onFocus={handleFocus}
            style={{ animation: showSearch ? "slideInput .4s forwards" : "slideOutput .4s forwards" }}
          />
        </div>

      </div>
      <div className="nav-right">
        <Link href='/about-us' className='aboutus'>About Us</Link>
        <Link href='/' className="nav-right-item joinus">Become a professional</Link>
        <Link href='/login' className="nav-right-item signin">Log In</Link>
      </div>
    </nav>
  )
}

export default Navbar
