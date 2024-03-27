// CustomerPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/customerpage.css'; // Import the CSS file

function CustomerPage() {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">HKB</span>
        </div>
        <div className="navbar-right">
          <span>You're secure with us!</span>
        </div>
      </nav>
      <div className='picture'>
      <h1>“Every transaction is an opportunity to make a positive impact and build lasting relationships.”</h1>
      <div className="button-containerss">
        <Link to="/create-account">
          <button>Create an Account</button>
        </Link>
        <Link to="/login">
        <button>Already Have an Account</button>
        </Link>
      </div>
      <div className="bank-info">
        <h2>About Our Bank</h2>
        <p>We extend a warm welcome to our esteemed clients! At our bank, our unwavering commitment is to deliver unparalleled banking services. Emphasizing security, innovation, and utmost customer satisfaction, we dedicate ourselves to fulfilling your financial requirements comprehensively. Whether you seek savings, investment opportunities, or financial assistance, we offer customized solutions crafted just for you. Our team of seasoned professionals stands ready to guide you through every financial endeavor with expertise and care. Thank you for entrusting us as your preferred financial ally..</p>
        <div className="awards">
          <h3>Awards and Recognition</h3>
          <div className="award-box">
            <h4>National Award for Outstanding Performance in SHG Bank linkage by DAY NRLM MoRD</h4>
            <p>Received for FY21-22.</p>
          </div>
          <div className="award-box">
            <h4>Shine & Succeed Award from PFRDA</h4>
            <p>Received for good performance in APY Campaign.</p>
          </div>
         <div className="award-box">
           <h4>Leading Nominated Bank for Gold</h4>
           <p>Received for 2022-23.</p>
         </div>
         <div className="award-box">
           <h4>Model Bank of the Year</h4>
           <p>Received at the Celent Model Bank Awards 2023.</p>
         </div>
      </div>
    </div>
  </div>
      <footer className="footer">
        <h3>Contact Details</h3>
        <p>If you have any questions or need assistance, feel free to contact us:</p>
        <ul>
          <li>Email: info@bank.com</li>
          <li>Phone: 123-456-7890</li>
          <li>Address: 490 Down town Street, City, Country</li>
        </ul>
      </footer>
    </div>
  );
}

export default CustomerPage;
