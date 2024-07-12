import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import '../components/dashboard/Dashboard.css';
import { useStateContext } from '../contexts/ContextProvider';
import Navbar from '../components/dashboard/Navbar';

const Dashboard = () => {
  const { activeMenu } = useStateContext();
  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '10000' }}>
            <TooltipComponent
              content="Settings"
              position="Top"
            >
              <button
                type="button"
                onClick={() => { }}
                style={{background :'blue',borderRadius:'50%'}}
           
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>

            </TooltipComponent>
    
          </div>
      {activeMenu ? (
        <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'> <Sidebar /></div>
      ) : (
        <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />

        </div>
      )}
      <div  className={`dark:bg-main-dark-bg bg-[#FAFBFB]  min-h-screen  w-full ${activeMenu ? 'md:ml-72' : 'flex-1'}`}
      >

     
      <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full '>
        <Navbar />

      </div>
      <div>
        <Routes>
            <Route path='/' element='Dashboard'/>
            <Route path='/dashboard' element='Dashboard'/>
        </Routes>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
