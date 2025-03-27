import React from 'react'
import { useLocation } from "react-router-dom"
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import JournalLandingContent from '../Components/journalLandingMenu/JournalLandingMenu.jsx';

function JournalLanding() {

    const location = useLocation();
    const { currentUser, id } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    } 

  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <JournalLandingContent currentUser={currentUser}/>
    </div>
  )
}

export default JournalLanding