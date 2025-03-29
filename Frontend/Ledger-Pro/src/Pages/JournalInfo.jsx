import React from 'react'
import { useLocation } from "react-router-dom"
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import JournalInfoDetails from '../Components/journalInfo/JournalInfoDetails.jsx';
import JournalEnties from '../Components/journalEntriesTable/JournalEntriesTable.jsx';


function JournalInfo() {

    const location = useLocation();
    const { currentUser, transaction_id } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    } 

  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Journal Details</h1></div>
        <JournalInfoDetails transaction_id={transaction_id} currentUser={currentUser} />
        <JournalEnties id={transaction_id} />
    </div>
  )
}

export default JournalInfo