import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom";
import { BiSolidFilterAlt, BiX, BiSearch, BiRefresh } from 'react-icons/bi'

function JournalTable({currentUser}) {

  const navigate = useNavigate();
  const [journals, setJournals] = useState([]);
  
  useEffect(() => {
    fetchJournals()
  }, [])

  useEffect(() => {
      console.log("journals", journals)
  }, [journals])

  const fetchJournals = async () => {
      try {
          const response = await fetch("http://127.0.0.1:5000/get_transactions");
          const data = await response.json();
          setJournals(data.allTransactions);
      } catch (error) {
          console.error("Failed to fetch transactions:", error);
          setJournals([]);  // Ensure users is always an array
      }
  };

  const [users, setUsers] = useState([])

  useEffect(() => {
      fetchUsers()
  }, [])

  const fetchUsers = async () => {
      try {
          const response = await fetch("http://127.0.0.1:5000/get_users");
          const data = await response.json();
          setUsers(data.allUsers);
      } catch (error) {
          console.error("Failed to fetch users:", error);
          setUsers([]);  // Ensure users is always an array
      }
  };

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ description: "", date: "", owner: "", status: ""});
  const [isFiltered, setIsFiltered] = useState(false);


  const resetFilters = () => {
      setSearch("");
      setFilters({ description: "", date: "", owner: "", status: ""});
      setIsFiltered(false)
      setOthersFalse()
      setOpenFilterMenu(false)
  };

  const handleFilterChange = (field, value) => {
      setIsFiltered(true)
      setFilters((prevFilters) => ({
          ...prevFilters,
          [field]: value,
      }));
  };

  const filteredJournals = (journals || []).filter((journal) => {
      return (
          (search === "" || journal.description.toLowerCase().includes(search.toLowerCase())) &&
          (filters.date === "" || 
            (filters.date === "Today"    && journal.transaction_date > 0) ||
            (filters.date === "3 days"    && journal.transaction_date < 0) ||
            (filters.date === "1 week"    && journal.transaction_date === 0) ||
            (filters.date === "1 Month"   && journal.transaction_date > 0) ||
            (filters.date === "This year" && journal.transaction_date < 0)
          ) &&
          (filters.status === "" || journal.status.toLowerCase() === filters.status.toLowerCase()) &&
          (filters.owner === "" || journal.user_id === filters.owner)
      );
  });

  const [openFilterMenu, setOpenFilterMenu] = useState(false)
  const [openDateOptions, setOpenDateOptions] = useState(false)
  const [openUserOptions, setOpenUserOptions] = useState(false)
  const [openStatusOptions, setOpenStatusOptions] = useState(false)

  const setOthersFalse = () =>{
      setOpenDateOptions(false)
      setOpenUserOptions(false)
      setOpenStatusOptions(false)
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
      <div className="table-master-container">
            <div className="account-table-filter-options-container">
                <div className="account-table-name-filter-container" id="tooltip">
                    <BiSearch title="search through journal name and number based on input" className='search-icon' id="tooltiptext"/>
                    <input
                        id="tooltiptext"
                        title="search through journal name and number based on input"
                        type="text"
                        placeholder="Search by name or number..."
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
                    <div className="extra-filters-menu">
                        <div className="exit-filter-menu-container">
                            <BiX className="exit-filter-menu" size={30} onClick={() => {setOpenFilterMenu(false), setOthersFalse()}}/>
                        </div>
                        <div className="extra-filter-menu-options">
                            <button className={`${openStatusOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenStatusOptions(!openStatusOptions)}}>Status</button>
                            <button className={`${openDateOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenDateOptions(!openDateOptions)}}>Date</button>
                            <button className={`${openUserOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenUserOptions(!openUserOptions)}}>Owner</button>
                        </div>
                    </div>
                }
                <div className="extra-filter-menu-options-extended">
                    {
                        openStatusOptions && 
                        <div className="extra-filter-menu-options-extended-subcategory">
                            <button onClick={() => handleFilterChange("status", "Accepted")} >Accepted</button>
                            <button onClick={() => handleFilterChange("status", "Rejected")} >Rejected</button>
                            <button onClick={() => handleFilterChange("status", "Pending")} >Pending</button>
                        </div>
                    }
                    {
                        openDateOptions && 
                        <div className="extra-filter-menu-options-extended-active">
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
                                    <button key={user.id} onClick={() => handleFilterChange("owner", user.id)} >
                                        {user.firstName}
                                        <span> </span>
                                        {user.lastName}
                                    </button>
                                ))
                            }
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
                        <th>Transaction ID</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Transaction date</th>
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
    </>
  )
}

export default JournalTable