import React,{useState,useEffect} from 'react';
import {
  GridComponent,
  ColumnsDirective,
  ColumnDirective,
  Resize,
  Sort,
  ContextMenu,
  Filter,
  Page,
  ExcelExport,
  PdfExport,
  Edit,
  Toolbar,
  Search,
  Inject
} from '@syncfusion/ej2-react-grids';
import { patientsData, contextMenuItems, patientsGrid } from '../../../assets/dashboard';

const AppointmentData = () => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const editing = { allowDeleting: true, allowEditing: true };
   const patientsData = [
   


 
  
    {
      AppointmentDate: 24546,
      Email: "Frank",
      PhoneNum: 84.99,
      PatientName: "Pan Cake",
      Gender: "Delhi",
      Status: "complete",
      StatusBg: "#8BE78B",
      PatientImage:
        "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80",
    },
    {
      AppointmentDate: 874534,
      Email: "Danai",
      PhoneNum: 122.99,
      PatientName: "Watch",
      Gender: "USA",
      Status: "completed",
      StatusBg: "#FF5C8E",
      PatientImage:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pop-womens-garmin-watches-1641919013.jpg?crop=0.502xw:1.00xh;0.250xw,0&resize=640:*",
    },
  ];
  const [newPatientsDataDoctor, setNewPatientsDataDoctor] = useState([]);
  useEffect(() => {
    const token = localStorage.getItem("token");
  
    fetch("http://localhost:8000/api/appointments/all", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Appointments data:", data);
        
        const appointData = data.content;
        const pendingAppointments = appointData.filter(
          (appointment) => appointment.user !== null
        );
  
        const transformedData = pendingAppointments.map((appointment) => {
          let statusBg = "#03C9D7"; // Default color for Scheduled
  
          // Assign different background colors based on status
          switch (appointment.status) {
            case "Prescribed":
              statusBg = "#03C9D7"; // Yellow color for Prescribed
              break;
            case "Scheduled":
              statusBg = "#FFC107"; // Green color for Dispensed
              break;
            default:
              statusBg = "#4CAF50"; // Blue color for Scheduled (or default)
          }
  
          return {
            AppointmentDate: formatDate(appointment.appointmentDateTime),
            Email: appointment.user?.email || "N/A",
            PhoneNum: appointment.user?.phone || "N/A",
            PatientName: appointment.user?.name || "Unknown",
            Gender: appointment.user?.sex || "Unknown",
            Status: appointment.status || "Unknown",
            StatusBg: statusBg, // Dynamic color based on status
            PatientImage:
              appointment.user?.image && appointment.user?.image !== "null"
                ? appointment.user.image
                : null, // Use image or placeholder
          };
        });
  
        setNewPatientsDataDoctor(transformedData); // Store the transformed data in state
      })
      .catch((error) => console.error("Error fetching appointments:", error));
  }, []);
  
  // Filter out the 'Edit' option from the context menu items
  const filteredContextMenuItems = contextMenuItems.filter(item => item !== 'Edit');

  const toolbarOptions = ['Search', 'PdfExport','ExcelExport','CsvExport'];
  const toolbarClick = (args) => {
    if (args.item.id === 'gridcomp2_pdfexport') {
      gridInstance.pdfExport();
    }
    if (args.item.id === 'gridcomp2_excelexport') {
      gridInstance.excelExport();
    }
    if (args.item.id === 'gridcomp2_csvexport') {
      gridInstance.csvExport();
    }
  };
  
  let gridInstance;
  
  return (
    <div className="m-2 md:m-10 mt-24 p-2 bg-white rounded-3xl">
      <h1 className='text-3xl font-semibold tracking-tight text-slate-900 flex justify-center mb-10'>Patients Information</h1>
  
      <GridComponent
        id="gridcomp2"
        dataSource={newPatientsDataDoctor}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={filteredContextMenuItems}
        editSettings={editing}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        ref={(grid) => gridInstance = grid}
      >
        <ColumnsDirective>
          {patientsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />
      </GridComponent>
    </div>
  );
  
};

export default AppointmentData;
