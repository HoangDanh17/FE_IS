'use client';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Radio,
  styled,
  tableCellClasses,
  Button,
  Modal,
} from "@mui/material";
import React, { useState, MouseEvent, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import AddModal from "./AddModal";
import EditIcon from '@mui/icons-material/Edit';
import EditModal from "./EditModal";
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteModal from "./DeleteModal";

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

interface RowData {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  skill: string[];
}

function createData(
  accountID: string,
  name: string,
  email: string,
  phoneNumber: string,
  ojtid: string,
  skill: string[]
): RowData {
  return { id: accountID, name, email, phoneNumber, skill };
}

const rows: RowData[] = [
  createData(
    "SE170001",
    "Nguyễn Văn A",
    "test@gmail.com",
    "012345789",
    "NB0001",
    ["Coding", "Design"]
  ),
  createData(
    "SE170002",
    "Nguyễn Văn B",
    "test@gmail.com",
    "012345789",
    "NB0002",
    ["Coding"]
  ),
  createData(
    "SE170003",
    "Nguyễn Văn C",
    "test@gmail.com",
    "012345789",
    "NB0003",
    ["Design"]
  ),
  createData(
    "SE170004",
    "Nguyễn Văn D",
    "test@gmail.com",
    "012345789",
    "NB0004",
    ["Coding", "Design", "Project Management"]
  ),
  createData(
    "SE170005",
    "Nguyễn Văn E",
    "test@gmail.com",
    "012345789",
    "NB0005",
    ["Coding", "Design"]
  ),
  createData(
    "SE170006",
    "Nguyễn Văn F",
    "test@gmail.com",
    "012345789",
    "NB0006",
    ["Project Management"]
  ),
  createData(
    "SE170007",
    "Nguyễn Văn G",
    "test@gmail.com",
    "012345789",
    "NB0007",
    ["Coding"]
  ),
  createData(
    "SE170008",
    "Nguyễn Văn H",
    "test@gmail.com",
    "012345789",
    "NB0008",
    ["Design"]
  ),
  createData(
    "SE170009",
    "Nguyễn Văn I",
    "test@gmail.com",
    "012345789",
    "NB0009",
    ["Project Management"]
  ),
  createData(
    "SE170010",
    "Nguyễn Văn J",
    "test@gmail.com",
    "012345789",
    "NB0010",
    ["Coding", "Design"]
  ),
];

const InternTable: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<RowData | null>(null);

  // Add
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Edit
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    if (selectedRowData) {
      console.log(selectedRowData); // Log the selected row data
    }
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => setOpenEditModal(false);
  
  // Delete
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);
  const handleDelete = () => {
    if (selectedRowData) {
      // Perform the delete operation here
      console.log(`Deleted: ${selectedRowData.name}`);
      // Close the modal after deletion
      handleCloseDeleteModal();
      // Optionally, remove the deleted row from the state
      setSelectedRow(null);
      setSelectedRowData(null);
    }
  };

  const handleChangePage = (
    event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectRow = (row: RowData) => {
    if (selectedRow === row.id) {
      setSelectedRow(null);
      setSelectedRowData(null);
    } else {
      setSelectedRow(row.id);
      setSelectedRowData(row); // Store selected row data
    }
  };

  const isSelected = (id: string) => selectedRow === id;

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1150 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell padding="checkbox">
                {/* No need for a select all checkbox in single selection mode */}
              </StyledTableCell>
              <StyledTableCell align="center">STT</StyledTableCell>
              <StyledTableCell>Họ và Tên</StyledTableCell>
              <StyledTableCell>Email</StyledTableCell>
              <StyledTableCell>Số điện thoại</StyledTableCell>
              <StyledTableCell>Kỹ năng</StyledTableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => {
              const isItemSelected = isSelected(row.id);
              return (
                <StyledTableRow
                  key={row.id}
                  hover
                  onClick={() => handleSelectRow(row)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <StyledTableCell padding="checkbox">
                    <Radio
                      color="primary"
                      checked={isItemSelected}
                      onChange={() => handleSelectRow(row)}
                      value={row.id}
                      name="radio-buttons"
                      inputProps={{
                        "aria-labelledby": `enhanced-table-radio-${index}`,
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {page * rowsPerPage + index + 1}
                  </StyledTableCell>
                  <StyledTableCell>{row.name}</StyledTableCell>
                  <StyledTableCell>{row.email}</StyledTableCell>
                  <StyledTableCell>{row.phoneNumber}</StyledTableCell>
                  <StyledTableCell>{row.skill.join(", ")}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <CustomTablePagination
        rowsPerPageOptions={[5, 10]}
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
        disabled={!selectedRowData} // Disable button if no row is selected
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
        disabled={!selectedRowData} // Disable button if no row is selected
      >
        Xóa
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={handleCloseAddModal}
      >  
        <AddModal />
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={handleCloseEditModal}
      >  
        <EditModal rowData={selectedRowData} />
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
          onDelete={handleOpenDeleteModal}
          rowData={selectedRowData} // Pass selectedRowData to DeleteModal
        />
      </Modal>
    </div>
  );
};

export default InternTable;
