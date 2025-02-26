import React from 'react'
import './ForgotPasswordModal.css'
import myImage from "/src/assets/LP-logo-white.png";

function ForgotPasswordModal() {
  return (
    <div className="forgot-password-body">
        <div className="forgot-password-container">
            <img src={myImage} alt="" />
            <div className="FP-text-container">
                <h1>Forgot Password?</h1>
                <p>Please enter your email below</p>
            </div>
            <div className="FP-input-container">
                <input type="text" placeholder='Email' />
            </div>
            <div className="FP-btn-container">
                <button className='FP-btn'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default ForgotPasswordModal