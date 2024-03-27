import React, { useState } from 'react';
import '../Styles/Banktransfer.css';

function BankTransfer() {
  const loggedInAccountNumber = localStorage.getItem('accountNumber');
  const [confirmedAccountNumber, setConfirmedAccountNumber] = useState('');
  const [ifscCode, setIfscCode] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!window.confirm("Are you sure you want to transfer?")) {
      return; // If user cancels, do nothing
    }
    setConfirmationDialogOpen(false); // Close confirmation dialog

    try {
      // Validate minimum amount
      const minTransactionAmount = 500;
      if (parseFloat(amount) < minTransactionAmount) {
        setError('Minimum transaction amount must be above 500.');
        return;
      }

      // Fetch data from Firestore using the provided IFSC code as document ID
      const response = await fetch(`https://firestore.googleapis.com/v1/projects/common-bank-db/databases/(default)/documents/bank/${ifscCode}`);
      const data = await response.json();

      if (!data.fields) {
        setError('Bank details not found for the provided IFSC code.');
        return;
      }

      const domain = data.fields.domain_name.stringValue;

      // Fetch sender's account data using the retrieved domain
      const senderAccountResponse = await fetch(`https://firestore.googleapis.com/v1/projects/hkb-bank/databases/(default)/documents/Account`);
      const senderAccountData = await senderAccountResponse.json();

      // Search for the sender's account number within the documents
      const senderDocument = senderAccountData.documents.find(doc => {
        const accountNumberField = doc.fields.accountNumber;
        if (accountNumberField) {
          const fieldValue = accountNumberField.integerValue || accountNumberField.stringValue;
          return parseInt(fieldValue) === parseInt(loggedInAccountNumber);
        }
        return false;
      });

      if (!senderDocument) {
        setError('Sender account not found.');
        return;
      }

      // Update the sender's balance
      const senderNewBalance = parseFloat(senderDocument.fields.balance.doubleValue) - parseFloat(amount);
      if (senderNewBalance < 500) {
        setError('Insufficient balance. Minimum balance of 500 required for transactions.');
        return;
      }

      await fetch(`https://firestore.googleapis.com/v1/${senderDocument.name}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            ...senderDocument.fields,
            balance: {
              doubleValue: senderNewBalance
            }
          }
        })
      });

      // Add transaction to sender's transaction history
      await fetch(`https://firestore.googleapis.com/v1/projects/hkb-bank/databases/(default)/documents/Transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            senderAccountNumber: {
              integerValue: parseInt(loggedInAccountNumber)
            },
            receiverAccountNumber: {
              integerValue: parseInt(confirmedAccountNumber)
            },
            type: {
              stringValue: 'Debit'
            },
            amount: {
              doubleValue: parseFloat(amount)
            },
            timestamp: {
              timestampValue: new Date().toISOString()
            }
          }
        })
      });

      // Fetch receiver's account data using the retrieved domain
      const receiverAccountResponse = await fetch(`https://firestore.googleapis.com/v1/projects/${domain}/databases/(default)/documents/Account`);
      const receiverAccountData = await receiverAccountResponse.json();

      // Search for the receiver's account number within the documents
      const receiverDocument = receiverAccountData.documents.find(doc => {
        const accountNumberField = doc.fields.accountNumber;
        if (accountNumberField) {
          const fieldValue = accountNumberField.integerValue || accountNumberField.stringValue;
          return parseInt(fieldValue) === parseInt(confirmedAccountNumber);
        }
        return false;
      });

      if (!receiverDocument) {
        setError('Receiver account not found.');
        return;
      }

      // Update the receiver's balance
      const receiverNewBalance = parseFloat(receiverDocument.fields.balance.doubleValue) + parseFloat(amount);
      await fetch(`https://firestore.googleapis.com/v1/${receiverDocument.name}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            ...receiverDocument.fields,
            balance: {
              doubleValue: receiverNewBalance
            }
          }
        })
      });

      // Add transaction to receiver's transaction history
      await fetch(`https://firestore.googleapis.com/v1/projects/${domain}/databases/(default)/documents/Transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            senderAccountNumber: {
              integerValue: parseInt(loggedInAccountNumber)
            },
            receiverAccountNumber: {
              integerValue: parseInt(confirmedAccountNumber)
            },
            type: {
              stringValue: 'Credit'
            },
            amount: {
              doubleValue: parseFloat(amount)
            },
            timestamp: {
              timestampValue: new Date().toISOString()
            }
          }
        })
      });

      // Show success message if the transaction succeeds
      setSuccessMessage('Transaction successful!');
    } catch (error) {
      // Show error message if the transaction fails
      setError('Transaction failed.');
    } finally {
      // Reset form fields and error state
      setConfirmedAccountNumber('');
      setIfscCode('');
      setAmount('');
    }
  };

  const handleConfirmedAccountNumberChange = (event) => {
    setConfirmedAccountNumber(event.target.value);
  };

  const handleIfscCodeChange = (event) => {
    setIfscCode(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleConfirmTransaction = async () => {
    try {
      // Proceed with the transaction
      await handleSubmit();
    } catch (error) {
      // Show error message if the transaction fails
      setError('Transaction failed.');
    }
  };

  return (
    <div className="bank-transfer-container">
      <h1>Bank Transfer</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="confirmedAccountNumber" className="label">Account Number:</label>
          <input
            type="text"
            id="confirmedAccountNumber"
            value={confirmedAccountNumber}
            onChange={handleConfirmedAccountNumberChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="ifscCode" className="label">IFSC Code:</label>
          <input
            type="text"
            id="ifscCode"
            value={ifscCode}
            onChange={handleIfscCodeChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="label">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={handleAmountChange}
            className="input"
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        {confirmationDialogOpen && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to transfer?</p>
            <button onClick={handleConfirmTransaction} className="confirm-button">Yes</button>
            <button onClick={() => setConfirmationDialogOpen(false)} className="cancel-button">No</button>
          </div>
        )}
        {successMessage && <div className="success">{successMessage}</div>}
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default BankTransfer;
