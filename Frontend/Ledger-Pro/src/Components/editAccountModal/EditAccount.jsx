import React from 'react'
import {useState, useEffect} from "react"
import { BiX } from "react-icons/bi";

function EditAccount({closeModal, currentUser, account, updateCallBack}) {
    const [account_name, setAccountName] = useState(account.account_name)
    const [account_num, setAccountNum] = useState(account.account_num)
    const [account_desc, setAccountDesc] = useState(account.account_desc)
    const [normal_side, setNormalSide] = useState(account.normal_side)
    const [category, setCategory] = useState(account.category)
    const [isActive, setIsActive] = useState(account.isActive)
    const [subcategory, setSubcategory] = useState(account.subcategory)

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            account_name,
            account_num,
            normal_side,
            account_desc, 
            subcategory,
            category,
            isActive
        }

        const url = `https://render-flask-deployment-ivut.onrender.com/${account.account_id}`
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
            updateCallBack()
        }
    }

    const handleActiveSet = (value) => {
        if (account.balance >= 0) {
           if (value === "false") {
                setIsActive(false)
            } else {
                setIsActive(true)
            } 
        } else {
            alert("Error: Balance must be balanced or positve in order to deactivate account")
        }
        
    }

    return (
      <div className="modal-container" >
          <div className="modal">
              <div className="exit-btn-container">
                  <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
              </div>
              <form onSubmit={onSubmit}>
                  <div className="form-group">
                      <label htmlFor="account_name">Name</label>
                      <input type="text" id="account_name" value={account_name} onChange={(e) => setAccountName(e.target.value)} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="account_num">Number</label>
                      <input type="text" id="account_num" value={account_num} onChange={(e) => setAccountNum(e.target.value)} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="normal_side">Normal Side</label>
                      <select name="side" value={normal_side} onChange={(e) => setNormalSide(e.target.value)} required>
                        <option value=""></option>
                        <option value="Debit">Debit (left)</option>
                        <option value="Credit">Credit (right)</option>
                    </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="account_desc">Description</label>
                      <input type="text" id="account_desc" value={account_desc} onChange={(e) => setAccountDesc(e.target.value)} />
                  </div>
                  <div className="form-group">
                      <label htmlFor="isActive">Active</label>
                      <select name="isActive" value={isActive} onChange={(e) => handleActiveSet(e.target.value)}>
                          <option value="true">Active</option>
                          <option value="false">Inactive</option>
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="Role">Category</label>
                      <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                          <option value=""></option>
                            {normal_side === "Debit" && <option value="Assets">Assets</option>}
                            {normal_side === "Debit" && <option value="Expenses">Expenses</option>}

                            {normal_side === "Credit" && <option value="Liabilites">Liabilites</option>}
                            {normal_side === "Credit" && <option value="Equity">Equity</option>}
                            {normal_side === "Credit" && <option value="Revenue">Revenue</option>}
                      </select>
                  </div>
                  <div className="form-group">
                      <label htmlFor="date">Date of Birth</label>
                      <select name="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                          <option value=""></option>
                            {normal_side === "Debit" && category === "Assets" && <option value="Current Assets">Current Assets (Short-term, within one year)</option>}
                            {normal_side === "Debit" && category === "Assets" && <option value="Non-Current Assets">Non-Current Assets (Long-term, beyond one year)</option>}

                            {normal_side === "Debit" && category === "Liabilites" && <option value="Current Liabilites">Current Liabilites (Due within one year)</option>}
                            {normal_side === "Debit" && category === "Liabilites" && <option value="Non-Current Liabilites">Non-Current Liabilites (Due after one year)</option>}

                            {normal_side === "Credit" && category === "Expenses" && <option value="Operating Expenses">Operating Expenses (Directly related to core business operations)</option>}
                            {normal_side === "Credit" && category === "Expenses" && <option value="Non-Operating Expenses">Non-Operating Expenses (Not tied to main business activities)</option>}

                            {normal_side === "Credit" && category === "Equity" && <option value="Contributed Capital">Contributed Capital (Funds invested by owners)</option>}
                            {normal_side === "Credit" && category === "Equity" && <option value="Retained Earnings">Retained Earnings (Accumulated net income not distributed as dividends)</option>}
                            {normal_side === "Credit" && category === "Equity" && <option value="Treasury Stock">Treasury Stock (Repurchased shares)</option>}
 
                            {normal_side === "Credit" && category === "Revenue" && <option value="Operating Revenue">Operating Revenue (Main business earnings)</option>}
                            {normal_side === "Credit" && category === "Revenue" && <option value="Operating Revenue">Non-Operating Revenue (Other income sources)</option>}

                      </select>
                  </div>
                  <div className="submit-button-container">
                      <button type="submit" className="addUserModal-btn">submit</button>
                  </div>
              </form>
          </div>
      </div>
    )
}

export default EditAccount