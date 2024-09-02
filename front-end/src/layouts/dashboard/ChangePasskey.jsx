import React, { useState } from 'react';

const ChangePasskey = () => {
  const [inputPassword, setInputPassword] = useState('');
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [newPasskey, setNewPasskey] = useState('');
  const [currentPasskey, setCurrentPasskey] = useState('123456'); // Placeholder for current passkey

  const handlePasswordChange = (e) => {
    setInputPassword(e.target.value);
  };

  const verifyPassword = () => {
    const correctPassword = '123456'; // Replace this with the actual password
    if (inputPassword === correctPassword) {
      setPasswordMatched(true);
    } else {
      alert('Incorrect password');
    }
  };

  const handlePasskeyChange = (e) => {
    setNewPasskey(e.target.value);
  };

  const updatePasskey = () => {
    console.log(`Passkey updated to: ${newPasskey}`);
    // Add API call here to update the passkey
  };

  return (
  <div className='flex place-content-center'>
      <div className="w-full max-w-xs p-5 bg-white rounded-lg font-mono">
      {!passwordMatched ? (
        <>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password-input">
            Enter your password to continue
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter your password"
            type="password"
            id="password-input"
            value={inputPassword}
            onChange={handlePasswordChange}
          />
          <button
            className="mt-3 w-full px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-hoverColor transition duration-300"
            onClick={verifyPassword}
          >
            Verify Password
          </button>
        </>
      ) : (
        <>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="current-passkey">
            Current Passkey
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-100"
            type="text"
            id="current-passkey"
            value={currentPasskey}
            readOnly
          />
          <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="new-passkey">
            Change Passkey
          </label>
          <input
            className="text-sm custom-input w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm transition duration-300 ease-in-out transform focus:-translate-y-1 focus:outline-blue-300 hover:shadow-lg hover:border-blue-300 bg-gray-100"
            placeholder="Enter new passkey"
            type="text"
            id="new-passkey"
            value={newPasskey}
            onChange={handlePasskeyChange}
          />
          <button
            className="mt-3 w-full px-4 py-2 bg-primaryColor text-white rounded-lg hover:bg-hoverColor transition duration-300"
            onClick={updatePasskey}
          >
            Update Passkey
          </button>
        </>
      )}
    </div>
  </div>
  );
};

export default ChangePasskey;
