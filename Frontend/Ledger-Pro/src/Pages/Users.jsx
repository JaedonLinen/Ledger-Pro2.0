import React from 'react'
import Table from '../Components/userTable/Table.jsx'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import { useLocation } from "react-router-dom";


function Users() {

  const location = useLocation();
  const { currentUser } = location.state;

  if (!currentUser){
    return <div className='error'>User not found...</div>;
  }

  return (
    <div>
      <HomeNav currentUser={currentUser}/>
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Users</h1></div>
      <Table  userCurrent={currentUser}/>
    </div>
  )
}

export default Users