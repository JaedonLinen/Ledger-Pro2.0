import React from 'react'
import { useLocation } from "react-router-dom"

function CreateJournalEntry() {

    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    } 

  return (
    <div>CreateJournalEntry</div>
  )
}

export default CreateJournalEntry