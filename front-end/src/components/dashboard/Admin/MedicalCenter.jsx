import React, { useState,useEffect,useContext } from "react";
import { dashData } from "../../../assets/dashboard";
import AppointmentData from "./AppointmentData";
import CircularProgress from "../../../layouts/dashboard/mainContent/CircularProgress";
import { SparklineAreaData } from "../../../assets/dashboard";
import PatientAccumulationDoughnut from "../charts/PatientGraphPie";
import DoctorColumnPlacemen from "../charts/DoctorStatColumnPlacemen";
import MonthlySalesGraph from "../charts/MonthlySalesGraph ";
import PatientPercentageByCategory from "../charts/PatientPercentageByCategory ";
import PatientGraphSplineArea from "../charts/PatientGraph";
import PatientGraphSplineAreaByYear from "../charts/PatientGraphSplineAreaByYear";
import DoctorColumnPlacementYearly from "../charts/DoctorColumnPlacementYearly";
import SparkLine from "../charts/SparkLine";
import Stacked from "../charts/Stacked";
import PharmacyCustomerByCat from "../charts/PharmacyCustomerByCat";
import TopRatedDoctors from "./TopRatedDoctors";
import { MdOutlineSimCardDownload } from "react-icons/md";
import ReportDateRange from "../../../layouts/dashboard/mainContent/ReportDateRange";
import { FaCircleDot, FaBangladeshiTakaSign } from "react-icons/fa6";
import { useNavigate } from "react-router-dom"; 
import { FiCalendar } from "react-icons/fi";
import { FaUserMd, FaUserNurse, FaUsers, FaPills, FaMoneyBillWave } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { PiStudentBold } from "react-icons/pi";
import { UserContext } from "../../../services/auth/UserProvider";


const MedicalCenter = ({ darkMode }) => {
  const { user } = useContext(UserContext);
  const [patientStatType, setPatientStatType] = useState("monthly");
  const navigate = useNavigate();
  const handleStatTypeChange = (event) => {
    setPatientStatType(event.target.value);
  };
  const handleDownloadReport = () => {
    navigate('/dashboard/Medical-Center/Report'); // Replace with your desired route
  };
  const [dashData, setDashData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await fetch("http://localhost:8000/api/stats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await response.json();
        console.log("API Response:", data);

        // Map API response to the required dashData format
        const mappedDashData = [
          {
            icon: <FiCalendar />,
            amount: data.appointments.dispensedAppointments.toLocaleString(),
            percentage: "-4%", // You can adjust this based on logic
            title: "Total Appointment",
            iconColor: "#03C9D7",
            iconBg: "#E5FAFB",
            pcColor: "red-600",
          },
          {
            icon: <FiCalendar />,
            amount: data.appointments.pendingAppointments.toLocaleString(),
            percentage: "+23%", // You can adjust this based on logic
            title: "Pending Appointment",
            iconColor: "rgb(255, 244, 229)",
            iconBg: "rgb(254, 201, 15)",
            pcColor: "green-600",
          },
          {
            icon: <FiCalendar />,
            amount: data.appointments.prescribedAppointments.toLocaleString(),
            percentage: "+23%", // You can adjust this based on logic
            title: "Prescribed Appointment",
            iconColor: "rgb(229, 255, 244)", // Light greenish color for the icon
            iconBg: "rgb(15, 201, 254)", // Sky blue background for the icon
            pcColor: "red-600", // Changed from green to red
          },
          {
            icon: <PiStudentBold />,

            amount: data.totalUsersByRoles.student.toLocaleString(), // You need to provide the total budget from the API or adjust the logic
            percentage: "-12%", // You can adjust this based on logic
            title: "Total Students",
            iconColor: "rgb(54, 162, 235)",
            iconBg: "rgb(232, 244, 255)",
            pcColor: "red-600",
          },
          
          {
            icon: <FaUserMd />,
            amount: data.users.totalDoctors.toLocaleString(),
            percentage: "+38%", // You can adjust this based on logic
            title: "Total Doctors",
            iconColor: "rgb(228, 106, 118)",
            iconBg: "rgb(255, 244, 229)",
            pcColor: "green-600",
          },
          {
            icon: <FaRegUser />,
            amount: data.totalUsersByRoles.staff.toLocaleString(),
            percentage: "+38%", // You can adjust this based on logic
            title: "Total Stuffs",
            iconColor: "rgb(228, 106, 118)",
            iconBg: "rgb(255, 244, 229)",
            pcColor: "green-600",
          },
          {
            icon: <FaUsers />,
            amount: data.users.totalUsers.toLocaleString(),
            percentage: "-12%", // You can adjust this based on logic
            title: "Total Users",
            iconColor: "rgb(0, 194, 146)",
            iconBg: "rgb(235, 250, 242)",
            pcColor: "red-600",
          },
          {
            icon: <FaPills />,
            amount: data.medicines.total.toLocaleString(),
            percentage: "-12%", // You can adjust this based on logic
            title: "Total Medicines",
            iconColor: "rgb(75, 192, 192)",
            iconBg: "rgb(229, 245, 244)",
            pcColor: "red-600",
          },
         
      
        ];

        // Set the mapped dashData
        setDashData(mappedDashData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="mt-24 ">
      <div className="flex flex-col">
        <div className="w-full flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-col place-content-end md:w-1/2 ">
            <div className=" flex  font-poppins border-b-4 border-gray-200 ">
             
              <div className="mb-8 ml-5">
                <button
                  title="Save"
                  class="cursor-pointer flex items-center fill-sky-400 bg-sky-950 hover:bg-sky-900 active:border active:border-sky-400 rounded-md duration-100 p-2 py-3"
                  onClick={handleDownloadReport}
                >
                  <MdOutlineSimCardDownload
                    size={20}
                    className="text-sky-400 mr-1"
                  />
                  <span class="text-sm text-sky-400 font-bold pr-1">
                    Downloda Report
                  </span>
                </button>
              </div>
            </div>
           
          </div>
          <div className="bg-secondaryColor dark:text-gray-200 rounded-xl md:w-1/2 p-8 pt-9 mb-4 shadow-sm">
      <h2 className="text-textColor text-2xl font-bold mb-2">
        Welcome back! <span className="ml-3 text-blue-500">{user.name}</span>
      </h2>
      <p className="text-slate-600 mb-4">
       
        <span className="text-gray-500 font-bold">
          Do Complete Your Pending Tasks
        </span> 
        <br />
        Check todo list tasks in{" "}
        <span className="  text-gray-500  cursor-pointer">
          My Tasks.
        </span>
      </p>
    </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full ">
          {dashData.map((item) => (
            <div
              key={item.title}
              className="bg-white hover:scale-105 dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl shadow-md flex flex-col justify-between"
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl self-start"
              >
                {item.icon}
              </button>
              <div>
                <p className="mt-3">
                  <span className="text-lg font-semibold">{item.amount}</span>
                </p>
                <p className="text-sm text-gray-400 mt-1">{item.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className=" bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 mt-10 flex justify-center ">
            Doctors Ranking
          </h1>
          <div className="lg:px-24">
            <TopRatedDoctors />
          </div>
        </div>
        <div className="bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md">
          <AppointmentData />
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md  ">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 flex justify-center mb-3">
            Patients Stastistics
          </h1>

          <select
            value={patientStatType}
            onChange={handleStatTypeChange}
            className="p-2 rounded-md dark:bg-gray-700 dark:text-white flex  "
          >
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <div className=" flex flex-col md:flex-row ">
            <div className="w-full md:w-1/2">
              {patientStatType === "monthly" ? (
                <PatientGraphSplineArea />
              ) : (
                <PatientGraphSplineAreaByYear />
              )}
            </div>
            {patientStatType === "monthly" ? (
              <DoctorColumnPlacemen />
            ) : (
              <DoctorColumnPlacementYearly />
            )}
          </div>

          <div className="flex flex-col  md:flex-row dark:text-gray-200 dark:bg-secondary-dark-bg  border-t-2 overflow-hidden">
            <div className="flex-1 max-w-full md:max-w-1/2 overflow-x-auto">
              <PatientAccumulationDoughnut />
            </div>
            <div className="flex-1 max-w-full md:max-w-1/2 overflow-x-auto ">
              <PatientPercentageByCategory />
            </div>
          </div>
        </div>

        <div className="bg-white  dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 flex justify-center mb-3">
            Medicine Stastistics
          </h1>

          <div className="flex flex-col md:flex-row ">
            <div className="w-full md:w-1/2">
              <MonthlySalesGraph />
            </div>
            <div className="">
              <PharmacyCustomerByCat />
            </div>
          </div>
        </div>

        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">
              Budget and Expenses Updates This Year
            </p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 dark:text-[#5c5558] hover:drop-shadow-xl">
                <span>
                  <FaCircleDot />
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-brightColor hover:drop-shadow-xl">
                <span>
                  <FaCircleDot />
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center md:gap-x-36 gap-10">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                  <div className="flex">
                    <FaBangladeshiTakaSign size={30} />
                    <p className="text-3xl font-semibold ml-1">98,487</p>
                  </div>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <div className="flex">
                  <FaBangladeshiTakaSign size={30} />
                  <p className="text-3xl font-semibold ml-1">48,487</p>
                </div>
                <p className="text-gray-500 mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine
                  currentColor={"black"}
                  id="line-sparkLine"
                  type="Line"
                  height="80px"
                  width="250px"
                  data={SparklineAreaData}
                  color={"#039BAB"}
                />
              </div>
              <p className="text-gray-500 mt-1">Expenses in each month </p>
            </div>
            <div>
              <Stacked darkMode={darkMode} width="380px" height="360px" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalCenter;
