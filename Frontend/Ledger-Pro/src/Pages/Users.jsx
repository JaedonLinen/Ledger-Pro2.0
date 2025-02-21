import React from 'react'
import Table from '../Components/userTable/Table.jsx'
import { Link } from 'react-router-dom'
import HomeNav from '../Components/homeNav/HomeNav.jsx'
import Modal from '../Components/addUserModal/Modal.jsx'


function Users() {
  return (
    <div>
      <HomeNav />
      <Modal />
      <div className="breadcrumb-text-container"><h1 className="breadcrumb-text">Users</h1></div>
      <Table />
    </div>
  )
}

export default Users