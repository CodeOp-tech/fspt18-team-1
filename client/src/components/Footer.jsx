import React, { useState } from 'react';
import "./Footer.css"; 
import {  FaFacebookF, FaApple, FaInstagram, FaTwitter } from 'react-icons/fa';



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
          <FaFacebookF /> {/* Usar el ícono de Facebook */}
          <FaApple />  {/* Usar el ícono de Apple */}
          <FaInstagram />
          <FaTwitter />
        </div>
      </div>
    </div>
  </footer>
  );
}

export default Footer;
