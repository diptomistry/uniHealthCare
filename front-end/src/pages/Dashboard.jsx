import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/dashboard/Navbar";


const Dashboard = () => {
  const { activeMenu } = useStateContext();
  const [darkMode, setDarkMode] = useState(false);

  const toggleMode = () => {
    setDarkMode(!darkMode);
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
              <MdOutlineLightMode size={34} className="bg-backgroundColor text-gray-200 rounded-full p-1"/>
            ) : (
              <MdOutlineDarkMode size={34} className="bg-backgroundColor text-gray-600  rounded-full p-1"/>
            )}
          </button>
        </TooltipComponent>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed  max-md:z-[10000000] dark:bg-secondary-dark-bg bg-white duration-500 " style={{ boxShadow: '0px 7px 30px 0px rgba(113, 122, 131, 0.11)' }}>
          {" "}
          <Sidebar />
        </div>
      ) : (
        <div className=" w-16  dark:bg-secondary-dark-bg duration-300">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-dark-bg bg-[#FAFBFB]  min-h-screen  w-full ${
          activeMenu ? "md:ml-72" : "flex-1"
        }`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg z-[1000] w-full ">
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route path="/" element="Dashboard" />
            <Route path="/Medical-Center" element="Dashboard" />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
