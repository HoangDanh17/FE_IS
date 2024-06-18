import React, { useEffect } from "react";
import {
  Avatar,
  AvatarGroup,
  Chip,
  Divider,
  Fade,
  Modal,
  Tooltip,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";
import FormAddPM from "@/components/projectList/formCrud/FormAddPM";
import FormUpdate from "@/components/projectList/formCrud/FormUpdate";
import dayjs from "dayjs";
import { MemberInProjectResType } from "@/schemaValidations/project.schema";
import projectApiRequest from "@/apiRequests/project";

const Div = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

// const confirmDeleteStyle = {
//   ...style,
//   width: 300,
// };

export interface RowData {
  id: string;
  name: string;
  "start-date": Date;
  duration: string;
  status: string;
  description: string;
}

const DetailCard = ({
  row,
  handleCloseCard,
}: {
  row: RowData;
  handleCloseCard: () => void;
}) => {
  const [listMemberInProject, setListMemberInProject] =
    useState<MemberInProjectResType>();

  useEffect(() => {
    projectApiRequest.getListPMInProject(row.id).then(({ payload }) => {
      setListMemberInProject(payload);
    });
  }, []);

  // update modal
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const handleOpenUpdateModal = (row: any) => {
    setSelectedRow(row);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    handleCloseCard();
  };

  // delete modal

  // const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  // const [rowToDelete, setRowToDelete] = useState<string | null>(null);

  // const handleOpenDeleteConfirmModal = (id: string) => {
  //   setRowToDelete(id);
  //   setOpenDeleteConfirmModal(true);
  // };

  // const handleCloseDeleteConfirmModal = () => setOpenDeleteConfirmModal(false);

  // const handleDelete = () => {
  //   if (rowToDelete !== null) {
  //     console.log(rowToDelete);
  //     handleCloseDeleteConfirmModal();
  //   }
  // };
  // add PM

  const [openAddPMModal, setOpenAddPMModal] = useState(false);

  const [data, setData] = useState<any>(null);
  const handleOpenAddPMModal = (row: any) => {
    setData(row);
    setOpenAddPMModal(true);
  };

  const handleCloseAddPMModal = () => {
    setOpenAddPMModal(false);
    handleCloseCard();
  };

  const getStatusChipColor = (status: string) => {
    switch (status) {
      case "not_start":
        return { backgroundColor: "#FFB6C1", color: "white" }; // Màu hồng pastel đậm hơn
      case "doing":
        return { backgroundColor: "#87CEEB", color: "white" }; // Màu xanh dương pastel đậm hơn
      case "done":
        return { backgroundColor: "#90EE90", color: "white" }; // Màu xanh lá pastel đậm hơn
      case "cancel":
        return { backgroundColor: "#FFA07A", color: "white" }; // Màu cam pastel đậm hơn
      default:
        return { backgroundColor: "#D3D3D3", color: "white" }; // Màu xám
    }
  };

  return (
    <Div>
      <div
        style={{
          alignItems: "flex-start",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography id="transition-modal-title" variant="h4" component="h2">
          Chi tiết dự án - Status:{" "}
          <Chip
            size="small"
            label={row.status === "not_start" ? "not start" : row.status}
            sx={getStatusChipColor(row.status)}
          ></Chip>
        </Typography>
        <Typography id="transition-modal-title" variant="h4" component="h2">
          Hành động
        </Typography>
      </div>
      <form>
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6">Tên dự án</Typography>
                  <TextField
                    id="name"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 2 }}
                    size="small"
                    defaultValue={row.name}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Ngày bắt đầu</Typography>
                  <TextField
                    id="calories"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 2 }}
                    disabled
                    size="small"
                    defaultValue={dayjs(row["start-date"]).format("YYYY-MM-DD")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Kéo dài </Typography>
                  <TextField
                    id="fat"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 2 }}
                    size="small"
                    disabled
                    defaultValue={row.duration}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Thông tin mô tả </Typography>
                  <TextField
                    id="fat"
                    variant="outlined"
                    fullWidth
                    style={{ marginTop: 2 }}
                    size="small"
                    disabled
                    defaultValue={row.description}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6">Quản lí dự án </Typography>
                  <div className="flex mt-2">
                    {listMemberInProject?.data.length !== 0 ? (
                      <AvatarGroup>
                        {listMemberInProject?.data.map((name, index) => (
                          <Tooltip title={name["user-name"]} key={index}>
                            <Avatar
                              alt={name["user-name"]}
                              src="/images/avatar.jpg"
                            />
                          </Tooltip>
                        ))}
                      </AvatarGroup>
                    ) : (
                      <Typography variant="body1">Chưa có PM</Typography>
                    )}
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={1} sm={1}>
              <Divider orientation="vertical" variant="middle" />
            </Grid>
            <Grid item xs={11} sm={3}>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <Button
                    onClick={() => handleOpenUpdateModal(row)}
                    variant="contained"
                    color="warning"
                    startIcon={<EditIcon></EditIcon>}
                    style={{ width: "100%", marginTop: 20 }}
                  >
                    Sửa dự án
                  </Button>
                </Grid>
                {/* <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteConfirmModal(row.id)}
                    style={{ width: "100%", marginTop: 6 }}
                  >
                    Xóa dự án
                  </Button>
                </Grid> */}
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    startIcon={<AddIcon />}
                    onClick={() => handleOpenAddPMModal(row)}
                    style={{ width: "100%", marginTop: 6 }}
                  >
                    Thêm quản lí
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
      {/* Modal Edit */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openUpdateModal}
        onClose={handleCloseUpdateModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openUpdateModal}>
          <Box sx={style}>
            <FormUpdate
              row={selectedRow}
              handleClose={handleCloseUpdateModal}
            ></FormUpdate>
          </Box>
        </Fade>
      </Modal>
      {/* Modal Delete */}
      {/* <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openDeleteConfirmModal}
        onClose={handleCloseDeleteConfirmModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openDeleteConfirmModal}>
          <Box sx={confirmDeleteStyle}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Xác nhận xóa
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Bạn có chắc chắn muốn xóa dự án này không?
            </Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleCloseDeleteConfirmModal}
                style={{ marginRight: 8 }}
              >
                Hủy
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Xóa
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal> */}
      {/* Modal Add PM */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAddPMModal}
        onClose={handleCloseAddPMModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAddPMModal}>
          <Box sx={style}>
            <FormAddPM
              row={data}
              listMemberInProject={listMemberInProject}
              handleClose={handleCloseAddPMModal}
            ></FormAddPM>
          </Box>
        </Fade>
      </Modal>
    </Div>
  );
};

export default DetailCard;
