import React from 'react'
import Wizard from '../Components/createAccountWizard/CreateAccountWizard'
import { useLocation } from "react-router-dom"
import HomeNav from '../Components/homeNav/HomeNav.jsx'

function CreateAccount() {
  
    const location = useLocation();
    const { currentUser } = location.state;
  
    if (!currentUser){
      return <div className='error'>User not found...</div>;
    }
  
    return (
      <div>
        <HomeNav currentUser={currentUser}/>
        <Wizard  userCurrent={currentUser}/>
      </div>
    )
}

export default CreateAccount

