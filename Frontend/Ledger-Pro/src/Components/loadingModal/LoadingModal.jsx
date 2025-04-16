import React from 'react'
import myImage from "/src/assets/LP-logo-black.png";
import './LoadingModal.css'

function LoadingModal() {
  return (
    <div className="modal-container loading" >
        <span class="loader"></span>
    </div>
  )
}

export default LoadingModal