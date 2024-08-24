import React,{useContext} from "react";
import { AdminTasks,GeneralTasks,DispensaryOfficerTasks, StaffTasks,SeniorOfficerTasks,doctorTasks   } from "../../assets/dashboard";
import { UserContext } from '../../services/auth/UserProvider';


const MyTask = () => {
    const { user } = useContext(UserContext);
    const userType = user.role.roleName; // Example userType, should be passed as a prop or context
    const getMenuItems = (userType) => {
        switch (userType) {
          case "admin":
            return AdminTasks;
          case "doctor":
            return doctorTasks;
          case "staff":
            return StaffTasks;
          case "student":
            return GeneralTasks;
          case "dispensary-officer":
            return DispensaryOfficerTasks;
          case "senior-officer":
            return SeniorOfficerTasks;
          case "teacher":
            return GeneralTasks;
          default:
            return [];
        }
      };
  
    const menuItems = getMenuItems(userType);
  return (
    <div>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {menuItems.map((task) => (
          <li key={task.id} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-brightColor rounded-full -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <p className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              {task.title}
            </p>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {task.heading}
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MyTask;
