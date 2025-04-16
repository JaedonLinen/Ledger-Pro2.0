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
    const [logoutOpen, setLogoutOpen] = useState(false)
    const navigate = useNavigate(); 
    const id = currentUser.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const url = `https://render-flask-deployment-ivut.onrender.com/logout/${id}`
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    
        const response = await fetch (url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else {
            handleNavigateSignOut()
        }
      }

    const handleNavigateUsers = () => {
        navigate("/Users", { state: { currentUser } });
    };

    const handleNavigateHome = () => {
        navigate("/Home", {state: {user: currentUser} })  
    };

    const handleNavigateAccounts = () => {
        if(currentUser.role === "Admin") {
            navigate("/Accounts_Landing", {state: { currentUser } })
        } else {
            navigate("/Accounts_List", {state: {currentUser} })  
        }  
    };

    const handleEventLog = () => {
        navigate("/events", {state: { currentUser } })  
    };

    const handleJournal = () => {
        navigate("/JournalLanding", {state: { currentUser } })  
    };

    const handleNavigateSignOut = () => {
        currentUser = null
        navigate("/authentications")  
    };

    const handleNavigateStatements = () => {
        navigate("/Statements_menu", { state: { currentUser } });
    };


  return (
    <div>
        <div className={`home-navbar ${isOpen ? "open" : ""}`}>
            <div className="logo-and-help" id="tooltip">
                <BiHelpCircle className="help" size={20} onClick={() => setModalOpen(true)} id="tooltiptext" title='Help'/>
                <img src={myImage} alt="" className='home-nav-logo' onClick={handleNavigateHome}/>
            </div>
            <div className={`home-nav-items ${isOpen ? "open" : ""}`}>
                { isOpen &&
                    <div onClick={handleSubmit} className="home-nav-link lo"><p className='home-nav-link-txt'>Sign Out</p></div>
                }
                <div onClick={handleNavigateAccounts} className="home-nav-link"><p className='home-nav-link-txt'>Accounts</p></div>
                <div onClick={handleNavigateUsers} className="home-nav-link"><p className='home-nav-link-txt'>Users</p></div>
                <div onClick={handleNavigateStatements} className="home-nav-link"><p className='home-nav-link-txt'>Statements</p></div>
                <div onClick={handleJournal} className="home-nav-link"><p className='home-nav-link-txt'>Journals</p></div>
                { currentUser.role == "Admin" &&
                    <div onClick={handleEventLog} className="home-nav-link"><p className='home-nav-link-txt'>Events</p></div>
                }
                <div className="profile-container" onClick={() => setLogoutOpen(!logoutOpen)}>
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
        {logoutOpen &&
            <div className="sign-out-dropdown-container">
                <div onClick={handleSubmit} className="sign-out-dropdown lo">
                    <p className='home-nav-link-txt'>Sign Out</p>
                </div>
            </div>
        }
    </div>
  )
}

export default HomeNav