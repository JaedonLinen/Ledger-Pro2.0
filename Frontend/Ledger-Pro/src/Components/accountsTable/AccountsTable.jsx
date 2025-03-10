import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom";
import { BiSolidFilterAlt, BiX, BiSearch } from 'react-icons/bi'
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
            
            console.log("Fetched Accounts Data:", data);

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
        return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    const handleCreateAccountNavigate = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };

    const [search, setSearch] = useState("");
    const filteredAccounts = accounts.filter((account) =>
        account.account_name.toLowerCase().includes(search.toLowerCase()) || 
        account.account_num.toString().includes(search)
    );

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
                        onChange={(e) => setSearch(e.target.value)}
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
                            <button>Debit</button>
                            <button>Credit</button>
                        </div>
                    }
                    {
                        openCategoryOptions && 
                        <div className="extra-filter-menu-options-extended-category">
                            <button>Assets</button>
                            <button>Expenses</button>
                            <button>Liabilities</button>
                            <button>Equity</button>
                            <button>Revenue</button>
                        </div>
                    }
                    {
                        openSubCategoryOptions && 
                        <div className="extra-filter-menu-options-extended-subcategory">
                            <button>Current Assets</button>
                            <button>Non-Current Assets</button>
                            <button>Current Expenses</button>
                            <button>Non-Current Expenses</button>
                            <button>Current Liabilities</button>
                            <button>Non-Current Liabilities</button>
                            <button>Current Equity</button>
                            <button>Non-Current Equity</button>
                            <button>Current Revenue</button>
                            <button>Non-Current Revenue</button>
                        </div>
                    }
                    {
                        openBalanceOptions && 
                        <div className="extra-filter-menu-options-extended-balance">
                            <button>Balanced</button>
                            <button>Positive</button>
                            <button>Negative</button>
                        </div>
                    }
                    {
                        openActiveOptions && 
                        <div className="extra-filter-menu-options-extended-active">
                            <button>Active</button>
                            <button>Inactive</button>
                        </div>
                    }
                    {
                        openOwnerOptions && 
                        <div className="extra-filter-menu-options-extended-owners">
                            {
                                users.map((user) => (
                                    <button key={user.id}>
                                        {user.firstName}
                                        <span> </span>
                                        {user.lastName}
                                    </button>
                                ))
                            }
                        </div>
                    }
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
                            <td data-cell="number"    >{account.account_name}</td>
                            <td data-cell="name"    >{account.account_num}</td>
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