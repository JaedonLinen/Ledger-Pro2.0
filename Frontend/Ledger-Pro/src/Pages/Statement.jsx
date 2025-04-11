import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import StatementDoc from '../Components/statement/StatementDoc'
import { useLocation } from "react-router-dom";

function Statement() {

    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

  return (
    <div>
        <HomeNav currentUser={currentUser}/>
        <StatementDoc />
    </div>
  )
}

export default Statement