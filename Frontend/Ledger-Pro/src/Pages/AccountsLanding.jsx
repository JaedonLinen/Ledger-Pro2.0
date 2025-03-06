import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import { useNavigate, useLocation } from "react-router-dom";

function AccountsLanding() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    const handleNavigateCreateAccounts = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };

    const handleNavigateViewAccounts = () => {
        navigate("/Accounts_List", {state: {currentUser} })  
    };

    return (
        <div>
            <HomeNav currentUser={currentUser}/>
            <button onClick={handleNavigateCreateAccounts}>Create Account</button>
            <button onClick={handleNavigateViewAccounts}>View Accounts</button>
        </div>
    )
}

export default AccountsLanding