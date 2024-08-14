import React from 'react';
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
  const editing = { allowDeleting: true, allowEditing: true };

  // Filter out the 'Edit' option from the context menu items
  const filteredContextMenuItems = contextMenuItems.filter(item => item !== 'Edit');

  const toolbarOptions = ['Search', 'PdfExport','ExcelExport','CsvExport','Delete',];
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
        dataSource={patientsData}
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
