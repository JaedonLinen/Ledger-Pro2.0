import React from 'react'
import "./addUserConfirmModal.css";

function addUserConfirmModal({closeModal, existingUser = {}, updateDelete}) {

  const deleteUser = async (id) => {
    id.preventDefault()

    try{
      const options = {
        method: "DELETE"
      }
      const response = await fetch(`http://127.0.0.1:5000/delete_user/${existingUser.id}`, options)
      if(response.status === 200){
        updateDelete()
      } else {
        console.error("Failed to delete")
      }
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className="modal-container" >
        <div className="modal">
            <div className="confirmation-text">
                <h1>Are you sure you want to detete user?</h1>
                <p>Action cannot be undone</p>
            </div>
            <div className="btn-options-container">
                <button className="btn-options" onClick={deleteUser}>Yes</button>
                <button className="btn-options" id='no-btn' onClick={closeModal}>No</button>
            </div>
        </div>
    </div>
  )
}

export default addUserConfirmModal