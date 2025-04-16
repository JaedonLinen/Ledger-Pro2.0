import React, { useEffect } from 'react'
import './CreateAccountWizard.css'
import {useState} from "react"
import { useLocation } from "react-router-dom";
import SuccessModal from '../successModal/SuccessModal';
import LoadingModal from '../loadingModal/LoadingModal';

function CreateAccountWizard () {

    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    const [account_name,    setAccountName] = useState("")
    const [account_num,     setAccountNum] = useState()
    const [account_desc,    setAccountDesc] = useState("")
    const [normal_side,      setNormalSide] = useState("")
    const [category,        setCategory] = useState("")
    const [subcategory,     setSubcategory] = useState("")
    const [initial_balance, setInitialBalance] = useState(0.0);
    const account_owner = currentUser.id
    const [formattedBalance, setFormattedBalance] = useState("");
    const [displayAccountNum, setDisplayAccountNum] = useState("");

    const numbersOnly = (text) =>{
        return text.replace(/[^0-9.]/g, ""); // Keep only numbers & decimals
    }

    const balance_numbersOnly = (text) => {
        return text.replace(/[^0-9.-]/g, "") // Keep only numbers, decimals, and negative sign
                   .replace(/(?!^)-/g, ""); // Ensure negative sign only appears at the start
    };

    const handleAccountNumberChange = (e) => {
        let rawNumber = numbersOnly(e.target.value)
        setAccountNum(
            isNaN(parseInt(rawNumber)) ? 0 : 
            parseInt(parseInt(rawNumber))
        );
        setDisplayAccountNum(numbersOnly(rawNumber))
    };

    const handleBalanceChange = (e) => {
        let rawValue = balance_numbersOnly(e.target.value)
        setInitialBalance(
            isNaN(parseFloat(rawValue)) ? 0 : 
            parseFloat(parseFloat(rawValue).toFixed(2))
        ); // Store raw value

        // Apply formatting
        setFormattedBalance(formatCurrency(rawValue));
    };

    const formatCurrency = (num) => {
        num = num.toString(); // Ensure it's a string for processing
    
        let isNegative = initial_balance.toString().startsWith("-") ? true : false; // Check if the number is negative
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

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        const data = {
            account_name,   
            account_num,    
            account_desc,   
            normal_side,     
            category,       
            subcategory,    
            initial_balance,
            account_owner
        }

        const url = "https://render-flask-deployment-ivut.onrender.com/create_account"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch (url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            setLoading(false)
            alert(data.message)
        } else {
            setLoading(false)
            setSuccess(true)
        }
    }

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

  return (
    <div className='wizard-body'>
        {loading && <LoadingModal />}
        {success && <SuccessModal page={"account"} currentUser={currentUser}/>}
        <div className="wizard-header-text">
            <h3>Create an account</h3>
            <p>Please fill out the information below to create an account</p>
        </div>
        <div className='wizard-container'>
            <form action="" onSubmit={onSubmit} className="wizard-form">
                <div className="wizard-step one">
                    <div className="wizard-group">
                        <label htmlFor="">Name</label>
                        <input type="text" name='Account Name' value={account_name} onChange={(e) => setAccountName(e.target.value)} required/>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="">Number</label>
                        <input type="text" name='Number' value={displayAccountNum} onChange={handleAccountNumberChange} required/>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="">Description</label>
                        <input type="text" name='Description' value={account_desc} onChange={(e) => setAccountDesc(e.target.value)} required/>
                    </div>
                </div>
                <div className="wizard-step two">
                    <div className="wizard-group">
                        <label htmlFor="side">Normal Side</label>
                        <select name="side" value={normal_side} onChange={(e) => setNormalSide(e.target.value)} required>
                            <option value=""></option>
                            <option value="Debit">Debit (left)</option>
                            <option value="Credit">Credit (right)</option>
                        </select>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="Category">Category</label>
                        <select name="side" value={category} onChange={(e) => setCategory(e.target.value)} required>
                            <option value=""></option>
                            {normal_side === "Debit" && <option value="Assets">Assets</option>}
                            {normal_side === "Debit" && <option value="Expenses">Expenses</option>}

                            {normal_side === "Credit" && <option value="Liabilites">Liabilites</option>}
                            {normal_side === "Credit" && <option value="Equity">Equity</option>}
                            {normal_side === "Credit" && <option value="Revenue">Revenue</option>}
                        </select>
                    </div>
                    <div className="wizard-group">
                        <label htmlFor="Subcategory">Subcategory</label>
                        <select name="side" value={subcategory} onChange={(e) => setSubcategory(e.target.value) } required>
                            <option value=""></option>
                            {normal_side === "Debit" && category === "Assets" && <option value="Current Assets">Current Assets (Short-term, within one year)</option>}
                            {normal_side === "Debit" && category === "Assets" && <option value="Non-Current Assets">Non-Current Assets (Long-term, beyond one year)</option>}

                            {normal_side === "Debit" && category === "Expenses" && <option value="Operating Expenses">Operating Expenses (Directly related to core business operations)</option>}
                            {normal_side === "Debit" && category === "Expenses" && <option value="Non-Operating Expenses">Non-Operating Expenses (Not tied to main business activities)</option>}

                            {normal_side === "Credit" && category === "Liabilites" && <option value="Current Liabilites">Current Liabilites (Due within one year)</option>}
                            {normal_side === "Credit" && category === "Liabilites" && <option value="Non-Current Liabilites">Non-Current Liabilites (Due after one year)</option>}

                            {normal_side === "Credit" && category === "Equity" && <option value="Contributed Capital">Contributed Capital (Funds invested by owners)</option>}
                            {normal_side === "Credit" && category === "Equity" && <option value="Retained Earnings">Retained Earnings (Accumulated net income not distributed as dividends)</option>}
                            {normal_side === "Credit" && category === "Equity" && <option value="Treasury Stock">Treasury Stock (Repurchased shares)</option>}

                            {normal_side === "Credit" && category === "Revenue" && <option value="Operating Revenue">Operating Revenue (Main business earnings)</option>}
                            {normal_side === "Credit" && category === "Revenue" && <option value="Operating Revenue">Non-Operating Revenue (Other income sources)</option>}

                        </select>
                    </div>
                </div>
                <div className="wizard-step three">
                    <div className="wizard-group">
                        <label htmlFor="initial balance">Initial Balance</label>
                        <input type="text" name='initial balance' min="0" step="any" onChange={handleBalanceChange} value={formattedBalance} required />
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