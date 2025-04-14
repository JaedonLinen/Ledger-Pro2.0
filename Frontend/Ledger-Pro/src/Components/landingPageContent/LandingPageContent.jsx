import React from 'react'
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { BiPhone, BiMailSend, BiLogoLinkedin } from "react-icons/bi";
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
          <div className="about-text">
            <div className="about-title">
              <p>About us</p>
            </div>
            <h1 className="name about">Welcome to LedgerPro, the next-generation accounting software designed specifically for educational institutions. Developed as part of a student-driven initiative at Kennesaw State University, our goal is to simplify financial management for schools, ensuring accuracy, efficiency, and ease of use.</h1>
            <h1 className="name about">Our software provides a seamless platform for tracking expenses, managing budgets, and generating financial reports—all tailored to meet the needs of academic institutions. Whether you're an administrator handling school finances or a faculty member tracking department expenditures, LedgerPro makes accounting effortless.</h1>
            <h1 className="name about">Join us in transforming the way schools manage their finances—one transaction at a time.</h1>
          </div>
        </div>

        <div className={`landing-con services ${contactIsVisible ? "fade-in" : ""}`}>
          <div className="service-title">
            <p>Services</p>
          </div>
          <div className="services-container">
            <div className="service-item">
              <h3>Real-time Metrics</h3>
              <p>Stay on top of your finances with a live, interactive dashboard. Track your income, expenses, and cash flow in real-time so you always know where your business stands</p>
              <p>Get a clear, up-to-the-minute view of your business's financial health. Our intuitive dashboard aggregates data from all your accounts, providing visual insights into cash flow, profit trends, and key performance metrics. Make smarter decisions faster with interactive graphs, filters by time period, and customizable widgets tailored to your needs.</p>
            </div>
            <div className="service-item">
              <h3>Automated Bookkeeping</h3>
              <p>No more manual data entry. Our smart bookkeeping engine categorizes transactions, reconciles accounts, and keeps your general ledger accurate and audit-ready.</p>
              <p>Eliminate manual entry and reduce human error with our automated bookkeeping system. Transactions are imported directly from your bank, categorized with machine learning, and automatically assigned to the correct accounts. From daily expense tracking to end-of-month closing, we streamline the process so you can focus on growing your business, not crunching numbers.</p>
            </div>
            <div className="service-item">
              <h3>Financial Statements</h3>
              <p>Generate essential reports like income statements, balance sheets, and trial balances with one click. Customize date ranges, export to PDF, and impress stakeholders or tax professionals.</p>
              <p>Generate detailed financial reports with just a few clicks. Whether you need a balance sheet for a board meeting, an income statement for investors, or a trial balance for your accountant, our platform makes it easy. Reports are customizable, exportable in multiple formats, and always up-to-date with your latest data.</p>
            </div>
          </div>
        </div>
        
        <div className={`landing-con contact ${servicesIsVisible ? "fade-in" : ""}`}>
          <div className="landing-text contact">
            <p className="motto contact">Contact us</p>
            <div className="media-container">
              <div className="contact-panel left">
                <div className="media-and-title">
                  <div className="media">
                    <BiMailSend size={20}/>
                  </div>
                  <p>Link to Mail</p>
                </div>
                <div className="media-and-title">
                  <div className="media">
                    <BiPhone size={20}/>
                  </div>
                  <p>Link to phone</p>
                </div>
                <div className="media-and-title">
                  <div className="media">
                    <BiLogoLinkedin size={20}/>
                  </div>
                  <p onClick={() => window.open("https://www.linkedin.com/in/jaedon-linen-77581a24a/", "_blank")} >Link to linked in</p>
                </div>
              </div>

              <div className="contact-panel left">
                <p className='contact-disc-title'>Disclaimer</p>
                <p className='contact-disc-text'>This application is intended for demonstration and educational purposes only. It is not designed for real-world financial, accounting, or business use. All data presented is fictional or user-generated, and should not be relied upon for actual financial decision-making. Use at your own risk.</p>
              </div>
            
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default LandingPageContent