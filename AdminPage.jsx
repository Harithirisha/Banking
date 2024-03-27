import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/admin.css'; // Import CSS file for admin page styles

function AdminPage() {
  return (
    <div className="admin-container" style={{ backgroundColor: '#f0f0f0', padding: '20px' }}>
      <h1 style={{ color: '#18676b', }}>Welcome Admin!</h1>
      <div className="button-containers">
        <Link to="/approve-accounts">
          <button className="admin-button">Approval of Accounts</button>
        </Link>
        <Link to="/transactions">
          <button className="admin-button">Transactions Done</button>
        </Link>
        <Link to="/customer-details">
          <button className="admin-button">Customer Details</button>
        </Link>
        <Link to="/Loan-details">
          <button className="admin-button">Loan Details</button>
        </Link>
        <Link to="/Bank-registration">
          <button className="admin-button">Bank Registration Main</button>
        </Link>
      </div>
      <div className="quote-container">
        <p className="quote">
          "Be the architect of your financial destiny; design a blueprint for success."
        </p>
        <p className="author">- HARITHIRISHA</p>
      </div>
    </div>
  );
}

export default AdminPage;
