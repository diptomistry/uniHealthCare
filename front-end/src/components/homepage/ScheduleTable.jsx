import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { FaUserDoctor } from "react-icons/fa6";
import DoctorScheduleTable from "../../layouts/homepage/DoctorSchedule";

export function ScheduleTable() {
  return (
    <div className="min-h-screen lg:px-32 px-5 pt-28 bg-slate-200 p-6 rounded-lg shadow-md">
      <Tabs value="doctor">
      
        <TabsBody>
          <TabPanel value="doctor">
            <div className="overflow-x-auto bg-white dark:bg-secondary-dark-bg mt-3 mb-3 rounded-2xl shadow-md md:p-24 p-4">
              <DoctorScheduleTable />
            </div>
          </TabPanel>
        </TabsBody>
      </Tabs>
    </div>
  );
}
