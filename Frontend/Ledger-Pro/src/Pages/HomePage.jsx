import React from 'react'
import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <div>
      <Link className="link" to="/Users">Users</Link>
    </div>
  )
}

export default HomePage