import React from 'react'
import './AccountGeneralInfo.css'

function AccountGeneralInfo({id}) {
  return (
    <div>
      <div className="general-info-container">
        <div className="info-section left">
          <div className="account-container id">
            <h5>Account ID:</h5>
            <h6>{id}</h6>
          </div>
          <div className="account-container name">
            <h3>Name:</h3>
            <h1>{id}</h1>
          </div>
          <div className="account-container num">
            <h3>Number:</h3>
            <h1>{id}</h1>
          </div>
          <div className="account-container desc">
            <h3>Description:</h3>
            <h2>{id}</h2>
          </div>
        </div>
        <div className="info-section right">
          <div className="account-container balance">
            <h3>Balance:</h3>
            <h1>{id}</h1>
          </div>
          <div className="account-container credit">
            <h3>Credit:</h3>
            <h1>{id}</h1>
          </div>
          <div className="account-container debit">
            <h3>Debit:</h3>
            <h1>{id}</h1>
          </div>
          <div className="account-container ibalance">
            <h3>Inital Balance:</h3>
            <h2>{id}</h2>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountGeneralInfo