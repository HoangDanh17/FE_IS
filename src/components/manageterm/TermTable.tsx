'use client';
import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "./EditModal2";
import "@/components/css/manageintern/DataTable.css";
import { Button, Modal, Radio } from "@mui/material";
import AddModal from "./AddModal2";
import DeleteModal from "./DeleteModal2";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiTablePagination-root": {
    color: theme.palette.primary.main,
  },
}));

let idCounter = 1;
function createData(
  semester: string,
  university: string,
  start_date: string,
  end_date: string
) {
  const id = idCounter++;
  return { id, semester, university, start_date, end_date };
}

const rows = [
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
  createData("SU24", "FPT University", "07/05/2024", "07/10/2024"),
];

export interface RowData {
  id: number;  // Changed from string to number
  semester: string;
  university: string;
  start_date: string;
  end_date: string;
}

const TermTable = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<RowData | null>(null);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const handleOpenEditModal = () => {
    if (selectedRowData) {
      console.log(selectedRowData);
    }
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleDelete = () => {
    if (selectedRowData) {
      console.log(`Deleted: ${selectedRowData.id}`);
      handleCloseDeleteModal();
      setSelectedRowData(null);
      setSelectedRowId(null);
    }
  };

  const handleAdd = (data: RowData) => {
    rows.push(createData(data.semester, data.university, data.start_date, data.end_date));
    handleCloseAddModal();
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRowClick = (rowData: RowData) => {
    setSelectedRowData(rowData);
    setSelectedRowId(rowData.id);  // Ensure selectedRowId is a number
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1150 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell>Semester</StyledTableCell>
              <StyledTableCell>University</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell align="center">Select</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.id} onClick={() => handleRowClick(row)}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.id}
                </StyledTableCell>
                <StyledTableCell>{row.semester}</StyledTableCell>
                <StyledTableCell>{row.university}</StyledTableCell>
                <StyledTableCell>{row.start_date}</StyledTableCell>
                <StyledTableCell>{row.end_date}</StyledTableCell>
                <StyledTableCell align="center">
                  <Radio
                    checked={selectedRowId === row.id}
                    onChange={() => handleRowClick(row)}
                    value={row.id}
                    name="row-selection"
                    inputProps={{ 'aria-label': row.id.toString() }}
                  />
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
      <Button
        variant="contained"
        className="add-btn"
        startIcon={<AddIcon />}
        onClick={handleOpenAddModal}
        style={{ marginRight: '10px' }}
      >
        Thêm
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        variant="contained"
        className="edit-btn"
        startIcon={<EditIcon />}
        onClick={handleOpenEditModal}
        disabled={!selectedRowData}
      >
        Sửa
      </Button>
      <Button
        style={{ marginRight: '10px' }}
        variant="contained"
        color="error"
        className="delete-btn"
        startIcon={<DeleteIcon />}
        onClick={handleOpenDeleteModal}
        disabled={!selectedRowData}
      >
        Xóa
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={handleCloseAddModal}
      >
        <AddModal onAdd={handleAdd} onClose={handleCloseAddModal} />
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={handleCloseEditModal}
      >
        <EditModal row={selectedRowData} />
      </Modal>
      <Modal
        open={openDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DeleteModal
          open={openDeleteModal}
          onClose={handleCloseDeleteModal}
          onDelete={handleDelete}
          rowData={selectedRowData}
        />
      </Modal>
    </div>
  );
};

export default TermTable;
