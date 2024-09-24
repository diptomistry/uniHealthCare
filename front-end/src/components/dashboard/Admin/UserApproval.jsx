import React, { useEffect, useState } from "react";
import ProfileCard from "../../../layouts/dashboard/ProfileCard";
import UserFilter from "../../../models/dashboard/UserFilter";
import ReportDateRange from "../../../layouts/dashboard/mainContent/ReportDateRange";

const UserApproval = () => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryCounts, setCategoryCounts] = useState({});
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/get-all-users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming the token is stored in localStorage
          },
        });
        const data = await response.json();
        if (data.success) {
          
          let users = data.data;
          //filter out users with status not  'Approved'  or 'Pending'
          users = users.filter(user => user.status !== "Approved" && user.status !== "Deleted");

          
          setProfiles(users);
          setFilteredProfiles(users);
           // Calculate category counts
           const counts = users.reduce((acc, user) => {
            const role = user.role.roleName;
            console.log("Role found:", role);
            acc[role] = (acc[role] || 0) + 1;
            return acc;
          }, {});

          setCategoryCounts(counts);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter profiles based on selected categories
    if (selectedCategories.length > 0) {
      setFilteredProfiles(
        profiles.filter(profile => selectedCategories.includes(profile.role.roleName))
      );
    } else {
      setFilteredProfiles(profiles); // If no category is selected, show all profiles
    }
  }, [selectedCategories, profiles]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-2xl text-textColor place-content-center font-bold mb-4">Profiles</h1>
        <div className="flex">
        
          <UserFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories} categoryCounts={categoryCounts}  />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {filteredProfiles.map((profile) => (
          <ProfileCard key={profile.userID} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default UserApproval;
