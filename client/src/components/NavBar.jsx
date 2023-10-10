
import { Link } from "react-router-dom";
import "./NavBar.css"; 
import { FaSistrix } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu'; 

function NavBar () {
    return (
    <nav>
    <ul>
      <input className="search"/>
        <FaSistrix className="icon-search"/>
      <li className="links">
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytripAdd">Add</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
      <li>
        <DropdownMenu />
      </li>
    </ul>
  </nav>
)}; 



export default NavBar 

