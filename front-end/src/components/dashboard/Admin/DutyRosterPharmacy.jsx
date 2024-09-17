import React from 'react'
import { PharmacySectionSchedule } from '../../../assets/dashboard'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import Button from '../../../layouts/dashboard/DutyRoster/Button'
const DutyRosterPharmacy = () => {
  return (
    <div className='flex flex-col gap-5 mb-5 bg-white dark:bg-secondary-dark-bg mt-3 p-8 rounded-2xl shadow-md'>
        <DynamicTable AloSchedule={ PharmacySectionSchedule } Title='ফার্মাসি শাখার ডিউটি রোস্টার' />
    
    </div>
  )
}

export default DutyRosterPharmacy