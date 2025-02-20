import React from 'react'
import { Link } from 'react-router-dom'
import HomeNav from '../Components/homeNav/HomeNav'

function HomePage() {
  return (
    <>
      <HomeNav />
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Home</h1></div>
    </>
  )
}

export default HomePage