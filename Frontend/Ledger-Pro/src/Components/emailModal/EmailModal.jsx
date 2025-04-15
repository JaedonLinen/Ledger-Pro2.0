import React from 'react'
import './EmailModal.css'
import { BiX, BiDownArrow } from "react-icons/bi";
import { useState } from "react";
import { useEffect } from "react";

function EmailModal({closeModal}) {

    const [users, setUsers] = useState([])
    const [email, setEmail] = useState()
    const [subject, setSubject] = useState()
    const [message, setMessage] = useState()
    
    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://render-flask-deployment-ivut.onrender.com/get_users");
            const data = await response.json();
            setUsers(data.allUsers);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);  // Ensure users is always an array
        }
    };

  return (
    <div className="modal-container" >
            <div className="modal">
                <div className="exit-btn-container">
                    <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
                </div>
                <h1 className='email-modal-header'>Send an email</h1>
                <div className="email-input to">
                    <p>To:</p>
                    <div className="input-to">
                        <select
                        type="text"
                        name="account_id"
                        value={email}
                        placeholder="Please select a user"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        >
                        <option value="">Select an account</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.email}>
                            {user.firstName} {user.lastName}
                            </option>
                        ))}
                        </select>
                    </div>
                    <BiDownArrow size={20}/>
                </div>
                <div className="email-input to">
                    <p>Subject:</p>
                    <div className="input-to">
                        <input type="text" onChange={(e) => setSubject(e.target.value)} />
                    </div>
                </div>
                <div className="email-input mess">
                    <p>Message:</p>
                    <div className="input-to mess">
                        <input type="text" onChange={(e) => setMessage(e.target.value)}/>
                    </div>
                </div>
                <div className="send-btn-container" id="tooltip" onClick={() => setOpenEmailtModal(true)}>
                    <button title="Send a email here" className="addUserModalOpen-btn" id="tooltiptext">
                        Send
                    </button>
                </div>
            </div>
        </div>
  )
}

export default EmailModal