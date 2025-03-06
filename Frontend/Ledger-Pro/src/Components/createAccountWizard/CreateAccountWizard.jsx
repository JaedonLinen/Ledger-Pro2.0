import React from 'react'
import './CreateAccountWizard.css'
import {useState} from "react"

function CreateAccountWizard({currentUser}) {

    const [normalSide, setNormalSide] = useState("")
    const [category, setCategory] = useState("")
    const [subcategory, setSubcategory] = useState("")
    const [initBalance, setInitBalance] = useState("");

    const formatCurrency = (num) => {
        let number = num.replace(/[^0-9.]/g, ""); 
        
        // Ensure only one decimal point
        let parts = number.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas

        // Limit to two decimal places
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 2);
        }

        return `$${parts.join(".")}`;
    };

  return (
    <div className='wizard-body'>
        <div className="wizard-header-text">
            <h3>Create an account</h3>
            <p>Please fill out the information below to create an account</p>
        </div>
        <div className='wizard-container'>
            <form action="" className="wizard-form">
                <div className="wizard-step one">
                    <div className="wizard-group">
                        <label htmlFor="">Name</label>
                        <input type="text" name='Account Name' required/>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="">Description</label>
                        <input type="text" name='Account Name' required/>
                    </div>
                </div>
                <div className="wizard-step two">
                    <div className="wizard-group">
                        <label htmlFor="side">Normal Side</label>
                        <select name="side" value={normalSide} onChange={(e) => setNormalSide(e.target.value)} required>
                            <option value=""></option>
                            <option value="Debit">Debit (left)</option>
                            <option value="Credit">Credit (right)</option>
                        </select>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="Category">Category</label>
                        <select name="side" value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value=""></option>
                            {normalSide === "Debit" && <option value="Assets">Assets</option>}
                            {normalSide === "Debit" && <option value="Expenses">Expenses</option>}

                            {normalSide === "Credit" && <option value="Liabilites">Liabilites</option>}
                            {normalSide === "Credit" && <option value="Equity">Equity</option>}
                            {normalSide === "Credit" && <option value="Revenue">Revenue</option>}
                        </select>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="Subcategory">Subcategory</label>
                        <select name="side" value={subcategory} onChange={(e) => setSubcategory(e.target.value) } required>
                            <option value=""></option>
                            {category === "Assets" && <option value="Current Assets">Current Assets (Short-term, within one year)</option>}
                            {category === "Assets" && <option value="Non-Current Assets">Non-Current Assets (Long-term, beyond one year)</option>}

                            {category === "Liabilites" && <option value="Current Liabilites">Current Liabilites (Due within one year)</option>}
                            {category === "Liabilites" && <option value="Non-Current Liabilites">Non-Current Liabilites (Due after one year)</option>}

                            {category === "Expenses" && <option value="Operating Expenses">Operating Expenses (Directly related to core business operations)</option>}
                            {category === "Expenses" && <option value="Non-Operating Expenses">Non-Operating Expenses (Not tied to main business activities)</option>}

                            {category === "Equity" && <option value="Contributed Capital">Contributed Capital (Funds invested by owners)</option>}
                            {category === "Equity" && <option value="Retained Earnings">Retained Earnings (Accumulated net income not distributed as dividends)</option>}
                            {category === "Equity" && <option value="Treasury Stock">Treasury Stock (Repurchased shares)</option>}

                            {category === "Revenue" && <option value="Operating Revenue">Operating Revenue (Main business earnings)</option>}
                            {category === "Revenue" && <option value="Operating Revenue">Non-Operating Revenue (Other income sources)</option>}

                        </select>
                    </div>
                </div>
                <div className="wizard-step three">
                    <div className="wizard-group">
                        <label htmlFor="initial balance">Initial Balance</label>
                        <input type="text" name='initial balance' min="0" step="any" onChange={(e) => setInitBalance(formatCurrency(e.target.value))} value={initBalance} required />
                    </div>
                    <div className="wizard-btn-container">
                        <button className="wizard-submit">Create Account</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default CreateAccountWizard