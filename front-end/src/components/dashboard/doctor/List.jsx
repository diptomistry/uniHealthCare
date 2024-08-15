import React, { useRef } from "react";
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
  Toolbar,
  Search,
  Inject,
} from "@syncfusion/ej2-react-grids";

const List = ({ status,title, patientsData, patientsGrid, toolbarOptions,onButtonClick }) => {
  const gridInstance = useRef(null); // Use ref to reference the grid instance

  const editing = { allowDeleting: true, allowEditing: true };

  const toolbarClick = (args) => {
    if (args.item.id === "gridcomp_pdfexport") {
      gridInstance.current.pdfExport();
    }
    if (args.item.id === "gridcomp_excelexport") {
      gridInstance.current.excelExport();
    }
    if (args.item.id === "gridcomp_csvexport") {
      gridInstance.current.csvExport();
    }
  };

  const handleButtonClick = (props) => {
    console.log("Button clicked for patient:", props);
    onButtonClick(props); // Pass the patient data back to NewRequests
  };

  return (
    <div className="bg-white rounded-3xl">
      <h1 className="text-3xl font-semibold tracking-tight text-slate-900 flex justify-center mb-3">
        {title}
      </h1>

      <GridComponent
        id="gridcomp"
        dataSource={patientsData}
        allowPaging
        allowSorting
        allowExcelExport
        allowPdfExport
        editSettings={editing}
        toolbar={toolbarOptions}
        toolbarClick={toolbarClick}
        ref={gridInstance} // Assign the grid instance to the ref
      >
        <ColumnsDirective>
          {patientsGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
          <ColumnDirective
            field="action"
            headerText="Action"
            width="120"
            template={(props) => (
              <button
                className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-[#03C9D7] hover:bg-hoverColor"
                onClick={() => handleButtonClick(props)}
              >
                {status}
              </button>
            )}
          />
        </ColumnsDirective>
        <Inject
          services={[
            Resize,
            Sort,
            ContextMenu,
            Filter,
            Page,
            ExcelExport,
            PdfExport,
            Toolbar,
            Search,
          ]}
        />
      </GridComponent>
    </div>
  );
};

export default List;

