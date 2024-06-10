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
import { TablePagination, Radio, Button } from '@mui/material';
import "@/styles/accountManagement/DataTable.css";
import AccountInfolModal from './AccountInfolModal';

function createData(
  id: string,
  idAccount: string,
  userName: string,
  email: string,
  role: string,
  createDate: string
) {
  return { idAccount, userName, email, role, createDate };
}

const initialRows = [
  { idAccount: "a385jaad2", userName: 'Nguyễn Văn A', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn B', email: 'test@gmail.com', role: "admin", createDate: "02/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn C', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn D', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn E', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn F', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn G', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn H', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn I', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },
  { idAccount: "a385jaad3", userName: 'Nguyễn Văn J', email: 'test@gmail.com', role: "admin", createDate: "01/06/2024" },

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
}));

interface TableRow {
  id: number;
  userName: string;
  email: string;
  role: string;
  createDate: string;
}


const TableAccount = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  // handle detail modal
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [selectedRow, setSelectedRow] = React.useState<TableRow | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleDeselectAll = () => {
    setSelectedValue(null);
  };

  const handleViewDetail = (row: TableRow) => {
    setSelectedRow(row);
    setOpenModal(true);
  };

  return (
    <div style={{ maxHeight: 762, width: '180%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 640 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: 70 }} align='center'>
                <Radio
                  onClick={handleDeselectAll}
                  className="radio-buttons"
                  color='secondary'
                />
              </StyledTableCell>

              <StyledTableCell>Tên Người Dùng</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Role</StyledTableCell>
              <StyledTableCell>Ngày tạo</StyledTableCell>
              <StyledTableCell>Xem chi tiết</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.id}>

                <div className="radio-cell" style={{ margin: "3px 0 0 14px" }}>
                  <Radio
                    checked={selectedValue === row.id.toString()}
                    onChange={handleRadioChange}
                    value={row.id.toString()}
                    className="radio-buttons"
                  />
                </div>

                <StyledTableCell>{row.userName}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>{row.role}</StyledTableCell>
                <StyledTableCell>{row.createDate}</StyledTableCell>

                <StyledTableCell>
                  <Button size='small' onClick={() => handleViewDetail(row)}>Click</Button>
                </StyledTableCell>
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

      <AccountInfolModal open={openModal} handleClose={() => setOpenModal(false)} selectedRow={selectedRow} />

    </div>
  );
}

export default TableAccount;