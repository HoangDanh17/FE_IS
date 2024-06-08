'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "@/components/css/manageintern/DataTable.css";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'semester', headerName: 'Kì', width: 50 },
  { field: 'university', headerName: 'Trường', width: 130 },
  { field: 'start_date', headerName: 'Ngày bắt đầu', width: 130 },
  { field: 'end_date', headerName: 'Ngày kết thúc', width: 130 },
];

const rows = [
  { id: 1, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 2, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 3, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 4, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 5, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 6, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 7, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 8, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  { id: 9, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
  // { id: 10, semester:"SU22", university:"FPT University", start_date:"07/05/2024", end_date:"07/10/2024" },
];

const DataTable = () => {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        classes={{
            root: 'custom-row',       // Apply to all rows
            columnHeader: 'custom-header', // Apply to header
            cell: 'custom-cell',      // Apply to cells
          }}
        className="custom-row custom-pagination"
      />
    </div>
  );
}

export default DataTable;
