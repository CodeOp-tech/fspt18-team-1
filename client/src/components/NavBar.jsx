
import { Link } from "react-router-dom";
import "./NavBar.css"; 

function NavBar () {
    return (
    <nav>
    <ul>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytrip">Mytrip</Link>
      </li>
      <li>
        <Link to="/mytripAdd">Add</Link>
      </li>
    </ul>
  </nav>
)}; 

export default NavBar 
