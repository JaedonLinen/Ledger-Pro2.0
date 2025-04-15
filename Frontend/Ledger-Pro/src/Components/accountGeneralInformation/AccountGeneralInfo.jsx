import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom";
import {  BiEdit, BiBookAdd } from "react-icons/bi";
import './AccountGeneralInfo.css'
import EditAccount from '../editAccountModal/EditAccount';
import EntriesTable from '../accountEntriesTable/AccountEntriesTable';
import EmailModal from '../emailModal/EmailModal';

function AccountGeneralInfo({id}) {

  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }


  const [account, setAccount] = useState({})

  useEffect(() => {
      fetchAccount()
  }, [])

  const fetchAccount = async () => {
      try {
          const response = await fetch(`https://render-flask-deployment-ivut.onrender.com/get_account/${id}`);
          const data = await response.json();
          setAccount(data.account)
      } catch (error) {
          console.error("Failed to fetch account:", error);
          setAccount({});  // Ensure users is always an array
      }
    };

  const formatCurrency = (num) => {
    if (typeof num !== "number" || isNaN(num)) {
      return "$0.00";  // Default fallback
    }
    num = num.toString(); // Ensure it's a string for processing
    
    let isNegative = num.toString().startsWith("-") ? true : false; // Check if the number is negative
    if (isNegative) num = num.slice(1); // Remove the negative sign for formatting

    let parts = num.split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

    // Limit to two decimal places
    if (parts.length > 1) {
        parts[1] = parts[1].slice(0, 2);
    }

    let formatted = `$${parts.join(".")}`;
    return isNegative ? `-${formatted}` : formatted; // Re-add negative sign if needed
  };

  const [OpenAccountModal, setOpenAccountModal] = useState(false)
  const [openEmailModal, setOpenEmailtModal] = useState(false)

  const onAccountUpdate = () => {
    setOpenAccountModal(false)
    fetchAccount()
  }

  const handleJournalNavigation = () => {
    navigate("/JournalEntry", {state: {currentUser} }) 
  }

  return (
    <div>
      { 
        OpenAccountModal &&
        <EditAccount 
          closeModal={() => setOpenAccountModal(false)}
          account={account}
          updateCallBack={onAccountUpdate}
        />
      }
      { 
        openEmailModal &&
        <EmailModal 
          closeModal={() => setOpenEmailtModal(false)}
        />
      }
      <div className="addUserModalOpen-btn-container" id="tooltip" onClick={() => setOpenEmailtModal(true)}>
          <button title="Send a email here" className="addUserModalOpen-btn" id="tooltiptext">
              Send Email
          </button>
      </div>
      <div className="general-info-container">
        <div className="info-section left">

          <div className="row-one-left">
            <div className="account-container name">
              <h3>Name:</h3>
              <p>{account.account_name}</p>
            </div>
            <div className="account-container num">
              <h3>Number:</h3>
              <p>{account.account_num}</p>
            </div>
          </div>



          <div className="row-two-left">
            <div className="account-container desc">
              <h3>Description:</h3>
              <p>{account.account_desc}</p>
            </div>
          </div>



          <div className="row-three-left">
            <div  className="account-container desc">
              <h3>Category:</h3>
              <p>{account.category}</p>
            </div>
            <div className="account-container desc">
              <h3>Subcategory:</h3>
              <p>{account.subcategory}</p>
            </div>
          </div>
          


        </div>
        <div className="info-section right">

          <div className="row-one-right">
            <div className="row-one-right-left">
              <div className="account-container id">
                <h3>Account ID: <span>{account.account_id}</span></h3>
              </div>
              <div className="account-container isActive">
                {
                  account.isActive ? (
                    <>
                      <div className="isActive-dot-container">
                        <div className="dot green"></div>
                        <div className="circle green"></div>
                      </div>
                      <h4>Active</h4>
                    </>
                  ) : (
                    <>
                    <div className="isActive-dot-container">
                      <div className="dot red"></div>
                      <div className="circle red"></div>
                    </div>
                    <h4>Inactive</h4>
                    </>      
                  )
                }
              </div>
              
            </div>
            <div className="row-one-right-right">
              <div className="account-container balance">
                <h3>Current Balance:</h3>
                <p>{formatCurrency(account.balance)}</p>
              </div>
              <div className="account-container ibalance">
                <h3>Initial Balance: <span>{formatCurrency(account.initial_balance)}</span></h3>
              </div> 
            </div>
            
          </div>



          <div className="row-two-right">
            <div className="account-container debit">
              <h3>Debit:</h3>
              <p>{formatCurrency(account.debit)}</p>
            </div>
            <div className="account-container credit">
              <h3>Credit:</h3>
              <p>{formatCurrency(account.credit)}</p>
            </div>
          </div>

          
          <div className="row-three-right">
            <div className="account-container side">
              <h3>Normal Side:</h3>
              <p>{account.normal_side}</p>
            </div>
            <div className="actions-div">
              {
                currentUser.role === "Admin" &&
                <>
                  <h3>Actions:</h3>
                  <div className="account-actions-container">
                    <div className="account-actions edit" ><BiEdit size={30} onClick={() => setOpenAccountModal(true)}/></div>
                    <div className="account-actions journal" ><BiBookAdd size={30} onClick={() => handleJournalNavigation()}/></div>
                  </div>
                </>
              }
            </div>
            
          </div>

        </div>
      </div>
     <EntriesTable id={id} currentUser={currentUser}/>
    </div>
  )
}

export default AccountGeneralInfo