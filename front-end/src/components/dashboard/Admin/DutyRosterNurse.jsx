import React from 'react'
import { NursingSectionSchedule } from '../../../assets/dashboard'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import Button from '../../../layouts/dashboard/DutyRoster/Button'
const DutyRosterNurse = () => {
  return (
    <div className='flex flex-col gap-5 mb-5'>
        <DynamicTable AloSchedule={ NursingSectionSchedule } Title='নার্সিং শাখার ডিউটি রোস্টার' />
        <Button title={'Submit'} />
    </div>
  )
}

export default DutyRosterNurse