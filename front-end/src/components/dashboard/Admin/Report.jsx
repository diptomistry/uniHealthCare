import React from 'react'
import { PDFViewer } from "@react-pdf/renderer";
import ReportLayout from '../../../layouts/dashboard/ReportLayout';

const Report = () => {
  return (
    <div className="w-full h-screen">
      <PDFViewer className="w-full h-full">
        <ReportLayout />
      </PDFViewer>
    </div>
  )
}

export default Report