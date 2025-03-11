import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-black.png";
import ppImage from "/src/assets/base-pp.png";
import Help from "../helpModal/Help.jsx";
import { BiHelpCircle } from "react-icons/bi";
import './HomeNav.css'


function HomeNav({currentUser}) {

    const [isOpen, setIsOpen] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    const navigate = useNavigate(); 

    const handleNavigateUsers = () => {
        navigate("/Users", { state: { currentUser } });
    };

    const handleNavigateHome = () => {
        navigate("/Home", {state: {user: currentUser} })  
    };

    const handleNavigateAccounts = () => {
        navigate("/Accounts_Landing", {state: { currentUser } })  
    };

    const handleEventLog = () => {
        navigate("/events", {state: { currentUser } })  
    };

    const handleNavigateSignOut = () => {
        currentUser = null
        navigate("/authentications")  
    };

  return (
    <div className={`home-navbar ${isOpen ? "open" : ""}`}>
        <div className="logo-and-help" id="tooltip">
            <BiHelpCircle className="help" size={20} onClick={() => setModalOpen(true)} id="tooltiptext" title='Help'/>
            <img src={myImage} alt="" className='home-nav-logo' onClick={handleNavigateHome}/>
        </div>
        <div className={`home-nav-items ${isOpen ? "open" : ""}`}>
            <div onClick={handleNavigateAccounts} className="home-nav-link"><p className='home-nav-link-txt'>Accounts</p></div>
            <div onClick={handleNavigateUsers} className="home-nav-link"><p className='home-nav-link-txt'>Users</p></div>
            <div onClick={handleEventLog} className="home-nav-link"><p className='home-nav-link-txt'>Events</p></div>
            <div className="home-nav-link"><p className='home-nav-link-txt'>Metrics</p></div>
            <div className="profile-container" onClick={handleNavigateSignOut}>
                <div className="home-nav-link">
                    <img src={ppImage} alt="" />
                </div>
                <div className="home-nav-link">
                    <p className='home-nav-username'>{currentUser.username}</p>
                </div>
            </div>
        </div>
        <div className={`home-nav-toggle ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
            <div className="bar-home-nav"></div>
        </div>
        {
            modalOpen &&
            <div className="help-icon">
                <Help closeModal={() => {setModalOpen(false)}}/>
            </div>
        }
    </div>
  )
}

export default HomeNav