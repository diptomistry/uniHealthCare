import React from 'react'
import { PharmacySectionSchedule } from '../../../assets/dashboard'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import Button from '../../../layouts/dashboard/DutyRoster/Button'
const DutyRosterPharmacy = () => {
  return (
    <div className='flex flex-col gap-5 mb-5'>
        <DynamicTable AloSchedule={ PharmacySectionSchedule } Title='ফার্মাসি শাখার ডিউটি রোস্টার' />
        <Button title={'Submit'} />
    </div>
  )
}

export default DutyRosterPharmacy