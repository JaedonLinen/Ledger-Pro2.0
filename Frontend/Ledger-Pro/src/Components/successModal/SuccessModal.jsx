import React from 'react'
import './SuccessModal.css'
import { BiCheckCircle } from "react-icons/bi";
import { useNavigate } from 'react-router-dom'

function SuccessModal({page, currentUser}) {

    const navigate = useNavigate(); 

    const handleGreenButton = () => {
        if (page == "journal"){
            navigate("/JournalEntry", {state: {currentUser} })
            window.location.reload();
        }
        else if (page == "account"){
            navigate("/CreateAccount", {state: {currentUser} })
            window.location.reload();
        }
    }

    const handleRedButton = () => {
        if (page == "journal"){
            navigate("/JournalLanding", {state: { currentUser } })  
        }
        else if (page == "account"){
            navigate("/Accounts_Landing", {state: { currentUser } })
        }
    }

  return (
    <div className="modal-container" >
        <div className="modal">
            <div className="confirmation-text s">
                <BiCheckCircle size={50} className='success-icon'/>
                <h1>Action Successful</h1>
            </div>
            <div className="btn-options-container">
                <button className="btn-options" onClick={handleGreenButton}>Create another</button>
                <button className="btn-options" onClick={handleRedButton} id='no-btn'>Back to Menu</button>
            </div>
        </div>
    </div>
  )
}

export default SuccessModal