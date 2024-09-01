import React from 'react'
import { PDFViewer } from "@react-pdf/renderer";
import Invoice from '../../../layouts/dashboard/Invoice';

const Report = () => {
  return (
    <div className="w-full h-screen">
      <PDFViewer className="w-full h-full">
        <Invoice />
      </PDFViewer>
    </div>
  )
}

export default Report