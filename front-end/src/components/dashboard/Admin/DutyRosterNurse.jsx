import React from 'react'
import { NursingSectionSchedule } from '../../../assets/dashboard'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import Button from '../../../layouts/dashboard/DutyRoster/Button'
const DutyRosterNurse = () => {
  return (
    <div className='flex flex-col gap-5 mb-5 bg-white dark:bg-secondary-dark-bg mt-3 p-8 rounded-2xl shadow-md'>
        <DynamicTable AloSchedule={ NursingSectionSchedule } Title='নার্সিং শাখার ডিউটি রোস্টার' />
       
    </div>
  )
}

export default DutyRosterNurse