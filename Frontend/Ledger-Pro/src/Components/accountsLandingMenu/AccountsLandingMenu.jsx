import React from 'react'
import './AccountsLandingMenu.css'
import { useNavigate } from "react-router-dom";


function AccountsLandingMenu({currentUser}) {

    const navigate = useNavigate();

    const handleNavigateCreateAccounts = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };

    const handleNavigateViewAccounts = () => {
        navigate("/Accounts_List", {state: {currentUser} })  
    };

    return (
        <div>
            <div className="account-landing-options-container">
                <div className="account-option Create" onClick={handleNavigateCreateAccounts}>
                    <div className="option-text-container">
                        <p>Create Account</p>
                    </div>
                </div>
                <div className="account-option View" onClick={handleNavigateViewAccounts}>
                <div className="option-text-container">
                        <p>View Accounts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountsLandingMenu