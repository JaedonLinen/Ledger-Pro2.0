import "./Modal.css";
import {useState} from "react"


const Modal = ({closeModal}) => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [passwordHash, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [role, setRole] = useState("")
    const [dateOfBirth, setDOB] = useState("")

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

        const url = "http://127.0.0.1:5000/create_user"
        const options = {
            method: "POST",
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
            // successfull
        }
    }

  return (
    <div className="modal-container" onClick={closeModal}>
        <div className="modal">
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
                <button type="submit" className="btn">submit</button>
            </form>
        </div>
    </div>
  )
}

export default Modal