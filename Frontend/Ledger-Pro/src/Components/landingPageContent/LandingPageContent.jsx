import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import './landingPageContent.css'

function LandingPageContent() {

  const [aboutIsVisible, setAboutIsVisible] = useState(false);
  const [contactIsVisible, setContactIsVisible] = useState(false);
  const [servicesIsVisible, setServicestIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".landing-con.about");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setAboutIsVisible(true);  // Fade in when in view
        } else {
          setAboutIsVisible(false); // Fade out when out of view
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".landing-con.services");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * .8 && rect.bottom > 0) {
          setContactIsVisible(true);  // Fade in when in view
        } else {
          setContactIsVisible(false); // Fade out when out of view
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector(".landing-con.contact");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
          setServicestIsVisible(true);  // Fade in when in view
        } else {
          setServicestIsVisible(false); // Fade out when out of view
        }
      }
    };
  
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check on initial render
  
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="all-landing">
      <div>
        <div className="blob-outer-container">
          <div className="blob-inner-container">
            <div className="blob">
            </div>
          </div>
        </div>
        <div className="landing-con">
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

        <div className={`landing-con about ${aboutIsVisible ? "fade-in" : ""}`}>
          <div className="landing-text">
            <p className="motto about">About us</p>
            <h1 className="name about">Welcome to LedgerPro, the next-generation accounting software designed specifically for educational institutions. Developed as part of a student-driven initiative at Kennesaw State University, our goal is to simplify financial management for schools, ensuring accuracy, efficiency, and ease of use.</h1>
            <h1 className="name about">Our software provides a seamless platform for tracking expenses, managing budgets, and generating financial reports—all tailored to meet the needs of academic institutions. Whether you're an administrator handling school finances or a faculty member tracking department expenditures, LedgerPro makes accounting effortless.</h1>
            <h1 className="name about">Join us in transforming the way schools manage their finances—one transaction at a time.</h1>
          </div>
        </div>

        <div className={`landing-con services ${contactIsVisible ? "fade-in" : ""}`}>
         
        </div>
        
        <div className={`landing-con contact ${servicesIsVisible ? "fade-in" : ""}`}>
          
        </div>
      </div>
  </div>
  )
}

export default LandingPageContent