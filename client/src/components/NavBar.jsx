import { Link } from "react-router-dom";
import "./NavBar.css"; 
import { useContext } from "react";
import { AuthenticationContext } from "./AuthContext";
import { FaSistrix } from 'react-icons/fa';
import DropdownMenu from './DropdownMenu'; 

function NavBar() {
  const { isAuthenticated } = useContext(AuthenticationContext);


  return (
    <nav>
    <ul>
      <input className="search"/>
        <FaSistrix className="icon-search"/>
    
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytripadd">Add</Link>
      </li>
      <li>
            {isAuthenticated ? (
              <Link to="/logout">Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
          <li>
        <DropdownMenu />
      </li>
    </ul>
  </nav>
)}; 

export default NavBar;
