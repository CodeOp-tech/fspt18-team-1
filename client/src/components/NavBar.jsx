
import { Link } from "react-router-dom";
import "./NavBar.css"; 

function NavBar () {
    return (
    <nav>
    <ul>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytripAdd">Add</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
    </ul>
  </nav>
)}; 

export default NavBar 
