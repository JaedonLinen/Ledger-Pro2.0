import "./Table.css";
import { useState } from "react";
import { useEffect } from "react";
import Modal from '../addUserModal/Modal.jsx'
import ConfirmModal from '../addUserConfirmModal/addUserConfirmModal.jsx'
import { BiSolidTrash, BiEdit } from "react-icons/bi";


const Table = () => {

    const [modalOpen, setModalOpen] = useState(false)

    const [currentUser, setCurrentUser] = useState({})

    const [confirmModalOpen, setConfirmModalOpen] = useState(false)

    const [users, setUsers] = useState([])

    const onUserUpdate = () => {
        setCurrentUser({})
        setModalOpen(false)
        fetchUsers()
    }

    const onDeleteUpdate = () => {
        setCurrentUser({})
        setConfirmModalOpen(false)
        fetchUsers()
    }

    const openModal = () => {
        setCurrentUser({})
        setModalOpen(true)
    }

    const openEditModal = (user) => {
        setCurrentUser(user)
        setModalOpen(true)
    }

    const openDeleteConfirmation = (user) => {
        setCurrentUser(user)
        setConfirmModalOpen(true)
    }

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

    const formatDate = (dateData) => {
        const date = new Date(dateData)
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
        }).format(date);
    }


  return (
    <>
        <div className="addUserModalOpen-btn-container">
            <button className="addUserModalOpen-btn" onClick={() => openModal()}>
                Add User
            </button>
        </div>
        {modalOpen && <Modal 
            closeModal={() => {setModalOpen(false)}}
            existingUser={currentUser}
            updateCallBack={onUserUpdate}
        />}
        {confirmModalOpen && <ConfirmModal 
            closeModal={() => {setConfirmModalOpen(false)}}
            existingUser={currentUser}
            updateDelete={onDeleteUpdate}
        />}
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
                            <td data-cell="role"        >{user.role}</td>
                            <td data-cell="date of birth"     >{formatDate(user.dateOfBirth)}</td>
                            <td>
                                <div className="actions-container">
                                    <BiEdit size={22} className="actions-btn" onClick={() => openEditModal(user)}/>
                                    <BiSolidTrash size={22} className="actions-btn" style={{ fill: '#954535' }} onClick={() => openDeleteConfirmation(user)}/>
                                </div>
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