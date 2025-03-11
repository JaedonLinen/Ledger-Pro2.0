import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import EventTable from '../Components/eventsTable/EventsTable.jsx'
import { useLocation } from "react-router-dom";

function EventsLog() {

    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }


  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Events</h1></div>
        <EventTable />
    </div>
  )
}

export default EventsLog