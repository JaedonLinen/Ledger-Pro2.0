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
          const response = await fetch(`https://render-flask-deployment-ivut.onrender.com/get_transaction/${id}`);
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
          const response = await fetch("https://render-flask-deployment-ivut.onrender.com/get_accounts");
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
    if (num === undefined || num === null || isNaN(num)) return "$0.00"; // or return empty string, if you prefer
  
    num = Number(num); // Ensure it's a number first
    let isNegative = num < 0;
    num = Math.abs(num);
  
    let parts = num.toFixed(2).split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
    let formatted = `$${parts.join(".")}`;
    return isNegative ? `-${formatted}` : formatted;
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
                        <th>Account Current Balance</th>
                        <th>Entry effect</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                {journalEntries.map((entry) => (
                        <tr key={entry.account_id} className='table-data'>
                            <td data-cell="Journal entry Id"    >{entry?.transaction_entry_id || ""}</td>
                            <td data-cell="normal side"    >{findAccount(entry.account_id)?.normal_side || ""}</td>
                            <td data-cell="account"    >{findAccount(entry.account_id)?.account_name || ""} </td>
                            <td data-cell="account current balance">
                                {findAccount(entry.account_id)?.balance !== undefined
                                ? formatCurrency(findAccount(entry.account_id)?.balance)
                                : ""}
                            </td>
                            <td data-cell="entry effect"    >
                                {entry.type === findAccount(entry.account_id)?.normal_side?.toLowerCase() ? `+${formatCurrency(entry.amount)}` || "" : `-${formatCurrency(entry.amount)}` || ""}
                            </td>
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