import React from 'react';
import { GridComponent, Inject, ColumnsDirective, ColumnDirective, Search, Page, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { employeesData, employeesGrid } from '../../../assets/dashboard';

const AllUsers = () => {
  const toolbarOptions = ['Search', 'Edit', 'Delete'];
  const editing = { allowDeleting: true, allowEditing: true, mode: 'Normal' };

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