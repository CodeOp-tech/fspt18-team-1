
import { Link } from "react-router-dom";
import "./NavBar.css"; 

function NavBar () {
    return (
    <nav>
    <ul>
    <div className="search-bar">
    <form className="flex flex-col items-start"></form>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/trips">Trips</Link>
      </li>
      <li>
        <Link to="/mytripadd">Add</Link>
      </li>
      <li>
        <Link to="/logout">Logout</Link>
      </li>
      </div>
    </ul>
    <ul>
    <div className="continentes">
      <li>Europa</li> 
      <li>Asia</li>
      <li>America</li>
      <li>Africa</li>
      <li>Oceania</li>
      <li>Antártida</li>
      </div>
     
    </ul>
  </nav>
)}; 

export default NavBar 
