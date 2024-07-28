import React from 'react'
import { HomeoSchedule } from '../../../assets/dashboard'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import Button from '../../../layouts/dashboard/DutyRoster/Button'
const DutyRosterHomeo = () => {
  return (
    <div className='flex flex-col gap-5 mb-5'>
        <DynamicTable AloSchedule={ HomeoSchedule } Title='হোমিও ডাক্তারদের ডিউটি রোস্টার' />
        <Button title={'Submit'} />
    </div>
  )
}

export default DutyRosterHomeo