import {BsFillTrashFill, BsFillPencilFill} from "react-icons/bs";
import "./Table.css";

const Table = () => {
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
                <th>Date Created</th>
            </tr>

            <tr>
                <td data-cell="first name"    >John</td>
                <td data-cell="last name"    >Doe</td>
                <td data-cell="username"    >jdoe123</td>
                <td data-cell="email"        >jdoe@example.com</td>
                <td data-cell="password"     >password123</td>
                <td data-cell="date created"   >2025-02-20</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Jane</td>
                <td data-cell="last name"   >Smith</td>
                <td data-cell="username"   >jsmith</td>
                <td data-cell="email"       >jsmith@example.com</td>
                <td data-cell="password"    >abc123</td>
                <td data-cell="date created">2025-02-19</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Michael</td>
                <td data-cell="last name"   >Brown</td>
                <td data-cell="username"   >mikeb</td>
                <td data-cell="email"       >michaelb@example.com</td>
                <td data-cell="password"    >mike@456</td>
                <td data-cell="date created">2025-02-18</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Emily</td>
                <td data-cell="last name"   >Johnson</td>
                <td data-cell="username"   >emj</td>
                <td data-cell="email"       >emilyj@example.com</td>
                <td data-cell="password"    >emily!2025</td>
                <td data-cell="date created">2025-02-17</td>
            </tr>
            <tr>
                <td data-cell="first name"  >David</td>
                <td data-cell="last name"   >Wilson</td>
                <td data-cell="username"   >davidw</td>
                <td data-cell="email"       >davidw@example.com</td>
                <td data-cell="password"    >d@v1d</td>
                <td data-cell="date created">2025-02-16</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Sophia</td>
                <td data-cell="last name"   >Martinez</td>
                <td data-cell="username"   >sophiam</td>
                <td data-cell="email"       >sophiam@example.com</td>
                <td data-cell="password"    >sophia#456</td>
                <td data-cell="date created">2025-02-15</td>
            </tr>
            <tr>
                <td data-cell="first name"  >James</td>
                <td data-cell="last name"   >Garcia</td>
                <td data-cell="username"   >jgarcia</td>
                <td data-cell="email"       >jamesg@example.com</td>
                <td data-cell="password"    >james!789</td>
                <td data-cell="date created">2025-02-14</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Olivia</td>
                <td data-cell="last name"   >Lopez</td>
                <td data-cell="username"   >olivial</td>
                <td data-cell="email"       >olivial@example.com</td>
                <td data-cell="password"    >olivia@2025</td>
                <td data-cell="date created">2025-02-13</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Ethan</td>
                <td data-cell="last name"   >Harris</td>
                <td data-cell="username"   >ethanh</td>
                <td data-cell="email"       >ethanh@example.com</td>
                <td data-cell="password"    >ethan#123</td>
                <td data-cell="date created">2025-02-12</td>
            </tr>
            <tr>
                <td data-cell="first name"  >Ava</td>
                <td data-cell="last name"   >Clark</td>
                <td data-cell="username"   >avac</td>
                <td data-cell="email"       >avac@example.com</td>
                <td data-cell="password"    >ava!456</td>
                <td data-cell="date created">2025-02-11</td>
            </tr>
        </table>
    </div>
  )
}

export default Table;