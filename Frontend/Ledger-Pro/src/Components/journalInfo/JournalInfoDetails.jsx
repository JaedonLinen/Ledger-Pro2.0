import React, { useEffect, useState } from 'react'
import FileModal from '../filesTableModal/FilesTableModal'
import { BiFileBlank } from "react-icons/bi";
import './JournalInfoDetails.css'

function JournalInfoDetails({t_id, currentUser}) {

  const [openDocs, setOpenDocs] = useState(false)
  const [journal, setJournals] = useState([]);
  const [journalEntries, setJournalEntries] = useState([]);
  const [users, setUsers] = useState([])
  const [selectedReject, setSelectedReject] = useState(false)
  const [accecptedModal, setAccecptedModal] = useState(false)
  
  const updateJournals = () =>{
    fetchJournals()
    setComment("")
    setStatus("")
  }

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:5000//get_transaction/${t_id}`);
          const data = await response.json();
          setJournals(data.transaction);
          setJournalEntries(data.transaction_entries)
      } catch (error) {
          console.error("Failed to fetch transactions:", error);
          setJournals([]);  // Ensure users is always an array
      }
  };

  useEffect(() => {
    setJournalOwner(users.find(user => user.id === journal.user_id))
    setUpdatedBy(users.find(user => user.id === journal.updated_by))
  }, [users])

  useEffect(() => {
    fetchUsers()
  }, [])

  const [journalOwner, setJournalOwner] = useState();
  const [updatedBy, setUpdatedBy] = useState();
  
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

  const transaction_id = journal.transaction_id
  const transaction_type = journal.transaction_type
  const description = journal.description
  const transaction_date = journal.transaction_date
  const user_id = journal.user_id
  const date_created = journal.date_created
  const updated_by = currentUser.id

  const [status, setStatus] = useState()
  const [comment, setComment] = useState("")
  const date_updated = new Date().toUTCString();

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      transaction_id,
      description,
      transaction_type,
      transaction_date, 
      user_id,
      status,
      date_created,
      date_updated,
      updated_by,
      comment,
      journalEntries
    }
    
    const url = `http://127.0.0.1:5000/update_transaction/${t_id}`
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }

    const response = await fetch (url, options)
    if (response.status !== 201 && response.status !== 200){
        const data = await response.json()
        alert(data.message)
    } else {
        updateJournals()
    }
  }

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
      { currentUser.role !== "Accountant" && journal.status === "Pending" &&
        <div className="status-options">
          <div className="status-option-bttn accept" onClick={() => (setAccecptedModal(true), setStatus("Accepted"))}>
            <p>Accept</p>
          </div>
          <div className="status-option-bttn reject" onClick={() => (setSelectedReject(true), setStatus("Rejected"))}>
            <p>Reject</p>
          </div>
        </div>
      }
      <div className={`journal-information-con ${ journal.status !== "Pending" ? "active" : ""}`}>
        <p className="journal-information-title">Created By: <span>{journalOwner?.firstName || ""} {journalOwner?.lastName || ""}</span></p>
        <p className="journal-information-title">Journal id: <span>{journal.transaction_id}</span></p>
        <p className="journal-information-title">Description: <span>{journal.description}</span></p>
        <p className="journal-information-title">Journal Date: <span>{journal?.transaction_date ? formatDate(journal.transaction_date) : ""}</span></p>
        <p 
          className={`journal-information-title ${ 
          journal.status === "Accepted" ? "a" : 
          journal.status === "Pending" ? "p" :
          journal.status === "Rejected" ? "r" :
          ""
        }`}>
          Status: <span>{journal.status}</span>
        </p>
        { 
          journal.status === "Rejected" &&
          <p className="journal-information-title">Reason: <span>{journal?.comment}</span></p>
        }
        { 
          journal.status !== "Pending" &&
          <p className="journal-information-title">Updated by: <span>{updatedBy?.firstName || ""} {updatedBy?.lastName || ""}</span></p>
        }
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
              <textarea
                id="tooltiptext"
                title="reason for rejection"
                placeholder="Please enter reason for rejection ..."
                value={comment}
                onChange={(e) => {setComment(e.target.value)}}
              /> 
            </div>
            <div className="rejection-buttons">
              <div 
                className="rejection-button submit" 
                onClick={(e) => (
                  setStatus("Rejected"),
                  setSelectedReject(false), 
                  handleSubmit(e)
                )}
              >
                <button>Submit</button>
              </div>
              <div className="rejection-button cancel" onClick={() => setSelectedReject(false)}>
                <button>Cancel</button>
              </div>
            </div>
          </div>
        }
      </div>
      {openDocs && <FileModal closeModal={() => {setOpenDocs(false)}} id={t_id} existing={true} />}
      { accecptedModal &&
        <div className="modal-container" >
          <div className="modal">
              <div className="confirmation-text">
                  <h1>Are you sure you want to accept?</h1>
                  <p>Accounts and balances will be reflected</p>
              </div>
              <div className="btn-options-container">
                  <button 
                    className="btn-options" 
                    onClick={(e) => (
                      setAccecptedModal(false),
                      handleSubmit(e)
                    )} 
                  >
                    Yes
                  </button>
                  <button className="btn-options" id='no-btn' onClick={() => setAccecptedModal(false)}>No</button>
              </div>
          </div>
        </div>
      }
    </div>
  )
}

export default JournalInfoDetails