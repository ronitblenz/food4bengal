import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import data from './aadhaarData.json'; // import your JSON data

const Aadhaar = () => {
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setAadhaarNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (aadhaarNumber.length !== 12) {
      setMessage('Aadhaar number should be a 12-digit number');
      return;
    }
    if (data.includes(aadhaarNumber)) {
      setMessage('Aadhaar number found in the database');
    } else {
      setMessage('Aadhaar number not found in the database');
    }
  };

  const handleContinue = () => {
    // Perform any actions needed before redirecting to the home page
    history.push('/'); // Replace '/home' with the actual route path for your home page
  };

  const containerStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const buttonStyles = {
    height: '48px',
    width: '368px',
    borderRadius: '10px',
    padding: '8px 130px',
    background: '#fb7e00',
    border: 'none',
    color: 'white',
    textAlign: 'center',
    letterSpacing: '0.0015em',
    fontSize: '18px',
  };

  return (
    <div style={containerStyles}>
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter your Aadhaar number:
            <input type="number" value={aadhaarNumber} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{message}</p>
        {message === 'Aadhaar number found in the database' && (
          <button style={buttonStyles} onClick={handleContinue}>
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Aadhaar;
