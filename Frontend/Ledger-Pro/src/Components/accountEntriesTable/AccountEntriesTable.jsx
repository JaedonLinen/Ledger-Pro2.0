import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { BiSolidFilterAlt, BiX, BiSearch, BiRefresh } from 'react-icons/bi'
import './AccountEntriesTable.css'

function AccountEntriesTable({id, currentUser}) {

    const navigate = useNavigate();
    const [journalEntries, setJournalEntries] = useState([]);
    const [journalEntriesNotReflected, setJournalEntriesNotReflected] = useState([]);
    const [accounts, setAccounts] = useState([])
      
      useEffect(() => {
        fetchJournals()
      }, [])
    
      const fetchJournals = async () => {
          try {
              const response = await fetch(`http://127.0.0.1:5000//get_transaction_by_acc/${id}`);
              const data = await response.json();
              setJournalEntries(data.reflectedEntries);
              setJournalEntriesNotReflected(data.nonReflectedEntries);
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

      const handleJournalNavigation = (id) => {
        navigate("/JournalInfo", { state: { currentUser, transaction_id: id } });  
      };

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

        const [search, setSearch] = useState("");
        const [openFilterMenu, setOpenFilterMenu] = useState(false)
        const [notReflected, setNotReflected] = useState(false)

        const handleSearchChange = (e) => {
            const value = e.target.value;
        
            // Allow only numbers and limit to 4 digits
            if (/^\d{0,4}$/.test(value)) {
                setSearch(value);
                setIsFiltered(value.length === 4); // Only set filtered if input is exactly 4 digits
            }
        };

  return (
    <div>
        <h1 className='Entries-title'>Entries</h1>
        <div className="table-master-container">
            <div className="account-table-filter-options-container">
                <div className="account-e-table-name-filter-container" id="tooltip">
                    <input
                        id="tooltiptext"
                        title="search through account name and number based on input"
                        type="text"
                        placeholder="Search by year..."
                        value={search}
                        onChange={handleSearchChange}
                    />  
                </div>
                {
                    !openFilterMenu &&
                    <div className="filter-menu-container-e" id="tooltip" onClick={() => setOpenFilterMenu(true)}>
                        <p>Month</p>
                    </div>
                }
                {
                    openFilterMenu && 
                    <div className="e-extra-filters-menu">
                        <div className="exit-filter-menu-container">
                            <BiX className="exit-filter-menu" size={30} onClick={() => setOpenFilterMenu(false)}/>
                        </div>
                        <div className="extra-filter-menu-options">
                            <button>Jan</button>
                            <button>Feb</button>
                            <button>Mar</button>
                            <button>Apr</button>
                            <button>May</button>
                            <button>Jun</button>
                            <button>Jul</button>
                            <button>Aug</button>
                            <button>Sep</button>
                            <button>Oct</button>
                            <button>Nov</button>
                            <button>Dec</button>
                        </div>
                    </div>
                }
                <div className={`filter-menu-container-r ${notReflected ? "nr" : ""}`} id="tooltip" onClick={() => setNotReflected(!notReflected)}>
                    <p>Not Reflected yet</p>
                </div>
                { notReflected &&
                    <div className="reflected-mess">
                        <p>Showing all transactions that have not yet reflected</p>
                    </div> 
                }
            </div>
            <table>
                <caption>
                    List of entries related to this account
                </caption>
                <thead>
                    <tr>
                        <th>Journal Id</th>
                        <th>Journal entry Id</th>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody id='tooltip'>
                    { !notReflected &&
                        journalEntries
                        .map((entry) => (
                            <tr key={entry.account_id} onClick={() => handleJournalNavigation(entry.transaction_id)} title="Click to view post reference" id='tooltiptext' className='table-data'>
                                <td data-cell="Journal Id">{entry.transaction_id}</td>
                                <td data-cell="Journal entry Id">{entry.transaction_entry_id}</td>
                                <td data-cell="account">{findAccount(entry.account_id)?.account_name || ""}</td>
                                <td data-cell="amount">{formatCurrency(entry.amount)}</td>
                                <td data-cell="type">{entry.type}</td>
                            </tr>
                        ))
                    }
                    { notReflected &&
                        journalEntriesNotReflected
                        .map((entry) => (
                            <tr key={entry.account_id} onClick={() => handleJournalNavigation(entry.transaction_id)} title="Click to view post reference" id='tooltiptext' className='table-data'>
                                <td data-cell="Journal Id">{entry.transaction_id}</td>
                                <td data-cell="Journal entry Id">{entry.transaction_entry_id}</td>
                                <td data-cell="account">{findAccount(entry.account_id)?.account_name || ""}</td>
                                <td data-cell="amount">{formatCurrency(entry.amount)}</td>
                                <td data-cell="type">{entry.type}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default AccountEntriesTable