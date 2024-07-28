import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/dashboard/Navbar";
import MedicalCenter from "../components/dashboard/Admin/MedicalCenter";
import AllUsers from "../components/dashboard/Admin/AllUsers";
import UserApproval from "../components/dashboard/Admin/UserApproval";
import DutyRosterDoctor from "../components/dashboard/Admin/DutyRosterDoctor";



const Dashboard = () => {
  const { activeMenu } = useStateContext();
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
  localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: "10000" }}>
        <TooltipComponent content="Change Mode" position="Top">
          <button
            type="button"
            onClick={toggleMode}
           
            className="text-xl p-3 bg-gray-200 dark:bg-gray-700   hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
          >
            {darkMode ? (
              <MdOutlineLightMode size={34} className="bg-[#03C9D7] text-gray-200 rounded-full p-1"/>
            ) : (
              <MdOutlineDarkMode size={34} className="bg-[#03C9D7] text-gray-600  rounded-full p-1"/>
            )}
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-64 fixed  max-md:z-[10000000] dark:bg-secondary-dark-bg bg-white duration-300 " style={{ boxShadow: '0px 7px 30px 0px rgba(113, 122, 131, 0.11)' }}>
          {" "}
          <Sidebar />
        </div>
      ) : (
        <div className=" w-0 md:w-20 fixed  dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg bg-[#FAFBFB]  min-h-screen  w-full ${
          activeMenu ? "md:ml-64 duration-300" : "flex-1 md:ml-20 "
        }`}
      >
        <div className={`fixed  border-b-2 bg-white dark:bg-main-dark-bg z-[1000] w-full  ${activeMenu ?"md:pr-64":"md:pr-20 "}`}>
          <Navbar />
        </div>
        <div className="mt-20 md:ml-6 md:mr-6 ml-2 mr-1  ">
          <Routes>
            <Route path="/" element={<MedicalCenter darkMode={darkMode} />} />
            <Route path="/Medical-Center" element={<MedicalCenter darkMode={darkMode}/>} />
            <Route path="/All-Users" element={<AllUsers />} />
            <Route path="/User-Approval" element={<UserApproval />} />
            <Route path="/Doctor" element={<DutyRosterDoctor />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
