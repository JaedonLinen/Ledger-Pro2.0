import "./Table.css";
import { useState } from "react";
import { useEffect } from "react";
import Modal from '../addUserModal/Modal.jsx'
import { BiSolidTrash, BiEdit, BiPlus } from "react-icons/bi";


const Table = () => {

    const [modalOpen, setModalOpen] = useState(false)







    const [users, setUsers] = useState([])

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://127.0.0.1:5000/get_users");
            const data = await response.json();
            console.log("API Response:", data);
            setUsers(data.allUsers);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setUsers([]);  // Ensure users is always an array
        }
    };


  return (
    <>
        <div className="addUserModalOpen-btn-container">
            <button className="addUserModalOpen-btn" onClick={() => setModalOpen(true)}>
                Add User
            </button>
        </div>
        {modalOpen && <Modal closeModal={() => {
            setModalOpen(false)
        }}/>}
        <div className="table-master-container">
            
            <table>
                <caption>
                    List of all users in system
                </caption>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Role</th>
                        <th>Date of Birth</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td data-cell="first name"    >{user.firstName}</td>
                            <td data-cell="last name"    >{user.lastName}</td>
                            <td data-cell="username"    >{user.username}</td>
                            <td data-cell="email"        >{user.email}</td>
                            <td data-cell="password"     >{user.passwordHash}</td>
                            <td data-cell="role"        >{user.role}</td>
                            <td data-cell="date of birth"     >{user.dateOfBirth}</td>
                            <td>
                                <BiEdit />
                                <BiSolidTrash />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>
  )
}

export default Table;