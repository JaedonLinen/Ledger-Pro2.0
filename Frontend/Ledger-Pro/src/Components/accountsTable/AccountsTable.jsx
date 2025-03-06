import React from 'react'
import {useState, useEffect} from "react"
import { useNavigate, useLocation } from "react-router-dom";

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

    const formatCurrency = (num) => {
        return `$${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };

    const handleCreateAccountNavigate = () => {
        navigate("/CreateAccount", {state: {currentUser} })  
    };


  return (
    <>
        {currentUser.role === "Admin" &&
            <div className="addUserModalOpen-btn-container">
                <button className="addUserModalOpen-btn" onClick={handleCreateAccountNavigate}>
                    Add Account
                </button>
            </div>
        }
        <div className="table-master-container">
            <table>
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
                <tbody>
                    {accounts.map((account) => (
                        <tr key={account.account_id}>
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