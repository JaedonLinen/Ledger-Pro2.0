import React from 'react'
import AddJournalEntry from '../Components/createJournalEntry/CreateJournalEntry.jsx'
import { useLocation } from "react-router-dom"
import HomeNav from '../Components/homeNav/HomeNav.jsx'

function JournalEntry() {

    const location = useLocation();
    const { currentUser } = location.state;
  
    if (!currentUser){
      return <div className='error'>User not found...</div>;
    } 

  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <AddJournalEntry />
    </div>
  )
}

export default JournalEntry