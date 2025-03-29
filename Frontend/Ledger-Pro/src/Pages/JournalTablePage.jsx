import React from 'react'
import JournalTable from '../Components/journalTable/JournalTable.jsx'
import { useLocation } from "react-router-dom"
import HomeNav from '../Components/homeNav/HomeNav.jsx'

function JournalTablePage() {

  const location = useLocation();
  const { currentUser } = location.state;

  if (!currentUser){
    return <div className='error'>User not found...</div>;
  } 
  
  return (
    <div>
      <HomeNav currentUser={currentUser}/>
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Journals</h1></div>
      <JournalTable currentUser={currentUser}/>
    </div>
  )
}

export default JournalTablePage