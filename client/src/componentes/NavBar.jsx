
import { Link } from "react-router-dom";
import "./NavBar.css"; 

function NavBar () {
    return (
    <nav>
    <ul>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytrip">Mytrip</Link>
      </li>
    </ul>
  </nav>
)}; 

export default NavBar 
