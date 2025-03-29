import React from 'react'
import { BiX } from "react-icons/bi";

function FilesTableModal({closeModal}) {
  return (
    <div>
        <div className="modal-container" >
            <div className="modal">
                <div className="exit-btn-container">
                    <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
                </div>
                <div className="table-master-container">
                  <table>
                      <caption>
                          List of all users in system
                      </caption>
                      <thead>
                          <tr>
                              <th>File Name</th>
                              <th>File</th>
                          </tr>
                      </thead>
                      <tbody>
                          
                      </tbody>
                  </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FilesTableModal