import React from 'react'
import DynamicTable from '../../../layouts/dashboard/DynamicTable'
import { AloSchedule,AloSchedule2,AloSchedule3 } from '../../../assets/dashboard'
import Button from '../../../layouts/dashboard/DutyRoster/Button'


const DutyRosterDoctor = () => {
  return (
    <div className='flex flex-col gap-5 mb-5'>
      <DynamicTable AloSchedule={ AloSchedule } Title='ডাক্তারদের ডিউটি রোস্টার' />
      <Button title={'Submit'} />
      <DynamicTable AloSchedule={ AloSchedule2 }  />
      <Button title={'Submit'} />
      <DynamicTable AloSchedule={ AloSchedule3 } Title='রাত্রিকালীন অতি জরুরি ডিউটি :' />
      <Button title={'Submit'} />
    </div>
  )
}

export default DutyRosterDoctor