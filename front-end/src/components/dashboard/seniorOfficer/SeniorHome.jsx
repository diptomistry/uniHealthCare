
import React from "react";
import { medicineSummery } from "../../../assets/dashboard";
import GenericPieChart from "../charts/GenericPieChart";
import { top10MedicineSales } from "../../../assets/dashboard";

const SeniorHome = () => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full ">
        {medicineSummery.map((item) => (
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
      <div className=" bg-white dark:bg-secondary-dark-bg mt-10 mb-3 rounded-2xl shadow-md">
      <GenericPieChart 
            data={top10MedicineSales} 
            title="Top 10<br>Medicine Distribution"
           
        />
</div>
    </div>
  );
};

export default SeniorHome;
