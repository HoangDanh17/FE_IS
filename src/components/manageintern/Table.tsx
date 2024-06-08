'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "@/components/css/manageintern/DataTable.css";

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 50 },
  { field: 'accountid', headerName: 'AccountID', width: 50 },
  { field: 'hoVaTen', headerName: 'Họ và Tên', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'phoneNumber', headerName: 'Phonenumber', width: 130 },
  { field: 'ojtid', headerName: 'OJTID', width: 130 },
];

const rows = [
  { id: 1, accountid:"SE170001", hoVaTen: 'Nguyễn Văn A', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 2, accountid:"SE170001", hoVaTen: 'Nguyễn Văn B', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 3, accountid:"SE170001", hoVaTen: 'Nguyễn Văn C', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 4, accountid:"SE170001", hoVaTen: 'Nguyễn Văn D', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 5, accountid:"SE170001", hoVaTen: 'Nguyễn Văn E', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 6, accountid:"SE170001", hoVaTen: 'Nguyễn Văn F', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 7, accountid:"SE170001", hoVaTen: 'Nguyễn Văn G', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 8, accountid:"SE170001", hoVaTen: 'Nguyễn Văn H', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  { id: 9, accountid:"SE170001", hoVaTen: 'Nguyễn Văn I', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
  // { id: 10, accountid:"SE170001", hoVaTen: 'Nguyễn Văn J', email: 'test@gmail.com', Phonenumber: "string", ojtid:"000001" },
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
