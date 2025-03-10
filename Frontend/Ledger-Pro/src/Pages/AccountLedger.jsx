import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import GeneralInformation from '../Components/accountGeneralInformation/AccountGeneralInfo.jsx'
import JournalTable from '../Components/journalTable/JournalTable.jsx'
import { useLocation } from "react-router-dom";

function AccountLedger() {
    const location = useLocation();
    const { currentUser, id } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    return (
        <div>
            <HomeNav currentUser={currentUser}/>
            <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">General Information</h1></div>
            <GeneralInformation id={id} />
            <JournalTable id={id}/>
        </div>
    )
}

export default AccountLedger