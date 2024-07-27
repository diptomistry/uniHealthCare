import React from "react";
import ProfileCard from "../../../layouts/dashboard/ProfileCard";
import { profiles } from "../../../assets/dashboard";
import UserFilter from "../../../models/dashboard/UserFilter";
import DateRangePicker from "../../../layouts/dashboard/mainContent/DatePicker";

const UserApproval = () => {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-2xl text-textColor place-content-center font-bold mb-4">Profiles</h1>
        <DateRangePicker />
          <UserFilter />
        
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {profiles.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
};

export default UserApproval;
