import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaUserDoctor } from "react-icons/fa6";
import { RiNurseFill } from "react-icons/ri";
import { MdLocalPharmacy } from "react-icons/md";
import { GiMedicines } from 'react-icons/gi';
import DoctorScheduleTable from "../../layouts/homepage/DoctorSchedule";
import NursingSchedule from "../../layouts/homepage/NursingSchedule";
import PharmacySchedule from "../../layouts/homepage/PharmacySchedule";
import HomeoPathySchedule from "../../layouts/homepage/HomeoPathySchedule";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

export function ScheduleTable() {
  const data = [
    {
      label: "Allopathy Doctor",
      value: "doctor",
      icon: FaUserDoctor,
      component: <DoctorScheduleTable />,
    },
    {
      label: "Homeopathy Doctor",
      value: "homeopathy",
      icon: GiMedicines,
      component: <HomeoPathySchedule />,
    },
    {
      label: "Nursing Section",
      value: "nurse",
      icon: RiNurseFill,
      component: <NursingSchedule />,
    },
    {
      label: "Pharmacy Section",
      value: "pharmacy",
      icon: MdLocalPharmacy,
      component: <PharmacySchedule />,
    },
  ];

  return (
    <div className="min-h-screen lg:px-32 px-5 pt-28 bg-slate-200 p-6 rounded-lg shadow-md ">
      <h1 className="flex place-content-center mb-2 text-2xl font-poppins font-semibold text-textColor">Duty Roster</h1>
      <Tabs value="doctor">
        <TabsHeader>
          {data.map(({ label, value, icon }) => (
            <Tab key={value} value={value}>
              <div className="flex items-center gap-2 text-brightColor font-semibold">
                <TooltipComponent
                  content={label}
                  position="Top"
                  className="md:hidden"
                >
                  {React.createElement(icon, { className: "w-5 h-5" })}
                </TooltipComponent>
                <span className="md:inline hidden">{React.createElement(icon, { className: "w-5 h-5" })}</span>
                <span className="hidden md:inline text-lg">{label}</span>
              </div>
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {data.map(({ value, component }) => (
            <TabPanel key={value} value={value}>
              <div className="overflow-x-auto bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md md:p-24 p-4">
                {component}
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}
