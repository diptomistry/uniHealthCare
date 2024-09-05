import React,{useState,useEffect,useContext} from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { employeesData,employeesGrid } from '../../../assets/dashboard';
import { GrLocation } from 'react-icons/gr';
import { LuMessageSquarePlus } from 'react-icons/lu';
import MessageIconTemplate from '../../../layouts/dashboard/MessageIconTemplate';
import { UserContext } from '../../../services/auth/UserProvider';

const AllUsers = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  const toolbarOptions = ['Search', 'Edit', 'Delete'];
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Normal' };
  const gridEmployeeProfile = (props) => (
    <div className="flex items-center gap-2">
  {props.EmployeeImage =='N/A' ? (
    <img
      className="rounded-full w-10 h-10"
      src={props.EmployeeImage}
      alt={props.name}
    />
  ) : (
    <div className="flex items-center justify-center bg-gray-300 rounded-full w-10 h-10">
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
      <span>{props.Country}</span>
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
  const messageIconTemplate = () => {
    return (
      <button className="text-backgroundColor hover:text-hoverColor transition-colors duration-300">
        <LuMessageSquarePlus className="w-5 h-5" />
      </button>
    );
  };
  const gridEmployeeMessage = (props) => (
    <MessageIconTemplate receiverID={props.userID} />
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
  const [employeesData, setEmployeesData] = useState([]);

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

        const mappedData = result.data.map(user => ({
          email: user.email,
          name: user.name,
          designation: user.role ? user.role.roleName : 'N/A',
          dob: user.dob,
          Country: user.registeredFrom, // Assuming `registeredFrom` represents the Country
          phoneNo: user.phone || 'N/A', // Default to 'N/A' if phone is missing
          EmployeeImage: user.image || 'N/A', // Use default image if none is provided
        }));
       console.log(mappedData);
        setEmployeesData(mappedData);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    fetchEmployees();
  }, []);
  // Modify the employeesGrid to specify which fields are editable
  const modifiedEmployeesGrid = employeesGrid.map(column => ({
    ...column,
    allowEditing: ['designation'].includes(column.field)
  }));

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl shadow-md">
      <GridComponent
        dataSource={employeesData}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {modifiedEmployeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page, Edit, Toolbar]} />
      </GridComponent>
    </div>
  );
};

export default AllUsers;