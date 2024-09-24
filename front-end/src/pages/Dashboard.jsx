import React, { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
import Navbar from "../components/dashboard/Navbar";
import Home from "../components/dashboard/doctor/Home";
import NewRequests from "../components/dashboard/doctor/NewRequests";
import ALreadyPrescribed from "../components/dashboard/doctor/AlreadyPrescribed";
import StudentHome from "../components/dashboard/student/StudentHome";
import BookA from "../components/dashboard/Admin/BookA";
import BookD from "../components/dashboard/doctor/BookD";
import BookDO from "../components/dashboard/dispensaryOfficer/BookDO";
import Prescriptions from "../components/dashboard/dispensaryOfficer/Prescriptions";
import ListofMedicine from "../components/dashboard/dispensaryOfficer/ListofMedicine";
import Dispensary_Home from "../components/dashboard/dispensaryOfficer/Home";
import AcceptMedicine from "../components/dashboard/seniorOfficer/AcceptMedicine";
import BookSO from "../components/dashboard/seniorOfficer/BookSO";
import TeacherHome from "../components/dashboard/teacher/TeacherHome";
import ChatBot from "../models/dashboard/ChatBot";
import SpecificRouteProtection from "../services/auth/SpecificRouteProtection";
import StaffHome from "../components/dashboard/staff/StaffHome";
import Report from "../components/dashboard/Admin/Report";
import AdditionalInfo from "../components/dashboard/Admin/AdditionalInfo";
import TaskDistribution from "../components/dashboard/Admin/TaskDistribution";
import AddMedicine from "../components/dashboard/seniorOfficer/AddMedicine";
import SeniorHome from "../components/dashboard/seniorOfficer/SeniorHome";
import AppInfo from "../components/dashboard/Admin/AppInfo";
import {
  AboutSection,
  AllUsers,
  DutyRosterDoctor,
  DutyRosterHomeo,
  DutyRosterNurse,
  DutyRosterPharmacy,
  MedicalCenter,
  Notice,
  UserApproval,
  Blog,
  QuoteSection,
} from "../components/dashboard/Admin";

const Dashboard = () => {
  const { activeMenu } = useStateContext();
  const [darkMode, setDarkMode] = useState(false);
  //const { user } = useContext(UserContext);
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
      <div className="fixed right-4 bottom-36" style={{ zIndex: "10000" }}>
        <TooltipComponent content="Change Mode" position="Top">
          <button
            type="button"
            onClick={toggleMode}
            className="text-xl p-3 bg-gray-200 dark:bg-gray-700   hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full"
          >
            {darkMode ? (
              <MdOutlineLightMode
                size={34}
                className="bg-[#03C9D7] text-gray-200 rounded-full p-1"
              />
            ) : (
              <MdOutlineDarkMode
                size={34}
                className="bg-[#03C9D7] text-gray-600  rounded-full p-1"
              />
            )}
          </button>
        </TooltipComponent>
      </div>
      <div className="fixed right-20 bottom-32 z-[10000]">
        <TooltipComponent content="ChatBot" position="Top">
          <ChatBot />
        </TooltipComponent>
      </div>

      {activeMenu ? (
        <div
          className="w-64 fixed  max-md:z-[10000000] dark:bg-secondary-dark-bg bg-white duration-300 z-[1000] "
          style={{ boxShadow: "0px 7px 30px 0px rgba(113, 122, 131, 0.11)" }}
        >
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
        <div
          className={`fixed  border-b-2 bg-white dark:bg-main-dark-bg z-[1000] w-full  ${
            activeMenu ? "md:pr-64" : "md:pr-20 "
          }`}
        >
          <Navbar />
        </div>
        <div className="mt-20 md:ml-6 md:mr-6 ml-2 mr-1  ">
          <Routes>
            <Route
              path="/"
              element={
                <SpecificRouteProtection role="admin">
                  <MedicalCenter darkMode={darkMode} />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Medical-Center"
              element={
                <SpecificRouteProtection role="admin">
                  <MedicalCenter darkMode={darkMode} />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Medical-Center/Report"
              element={
                <SpecificRouteProtection role="admin">
                  <Report />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/All-Users"
              element={
                <SpecificRouteProtection role="admin">
                  <AllUsers />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/User-Approval"
              element={
                <SpecificRouteProtection role="admin">
                  <UserApproval />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Doctor"
              element={
                <SpecificRouteProtection role="admin">
                  <DutyRosterDoctor />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Homeopathy-Section"
              element={
                <SpecificRouteProtection role="admin">
                  <DutyRosterHomeo />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Nursing-section"
              element={
                <SpecificRouteProtection role="admin">
                  <DutyRosterNurse />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Pharmacy-Section"
              element={
                <SpecificRouteProtection role="admin">
                  <DutyRosterPharmacy />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Notice"
              element={
                <SpecificRouteProtection role="admin">
                  <Notice />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/About-Section"
              element={
                <SpecificRouteProtection role="admin">
                  <AboutSection />
                </SpecificRouteProtection>
              }
            />
             <Route
              path="/admin/department"
              element={
                <SpecificRouteProtection role="admin">
                  <AboutSection />
                </SpecificRouteProtection>
              }
            />

            <Route
              path="/admin/Blog"
              element={
                <SpecificRouteProtection role="admin">
                  <Blog />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Quote-Section"
              element={
                <SpecificRouteProtection role="admin">
                  <QuoteSection />
                </SpecificRouteProtection>
              }
            />
            <Route 
              path="/admin/App-Info"
              element={
                <SpecificRouteProtection role="admin">
                  <AppInfo />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Update-Info"
              element={
                <SpecificRouteProtection role="admin">
                  <AdditionalInfo />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Distribute-Tasks"
              element={
                <SpecificRouteProtection role="admin">
                  <TaskDistribution />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/Doctor-Home"
              element={
                <SpecificRouteProtection role="doctor">
                  <Home />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/New-Requests"
              element={
                <SpecificRouteProtection role="doctor">
                  <NewRequests />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/Already-Prescribed"
              element={
                <SpecificRouteProtection role="doctor">
                  <ALreadyPrescribed />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/Student-Home"
              element={
                <SpecificRouteProtection role="student">
                  <StudentHome />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/admin/Book"
              element={
                <SpecificRouteProtection role="admin">
                  <BookA />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/doctor/Book"
              element={
                <SpecificRouteProtection role="doctor">
                  <BookD />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/dispensary_officer/Book"
              element={
                <SpecificRouteProtection role="dispensary_officer">
                  <BookDO />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/dispensary_officer/Prescription"
              element={
                <SpecificRouteProtection role="dispensary_officer">
                  <Prescriptions />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/dispensary_officer/Request-Medicine"
              element={
                <SpecificRouteProtection role="dispensary_officer">
                  <ListofMedicine />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/dispensary_officer/Home"
              element={
                <SpecificRouteProtection role="dispensary_officer">
                  <Dispensary_Home />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/senior_officer/Accept-Request"
              element={
                <SpecificRouteProtection role="senior_officer">
                  <AcceptMedicine />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/senior_officer/Add-Medicine"
              element={
                <SpecificRouteProtection role="senior_officer">
                  <AddMedicine />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/senior_officer/Home"
              element={
                <SpecificRouteProtection role="senior_officer">
                  <SeniorHome />
                </SpecificRouteProtection>
              }
            />
             <Route
              path="/senior_officer/Book"
              element={
                <SpecificRouteProtection role="senior_officer">
                  <BookSO />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/teacher/Home"
              element={
                <SpecificRouteProtection role="teacher">
                  <TeacherHome />
                </SpecificRouteProtection>
              }
            />
            <Route
              path="/staff/Home"
              element={
                <SpecificRouteProtection role="staff">
                  <StaffHome />
                </SpecificRouteProtection>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
