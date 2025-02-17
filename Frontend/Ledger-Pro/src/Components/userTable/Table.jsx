import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import "./Table.css";

const Table = () => {
  return (
    <div className="table-wrapper">
        <table className="table">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Jaedon</td>
                    <td>Linen</td>
                    <td>jlinen1102</td>
                    <td>Westnewton6</td>
                    <td>Admin</td>
                    <td className="label label-Active"><span>Active</span></td>
                    <td className="actions">
                        <div className="delete-btn"><BsFillTrashFill /></div>
                        <BsFillPencilFill />
                    </td>
                </tr>
                <tr>
                    <td>Marcus</td>
                    <td>Carter</td>
                    <td>mcarter1206</td>
                    <td>EastSideHustler44</td>
                    <td>Manager</td>
                    <td className="label label-Inactive"><span>Inactive</span></td>
                    <td className="actions">
                        <div className="delete-btn"><BsFillTrashFill /></div>
                        <BsFillPencilFill />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table;