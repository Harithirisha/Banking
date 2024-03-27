// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import AdminPage from './pages/AdminPage';
import ApproveAccountsPage from './pages/approveaccount';
import TransactionsPage from './pages/transactions';
import ForgotPassword from './pages/forgotpassword';
import CustomerPage from './pages/CustomerPage';
import CreateAccountPage from './pages/createaccount';
import LoginPage from './pages/login';
import CustomerPageMain from './pages/customer-page-main';
import LoanDetails from './pages/LoanDetails';
import BankRegistration from './pages/BankRegistration';
import Deposit from './pages/Deposit';
import LoanDeposit from './pages/Loandeposit';
import Transactions from './pages/transactions';
import BankTransfer from './pages/Bank-transfer';
import Loan from './pages/Loan';
import UserDetails from './pages/customerdetail';





function App() {
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignupSuccess = () => {
    setIsSignedUp(true);
  };

  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup onSignupSuccess={handleSignupSuccess} />} />
        <Route path="/admin" element={<AdminPage />}/>
        <Route path="/approve-accounts" element={<ApproveAccountsPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/customer-details" element={<UserDetails />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/customer-page-main" element={<CustomerPageMain/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/Loan-details" element={< LoanDetails/>}/>
        <Route path="/Bank-registration" element={< BankRegistration/>}/>
        <Route path= "/deposit" element={<Deposit/>}/>
        <Route path="/Loan" element={<Loan/>}/>
        <Route path="/Bank-transfer" element={<BankTransfer/>}/>
        <Route path="/transactioncustomer" element={<Transactions/>}/>
    
        <Route path="/loandeposit" element={<LoanDeposit/>}/>
        <Route path="*" element={<Signup onSignupSuccess={handleSignupSuccess} />} />

      </Routes>
    </Router>
  );
}

export default App;
