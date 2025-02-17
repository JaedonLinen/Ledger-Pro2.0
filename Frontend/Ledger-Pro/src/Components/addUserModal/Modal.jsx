import "./Modal.css";

const Modal = ({closeModal}) => {
  return (
    <div className="modal-container" onClick={closeModal}>
        <div className="modal">
            <form>
                <div className="form-group">
                    <label htmlFor="First Name">First Name</label>
                    <input name="First Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="Last Name">Last Name</label>
                    <input name="Last Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="UserName">Username</label>
                    <input name="UserName" />
                </div>
                <div className="form-group">
                    <label htmlFor="Password">Password</label>
                    <input name="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="Role">Role</label>
                    <select name="Role">
                        <option value="Admin">Admin</option>
                        <option value="Manager">Admin</option>
                        <option value="Accountant">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn">submit</button>
            </form>
        </div>
    </div>
  )
}

export default Modal