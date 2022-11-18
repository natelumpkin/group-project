import React from 'react';
import { NavLink } from 'react-router-dom';

import './Footer.css';

const Footer = () => {

  return (
    <div className="signature-container">
      <NavLink to='/about'>
        <span className='about-link'>
          About
          </span>
      </NavLink>
      <div className="signature-content">
        <span> Nate Lumpkin
          <a href="https://www.linkedin.com/in/nate-lumpkin-a6180a16/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/natelumpkin" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github"></i></a>
        </span>
      </div>
      <div className="signature-content">
        <span> Max Yaswen
          <a href="https://www.linkedin.com/in/max-yaswen-6b4132184/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/myaswen" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github"></i></a>
        </span>
      </div>
      <div className="signature-content">
        <span> David Siwulec
          {/* <a href=""><i className="fa-brands fa-linkedin"></i></a> */}
          <a href="https://github.com/dsiwulec" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github"></i></a>
        </span>
      </div>
      <div className="signature-content">
        <span> Bradley Lewter
          <a href="https://www.linkedin.com/in/bradley-lewter/" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-linkedin"></i></a>
          <a href="https://github.com/DairyDuke" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-square-github"></i></a>
        </span>
      </div>
    </div>
  )
}

export default Footer;
