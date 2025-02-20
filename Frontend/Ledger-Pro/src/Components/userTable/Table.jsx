import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import "./Table.css";
import { useState } from "react";
import { useEffect } from "react";

const Table = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        const response = await fetch("http://127.0.0.1:5000/get_users")
        const data = await response.json()
        setUsers(data.users)
        console.log(data.users)
    }


  return (
    <div className="table-master-container">
        <table>
            <caption>
                List of all users in system
            </caption>

            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Date of Birth</th>
                <th>Date Created</th>
            </tr>

            <tr>
                <td data-cell="first name"    >John</td>
                <td data-cell="last name"    >Doe</td>
                <td data-cell="username"    >jdoe123</td>
                <td data-cell="email"        >jdoe@example.com</td>
                <td data-cell="password"     >password123</td>
                <td data-cell="role"        >jdoe@example.com</td>
                <td data-cell="date of birth"     >password123</td>
                <td data-cell="date created"   >2025-02-20</td>
            </tr>
        </table>
    </div>
  )
}

export default Table;