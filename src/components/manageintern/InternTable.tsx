import React, { useState, MouseEvent, ChangeEvent, useEffect } from "react";
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
  CircularProgress,
  Modal,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import internApiRequest from "@/apiRequests/intern";
import { InternListResType } from "@/schemaValidations/intern.schema";
import AddModal from "./AddModal";

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

const CustomTablePagination = styled(TablePagination)(({ theme }) => ({
  "& .MuiTablePagination-root": {
    color: theme.palette.primary.main,
  },
}));

export interface RowData {
  "account-id": string;
  "user-name": string;
  email: string;
  "student-code": string;
  "ojt-semester": string;
  gender: string;
  "phone-number": string;
  address: string;
  "dob-from": string;
  "dob-to": string;
}

export interface FormFilterData {
  'user-name': string;
  email: string;
  'student-code': string;
  'ojt-semester': string;
  gender: string;
  'phone-number': string;
  address: string;
}

const InternTable = ({
  isFilter,
  dataFilter,
  handleReset,
}: {
  isFilter: boolean;
  dataFilter: FormFilterData | null;
  handleReset: () => void;
}) => {
  const [data, setData] = useState<InternListResType | null>(null);
  const [loading, setLoading] = useState(true);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedRowData, setSelectedRowData] = useState<RowData | null>(null);

  const [selectedValue, setSelectedValue] = useState<RowData | null>();

  const handleDeselectAll = () => {
    setSelectedValue(null);
    setSelectedRowData(null);
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: {
      "account-id": string;
      "user-name": string;
      email: string;
      "student-code": string;
      "ojt-semester": string;
      gender: string;
      "phone-number": string;
      address: string;
      "dob-from": string;
      "dob-to": string;
    }
  ) => {
    setSelectedValue(row);
    setSelectedRowData(row);
    console.log("Selected row: ", row);
  };

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
      console.log(`Deleted: ${selectedRowData['user-name']}`);
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
    if (selectedRow === row["account-id"]) {
      setSelectedRow(null);
      setSelectedRowData(null);
    } else {
      setSelectedRow(row["account-id"]);
      setSelectedRowData(row); // Store selected row data
    }
  };

  const isSelected = (id: string) => selectedRow === id;

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { payload } = await internApiRequest.getListIntern(page + 1, rowsPerPage, isFilter ? dataFilter : {});
        setData(payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFilter, page, rowsPerPage, dataFilter]);

  return (
    <div style={{ maxHeight: 762, width: "100%", marginTop: "10px" }}>
      <TableContainer component={Paper}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Table sx={{ minWidth: 640 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell sx={{ width: 70 }} align="center">
                  <Radio
                    onClick={handleDeselectAll}
                    className="radio-buttons"
                    color="secondary"
                  />
                </StyledTableCell>
                <StyledTableCell>Họ và Tên</StyledTableCell>
                <StyledTableCell>Email</StyledTableCell>
                <StyledTableCell>Mã số sinh viên</StyledTableCell>
                <StyledTableCell>Kì OJT</StyledTableCell>
                <StyledTableCell>Giới tính</StyledTableCell>
                <StyledTableCell>Số điện thoại</StyledTableCell>
                <StyledTableCell>Địa chỉ</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.data.map((account, index) => (
                <StyledTableRow key={index}>
                  <div
                    className="radio-cell"
                    style={{ margin: "3px 0 0 14px" }}
                  >
                    <Radio
                      checked={selectedValue?.["account-id"] === account["account-id"]}
                      onChange={(event) => handleRadioChange(event, account)}
                      value={account.toString()}
                      className="radio-buttons"
                    />
                  </div>
                  <StyledTableCell>{account["user-name"]}</StyledTableCell>
                  <StyledTableCell>{account.email}</StyledTableCell>
                  <StyledTableCell>{account["student-code"]}</StyledTableCell>
                  <StyledTableCell>{account["ojt-semester"]}</StyledTableCell>
                  <StyledTableCell>{account.gender}</StyledTableCell>
                  <StyledTableCell>{account["phone-number"]}</StyledTableCell>
                  <StyledTableCell>{account.address}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>

      <CustomTablePagination
        rowsPerPageOptions={[5, 10]}
        count={data?.data.length ?? 0}
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
        <AddModal onClose={handleCloseAddModal} />
      </Modal>
      {/* <Modal
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
          onDelete={handleDelete}
          rowData={selectedRowData} // Pass selectedRowData to DeleteModal
        />
      </Modal>  */}
    </div>
  );
};

export default InternTable;
