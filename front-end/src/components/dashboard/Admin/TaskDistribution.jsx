import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '../../../layouts/dashboard/DutyRoster/Button';
import PrimaryButton from '../../../layouts/dashboard/PrimaryButton';
import CustomModal from '../../../models/CustomModal';
import ChangePasskey from '../../../layouts/dashboard/ChangePasskey';
const TaskDistribution = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Predefined passkeys
  const passkeys = {
    userManagement: '12345',
    dutyRosterDoctor: '123456',
    publicInfoUpdateBlog: '1234567'
  };
  const handleButtonClick = () => {
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent("");
  };

  useEffect(() => {
    // Fetch users on component mount
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assume the token is stored with this key
        const response = await axios.get('http://localhost:8000/api/auth/get-all-users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Filter users where roleName is neither "student" nor "doctor"
        const filteredUsers = response.data.data.filter(
          user => user.role.roleName !== 'student' && user.role.roleName !== 'doctor'
        );
        setUsers(filteredUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = parseInt(e.target.value, 10);
    const user = users.find(u => u.userID === userId);
    setSelectedUser(user);
    setError(''); // Clear error when a user is selected
  };

  const generateLink = (task) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/dashboard/${task}`;
  };

  const assignLinkToUser = (task) => {
    if (!selectedUser) {
      setError('No user is selected. Please select a user to assign any task.');
      return;
    }

    console.log(`Link ${generateLink(task)}?passkey=${passkeys[task]} assigned to user ${selectedUser.name}`);
    // API call to assign the link can go here
    setError(''); // Clear error if assignment is successful
  };

  return (
    <div className="bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md pl-24 pr-24 pt-16 pb-24">
      <h2 className="text-xl font-bold text-center">Task Distribution</h2>

      {error && (
        <div role="alert" className="rounded border-s-4 border-red-500 bg-red-50 p-4  m-5">
          <div className="flex items-center gap-2 text-red-800">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
              <path
                fillRule="evenodd"
                d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                clipRule="evenodd"
              />
            </svg>

            <strong className="block font-medium">Error:</strong>
          </div>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      <div className="space-y-2">
        <label className="block font-medium">Select User</label>
        <select
          onChange={handleUserChange}
          className="w-full p-2 border rounded"
          defaultValue=""
        >
          <option value="" disabled>Select a user</option>
          {users.map(user => (
            <option key={user.userID} value={user.userID}>
              {user.name} - {user.email}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2 mt-5">
        <div className='flex flex-col md:flex-row md:justify-between'>
        <label className="block font-medium">User Management Task</label>
        <button    onClick={handleButtonClick}>
          <PrimaryButton title="Change Passkey" bgColor="bg-primaryColor hover:bg-hoverColor" />
        </button>
        </div>
        <input
          type="text"
          value={generateLink('userManagement')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => assignLinkToUser('userManagement')}
          className="w-full"
        >
          <Button title="Assign" />
        </button>
      </div>

      <div className="space-y-2 mt-5">
      <div className='flex flex-col md:flex-row md:justify-between'>
        <label className="block font-medium">Doctor Duty Roster Task</label>
        <button
        onClick={handleButtonClick}
        >
          <PrimaryButton title="Change Passkey" bgColor="bg-primaryColor hover:bg-hoverColor" />
        </button>
        </div>
       
        <input
          type="text"
          value={generateLink('dutyRosterDoctor')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => assignLinkToUser('dutyRosterDoctor')}
          className="w-full"
        >
          <Button title="Assign" />
        </button>
      </div>

      <div className="space-y-2 mt-5">
      <div className='flex flex-col md:flex-row md:justify-between'>
        <label className="block font-medium">Public Info Blog Update Task</label>
        <button    onClick={handleButtonClick}>
          <PrimaryButton title="Change Passkey" bgColor="bg-primaryColor hover:bg-hoverColor" />
        </button>
        </div>
        
        <input
          type="text"
          value={generateLink('publicInfoUpdateBlog')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => assignLinkToUser('publicInfoUpdateBlog')}
          className="w-full"
        >
          <Button title="Assign" />
        </button>
      </div>
      {isModalOpen && (
        <CustomModal isOpen={isModalOpen} onRequestClose={closeModal}>
          <ChangePasskey />
        </CustomModal>
      )}
    </div>
  );
};

export default TaskDistribution;
