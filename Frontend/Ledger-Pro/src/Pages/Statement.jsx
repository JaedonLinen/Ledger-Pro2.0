import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import StatementDoc from '../Components/statement/StatementDoc'
import { useLocation } from "react-router-dom";

function Statement() {

    const location = useLocation();
    const { currentUser, option, dateStart, dateEnd } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <StatementDoc option={option} dateStart={dateStart} dateEnd={dateEnd}/>
    </div>
  )
}

export default Statement