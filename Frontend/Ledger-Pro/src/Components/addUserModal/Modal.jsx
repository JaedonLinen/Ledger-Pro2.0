import "./Modal.css";
import {useState} from "react"
import { BiX } from "react-icons/bi";


const Modal = ({closeModal, existingUser = {}, updateCallBack}) => {

    const [firstName, setFirstName] = useState(existingUser.firstName ||  "")
    const [lastName, setLastName] = useState(existingUser.lastName || "")
    const [username, setUsername] = useState(existingUser.username || "")
    const [passwordHash, setPassword] = useState(existingUser.passwordHash || "")
    const [email, setEmail] = useState(existingUser.email || "")
    const [role, setRole] = useState(existingUser.role || "")
    const [dateOfBirth, setDOB] = useState(existingUser.dateOfBirth || "")

    const updating = Object.entries(existingUser).length !== 0

    const onSubmit = async (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            username,
            email,
            passwordHash, 
            dateOfBirth,
            role
        }

        const url = "http://127.0.0.1:5000/" + (updating ? `update_user/${existingUser.id}` : "create_user")
        const options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }

        const response = await fetch (url, options)
        if (response.status !== 201 && response.status !== 200){
            const data = await response.json()
            alert(data.message)
        } else {
            updateCallBack()
        }
    }

  return (
    <div className="modal-container" >
        <div className="modal">
            <div className="exit-btn-container">
                <BiX className="userModal-exit-btn" size='35' onClick={closeModal}/>
            </div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordHash">Password</label>
                    <input type="text" id="passwordHash" value={passwordHash} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="Role">Role</label>
                    <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Admin">Admin</option>
                        <option value="Manager">Manager</option>
                        <option value="Accountant">Accountant</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date of Birth</label>
                    <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDOB(e.target.value)} />
                </div>
                <div className="submit-button-container">
                    <button type="submit" className="addUserModal-btn">submit</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Modal