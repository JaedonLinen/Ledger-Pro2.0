import React, { useState } from 'react'
import './NavbarLanding.css'
import { Link } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-black.png";


function NavbarLanding() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`navbar ${isOpen ? "open" : ""}`}>
        <img src={myImage} alt="" className='nav-logo'/>
        <div className={`nav-items ${isOpen ? "open" : ""}`}>
            <Link to="" className="nav-link">Login</Link>
            <Link to="" className="nav-link">About</Link>
            <Link to="" className="nav-link">Service</Link>
            <Link to="" className="nav-link">Contact</Link>
        </div>
        <div className={`nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="bar-nav"></div>
        </div>
    </div>
  )
}

export default NavbarLanding