import React, { useState, useEffect } from 'react';
import '../Styles/customerdetails.css';
 
function UserDetails() {
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    fetchUserDetails();
  }, []);
 
  const fetchUserDetails = async () => {
    try {
      const response = await fetch('https://firestore.googleapis.com/v1/projects/hkb-bank/databases/(default)/documents/Account');
      const data = await response.json();
      setUserDetails(data.documents);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching user details:', error);
      setIsLoading(false);
    }
  };
 
  return (
<div style={{ padding: '20px', backgroundColor: '#18676b', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
  <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '20px', letterSpacing: '0px',fontStyle:'italic' }}>Customer Details</h2>
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {userDetails.map((user, index) => (
        <li key={index} style={{ marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px', padding: '15px', backgroundColor: '#ffffff' }}>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>Name:</strong> {user.fields.name.stringValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>Balance:</strong> {user.fields.balance.doubleValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>customerId:</strong> {user.fields.customerId.stringValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>accountNumber:</strong> {user.fields.accountNumber.integerValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>age:</strong> {user.fields.age.integerValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>PhoneNumber:</strong> {user.fields.phoneNumber.stringValue}</div>
          <div style={{ marginBottom: '10px' }}><strong style={{ color: '#6c757d', marginRight: '5px' }}>email:</strong> {user.fields.email.stringValue}</div>
          {/* Add more fields as needed */}
        </li>
      ))}
    </ul>
  )}
</div>
 
 
 
  );
}
export default UserDetails;