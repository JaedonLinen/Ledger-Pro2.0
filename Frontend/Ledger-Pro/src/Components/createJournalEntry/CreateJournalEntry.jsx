import React, { useState, useEffect } from 'react'
import { BiDownArrow, BiPlus, BiTrash, BiCalendar, BiErrorCircle, BiRefresh, BiFileBlank } from "react-icons/bi";
import './CreateJournalEntry.css'
import { useLocation } from "react-router-dom"
import FileModal from '../filesTableModal/FilesTableModal'

function CreateJournalEntry() {

  const [accounts, setAccounts] = useState([])

  useEffect(() => {
      fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
      try {
          const response = await fetch("https://render-flask-deployment-ivut.onrender.com/get_accounts");
          const data = await response.json();
          setAccounts(data.allAccounts);
      } catch (error) {
          console.error("Failed to fetch users:", error);
          setAccounts([]);  // Ensure users is always an array
      }
  };

  const location = useLocation();
  const { currentUser } = location.state;

  if (!currentUser){
      return <div className='error'>User not found...</div>;
  } 

  // on submit function

  const onSubmit = async (e) => {
    e.preventDefault()

    const data = {
      description,
      transaction_type,
      transaction_date,
      user_id,
      entries,
      docs
    }

    const url = "https://render-flask-deployment-ivut.onrender.com/create_transaction"
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
        alert(data.message)
    } else {
        // success modal
    }
}

  // add transaction stuff

  const [transaction_type, setType] = useState()
  const [transaction_date, setDate] = useState()
  const [description, setDesc] = useState()
  const user_id = currentUser.id



  // add transaction entries
  const [entries, setEntries] = useState([{id: 0, transaction_id:null, account_id:null, amount:null, type:"debit"},{id: 1, transaction_id:null, account_id:null, amount:null, type:"credit"}])
  const [amountError, setEntryError] = useState(false)
  const [balanceError, setBalanceError] = useState(false)
  const [entriesError, setEntriesError] = useState(false)
  const [accountsError, setAccountsError] = useState(false)
  

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
    setEntries(entries.map(entry => 
      entry.id === id ? { ...entry, [field]: parseFloat(value) } : entry
    ));
  };

  const checkValidEntries = () => {
    const hasValidDebit = entries.some(entry => 
        entry.type === "debit" &&
        entry.account_id !== null &&
        entry.amount !== null &&
        !isNaN(entry.amount)
    );

    const hasValidCredit = entries.some(entry => 
        entry.type === "credit" &&
        entry.account_id !== null &&
        entry.amount !== null &&
        !isNaN(entry.amount)
    );

    if (hasValidDebit && hasValidCredit) {
      setEntriesError(false); // Entries are valid
    } else {
      setEntriesError(true); // Missing valid debit or credit
    }
};

  const checkDebitsCreditsBalance = () => {
    const totalDebits = entries
      .filter(entry => entry.type === "debit" && entry.amount !== null && !isNaN(entry.amount)) // Filter debits, ensure amount is not null or NaN
      .reduce((acc, entry) => acc + entry.amount, 0); // Sum all debit amounts
  
    const totalCredits = entries
      .filter(entry => entry.type === "credit" && entry.amount !== null && !isNaN(entry.amount)) // Filter credits, ensure amount is not null or NaN
      .reduce((acc, entry) => acc + entry.amount, 0); // Sum all credit amounts
  
    if (totalDebits !== totalCredits) {
        setBalanceError(true);
    } else {
        setBalanceError(false);
    }
};

  const numbersOnly = (text) =>{
      return text.replace(/[^0-9.]/g, ""); // Keep only numbers & decimals
  }

  const checkForErrors = () => {
    const hasInvalidAmount = entries.some(entry => isNaN(entry.amount));
    setEntryError(hasInvalidAmount);
  };

  const validateEntries = () => {
    // Extract all valid account IDs from the accounts list
    const hasDebitAccount = (entry, accounts) => {
      if (entry.account_id === null) {
        return true
      }
      return accounts.some(account => 
        account.account_id === entry.account_id && account.normal_side === "Debit"
      );
    };

    const hasCreditAccount = (entry, accounts) => {
      if (entry.account_id === null) {
        return true
      }
      return accounts.some(account => 
        account.account_id === entry.account_id && account.normal_side === "Credit"
      );
    };
  
    if (entries.some(entry => hasDebitAccount(entry, accounts)) && entries.some(entry => hasCreditAccount(entry, accounts))) {
      setAccountsError(false)
    } else {
      setAccountsError(true)
    }
  };

  const resetEntries = () => {
    setBalanceError(false);
    setEntryError(false);
    setEntriesError(true);
    setAccountsError(false);
    setEntries([{id: 0, transaction_id:null, account_id:null, amount:null, type:"debit"},{id: 1, transaction_id:null, account_id:null, amount:null, type:"credit"}])
  }

  useEffect(() => {
    checkForErrors()
    checkDebitsCreditsBalance()
    checkValidEntries()
    validateEntries()
  }, [entries])

  const [openDocs, setOpenDocs] = useState(false)
  const [docs, setDocs] = useState([])

  const docsCallback = (fileName, formData) => {
    setOpenDocs(false);
    setDocs([...docs, { filename: fileName, file: formData.get("file") }]);
  };

  return (
    <div>
      {openDocs && <FileModal closeModal={() => setOpenDocs(false)} existing={false} updateCallback={docsCallback} />}
      <form className='journal-form' onSubmit={onSubmit}>
        <div className="journal-title">
          <h1>Fill out form to request a journal entry</h1>
        </div>
        <div className="journal-entry-desc">
          <p>Describe this transaction:</p>
          <input type="text" value={description} onChange={(e) => setDesc(e.target.value)} className="journal-entry-desc-text" required/>
        </div>
        <div className="type-date">
          <div className="type-date-input">
            <p>Please select journal type:</p>
            <div className="jornal-dropdown">
              <select name="side" value={transaction_type} onChange={(e) => setType(e.target.value)} required>
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
              <input className='journal-form-date' type="date" value={transaction_date} onChange={(e) => setDate(e.target.value)} required />
              <BiCalendar />
            </div> 
          </div>
        </div>

        <div className="file-btns-con">
          { docs.length != 0 &&
            <div className='reset-file-button' onClick={() => setDocs([])}>
              <p>Clear</p>
              <BiTrash size={20}/>
            </div>
          }
          <div className='file-button' onClick={() => setOpenDocs(true)}>
            <p>Add files</p>
            <BiFileBlank size={20} onClick={() => setOpenDocs(true)}/>
          </div>
          { docs.length != 0 &&
            <div className="file-btns-con-text">
              <p className='file-count'>{docs.length} file(s) uploaded</p>
            </div>
          }
        </div>
        

        {amountError && <div className='journal-Entry-Error'><BiErrorCircle />Amount cannot be negative or letters</div> }
        {balanceError && <div className='journal-Entry-Error'><BiErrorCircle />Journal entry is not balanced *debits=credits</div> }
        {accountsError && <div className='journal-Entry-Error'><BiErrorCircle />Journal entries is must include at least one debit and one credit account</div> }

        <div className="side-titles">
          <h1>Debits</h1>
          <div className="journal-entries-reset" onClick={() => resetEntries()}>
            <BiRefresh size={30}/>
          </div>
          <h1>Credits</h1>
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
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.account_id} value={account.account_id}>
                      ({account.normal_side}) {account.account_name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="amount"
                  value={isNaN(entry.amount) ? "" : entry.amount}
                  placeholder="Amount"
                  onChange={(e) => handleChange(entry.id, "amount", numbersOnly(e.target.value))}
                  required
                />
                {(entries.filter(entry => entry.type === "debit").length > 1 && checkHighestID() !== entry.id) && (
                  <div className="journal-entry-btn remove" onClick={() => removeEntry(entry.id)}>
                    <BiTrash />
                  </div>
                )}
              </div>
            ))}
            <div className="journal-submit-con">
              <div className="journal-entry-btn add" onClick={addEntryInputDebit}> <BiPlus size={20}/> </div>
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
                  <option value="">Select an account</option>
                  {accounts.map((account) => (
                    <option key={account.account_id} value={account.account_id}>
                      ({account.normal_side}) {account.account_name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  name="amount"
                  value={isNaN(entry.amount) ? "" : entry.amount}
                  placeholder="Amount"
                  onChange={(e) => handleChange(entry.id, "amount", numbersOnly(e.target.value))}
                  required
                />
                {(entries.filter(entry => entry.type === "credit").length > 1 && checkHighestID() !== entry.id) && (
                  <div className="journal-entry-btn remove" onClick={() => removeEntry(entry.id)}>
                    <BiTrash />
                  </div>
                )}
              </div>
            ))}
            <div className="journal-submit-con">
              <div className="journal-entry-btn add" onClick={addEntryInputCredit}> <BiPlus size={20}/> </div>
            </div>
          </div>
        </div>
        {!accountsError && !balanceError && !amountError && !entriesError &&
          <div className="journal-submit-con">
            <button className="wizard-submit" type="submit">Submit Request</button>
          </div>
        }
      </form>
    </div>
  )
}

export default CreateJournalEntry