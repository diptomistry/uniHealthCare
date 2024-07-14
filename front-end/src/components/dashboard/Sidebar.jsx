import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md";
import { MdOutlineCancel } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { links } from '../../assets/dashboard';
import { useStateContext } from '../../contexts/ContextProvider';

const Sidebar = () => {
  const {  activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white bg-brightColor  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200  hover:bg-backgroundColor m-2';
  
   const test =true;
  return (
    
      <div className=' h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]' >
         <div className='flex justify-between items-center'>
            <Link to='/dashboard' onClick={handleCloseSideBar} className="items-center gap-3 ml-[19px] mt-4  flex text-xl font-bold tracking-tight dark:text-white text-slate-900">
            <MdAdminPanelSettings size={30} 
            
            /> {activeMenu && <span>Admin Panel</span>}

            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
            <button
              type="button"
              onClick={() => setActiveMenu(!activeMenu)}
          
              className="text-xl rounded-full p-3 hover:bg-[#F7F7F7] mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </TooltipComponent>

          </div>
          <div className='mt-10'>
      {
        links.map((item) => (
          <div key={item.title}>
           {activeMenu && <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'>
             {item.title}
            </p>}
           {item.links.map((link) => (
                  <NavLink
                    to={`/dashboard/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                   
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                   
                  
                  >
                    {link.icon}
                    {activeMenu && <span className="capitalize ">{link.name}</span>}
                  </NavLink>
                ))}

          </div>
        ))
      }

          </div>

      </div>
 
  )
}

export default Sidebar

// import React from 'react'
// import { Link, NavLink } from 'react-router-dom';
// import { MdAdminPanelSettings } from "react-icons/md";
// import { MdOutlineCancel } from 'react-icons/md';
// import { TooltipComponent } from '@syncfusion/ej2-react-popups';
// import { links } from '../../assets/dashboard';
// import { useStateContext } from '../../contexts/ContextProvider';

// const Sidebar = () => {
//   const {  activeMenu, setActiveMenu, screenSize } = useStateContext();

//   const handleCloseSideBar = () => {
//     if (activeMenu !== undefined && screenSize <= 900) {
//       setActiveMenu(false);
//     }
//   };
//     const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
//     const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200  hover:bg-backgroundColor m-2';
  
   
//   return (
    
//       <div className='ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 '>
//         {
//           activeMenu && (<>
//           <div className='flex justify-between items-center'>
//             <Link to='/' onClick={handleCloseSideBar} className="items-center gap-3 ml-3 mt-4 flex text-xl font-bold tracking-tight dark:text-white text-slate-900">
//             <MdAdminPanelSettings size={30} 
            
//             /> <span>Admin Panel</span>

//             </Link>
//             <TooltipComponent content="Menu" position="BottomCenter">
//             <button
//               type="button"
//               onClick={()=>{setActiveMenu((prevActiveMenu)=>!prevActiveMenu)}}
          
//               className="text-xl rounded-full p-3 hover:bg-[#F7F7F7] mt-4 block md:hidden"
//             >
//               <MdOutlineCancel />
//             </button>
//           </TooltipComponent>

//           </div>
//           <div className='mt-10'>
//       {
//         links.map((item) => (
//           <div key={item.title}>
//            <p className='text-gray-400 dark:text-gray-400 m-3 mt-4 uppercase'>
//             {item.title}

//            </p>
//            {item.links.map((link) => (
//                   <NavLink
//                     to={`/dashboard/${link.name}`}
//                     key={link.name}
//                     onClick={handleCloseSideBar}
                   
//                     className={({ isActive }) => (isActive ? activeLink : normalLink)}
//                   >
//                     {link.icon}
//                     <span className="capitalize ">{link.name}</span>
//                   </NavLink>
//                 ))}

//           </div>
//         ))
//       }

//           </div>
//           </>)


//         }

//       </div>
 
//   )
// }

// export default Sidebar
