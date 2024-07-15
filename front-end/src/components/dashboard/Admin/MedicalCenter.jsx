import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';




import Button from '../../../layouts/dashboard/sidebar/Button';
import { dashData } from '../../../assets/dashboard';
import CircularProgress from '../../../layouts/dashboard/mainContent/CircularProgress';
const percentage = 66;





const MedicalCenter = () => {


  return (
    <div className="mt-24 ">
      <div className="flex flex-col  ">
      <div className="bg-secondaryColor dark:text-gray-200 rounded-xl w-1/2 p-8 pt-9 mb-4 shadow-sm flex ">
        <div>
        <h2 className="text-textColor text-2xl font-bold mb-2">Your work is incomplete</h2>
        <p className="text-slate-600 mb-4">
          You have completed <span className="text-blue-500 font-bold">66%<br/></span>of your work,<br/> do your remaining task from <br/><span className=' underline text-textColor hover:text-white cursor-pointer '>My Tasks.</span>
        </p>
        </div>
         <CircularProgress/>
          
        </div>
       
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
  {dashData.map((item) => (
    <div key={item.title} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-4 pt-9 rounded-2xl shadow-md flex flex-col justify-between">
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
        
      </div>

  
    </div>
  );
};

export default MedicalCenter;

// import React from 'react'

// const MedicalCenter = () => {
//   return (
//     <div className='bg-slate-600  flex flex-col'>
//         <div className='min-h-96'>
//             medical

//         </div>
//         <div className='min-h-96'>
//             center

//         </div>
//         <div className='min-h-96'>
//             center

//         </div>
//         </div>
//   )
// }

// export default MedicalCenter
/*
import React from 'react';
import { BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { IoIosMore } from 'react-icons/io';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import { Stacked, Pie, Button, LineChart, SparkLine } from '../components';
import { earningData, medicalproBranding, recentTransactions, weeklyStats, dropdownData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import product9 from '../data/product9.jpg';

const DropDown = ({ currentMode }) => (
  <div className="w-28 border-1 border-color px-2 py-1 rounded-md">
    <DropDownListComponent id="time" fields={{ text: 'Time', value: 'Id' }} style={{ border: 'none', color: (currentMode === 'Dark') && 'white' }} value="1" dataSource={dropdownData} popupHeight="220px" popupWidth="120px" />
  </div>
);

const Ecommerce = () => {
  const { currentColor, currentMode } = useStateContext();

  return (
    <div className="mt-24">
      <div className="flex flex-wrap lg:flex-nowrap justify-center ">
        <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
            </div>
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full  p-4"
            >
              <BsCurrencyDollar />
            </button>
          </div>
          <div className="mt-6">
            <Button
              color="white"
              bgColor={currentColor}
              text="Download"
              borderRadius="10px"
            />
          </div>
        </div>
        <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
          {earningData.map((item) => (
            <div key={item.title} className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl ">
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

  
    </div>
  );
};

export default Ecommerce;


*/