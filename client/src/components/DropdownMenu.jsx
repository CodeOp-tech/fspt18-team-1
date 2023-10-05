import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./DropdownMenu.css";
import {  FaBars } from 'react-icons/fa';



function DropdownMenu() {
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleMenu = () => {
        console.log('Toggle menu');
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="dropdown">
        <button onClick={toggleMenu}>
            <FaBars />
        </button>
        {isOpen && (
          <ul className="menu">
            <li>
                <Link to="/login">Login</Link>
            </li>
            <div className="continentes">
            <li>Europa</li> 
            <li>Asia</li>
            <li>America</li>
            <li>Africa</li>
            <li>Oceania</li>
            <li>Antártida</li>
            </div>
          </ul>
        )}
      </div>
    );
  }
  
  export default DropdownMenu;