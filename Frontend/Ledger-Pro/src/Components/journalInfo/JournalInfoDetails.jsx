import React, { useEffect, useState } from 'react'
import FileModal from '../filesTableModal/FilesTableModal'
import { BiFileBlank } from "react-icons/bi";
import './JournalInfoDetails.css'

function JournalInfoDetails({transaction_id, currentUser}) {

  const [openDocs, setOpenDocs] = useState(false)
  const [journal, setJournals] = useState([]);
  const [users, setUsers] = useState([])
  const [selectedReject, setSelectedReject] = useState(false)
  const [accecptedModal, setAccecptedModal] = useState(false)
  const [comment, setComment] = useState("")
  
  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:5000//get_transaction/${transaction_id}`);
          const data = await response.json();
          setJournals(data.transaction);
      } catch (error) {
          console.error("Failed to fetch transactions:", error);
          setJournals([]);  // Ensure users is always an array
      }
  };

  useEffect(() => {
    setJournalOwner(users.find(user => user.id === journal.user_id))
  }, [users])

  useEffect(() => {
    fetchUsers()
  }, [])

  const [journalOwner, setJournalOwner] = useState();
  
  const fetchUsers = async () => {
    try {
        const response = await fetch("http://127.0.0.1:5000/get_users");
        const data = await response.json();
        setUsers(data.allUsers);
    } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);  // Ensure users is always an array
    }
  };

  const formatDate = (dateData) => {
    const timestamp = Date.parse(dateData); // Convert to timestamp
    if (isNaN(timestamp)) {
        console.error("Invalid date:", dateData);
        return "Invalid Date";
    }
    const date = new Date(dateData); // Creates a Date object
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC"  // Force UTC to avoid local conversion
    }).format(date);
  };

  return (
    <div>
      { currentUser.role === "Admin" && journal.status === "Pending" &&
        <div className="status-options">
          <div className="status-option-bttn accept" onClick={() => setAccecptedModal(true)}>
            <p>Accept</p>
          </div>
          <div className="status-option-bttn reject" onClick={() => setSelectedReject(true)}>
            <p>Reject</p>
          </div>
        </div>
      }
      <div className="journal-information-con">
        <p className="journal-information-title">Created By: <span>{journalOwner?.firstName || ""} {journalOwner?.lastName || ""}</span></p>
        <p className="journal-information-title">Journal id: <span>{journal.transaction_id}</span></p>
        <p className="journal-information-title">Description: <span>{journal.description}</span></p>
        <p className="journal-information-title">Journal Date: <span>{journal?.transaction_date ? formatDate(journal.transaction_date) : ""}</span></p>
        <p className="journal-information-title">Status: <span>{journal.status}</span></p>
        <div className="journal-meta-data-con">
            <p className="journal-meta-data-title">Date of Entry: {journal?.date_created ? formatDate(journal.date_created) : ""}</p>
            <p className="journal-meta-data-title">Last updated: {journal?.date_updated ? formatDate(journal.date_updated) : ""}</p>
            <div className='journal-meta-data-button' onClick={() => setOpenDocs(true)}>
              <p>View files</p>
              <BiFileBlank size={20} onClick={() => setOpenDocs(true)}/>
            </div>
        </div>
        { selectedReject &&
          <div className="comment-btns">
            <div className="comment-con" id="tooltip">
              <input
                id="tooltiptext"
                title="reason for rejection"
                type="text"
                placeholder="Please enter reason for rejection ..."
                value={comment}
                onChange={(e) => {setComment(e.target.value)}}
              /> 
            </div>
            <div className="rejection-buttons">
              <div className="rejection-button submit">
                <button>Submit</button>
              </div>
              <div className="rejection-button cancel" onClick={() => setSelectedReject(false)}>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        }
      </div>
      {openDocs && <FileModal closeModal={() => {setOpenDocs(false)}} />}
      { accecptedModal &&
        <div className="modal-container" >
          <div className="modal">
              <div className="confirmation-text">
                  <h1>Are you sure you want to accept?</h1>
                  <p>Accounts and balances will be reflected</p>
              </div>
              <div className="btn-options-container">
                  <button className="btn-options">Yes</button>
                  <button className="btn-options" id='no-btn' onClick={() => setAccecptedModal(false)}>No</button>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default JournalInfoDetails