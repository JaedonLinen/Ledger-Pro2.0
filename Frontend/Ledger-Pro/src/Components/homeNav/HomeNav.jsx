import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-black.png";
import './HomeNav.css'

function HomeNav() {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`home-navbar ${isOpen ? "open" : ""}`}>
        <Link to="/Home"><img src={myImage} alt="" className='home-nav-logo'/></Link>
        <div className={`home-nav-items ${isOpen ? "open" : ""}`}>
            <Link to="" className="home-nav-link">Accounts</Link>
            <Link to="/Users" className="home-nav-link">Users</Link>
            <Link to="" className="home-nav-link">Metrics</Link>
        </div>
        <div className={`home-nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="bar-home-nav"></div>
        </div>
    </div>
  )
}

export default HomeNav