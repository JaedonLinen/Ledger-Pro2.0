import React from 'react'
import Table from '../Components/userTable/Table.jsx'
import { Link } from 'react-router-dom'

function Users() {
  return (
    <div>
      <Link className="link" to="/Home">Home</Link>
      <Table />
    </div>
  )
}

export default Users