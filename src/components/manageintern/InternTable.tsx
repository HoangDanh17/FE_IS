import React, {
  useState,
  MouseEvent,
  ChangeEvent,
  useEffect,
  useCallback,
} from "react";
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
  Box,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import internApiRequest from "@/apiRequests/intern";
import {
  InternListResType,
  InternSchemaType,
} from "@/schemaValidations/intern.schema";
import AddModal from "./AddModal";
import EditModal from "@/components/manageintern/EditModal";

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
}));
export interface FormFilterData {
  "user-name": string;
  email: string;
  "student-code": string;
  "ojt-semester": string;
  gender: string;
  "phone-number": string;
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
  const [selectedRowData, setSelectedRowData] =
    useState<InternSchemaType | null>(null);

  const [selectedValue, setSelectedValue] = useState<InternSchemaType | null>();
  const [refreshKey, setRefreshKey] = useState(0);
  const handleDeselectAll = () => {
    setSelectedValue(null);
    setSelectedRowData(null);
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: InternSchemaType
  ) => {
    setSelectedValue(row);
    setSelectedRowData(row);
    console.log("Selected row: ", row);
  };

  // Add
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedRowData(null);
    setRefreshKey((prevKey) => prevKey + 1);
    setSelectedValue(null);
  };

  // Edit
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    if (selectedRowData) {
      console.log(selectedRowData); // Log the selected row data
    }
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedRowData(null);
    setRefreshKey((prevKey) => prevKey + 1);
    setSelectedValue(null);
  };

  const handleChangePage = useCallback(
    (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage);
    },
    []
  );

  const handleChangeRowsPerPage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    },
    []
  );

  const handleSelectRow = (row: InternSchemaType) => {
    if (selectedRow === row["account-id"]) {
      setSelectedRow(null);
      setSelectedRowData(null);
    } else {
      setSelectedRow(row["account-id"]);
      setSelectedRowData(row); // Store selected row data
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { payload } = await internApiRequest.getListIntern(
          page + 1,
          rowsPerPage,
          isFilter ? dataFilter : {}
        );
        setData(payload);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [isFilter, page, rowsPerPage, dataFilter, refreshKey]);

  // const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // const [selectedDeleteRowId, setSelectedDeleteRowId] = useState<string | null>(
  //   null
  // );

  // const handleOpenDeleteModal = (id: string) => {
  //   setSelectedDeleteRowId(id);
  //   setOpenDeleteModal(true);
  // };

  // const handleCloseDeleteModal = () => {
  //   setOpenDeleteModal(false);
  //   setSelectedDeleteRowId(null);
  // };
  // const router = useRouter();

  // const handleDelete = async () => {
  //   if (selectedDeleteRowId) {
  //     console.log("Deleting intern-id:", selectedDeleteRowId);
  //     try {
  //       await internApiRequest.deleteIntern(selectedDeleteRowId);
  //       setRefreshKey((prevKey) => prevKey + 1);
  //       handleCloseDeleteModal();
  //       router.refresh();
  //     } catch (error) {
  //       console.error("Error deleting intern:", error);
  //     }
  //   }
  // };

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
                      checked={
                        selectedValue?.["account-id"] === account["account-id"]
                      }
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

      <TablePagination
        rowsPerPageOptions={[5, 10]}
        component="div"
        count={data?.paging.items || 0}
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
        style={{ marginRight: "10px" }}
      >
        Thêm
      </Button>
      <Button
        style={{ marginRight: "10px" }}
        variant="contained"
        className="edit-btn"
        startIcon={<EditIcon />}
        onClick={handleOpenEditModal}
        disabled={!selectedRowData} // Disable button if no row is selected
      >
        Sửa
      </Button>
      {/* <Button
        style={{ marginRight: "10px" }}
        variant="contained"
        color="error"
        className="delete-btn"
        startIcon={<DeleteIcon />}
        onClick={() =>
          handleOpenDeleteModal(selectedRowData?.["account-id"] || "")
        }
        disabled={!selectedRowData} // Disable button if no row is selected
      >
        Xóa
      </Button> */}

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddModal}
        onClose={handleCloseAddModal}
      >
        <AddModal onClose={handleCloseAddModal} />
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={handleCloseEditModal}
      >
        <EditModal row={selectedRowData} onClose={handleCloseEditModal} />
      </Modal>
      {/* <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Deletion
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this row?
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
              sx={{ mr: 1 }}
            >
              Delete
            </Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal> */}
    </div>
  );
};

export default InternTable;
