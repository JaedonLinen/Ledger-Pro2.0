import React, { useEffect, useState } from 'react'
import './JournalEntriesTable.css'

function JournalEntriesTable({id}) {

  const [journalEntries, setJournalEntries] = useState([]);
  const [accounts, setAccounts] = useState([])
  
  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
      try {
          const response = await fetch(`http://127.0.0.1:5000//get_transaction/${id}`);
          const data = await response.json();
          setJournalEntries(data.transaction_entries);
      } catch (error) {
          console.error("Failed to fetch transactions:", error);
          setJournalEntries([]);  // Ensure users is always an array
      }
  };
  
  useEffect(() => {
      fetchAccounts()
  }, [])

  const fetchAccounts = async () => {
      try {
          const response = await fetch("http://127.0.0.1:5000/get_accounts");
          const data = await response.json();
          setAccounts(data.allAccounts);
      } catch (error) {
          console.error("Failed to fetch users:", error);
          setAccounts([]);  // Ensure users is always an array
      }
  };

  const findAccount = (id) => {
    return accounts.find(acc => acc.account_id === id)
  }

  const formatCurrency = (num) => {
    num = num.toString(); // Ensure it's a string for processing

    let isNegative = num.toString().startsWith("-") ? true : false; // Check if the number is negative
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

  return (
    <div>
      <h1 className='Entries-title'>Entries</h1>
        <div className="table-master-container">
            <table>
                <caption>
                    List of all users in system
                </caption>
                <thead>
                    <tr>
                        <th>Journal entry Id</th>
                        <th>Normal Side</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                {journalEntries.map((entry) => (
                        <tr key={entry.account_id} className='table-data'>
                            <td data-cell="Journal entry Id"    >{entry.transaction_entry_id}</td>
                            <td data-cell="normal side"    >{findAccount(entry.account_id)?.normal_side || ""}</td>
                            <td data-cell="account"    >{findAccount(entry.account_id)?.account_name || ""} </td>
                            <td data-cell="amount"    >{entry.amount}</td>
                            <td data-cell="type"        >{entry.type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default JournalEntriesTable