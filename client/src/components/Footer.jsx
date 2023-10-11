import React, { useState } from 'react';
import "./Footer.css"; 
import {  FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaTiktok} from 'react-icons/fa';



function Footer() {
  return (
    <footer>
    <div className="footer-content">
      <div className="left-content">
        <p>Elena Manea</p>
        <p>Vanessa Cavaco</p>
        <p>Vinay Font</p>
      </div>
      <div className="right-content">
        <div className="icons">
          <FaFacebookF /> 
          <FaLinkedinIn />  
          <FaInstagram />
          <FaTwitter />
          <FaTiktok />
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
