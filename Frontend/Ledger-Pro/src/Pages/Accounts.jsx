import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import AccountTable from '../Components/accountsTable/AccountsTable.jsx'
import { useLocation } from "react-router-dom";

function Accounts() {
    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    return (
        <div>
            <HomeNav currentUser={currentUser}/>
            <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Accounts</h1></div>
            <AccountTable />
        </div>
    )
}

export default Accounts