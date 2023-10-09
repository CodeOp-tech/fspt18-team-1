import { Link } from "react-router-dom";
import "./NavBar.css"; 
import { useContext } from "react";
import { AuthenticationContext } from "./AuthContext";

function NavBar() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return (
    <nav>
      <ul>
        <div className="search-bar">
          <form className="flex flex-col items-start"></form>
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
  );
}

export default NavBar;
