import React from 'react'
import HomeNav from '../Components/homeNav/HomeNav'
import { useLocation } from "react-router-dom";
import HomePageDash from '../Components/homePageDash/homePageDash'

function HomePage() {

  const location = useLocation();
  const { user } = location.state;

  if (!user){
    return <div className='error'>User not found...</div>;
  }

  return (
    <>
      <HomeNav currentUser={user}/>
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Home</h1></div>
      <HomePageDash currentUser={user}/>
    </>
  )
}

export default HomePage