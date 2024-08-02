import React from 'react';
import DateRangePicker from '../../../layouts/dashboard/mainContent/DatePicker';
import { dashData } from '../../../assets/dashboard';
import CircularProgress from '../../../layouts/dashboard/mainContent/CircularProgress';
import SparkLine from '../charts/SparkLine';
import Stacked from '../charts/Stacked';
import { SparklineAreaData } from '../../../assets/dashboard';
import PatientAccumulationDoughnut from '../charts/PatientGraphPie';
import PatientGraphSplineArea from '../charts/PatientGraph';
import DoctorColumnPlacemen from '../charts/DoctorStatColumnPlacemen';
import AppointmentData from './AppointmentData';



import { FaCircleDot,FaBangladeshiTakaSign } from "react-icons/fa6";

const MedicalCenter = ({darkMode}) => {
    

  return (
    <div className="mt-24">
      <div className="flex flex-col">
        <div className='w-full flex flex-col md:flex-row items-center gap-4'>
          <div className='flex flex-col place-content-end mb-10 md:w-1/2'>
            <div className='font-poppins mb-10'>
              <h1 className='text-textColor dark:text-white font-semibold text-2xl'>
                Welcome back!<br /> You have successfully logged in.<br />
              </h1>
              <h1 className='dark:text-gray-400'> If you need any assistance, use helper </h1>
              <span className='underline dark:text-gray-400 cursor-pointer hover:text-hoverColor dark:hover:text-hoverColor'>bot.</span>
            </div>
            <DateRangePicker />
          </div>
          <div className="bg-secondaryColor dark:text-gray-200 rounded-xl md:w-1/2 p-8 pt-9 mb-4 shadow-sm flex">
            <div>
              <h2 className="text-textColor text-2xl font-bold mb-2">Your work is incomplete</h2>
              <p className="text-slate-600 mb-4">
                You have completed <span className="text-blue-500 font-bold">66%<br /></span>of your work,<br /> do your remaining task from <br /><span className=' underline text-textColor hover:text-white cursor-pointer '>My Tasks.</span>
              </p>
            </div>
            <CircularProgress />
          </div>
        </div>
       

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full ">
          {dashData.map((item) => (
            <div key={item.title} className="bg-white hover:scale-105 dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl shadow-md flex flex-col justify-between">
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
        <div className='bg-white   dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md'>
        <AppointmentData />
        </div>
        <div className="bg-white  flex flex-col  md:flex-row dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md">
        <div className='w-full md:w-1/2 '>
        <PatientGraphSplineArea/>
        </div>
        <div className='  '>
        <PatientAccumulationDoughnut/>
        
        </div>
          </div>
          <div className="flex justify-center items-center bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md w-full">
  <DoctorColumnPlacemen />
</div>


        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 mt-3 mb-3 rounded-2xl shadow-md">
          <div className="flex justify-between">
            <p className="font-semibold text-xl">Budget and Expenses Updates This Year</p>
            <div className="flex items-center gap-4">
              <p className="flex items-center gap-2 text-gray-600 dark:text-[#5c5558] hover:drop-shadow-xl">
                <span>
                  <FaCircleDot/>
                </span>
                <span>Expense</span>
              </p>
              <p className="flex items-center gap-2 text-brightColor hover:drop-shadow-xl">
                <span>
                  <FaCircleDot/>
                </span>
                <span>Budget</span>
              </p>
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center md:gap-x-36 gap-10">
            <div className="border-r-1 border-color m-4 pr-10">
              <div>
                <p>
                <div className='flex'>
                <FaBangladeshiTakaSign size={30}/>
                <p className="text-3xl font-semibold ml-1">98,487</p>


                </div>
                </p>
                <p className="text-gray-500 mt-1">Budget</p>
              </div>
              <div className="mt-8">
                <div className='flex'>
                <FaBangladeshiTakaSign size={30}/>
                <p className="text-3xl font-semibold ml-1">48,487</p>


                </div>
                <p className="text-gray-500  mt-1">Expense</p>
              </div>
              <div className="mt-5">
                <SparkLine currentColor={'black'} id="line-sparkLine" type="Line" height="80px" width="250px" data={SparklineAreaData} color={'#039BAB'} />
              </div>
              <p className="text-gray-500  mt-1">Expenses in each month </p>
              
             
            </div>
            <div >
              <Stacked darkMode={darkMode} width="380px" height="360px" />
            </div>
          </div>
          
        </div>
       
       
      
      
      </div>
     
    </div>
  );
};

export default MedicalCenter;
