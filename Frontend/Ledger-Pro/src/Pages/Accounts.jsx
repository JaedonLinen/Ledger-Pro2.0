import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import { useNavigate, useLocation } from "react-router-dom";

function Accounts() {
    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    const handleNavigateCreateAccounts = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };

    return (
        <div>
            <HomeNav currentUser={currentUser}/>
            <button onClick={handleNavigateCreateAccounts}>Create Account</button>
        </div>
    )
}

export default Accounts