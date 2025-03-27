import React, { useState, useEffect } from 'react'
import { BiDownArrow, BiPlus, BiTrash, BiCalendar } from "react-icons/bi";
import './CreateJournalEntry.css'
import { useLocation } from "react-router-dom"

function CreateJournalEntry() {

  const location = useLocation();
  const { currentUser } = location.state;

  if (!currentUser){
      return <div className='error'>User not found...</div>;
  } 

  // add transaction stuff

  const [type, setType] = useState()
  const [date, setDate] = useState()
  const [desc, setDesc] = useState()

  // add transaction entries
  const [entries, setEntries] = useState([{id: 0, transaction_id:null, account_id:null, amount:null, type:"debit"},{id: 1, transaction_id:null, account_id:null, amount:null, type:"credit"}])
  const [entryError, setEntryError] = useState(false)

  const checkHighestID = () => {
    return (Math.max(...entries.map(item => item.id)))
  }

     // Add a new entry form
  const addEntryInputDebit = () => {
    setEntries([...entries, {id: (checkHighestID() + 1), transaction_id:null, account_id:null, amount:null, type:"debit"}]);
  };
  const addEntryInputCredit = () => {
    setEntries([...entries, {id: (checkHighestID() + 1), transaction_id:null, account_id:null, amount:null, type:"credit"}]);
  };

  // Remove an entry by id
  const removeEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  // Handle input change
  const handleChange = (id, field, value) => {
    setEntryError(false);
  
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const checkEntryComplete = (entryType) =>{

  }

  const handleArraySizeChange = () => {
    if (entries.length >= 2){
      // excute code
      console.log("Array size changed:", entries.length);
    }
  };

  useEffect(() => {
    handleArraySizeChange();
  }, [entries.length]); // Dependency on items.length

  useEffect(() => {
    console.log(entries);
  }, [entries]); // Now updates when `entries` changes
  
  // Handle form submission
  const handleSubmit = () => {
    console.log("Form Submitted:", entries);
    setEntries([{id: 0, transaction_id:null, account_id:null, amount:null, type:"debit"},{id: 1, transaction_id:null, account_id:null, amount:null, type:"credit"}]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='journal-form'>
        <div className="journal-title">
          <h1>Fill out form to request a journal entry</h1>
        </div>
        <div className="journal-entry-desc">
          <p>Desribe this transaction:</p>
          <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} className="journal-entry-desc-text" required/>
        </div>
        <div className="type-date">
          <div className="type-date-input">
            <p>Please select journal type:</p>
            <div className="jornal-dropdown">
              <select name="side" value={type} onChange={(e) => setType(e.target.value)} required>
                <option value=""></option>
                <option value="Transaction">Transaction</option>
                <option value="Adjusting">Adjusting</option>
              </select>
              <BiDownArrow />
            </div> 
          </div>
          <div className="type-date-input">
            <p>Please select the day this occured:</p>
            <div className="jornal-dropdown">
              <input className='journal-form-date' type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <BiCalendar />
            </div> 
          </div>
        </div>
        
        <div className="journal-entries-con">
          <div className="con">
            {entries
              .filter(entry => entry.type === "debit")
              .map((entry) => (
              <div key={entry.id} className="journal-entry-con">
                <select
                  type="text"
                  name="account_id"
                  value={entry.account_id}
                  placeholder="Account"
                  onChange={(e) => handleChange(entry.id, "account_id", e.target.value)}
                  required
                >
                  <option value=""></option>
                  <option value="Transaction">Transaction</option>
                  <option value="Adjusting">Adjusting</option>
                </select>
                <input
                  type="text"
                  name="amount"
                  value={entry.amount_id}
                  placeholder="Amount"
                  onChange={(e) => handleChange(entry.id, "amount", e.target.value)}
                  required
                />
                {(entries.filter(entry => entry.type === "debit").length > 1 && checkHighestID() !== entry.id) && (
                  <div className="journal-entry-btn remove" onClick={() => removeEntry(entry.id)}>
                    <BiTrash />
                  </div>
                )}
                {entryError && <div>error</div> }
              </div>
            ))}
            <div className="journal-submit-con" onClick={addEntryInputDebit}>
              <div className="journal-entry-btn add"> <BiPlus size={20}/> </div>
            </div>
          </div>

          <div className="divider"></div>

          <div className="con">
            {entries
              .filter(entry => entry.type === "credit")
              .map((entry) => (
              <div key={entry.id} className="journal-entry-con credit">
                <select
                  type="text"
                  name="account_id"
                  value={entry.account_id}
                  placeholder="Account"
                  onChange={(e) => handleChange(entry.id, "account_id", e.target.value)}
                  required
                >
                  <option value=""></option>
                  <option value="Transaction">Transaction</option>
                  <option value="Adjusting">Adjusting</option>
                </select>
                <input
                  type="text"
                  name="amount"
                  value={entry.amount}
                  placeholder="Amount"
                  onChange={(e) => handleChange(entry.id, "amount", e.target.value)}
                  required
                />
                {(entries.filter(entry => entry.type === "credit").length > 1 && checkHighestID() !== entry.id) && (
                  <div className="journal-entry-btn remove" onClick={() => removeEntry(entry.id)}>
                    <BiTrash />
                  </div>
                )}
                {entryError && <div>error</div> }
              </div>
            ))}
            <div className="journal-submit-con" onClick={addEntryInputCredit}>
              <div className="journal-entry-btn add"> <BiPlus size={20}/> </div>
            </div>
          </div>
        </div>
        <div className="journal-submit-con">
          <button className="wizard-submit" type="submit">Submit Request</button>
        </div>
      </form>
    </div>
  )
}

export default CreateJournalEntry