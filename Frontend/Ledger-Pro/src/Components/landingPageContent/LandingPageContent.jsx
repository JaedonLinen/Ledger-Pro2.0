import React from 'react'
import { Link } from 'react-router-dom'
import './landingPageContent.css'

function LandingPageContent() {
  return (
    <>
      <div className="all-landing">
        <div className="blob-outer-container">
          <div className="blob-inner-container">
            <div className="blob">
            </div>
          </div>
        </div>
        <div className="landing-text">
          <h1 className="name">LedgerPro</h1>
          <p className="motto">Track. Manage. Grow</p>
          <p className="hook">Simplify your finances with real-time tracking and effortless management.</p>  
          <div className="landing-buttons">
            <Link className="link" to="/authentications"><button className="signIn">Sign In</button></Link>
            <Link className="link" to="/authentications"><button className="signUp">Sign Up</button></Link>
          </div>   
        </div>
      </div>
  </>
  )
}

export default LandingPageContent