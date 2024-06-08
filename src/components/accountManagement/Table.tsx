'use client'
import * as React from 'react';
//import { DataGrid, GridColDef } from '@mui/x-data-grid';

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
//   { field: 'id', headerName: 'ID', width: 50 },
//   { field: 'idAccount', headerName: 'ID thành viên', width: 130 },
//   { field: 'userName', headerName: 'Tên thành viên', width: 130 },
//   { field: 'email', headerName: 'Email', width: 130 },
//   { field: 'password', headerName: 'Mật khẩu', width: 130 },
//   { field: 'createDate', headerName: 'Ngày tạo', width: 130 },
// ];

function createData(
  id: string,
  idAccount: string,
  userName: string,
  email: string,
  password: number,
  createDate: string
) {
  return { idAccount, userName, email, password, createDate };
}

const initialRows = [
  { idAccount: "a385jaad2", userName: 'Nguyễn Văn A', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn B', email: 'test@gmail.com', password: "string", createDate: "02/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn C', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn D', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn E', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn F', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn G', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn H', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn I', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn J', email: 'test@gmail.com', password: "string", createDate: "01/06/2024" },

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

const TableAccount = () => {
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
        rows={displayedRows}
        columns={columns}
        checkboxSelection
        classes={{
          root: 'custom-row',       // Apply to all rows
          columnHeader: 'custom-header', // Apply to header
          cell: 'custom-cell',      // Apply to cells
        }}
        className="custom-row custom-pagination"
        hideFooterPagination
      /> */}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align='center'>STT</StyledTableCell>
              <StyledTableCell>ID Thành Viên</StyledTableCell>
              <StyledTableCell>Tên Thành Viên</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Mật khẩu</StyledTableCell>
              <StyledTableCell>Ngày tạo</StyledTableCell>
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
                <StyledTableCell>{row.idAccount}</StyledTableCell>
                <StyledTableCell>{row.userName}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.password}</StyledTableCell>
                <StyledTableCell>{row.createDate}</StyledTableCell>
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

export default TableAccount;