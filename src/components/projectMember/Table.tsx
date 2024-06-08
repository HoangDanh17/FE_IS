'use client'
import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TablePagination } from '@mui/material';
import "@/styles/accountManagement/DataTable.css";

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'STT', width: 50 },
//   { field: 'projectID', headerName: 'ID dự án', width: 130 },
//   { field: 'internID', headerName: 'ID thành viên ', width: 130 },
//   { field: 'createDate', headerName: 'Ngày tham gia', width: 130 },
//   { field: 'status', headerName: 'Trạng thái', width: 130 },
// ];

function createData(
  id: string,
  projectID: string,
  internID: string,
  createDate: string,
  status: number,
) {
  return { projectID, internID, createDate, status };
}

const initialRows = [
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
  { projectID: 'jfor95kso', internID: 'gkkw9482', createDate: "01/06/2024", status: "Đang thực tập" },
];

const rows = initialRows.map((row, index) => ({ id: index + 1, ...row }));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const TableProjectMember = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div style={{ maxHeight: 600, width: '100%' }}>
      {/* <DataGrid
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
      /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>STT</StyledTableCell>
              <StyledTableCell>ID Dự Án</StyledTableCell>
              <StyledTableCell>ID Thành Viên</StyledTableCell>
              <StyledTableCell>Ngày Tham Gia</StyledTableCell>
              <StyledTableCell>Trạng Thái </StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell component="th" scope="row" align='center'>
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.projectID}</StyledTableCell>
                <StyledTableCell>{row.internID}</StyledTableCell>
                <StyledTableCell>{row.createDate}</StyledTableCell>
                <StyledTableCell>{row.status}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        className="custom-row custom-pagination"
      />
    </div>
  );
}

export default TableProjectMember;