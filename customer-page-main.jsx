import React, { useState, useEffect } from 'react';
import '../Styles/maincustomer.css';
import { Link } from 'react-router-dom';

const CustomerPageMain = () => {
  const [customerDetails, setCustomerDetails] = useState(null);
  const [error, setError] = useState(null);

  const fetchCustomerDetails = async (accountNumber) => {
    try {
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/hkb-bank/databases/(default)/documents/Account`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }
      const data = await response.json();

      let matchedDocument = null;
      for (const doc of data.documents) {
        const fields = doc.fields;
        if (fields && fields.accountNumber && parseInt(fields.accountNumber.integerValue) === parseInt(accountNumber)) {
          matchedDocument = doc;
          break;
        }
      }

      if (matchedDocument) {
        const accountNumber = matchedDocument.fields.accountNumber.integerValue;
        const customerName = matchedDocument.fields.name ? matchedDocument.fields.name.stringValue : 'N/A';
        const email = matchedDocument.fields.email ? matchedDocument.fields.email.stringValue : 'N/A';
        const balance = matchedDocument.fields.balance ? matchedDocument.fields.balance.doubleValue : 0;
        const phone = matchedDocument.fields.phoneNumber ? matchedDocument.fields.phoneNumber.stringValue : 'N/A';

        setCustomerDetails({
          accountNumber,
          customerName,
          email,
          balance,
          phone,
          
        });
      } else {
        setError('Customer details not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const loggedInAccountNumber = localStorage.getItem('accountNumber');

    if (loggedInAccountNumber) {
      fetchCustomerDetails(loggedInAccountNumber);
    } else {
      setError('Account number not found in local storage');
    }
  }, []);

  return (
    <div className="maincustomer">
      <div className="customer-details">
        <h1>Welcome {customerDetails && customerDetails.customerName}</h1>
        {error && <p>{error}</p>}
        {customerDetails && (
          <div>
            <h2>Customer Details</h2>
            <p className="account-number">Account Number: {customerDetails.accountNumber}</p>
            <p className="customer-name">Customer Name: {customerDetails.customerName}</p>
            <p className="email">Email: {customerDetails.email}</p>
            <p className="balance">Balance: {customerDetails.balance}</p>
            <p className="phone-number">Phone Number: {customerDetails.phone}</p>
            
            <div className="buttons">
              <Link to="/Loan">
                <button>Apply for Loan</button>
              </Link>
              <Link to="/transactioncustomer">
                <button>View Transaction History</button>
              </Link>
              <Link to={{
                pathname: "/Bank-transfer",
                state: { senderAccountNumber: customerDetails.accountNumber } // Pass sender's account number as state
              }}>
                <button>Bank Transfer</button>
              </Link>
              <Link to="/deposit">
                <button>Deposit</button>
              </Link>
              <Link to="/loandeposit">
                <button>Loan Deposit</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerPageMain;
