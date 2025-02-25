import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav'
import { useLocation } from "react-router-dom";

function HomePage() {

  const location = useLocation();
  const { user } = location.state;

  if (!user){
    return <div>User not found...</div>;
  }

  return (
    <>
      <HomeNav currentUser={user}/>
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Home</h1></div>
    </>
  )
}

export default HomePage