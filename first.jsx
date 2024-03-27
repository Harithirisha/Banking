import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css';

const Navbar = () => {
  return (
    <div className='background'>
    <header className="navbar">
      <div className="nav-left">
        <nav>
          <ul>
            <li><Link to="/signup" className="signup-btn">Sign Up</Link></li>
          </ul>
        </nav>
      </div>
    </header>
    <div className="quote">
    <h1>HKB</h1>
  </div>
  </div>
  );
}

export default Navbar;
