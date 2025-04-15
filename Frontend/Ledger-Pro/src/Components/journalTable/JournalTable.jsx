import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { BiSolidFilterAlt, BiX, BiSearch, BiRefresh } from 'react-icons/bi'
import './JournalTable.css'

function JournalTable({currentUser}) {

    const navigate = useNavigate();
    const [journals, setJournals] = useState([]);
    const [journalsByFilter, setJournalsByFilter] = useState(false)
    const [journalsF, setJournalsF] = useState([]);

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch("https://render-flask-deployment-ivut.onrender.com/get_users");
            const data = await response.json();
            setUsers(data.allUsers);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);  // Ensure users is always an array
        }
    };

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

    const handleFilterChangeJournals = async (value) => {
        setIsFiltered(true);
        try {
            const response = await fetch(`https://render-flask-deployment-ivut.onrender.com/get_transaction_by_acc/${value}`);
            const data = await response.json();
            setJournalsF(data.allTransactions);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setJournalsF([]);  // Ensure users is always an array
        }
    }



    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ description: "", date: "", type: "",owner: "", status: ""});
    const [isFiltered, setIsFiltered] = useState(false);


    const resetFilters = () => {
        setSearch("");
        setFilters({ description: "", date: "", type: "", owner: "", status: ""});
        setIsFiltered(false)
        setOthersFalse()
        setOpenFilterMenu(false)
        setJournalsByFilter(false)
    };

    const handleFilterChange = (field, value) => {
        setIsFiltered(true)
        setFilters((prevFilters) => ({
            ...prevFilters,
            [field]: value,
        }));
    };

    const filteredJournals = (journals || []).filter((journal) => {

        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const transactionDate = new Date(journal.transaction_date);

        return (
            (search === "" || journal.description.toLowerCase().includes(search.toLowerCase())) &&
            ( filters.date === "" ||
            (filters.date === "Today"    && transactionDate.toDateString() === today.toDateString()) ||
            (filters.date === "3 days"    && transactionDate >= threeDaysAgo && transactionDate <= today) ||
            (filters.date === "1 week"    && transactionDate >= oneWeekAgo && transactionDate <= today) ||
            (filters.date === "1 Month"   && transactionDate >= oneMonthAgo && transactionDate <= today) ||
            (filters.date === "This year" && transactionDate >= startOfYear && transactionDate <= today)
            ) &&
            (filters.type === "" || journal.transaction_type.toLowerCase() === filters.type.toLowerCase()) &&
            (filters.status === "" || journal.status.toLowerCase() === filters.status.toLowerCase()) &&
            (filters.owner === "" || journal.user_id === filters.owner)
        );
    });

    const [journalsByAccountName, setJournalsByAccountName] = useState("")
    const [journalsByAccountNumber, setJournalsByAccountNumber] = useState("")

    const setAccountInfo = (name, number) => {
        setJournalsByAccountName(name)
        setJournalsByAccountNumber(number)
    }

    const filteredJournalsF = (journalsF || []).filter((journal) => {

        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3);

        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(today.getDate() - 7);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(today.getMonth() - 1);

        const startOfYear = new Date(today.getFullYear(), 0, 1);

        const transactionDate = new Date(journal.transaction_date);

        return (
            (search === "" || journal.description.toLowerCase().includes(search.toLowerCase())) &&
            ( filters.date === "" ||
                (filters.date === "Today"    && transactionDate.toDateString() === today.toDateString()) ||
                (filters.date === "3 days"    && transactionDate >= threeDaysAgo && transactionDate <= today) ||
                (filters.date === "1 week"    && transactionDate >= oneWeekAgo && transactionDate <= today) ||
                (filters.date === "1 Month"   && transactionDate >= oneMonthAgo && transactionDate <= today) ||
                (filters.date === "This year" && transactionDate >= startOfYear && transactionDate <= today)
            ) &&
            (filters.type === "" || journal.type.toLowerCase() === filters.type.toLowerCase()) &&
            (filters.status === "" || journal.status.toLowerCase() === filters.status.toLowerCase()) &&
            (filters.owner === "" || journal.user_id === filters.owner)
        );
    });

  const [openFilterMenu, setOpenFilterMenu] = useState(false)
  const [openDateOptions, setOpenDateOptions] = useState(false)
  const [openUserOptions, setOpenUserOptions] = useState(false)
  const [openStatusOptions, setOpenStatusOptions] = useState(false)
  const [openTypeOptions, setOpenTypeOptions] = useState(false)
  const [openAccountNameOptions, setOpenAccountNameOptions] = useState(false)
  const [openAccountNumberOptions, setOpenAccountNumberOptions] = useState(false)

  const setOthersFalse = () =>{
      setOpenDateOptions(false)
      setOpenUserOptions(false)
      setOpenStatusOptions(false)
      setOpenTypeOptions(false)
      setOpenAccountNameOptions(false)
      setOpenAccountNumberOptions(false)
  }

  const handleJournalNavigation = (id) => {
    navigate("/JournalInfo", { state: { currentUser, transaction_id: id } });  
  };

  const formatDate = (dateData) => {
    const timestamp = Date.parse(dateData); // Convert to timestamp
    if (isNaN(timestamp)) {
        console.error("Invalid date:", dateData);
        return "Invalid Date";
    }
    const date = new Date(dateData); // Creates a Date object
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "UTC"  // Force UTC to avoid local conversion
    }).format(date);
};
      
  return (
    <>
    { !journalsByFilter &&
      <div className="table-master-container">
            <div className="account-table-filter-options-container">
                <div className="account-table-name-filter-container" id="tooltip">
                    <BiSearch title="search through journal name and number based on input" className='search-icon' id="tooltiptext"/>
                    <input
                        id="tooltiptext"
                        title="search through journal name and number based on input"
                        type="text"
                        placeholder="Search by description..."
                        value={search}
                        onChange={
                            (e) => {setSearch(e.target.value); 
                            setIsFiltered(true);
                        }}
                    />  
                </div>
                {
                    !openFilterMenu &&
                    <div className="filter-menu-container" id="tooltip" onClick={() => {setOpenFilterMenu(true)}}>
                        <BiSolidFilterAlt size={20} className="filter-icon" id="tooltiptext" title="shows a menu for extra filter options"/>
                    </div>
                }
                {
                    openFilterMenu && 
                    <div className="extra-filters-menu-journal">
                        <div className="exit-filter-menu-container">
                            <BiX className="exit-filter-menu" size={30} onClick={() => {setOpenFilterMenu(false), setOthersFalse()}}/>
                        </div>
                        <div className="extra-filter-menu-options">
                            <button className={`${openStatusOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenStatusOptions(!openStatusOptions)}}>Status</button>
                            <button className={`${openDateOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenDateOptions(!openDateOptions)}}>Date</button>
                            <button className={`${openUserOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenUserOptions(!openUserOptions)}}>Owner</button>
                            <button className={`${openTypeOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenTypeOptions(!openTypeOptions)}}>Type</button>
                            <button className={`${openAccountNameOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenAccountNameOptions(!openAccountNameOptions)}}>Account Name</button>
                            <button className={`${openAccountNumberOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenAccountNumberOptions(!openAccountNumberOptions)}}>Account Number</button>
                        </div>
                    </div>
                }
                <div className="extra-filter-menu-options-extended">
                    {
                        openStatusOptions && 
                        <div className="j-extra-filter-menu-options-extended-subcategory">
                            <button onClick={() => (handleFilterChange("status", "Accepted"), setOpenFilterMenu(false), setOpenStatusOptions(false))} >Accepted</button>
                            <button onClick={() => (handleFilterChange("status", "Rejected"), setOpenFilterMenu(false), setOpenStatusOptions(false))} >Rejected</button>
                            <button onClick={() => (handleFilterChange("status", "Pending"),  setOpenFilterMenu(false), setOpenStatusOptions(false))} >Pending</button>
                        </div>
                    }
                    {
                        openDateOptions && 
                        <div className="j-extra-filter-menu-options-extended-date">
                            <button onClick={() => (setOpenFilterMenu(false), setOpenDateOptions(false), handleFilterChange("date", "Today"    ))} >Today</button>
                            <button onClick={() => (setOpenFilterMenu(false), setOpenDateOptions(false), handleFilterChange("date", "3 days"   ))} >3 days</button>
                            <button onClick={() => (setOpenFilterMenu(false), setOpenDateOptions(false), handleFilterChange("date", "1 week"   ))} >1 week</button>
                            <button onClick={() => (setOpenFilterMenu(false), setOpenDateOptions(false), handleFilterChange("date", "1 Month"  ))} >1 Month</button>
                            <button onClick={() => (setOpenFilterMenu(false), setOpenDateOptions(false), handleFilterChange("date", "This year"))} >This year</button>
                        </div>
                    }
                    {
                        openAccountNameOptions && 
                        <div className="extra-filter-menu-options-extended-owners">
                            {
                                accounts.map((acc) => (
                                    <button key={acc.account_id} onClick={() => (setJournalsByFilter(true), setAccountInfo(acc.account_name, acc.account_num), handleFilterChangeJournals(acc.account_id), setOpenFilterMenu(false), setOpenAccountNameOptions(false))} >
                                        {acc.account_name}
                                    </button>
                                ))
                            }
                        </div>
                    }
                    {
                        openAccountNumberOptions && 
                        <div className="extra-filter-menu-options-extended-owners">
                            {
                                accounts.map((acc) => (
                                    <button key={acc.account_id} onClick={() => (setJournalsByFilter(true), setAccountInfo(acc.account_name, acc.account_num), handleFilterChangeJournals(acc.account_id), setOpenFilterMenu(false), setOpenAccountNumberOptions(false))} >
                                        {acc.account_num}
                                    </button>
                                ))
                            }
                        </div>
                    }
                    {
                        openUserOptions && 
                        <div className="extra-filter-menu-options-extended-owners">
                            {
                                users.map((user) => (
                                    <button key={user.id} onClick={() => (handleFilterChange("owner", user.id), setOpenFilterMenu(false), setOpenUserOptions(false))} >
                                        {user.firstName}
                                        <span> </span>
                                        {user.lastName}
                                    </button>
                                ))
                            }
                        </div>
                    }
                    {
                        openTypeOptions && 
                        <div className="j-extra-filter-menu-options-extended-type">
                            <button onClick={() => (handleFilterChange("type", "transaction"    ), setOpenFilterMenu(false), setOpenTypeOptions(false))} >Transaction</button>
                            <button onClick={() => (handleFilterChange("type", "adjusting"   ), setOpenFilterMenu(false), setOpenTypeOptions(false))} >Adjusting</button>
                        </div>
                    }
                </div>
                {
                    isFiltered &&
                    <div className="filter-menu-container refresh" id="tooltip" onClick={() => resetFilters()}>
                        <BiRefresh size={20} className="filter-icon refresh" id="tooltiptext" title="resets filters"/>
                        <p>Reset Filters</p>
                    </div>
                }
                <div className="accounts-count">
                    <p>{filteredJournals.length}  journal(s) total</p>
                </div>
            </div>
            <table className='accounts-Table'>
                <caption>
                    List of all journals in system
                </caption>
                <thead>
                    <tr>
                        <th>Journal ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Journal date</th>
                        <th>Created By</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id='tooltip'>
                    {filteredJournals.map((journal) => (
                        <tr key={journal.transaction_id} onClick={() => handleJournalNavigation(journal.transaction_id)} title="Click to view more information" id='tooltiptext' className='table-data'>
                            <td data-cell="id"    >{journal.transaction_id}</td>
                            <td data-cell="type"    >{journal.transaction_type}</td>
                            <td data-cell="description"    >{journal.description}</td>
                            <td data-cell="transaction date"    >{formatDate(journal.transaction_date)}</td>
                            <td data-cell="created"        >{journal.user_id}</td>
                            <td data-cell="status"        >{journal.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        }
        { journalsByFilter &&
        <div className="table-master-container">
            <div className="filtered-by-text">
                <h2 className='filtered-account-name'>Table is filtered by account: <span>{journalsByAccountName}</span></h2>
                <h4 className='filtered-account-name'>#: <span>{journalsByAccountNumber}</span> </h4>
            </div>
            <div className="account-table-filter-options-container">
                <div className="account-table-name-filter-container" id="tooltip">
                    <BiSearch title="search through journal name and number based on input" className='search-icon' id="tooltiptext"/>
                    <input
                        id="tooltiptext"
                        title="search through journal name and number based on input"
                        type="text"
                        placeholder="Search by description..."
                        value={search}
                        onChange={
                            (e) => {setSearch(e.target.value); 
                            setIsFiltered(true);
                        }}
                    />  
                </div>
                {
                    !openFilterMenu &&
                    <div className="filter-menu-container" id="tooltip">
                        <BiSolidFilterAlt size={20} className="filter-icon" id="tooltiptext" onClick={() => {setOpenFilterMenu(true)}} title="shows a menu for extra filter options"/>
                    </div>
                }
                {
                    openFilterMenu && 
                    <div className="extra-filters-menu-journalf">
                        <div className="exit-filter-menu-container">
                            <BiX className="exit-filter-menu" size={30} onClick={() => {setOpenFilterMenu(false), setOthersFalse()}}/>
                        </div>
                        <div className="extra-filter-menu-options">
                            <button className={`${openStatusOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenStatusOptions(!openStatusOptions)}}>Status</button>
                            <button className={`${openDateOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenDateOptions(!openDateOptions)}}>Date</button>
                            <button className={`${openUserOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenUserOptions(!openUserOptions)}}>Owner</button>
                            <button className={`${openTypeOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenTypeOptions(!openTypeOptions)}}>Type</button>
                        </div>
                    </div>
                }
                <div className="extra-filter-menu-options-extended">
                    {
                        openStatusOptions && 
                        <div className="j-extra-filter-menu-options-extended-subcategory">
                            <button onClick={() => handleFilterChange("status", "Accepted")} >Accepted</button>
                            <button onClick={() => handleFilterChange("status", "Rejected")} >Rejected</button>
                            <button onClick={() => handleFilterChange("status", "Pending")} >Pending</button>
                        </div>
                    }
                    {
                        openDateOptions && 
                        <div className="j-extra-filter-menu-options-extended-date">
                            <button onClick={() => handleFilterChange("date", "Today"    )} >Today</button>
                            <button onClick={() => handleFilterChange("date", "3 days"   )} >3 days</button>
                            <button onClick={() => handleFilterChange("date", "1 week"   )} >1 week</button>
                            <button onClick={() => handleFilterChange("date", "1 Month"  )} >1 Month</button>
                            <button onClick={() => handleFilterChange("date", "This year")} >This year</button>
                        </div>
                    }
                    {
                        openUserOptions && 
                        <div className="extra-filter-menu-options-extended-owners">
                            {
                                users.map((user) => (
                                    <button key={user.id} onClick={() => (handleFilterChange("owner", user.id), setOpenFilterMenu(false), setOpenUserOptions(false))} >
                                        {user.firstName}
                                        <span> </span>
                                        {user.lastName}
                                    </button>
                                ))
                            }
                        </div>
                    }
                    {
                        openTypeOptions && 
                        <div className="j-extra-filter-menu-options-extended-type">
                            <button onClick={() => handleFilterChange("type", "Today"    )} >Transaction</button>
                            <button onClick={() => handleFilterChange("type", "3 days"   )} >Adjusting</button>
                        </div>
                    }
                </div>
                {
                    isFiltered &&
                    <div className="filter-menu-container refresh" id="tooltip" onClick={() => resetFilters()}>
                        <BiRefresh size={20} className="filter-icon refresh" id="tooltiptext" title="resets filters"/>
                        <p>Reset Filters</p>
                    </div>
                }
                <div className="accounts-count">
                    <p>{filteredJournalsF.length}  journal(s) total</p>
                </div>
            </div>
            <table className='accounts-Table'>
            <caption>
                List of all journals by account: {journalsByAccountName}
            </caption>
                <thead>
                    <tr>
                        <th>Journal ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Journal date</th>
                        <th>Created By</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody id='tooltip'>
                    {filteredJournalsF.map((journal) => (
                        <tr key={journal.transaction_id} onClick={() => handleJournalNavigation(journal.transaction_id)} title="Click to view more information" id='tooltiptext' className='table-data'>
                            <td data-cell="id"    >{journal.transaction_id}</td>
                            <td data-cell="type"    >{journal.transaction_type}</td>
                            <td data-cell="description"    >{journal.description}</td>
                            <td data-cell="transaction date"    >{formatDate(journal.transaction_date)}</td>
                            <td data-cell="created"        >{journal.user_id}</td>
                            <td data-cell="status"        >{journal.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        }
    </>
  )
}

export default JournalTable