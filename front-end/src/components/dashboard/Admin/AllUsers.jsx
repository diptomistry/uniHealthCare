import React, { useState, useEffect, useContext, useRef } from 'react';
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
import { GrLocation } from 'react-icons/gr';
import EmailIconTemplate from '../../../layouts/dashboard/EmailIconTemplate';
import { UserContext } from '../../../services/auth/UserProvider';
import { contextMenuItems } from '../../../assets/dashboard';

const AllUsers = () => {
  const { user } = useContext(UserContext);
  const [employeesData, setEmployeesData] = useState([]);
  const gridRef = useRef(null);

  const toolbarOptions = ['Search', 'PdfExport', 'ExcelExport', 'CsvExport'];
  
  const toolbarClick = (args) => {
    if (gridRef.current) {
      switch (args.item.id) {
        case 'allusers_pdfexport':
          gridRef.current.pdfExport();
          break;
        case 'allusers_excelexport':
          gridRef.current.excelExport();
          break;
        case 'allusers_csvexport':
          gridRef.current.csvExport();
          break;
      }
    }
  };
  
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Normal' };

  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
      {props.EmployeeImage !== 'N/A' ? (
        <img
          className="rounded-full w-10 h-10"
          src={props.EmployeeImage}
          alt={props.name}
        />
      ) : (
        <div className="flex items-center justify-center bg-gray-300 rounded-full w-6 h-6">
          <span className="text-white text-lg font-bold">
            {props.name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
      <p>{props.name}</p>
    </div>
  );

  const gridEmployeeCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
      <GrLocation />
      <span>{props.address}</span>
    </div>
  );

  const gridEmployeeEmail = (props) => (
    <div className="flex items-center justify-center gap-2 w-full">
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${props.email}`}
        target="_blank"
        rel="noopener noreferrer"
        className="truncate hover:underline text-blue-600"
        title={props.email}
      >
        {props.email}
      </a>
    </div>
  );

  const gridEmployeeMessage = (props) => (
    <EmailIconTemplate receiverEmail={props.email} />
  );

  const employeesGrid = [
    {
      headerText: "Users",
      width: "150",
      template: gridEmployeeProfile,
      textAlign: "Center",
    },
    { field: "name", headerText: "", width: "0", textAlign: "Center" },
    {
      field: "designation",
      headerText: "Designation",
      width: "125",
      textAlign: "Center",
    },
    {
      headerText: "Location",
      width: "120",
      textAlign: "Center",
      template: gridEmployeeCountry,
    },
    {
      field: "dob",
      headerText: "Date of Birth",
      width: "135",
      format: "yMd",
      textAlign: "Center",
    },
    {
      field: "phoneNo",
      headerText: "Phone No.",
      width: "120",
      textAlign: "Center",
    },
    {
      field: "email",
      headerText: "Email",
      width: "170",
      textAlign: "Center",
      template: gridEmployeeEmail,
    },
    {
      field: "message",
      headerText: "Message",
      width: "100",
      template: gridEmployeeMessage,
      textAlign: "Center",
    },
  ];

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8000/api/auth/get-all-users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }

        const result = await response.json();
        console.log(result);
        
        const mappedData = result.data.map(user => ({
          userID: user.userID,
          email: user.email,
          name: user.name,
          designation: user.role ? user.role.roleName : 'N/A',
          dob: user.dob,
          Country: user.registeredFrom,
          phoneNo: user.phone || 'N/A',
          EmployeeImage: user.image || 'N/A',
        }));
        setEmployeesData(mappedData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchEmployees();
  }, []);

  const modifiedEmployeesGrid = employeesGrid.map(column => ({
    ...column,
    allowEditing: ['designation'].includes(column.field)
  }));

  const filteredContextMenuItems = contextMenuItems.filter(item => item !== 'Edit' && item !== 'Delete');

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-md">
      <GridComponent
        id="allusers"
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        contextMenuItems={filteredContextMenuItems}
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        ref={gridRef}
      >
        <ColumnsDirective>
          {modifiedEmployeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar, Search]} />
      </GridComponent>
    </div>
  );
};

export default AllUsers;