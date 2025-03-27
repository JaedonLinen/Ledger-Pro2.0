import React from 'react'
import { useNavigate } from "react-router-dom";

function JournalLandingMenu({currentUser}) {
    const navigate = useNavigate();

    const handleNavigateCreateJournal = () => {
        navigate("/JournalEntry", {state: {currentUser} })  
    };

    const handleNavigateViewJournal = () => {
        navigate("/JournalTable", {state: {currentUser} })  
    };

    return (
        <div>
            <div className="account-landing-options-container">
                <div className="account-option Create" onClick={handleNavigateCreateJournal}>
                    <div className="option-text-container">
                        <p>Create Journal</p>
                    </div>
                </div>
                <div className="account-option View" onClick={handleNavigateViewJournal}>
                <div className="option-text-container">
                        <p>View Journal</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JournalLandingMenu