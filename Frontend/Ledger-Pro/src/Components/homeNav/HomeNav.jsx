import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import myImage from "/src/assets/LP-logo-black.png";
import ppImage from "/src/assets/base-pp.png";
import './HomeNav.css'

function HomeNav({currentUser}) {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); 

    const handleNavigateUsers = () => {
        navigate("/Users", { state: { currentUser } });
    };

    const handleNavigateHome = () => {
        navigate("/Home", {state: {user: currentUser} })  
    };

    const handleNavigateAccounts = () => {
        navigate("/Accounts", {state: { currentUser } })  
    };

    const handleNavigateSignOut = () => {
        currentUser = null
        navigate("/authentications")  
    };

  return (
    <div className={`home-navbar ${isOpen ? "open" : ""}`}>
        <img src={myImage} alt="" className='home-nav-logo' onClick={handleNavigateHome}/>
        <div className={`home-nav-items ${isOpen ? "open" : ""}`}>
            <div onClick={handleNavigateAccounts} className="home-nav-link"><p className='home-nav-link-txt'>Accounts</p></div>
            <div onClick={handleNavigateUsers} className="home-nav-link"><p className='home-nav-link-txt'>Users</p></div>
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
    </div>
  )
}

export default HomeNav