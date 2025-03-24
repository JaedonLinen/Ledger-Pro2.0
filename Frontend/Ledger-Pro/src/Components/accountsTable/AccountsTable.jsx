import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidFilterAlt, BiX, BiSearch, BiRefresh } from 'react-icons/bi'
import './AccountsTable.css'

function AccountsTable() {

    const navigate = useNavigate();
    const location = useLocation();
    const { currentUser } = location.state;

    if (!currentUser){
        return <div className='error'>User not found...</div>;
    }

    const [accounts, setAccounts] = useState([])

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

    const handleCreateAccountNavigate = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };

    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({ side: "", category: "", subcategory: "", balance: "", status: "", owner: "" });
    const [isFiltered, setIsFiltered] = useState(false);


    const resetFilters = () => {
        setSearch("");
        setFilters({ side: "", category: "", subcategory: "", balance: "", status: "", owner: "" });
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

    const filteredAccounts = accounts.filter((account) => {
        return (
            (search === "" || 
                account.account_name.toLowerCase().includes(search.toLowerCase()) || 
                account.account_num.toString().includes(search)) &&  // <-- Keep `&&` to apply all filters
            (filters.side === "" || account.normal_side.toLowerCase() === filters.side.toLowerCase()) &&
            (filters.category === "" || account.category.toLowerCase() === filters.category.toLowerCase()) &&
            (filters.subcategory === "" || account.subcategory.toLowerCase() === filters.subcategory.toLowerCase()) &&
            (filters.status === "" || account.isActive.toString() === filters.status) && // Changed `includes` to strict comparison
            (filters.owner === "" || account.account_owner === filters.owner) &&
            (filters.balance === "" || 
                (filters.balance === "Positive" && account.balance > 0) ||
                (filters.balance === "Negative" && account.balance < 0) ||
                (filters.balance === "Balanced" && account.balance === 0)
            )
        );
    });

    const [openFilterMenu, setOpenFilterMenu] = useState(false)
    const [openSideOptions, setOpenSideOptions] = useState(false)
    const [openCategoryOptions, setOpenCategoryOptions] = useState(false)
    const [openSubCategoryOptions, setOpenSubCategoryOptions] = useState(false)
    const [openBalanceOptions, setOpenBalanceOptions] = useState(false)
    const [openActiveOptions, setOpenActiveOptions] = useState(false)
    const [openOwnerOptions, setOpenOwnerOptions] = useState(false)

    const setOthersFalse = () =>{
        setOpenSideOptions(false)
        setOpenCategoryOptions(false)
        setOpenSubCategoryOptions(false)
        setOpenBalanceOptions(false)
        setOpenActiveOptions(false)
        setOpenOwnerOptions(false)
    }

    const handleAccountNavigation = (id) => {
        navigate("/AccountGeneralInformation", {
            state: {
                currentUser,
                id
            } 
        })}



  return (
    <>
        {currentUser.role === "Admin" &&
            <div className="addUserModalOpen-btn-container" id="tooltip">
                <button title="create a new account here" className="addUserModalOpen-btn" id="tooltiptext" onClick={handleCreateAccountNavigate}>
                    Add Account
                </button>
            </div>
        }
        <div className="table-master-container">
            <div className="account-table-filter-options-container">
                <div className="account-table-name-filter-container" id="tooltip">
                    <BiSearch title="search through account name and number based on input" className='search-icon' id="tooltiptext"/>
                    <input
                        id="tooltiptext"
                        title="search through account name and number based on input"
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
                            <button className={`${openSideOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenSideOptions(!openSideOptions)}}>Side</button>
                            <button className={`${openCategoryOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenCategoryOptions(!openCategoryOptions)}}>Category</button>
                            <button className={`${openSubCategoryOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenSubCategoryOptions(!openSubCategoryOptions)}}>Subcategory</button>
                            <button className={`${openBalanceOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenBalanceOptions(!openBalanceOptions)}}>Balance</button>
                            <button className={`${openActiveOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenActiveOptions(!openActiveOptions)}}>Status</button>
                            <button className={`${openOwnerOptions ? "clicked" : ""}`} onClick={() => {setOthersFalse(), setOpenOwnerOptions(!openOwnerOptions)}}>Owner</button>
                        </div>
                    </div>
                }
                <div className="extra-filter-menu-options-extended">
                    {
                        openSideOptions && 
                        <div className="extra-filter-menu-options-extended-side">
                            <button onClick={() => handleFilterChange("side", "Debit")}>Debit</button>
                            <button onClick={() => handleFilterChange("side", "Credit")}>Credit</button>
                        </div>
                    }
                    {
                        openCategoryOptions && 
                        <div className="extra-filter-menu-options-extended-category">
                            <button onClick={() => handleFilterChange("category", "Assets")} >Assets</button>
                            <button onClick={() => handleFilterChange("category", "Expenses")} >Expenses</button>
                            <button onClick={() => handleFilterChange("category", "Liabilities")} >Liabilities</button>
                            <button onClick={() => handleFilterChange("category", "Equity")} >Equity</button>
                            <button onClick={() => handleFilterChange("category", "Revenue")} >Revenue</button>
                        </div>
                    }
                    {
                        openSubCategoryOptions && 
                        <div className="extra-filter-menu-options-extended-subcategory">
                            <button onClick={() => handleFilterChange("subcategory", "Current Assets")} >Current Assets</button>
                            <button onClick={() => handleFilterChange("subcategory", "Non-Current Assets")} >Non-Current Assets</button>
                            <button onClick={() => handleFilterChange("subcategory", "Current Expenses")} >Current Expenses</button>
                            <button onClick={() => handleFilterChange("subcategory", "Non-Current Expenses")} >Non-Current Expenses</button>
                            <button onClick={() => handleFilterChange("subcategory", "Current Liabilities")} >Current Liabilities</button>
                            <button onClick={() => handleFilterChange("subcategory", "Non-Current Liabilities")} >Non-Current Liabilities</button>
                            <button onClick={() => handleFilterChange("subcategory", "Current Equity")} >Current Equity</button>
                            <button onClick={() => handleFilterChange("subcategory", "Non-Current Equity")} >Non-Current Equity</button>
                            <button onClick={() => handleFilterChange("subcategory", "Current Revenue")} >Current Revenue</button>
                            <button onClick={() => handleFilterChange("subcategory", "Non-Current Revenue")} >Non-Current Revenue</button>
                        </div>
                    }
                    {
                        openBalanceOptions && 
                        <div className="extra-filter-menu-options-extended-balance">
                            <button onClick={() => handleFilterChange("balance", "Balanced")} >Balanced</button>
                            <button onClick={() => handleFilterChange("balance", "Positive")} >Positive</button>
                            <button onClick={() => handleFilterChange("balance", "Negative")} >Negative</button>
                        </div>
                    }
                    {
                        openActiveOptions && 
                        <div className="extra-filter-menu-options-extended-active">
                            <button onClick={() => handleFilterChange("status", "true")} >Active</button>
                            <button onClick={() => handleFilterChange("status", "false")} >Inactive</button>
                        </div>
                    }
                    {
                        openOwnerOptions && 
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
                    <p>{filteredAccounts.length}  account(s) total</p>
                </div>
            </div>
            <table className='accounts-Table'>
                <caption>
                    List of all accounts in system
                </caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Description</th>
                        <th>Side</th>
                        <th>Category</th>
                        <th>Balance</th>
                        <th>Active</th>
                        <th>Owner</th>
                    </tr>
                </thead>
                <tbody id='tooltip'>
                    {filteredAccounts.map((account) => (
                        <tr key={account.account_id} onClick={() => handleAccountNavigation(account.account_id)} title="Click to view more information" id='tooltiptext' className='table-data'>
                            <td data-cell="name"    >{account.account_name}</td>
                            <td data-cell="number"    >{account.account_num}</td>
                            <td data-cell="description"    >{account.account_desc}</td>
                            <td data-cell="side"        >{account.normal_side}</td>
                            <td data-cell="category"     >{account.category}</td>
                            <td data-cell="balance"        >{formatCurrency(account.balance)}</td>
                            <td data-cell="active"        >{JSON.stringify(account.isActive)}</td>
                            <td data-cell="owner"        >{account.account_owner}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default AccountsTable