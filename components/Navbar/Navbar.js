"use client"

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaChevronDown, FaUserCircle } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { signOut } from 'next-auth/react';
import "./Navbar.css";
import { getUserByEmail } from '@/utils/getUser';

const Navbar = ({ session }) => {
  const [searchItem, setSearchItem] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  }

  const handleBlur = () => {
    setShowSearch(true);
  };

  const handleFocus = () => {
    setShowSearch(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleSignOut = () => {
    signOut();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      fetch(`/api/user?email=${session.user.email}`)
        .then((response) => response.json())
        .then((data) => {
          if (data && !data.error) {
            setUser(data);
          }
        })
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [session]);

  // console.log(user);

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
            onChange={handleSearchChange}
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
        {session ? (
          <div className="nav-right-item user-info" ref={dropdownRef}>
            <div className="user-avatar" onClick={toggleDropdown}>
              {
                user?.avatar ?
                  // <Image src={user?.avatar} width={30} height={30} quality={100} unoptimized alt="User Avatar" className="avatar-image" />
                  <Image src={user?.avatar} width={30} height={30} alt="User Avatar" className="avatar-image" />
                  :
                  <div className="avatar-image-alt">
                    <FaUserCircle />
                  </div>
              }
              <span className="username">{session.user.name}</span>
              <div className={`arrow-icon ${dropdownOpen ? `dropdownOpen` : ``}`}>
                <FaChevronDown />
              </div>
            </div>
            {dropdownOpen && (
              <div className="dropdown-menu">
                <Link href='/profile' className="dropdown-item">Profile</Link>
                <Link href='/dashboard' className="dropdown-item">Dashboard</Link>
                <button className="dropdown-item logout-button" onClick={handleSignOut}>
                  <FaSignOutAlt />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href='/login' className="nav-right-item signin">Log In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
