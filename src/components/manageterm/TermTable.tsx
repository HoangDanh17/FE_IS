import * as React from "react";
import { useState, useEffect } from "react";
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
import {
  Button,
  CircularProgress,
  Modal,
  Box,
  Typography,
  Radio,
} from "@mui/material";
import AddModal from "./AddModal2";
import termApiRequest from "@/apiRequests/term";
import { TermListResType } from "@/schemaValidations/term.schema";
import dayjs from "dayjs";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

export interface RowData2 {
  id: string;
  semester: string;
  university: string;
  "start-at": string;
  "end-at": string;
}

export interface RowData {
  id: string;
  semester: string;
  university: string;
}

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

const TermTable = ({
  isFilter,
  dataFilter,
  handleReset,
}: {
  isFilter: boolean;
  dataFilter: RowData | null;
  handleReset: () => void;
}) => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<RowData2 | null>(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedValue, setSelectedValue] = useState<RowData2 | null>(null);

  const [data, setData] = useState<TermListResType | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setLoading(true);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    row: RowData2
  ) => {
    setSelectedValue(row);
    setSelectedRowData(row);
    console.log("Selected row: ", row);
  };

  const handleDeselectAll = () => {
    setSelectedValue(null);
    setSelectedRowData(null);
  };

  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedValue(null);
    setSelectedRowData(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleOpenEditModal = () => {
    if (selectedRowData) {
      console.log(selectedRowData);
    }
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedValue(null);
    setSelectedRowData(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedValue(null);
    setSelectedRowData(null);
  };

  const handleDelete = () => {
    if (selectedRowData && selectedRowData.id) {
      termApiRequest.deleteTerm(selectedRowData.id);
    }
    setRefreshKey((prevKey) => prevKey + 1);
    toast({
      title: "Đã xóa thành công",
      duration: 2000,
      variant: "success",
    });
    handleCloseDeleteModal();
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const { payload } = await termApiRequest.getListTerm(
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
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell>Semester</StyledTableCell>
                <StyledTableCell>University</StyledTableCell>
                <StyledTableCell>Start Date</StyledTableCell>
                <StyledTableCell>End Date</StyledTableCell>
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
                      checked={selectedValue?.id === account.id}
                      onChange={(event) => handleRadioChange(event, account)}
                      value={account.id.toString()}
                      className="radio-buttons"
                    />
                  </div>
                  <StyledTableCell>{account.id}</StyledTableCell>
                  <StyledTableCell>{account.semester}</StyledTableCell>
                  <StyledTableCell>{account.university}</StyledTableCell>
                  <StyledTableCell>
                    {dayjs(account["start-at"]).format("DD/MM/YYYY")}
                  </StyledTableCell>
                  <StyledTableCell>
                    {dayjs(account["end-at"]).format("DD/MM/YYYY")}
                  </StyledTableCell>
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
        disabled={!selectedRowData}
      >
        Sửa
      </Button>
      <Button
        style={{ marginRight: "10px" }}
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

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
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
      </Modal>
    </div>
  );
};

export default TermTable;
