import React from 'react'
import { BiX, BiLabel} from "react-icons/bi";
import './help.css'

export default function help({closeModal}) {
  return (
    <div className="modal-container" >
        <div className="modal-help">
            <div className="exit-btn-container">
                <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
            </div>
            <div className="help-info-container">
                <div className="help-title">
                    <h1>Help</h1>
                </div>
                <div className="nav">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Navigation Menu</h2>  
                    </div>
                    <h3>Logo</h3>
                    <p className="help-text">Click the logo to naviagate to Home page</p>
                    <h3>Accounts option</h3>
                    <p className="help-text">Click the 'Accounts' button to naviagate to accounts landing page where you will be prompted to either create or view account</p>
                    <h3>Users option</h3>
                    <p className="help-text">Click the 'Users' button to naviagate to accounts landing page where you will be prompted to either create or view account</p>
                    <h3>Events option (Admin Only)</h3>
                    <p className="help-text">Click the 'Events' button to naviagate to events page where you can view all events that have happened in database</p>
                    <h3>Statements option</h3>
                    <p className="help-text">Click the 'Metrics' button to naviagate to page to view overall Statements</p>
                </div>
                <div className="home">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Home Page</h2>  
                    </div>
                    <p className="help-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores facere amet error? Eveniet, veritatis totam eaque incidunt est, voluptas sequi nulla optio odio error ipsum dolorum nesciunt aliquid? Aperiam, reprehenderit.</p>
                </div>
                <div className="Accounts">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Accounts Landing Page (admin only)</h2>  
                    </div>
                    <h3>Left Panel</h3>
                    <p className="help-text">Click the left panel to naviagate to the create account form </p>
                    <h3>Right Panel</h3>
                    <p className="help-text">Click the right panel to naviagate to a table countaining a list of all of the accounts in the database.</p>
                </div>
                <div className="Create Accounts">
                <div className="section-title-help">
                    <BiLabel />
                    <h2 className="page">Create Accounts Page (admin only)</h2>  
                </div>

                <h3>Name</h3>
                <p className="help-text">Enter a unique and descriptive name for the account (e.g., "Cash", "Accounts Receivable").</p>

                <h3>Number</h3>
                <p className="help-text">Assign a unique account number based on your chart of accounts structure (e.g., 1001, 2001).</p>

                <h3>Description</h3>
                <p className="help-text">Provide a brief description of what this account is used for.</p>

                <h3>Normal Side</h3>
                <p className="help-text">Specify whether this account normally carries a debit or credit balance.</p>

                <h3>Category</h3>
                <p className="help-text">Select the primary category this account belongs to, such as Asset, Liability, Equity, Revenue, or Expense.</p>

                <h3>Sub-category</h3>
                <p className="help-text">Choose a more specific grouping under the main category (e.g., "Current Assets" under "Asset").</p>

                <h3>Initial Balance</h3>
                <p className="help-text">Enter the starting balance for this account if applicable. Leave at 0 if not needed.</p>

                <h3>Create Account Button</h3>
                <p className="help-text">Click to save and create the new account using the entered details.</p>
                
                </div>
                <div className="Accounts Table">
                    <div className="section-title-help">
                        <BiLabel />
                        <h2 className="page">Accounts Table Page</h2>  
                    </div>

                    <h3>Add Account Button (admin only)</h3>
                    <p className="help-text">Naviagates you to the create account page.</p>

                    <h3>Green input box</h3>
                    <p className="help-text">Type to filter accounts by name or number</p>

                    <h3>Filter Icon Button</h3>
                    <p className="help-text">Select to present filter options</p>

                    <h3>Filter Options</h3>
                    <p className="help-text">Select a filter option to present more filter options based on the filter option selected</p>

                    <h3>Reset Filter button</h3>
                    <p className="help-text">Select to reset filters</p>

                    <h3>Account Row</h3>
                    <p className="help-text">Select an account row in the table to view more information about that account</p>

                </div>
            </div>
        </div>
    </div>
  )
}
