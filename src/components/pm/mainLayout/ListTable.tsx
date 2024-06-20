"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DetailTaskModal from "@/components/pm/mainLayout/DetailTaskModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    padding: "8px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  height: "40px", // Giảm chiều cao của hàng
  cursor: "pointer", // Thêm con trỏ để hiển thị rằng hàng có thể được chọn
}));

function createData(
  index: number,
  name: string,
  createdDate: string,
  status: string,
  assignee: string
) {
  return { index, name, createdDate, status, assignee };
}

const rows = [
  createData(1, "Công việc 1", "2024-01-01", "Not start", "Người A"),
  createData(2, "Công việc 2", "2024-02-01", "Doing", "Người B"),
  createData(3, "Công việc 3", "2024-03-01", "Done", "Người C"),
  createData(4, "Công việc 4", "2024-04-01", "Cancel", "Người D"),
  createData(5, "Công việc 5", "2024-05-01", "Not start", "Người E"),
  createData(6, "Công việc 6", "2024-06-01", "Doing", "Người F"),
  createData(7, "Công việc 7", "2024-07-01", "Done", "Người G"),
  createData(8, "Công việc 8", "2024-08-01", "Not start", "Người H"),
  createData(9, "Công việc 9", "2024-09-01", "Doing", "Người I"),
  createData(10, "Công việc 10", "2024-10-01", "Done", "Người J"),
];

export default function ListTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selectedRow, setSelectedRow] = React.useState<null | {
    index: number;
    name: string;
    createdDate: string;
    status: string;
    assignee: string;
  }>(null);
  const [open, setOpen] = React.useState(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDoubleClick = (row: {
    index: number;
    name: string;
    createdDate: string;
    status: string;
    assignee: string;
  }) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Calculate the rows to display based on the current page and rows per page
  const displayedRows = rows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">#</StyledTableCell>
            <StyledTableCell>Tên công việc</StyledTableCell>
            <StyledTableCell align="center">Ngày tạo</StyledTableCell>
            <StyledTableCell align="center">Trạng thái</StyledTableCell>
            <StyledTableCell align="center">
              Người được phân công
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((row) => (
            <Tooltip key={row.index} title="Ấn 2 lần để mở" arrow>
              <StyledTableRow onDoubleClick={() => handleDoubleClick(row)}>
                <StyledTableCell align="center" component="th" scope="row">
                  {row.index}
                </StyledTableCell>
                <StyledTableCell align="left">{row.name}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.createdDate}
                </StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.assignee}</StyledTableCell>
              </StyledTableRow>
            </Tooltip>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={open} onClose={handleClose} maxWidth="xl" fullWidth>
        <DialogTitle>Chi tiết công việc</DialogTitle>
        <DialogContent>
          {selectedRow && (
            <>
              <DetailTaskModal />
            </>
          )}
        </DialogContent>
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions> */}
      </Dialog>
    </TableContainer>
  );
}
