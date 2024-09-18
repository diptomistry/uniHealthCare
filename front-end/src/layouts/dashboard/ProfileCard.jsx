import React from 'react';
import axios from 'axios';

const ProfileCard = ({ profile }) => {
  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };
  const handleAccept = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/update-status", 
        {
          user_id: profile.userID, // Assuming profile.userID exists
          status: "Approved"
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}` // Authorization header with the token
          }
        }
      );
      
      alert("User status updated successfully");
      window.location.reload(); // Reload the page to reflect the changes
      console.log(response.data); // Log the response to check the result
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  // Function to handle user rejection
  const handleReject = async () => {
    const token = localStorage.getItem('token'); // Get token from localStorage

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/update-status", 
        {
          user_id: profile.userID, // Assuming profile.userID exists
          status: "Deleted"
        }, 
        {
          headers: {
            Authorization: `Bearer ${token}` // Authorization header with the token
          }
        }
      );
      
      alert("User rejected successfully");
      window.location.reload(); // Reload the page to reflect the changes
      console.log(response.data); // Log the response to check the result
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };
  return (
    <div className="max-w-xs">
      <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
          <div className="w-32 h-32 rounded-full mx-auto bg-gray-300 flex items-center justify-center text-4xl font-bold text-gray-700">
            {getInitials(profile.name)}
          </div>
        </div>
        <div className="p-2">
          <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{profile.name || 'N/A'}</h3>
          <div className="text-center text-gray-400 text-xs font-semibold">
            <p>{profile.role?.roleName || 'Unknown Role'}</p>
          </div>
          <table className="text-xs my-3">
            <tbody>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Address</td>
                <td className="px-2 py-2">{profile.address || 'N/A'}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                <td className="px-2 py-2">{profile.phone || 'N/A'}</td>
              </tr>
              <tr>
                <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                <td className="px-2 py-2">{profile.email || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between p-5">
            <button onClick={handleAccept} className="bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-hoverColor transition duration-300 ease-in-out">
              Accept
            </button>
            <button
              onClick={handleReject} 
              type="button"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
