import React, { useState } from 'react';

const TaskDistribution = () => {
  const [passkeys, setPasskeys] = useState({
    userManagement: '',
    dutyRosterDoctor: '',
    publicInfoUpdateBlog: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasskeys({ ...passkeys, [name]: value });
  };

  const generateLink = (task) => {
    const baseUrl = window.location.origin;
    return `${baseUrl}/dashboard/${task}?passkey=${passkeys[task]}`;
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-xl font-bold text-center">Task Distribution</h2>

      <div className="space-y-2">
        <label className="block font-medium">User Approval Passkey</label>
        <input
          type="text"
          name="userManagement"
          value={passkeys.userManagement}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter passkey for User Management"
        />
        <input
          type="text"
          value={generateLink('userManagement')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => navigator.clipboard.writeText(generateLink('userManagement'))}
          className="mt-2 text-blue-500"
        >
          Copy Link for User Management
        </button>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Doctor Duty Roster Passkey</label>
        <input
          type="text"
          name="dutyRosterDoctor"
          value={passkeys.dutyRosterDoctor}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter passkey for Doctor Duty Roster"
        />
        <input
          type="text"
          value={generateLink('dutyRosterDoctor')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => navigator.clipboard.writeText(generateLink('dutyRosterDoctor'))}
          className="mt-2 text-blue-500"
        >
          Copy Link for Duty Roster
        </button>
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Public Info Blog Update Passkey</label>
        <input
          type="text"
          name="publicInfoUpdateBlog"
          value={passkeys.publicInfoUpdateBlog}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Enter passkey for Public Info Blog Update"
        />
        <input
          type="text"
          value={generateLink('publicInfoUpdateBlog')}
          readOnly
          className="w-full p-2 border rounded mt-2"
        />
        <button
          onClick={() => navigator.clipboard.writeText(generateLink('publicInfoUpdateBlog'))}
          className="mt-2 text-blue-500"
        >
          Copy Link for Public Info Update
        </button>
      </div>
    </div>
  );
};

export default TaskDistribution;
