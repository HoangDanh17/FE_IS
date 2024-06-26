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
  Tooltip,
  Fade,
  Backdrop,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import internApiRequest from "@/apiRequests/intern";
import {
  InternListResType,
  InternSchemaType,
} from "@/schemaValidations/intern.schema";
import AddModal from "./AddModal";
import EditModal from "@/components/manageintern/EditModal";
import DetailIntern from "@/components/manageintern/DetailIntern";

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

const styleCard = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
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
  const [selectedRowData, setSelectedRowData] =
    useState<any>(null);

  const [refreshKey, setRefreshKey] = useState(0);

  // Add
  const [openAddModal, setOpenAddModal] = useState(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => {
    setOpenAddModal(false);
    setSelectedRowData(null);
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Detail Card
  const [openCardModal, setOpenCardModal] = useState(false);
  
  const handleDoubleClick = (row: any) => {
    setSelectedRowData(row);
    setOpenCardModal(true);
  };

  const handleCloseCardModal = () => {
    setOpenCardModal(false);
    handleReset();
    setRefreshKey((prevKey) => prevKey + 1);
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
                <StyledTableCell align="center">#</StyledTableCell>
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
                <Tooltip key={index} title="Ấn 2 lần để xem chi tiết" arrow>
                  <StyledTableRow
                    key={index}
                    onDoubleClick={() => handleDoubleClick(account)}
                  >
                    <StyledTableCell align="center" component="th" scope="row">
                      {index + 1}
                    </StyledTableCell>
                    <StyledTableCell>{account["user-name"]}</StyledTableCell>
                    <StyledTableCell>{account.email}</StyledTableCell>
                    <StyledTableCell>{account["student-code"]}</StyledTableCell>
                    <StyledTableCell>{account["ojt-semester"]}</StyledTableCell>
                    <StyledTableCell>
                      {account.gender !== "male" ? "Nữ" : "Nam"}
                    </StyledTableCell>
                    <StyledTableCell>{account["phone-number"]}</StyledTableCell>
                    <StyledTableCell className="truncate max-w-[180px]">
                      {account.address}
                    </StyledTableCell>
                  </StyledTableRow>
                </Tooltip>
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
        className="custom-row custom-pagination mb-4 bg-white"
      />
      <Button
        variant="contained"
        className="add-btn"
        startIcon={<AddIcon />}
        onClick={handleOpenAddModal}
        style={{ marginRight: "10px" }}
      >
        Tạo thực tập
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
        open={openCardModal}
        onClose={handleCloseCardModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openCardModal}>
          <Box sx={styleCard}>
            <DetailIntern
              row={selectedRowData}
              onClose={handleCloseCardModal}
            ></DetailIntern>
          </Box>
        </Fade>
      </Modal>
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openEditModal}
        onClose={handleCloseEditModal}
      >
        <EditModal row={selectedRowData} onClose={handleCloseEditModal} />
      </Modal> */}
    </div>
  );
};

export default InternTable;
