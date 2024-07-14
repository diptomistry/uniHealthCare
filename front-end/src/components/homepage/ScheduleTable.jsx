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
import DoctorScheduleTable from "../../layouts/homepage/DoctorSchedule";
import NursingSchedule from "../../layouts/homepage/NursingSchedule";
import PharmacySchedule from "../../layouts/homepage/PharmacySchedule";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

export function TabsWithIcon() {
  const data = [
    {
      label: "Doctor's Duty Roster",
      value: "doctor",
      icon: FaUserDoctor,
      component: <DoctorScheduleTable />,
    },
    {
      label: "Nursing Section Duty Roster",
      value: "nurse",
      icon: RiNurseFill,
      component: <NursingSchedule />,
    },
    {
      label: "Pharmacy Section Duty Roster",
      value: "pharmacy",
      icon: MdLocalPharmacy,
      component: <PharmacySchedule />,
    },
  ];

  return (
    <div className="min-h-screen mt-2 lg:px-32 px-5 pt-28 bg-slate-200 p-6 rounded-lg shadow-md">
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
              {component}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}