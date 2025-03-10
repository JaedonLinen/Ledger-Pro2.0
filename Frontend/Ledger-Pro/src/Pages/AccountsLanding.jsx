import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import Content from '../Components/accountsLandingMenu/AccountsLandingMenu'
import { useLocation } from "react-router-dom";

function AccountsLanding() {
    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    return (
        <div>
            <HomeNav currentUser={currentUser}/>
            <Content currentUser={currentUser}/>
        </div>
    )
}

export default AccountsLanding