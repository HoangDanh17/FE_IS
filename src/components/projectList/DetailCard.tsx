"use client";
import FormUpdate from "@/components/projectList/formCrud/FormUpdate";
import { Divider, Fade, Modal } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Typography,
  Grid,
  Box,
  styled,
  Button,
} from "@mui/material";
import { useState } from "react";

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

const confirmDeleteStyle = {
  ...style,
  width: 300,
};
interface RowData {
  id: number;
  title: string;
  startDate: number;
  duration: number;
  carbs: number;
  protein: number;
}

const DetailCard = ({ row }: { row: RowData }) => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const handleOpenUpdateModal = (row: any) => {
    setSelectedRow(row);
    setOpenUpdateModal(true);
  };
  const handleCloseUpdateModal = () => setOpenUpdateModal(false);

  const [openDeleteConfirmModal, setOpenDeleteConfirmModal] = useState(false);

  const [rowToDelete, setRowToDelete] = useState<number | null>(null);
  const handleOpenDeleteConfirmModal = (id: number) => {
    setRowToDelete(id);
    setOpenDeleteConfirmModal(true);
  };

  const handleCloseDeleteConfirmModal = () => setOpenDeleteConfirmModal(false);
  const handleDelete = () => {
    if (rowToDelete !== null) {
      console.log(rowToDelete);
      handleCloseDeleteConfirmModal();
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
          Chi tiết dự án
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
                    defaultValue={row.title}
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
                    defaultValue={row.startDate}
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
                <Grid item>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => handleOpenDeleteConfirmModal(row.id)}
                    style={{ width: "100%", marginTop: 6 }}
                  >
                    Xóa dự án
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
            <FormUpdate row={selectedRow}></FormUpdate>
          </Box>
        </Fade>
      </Modal>
      {/* Modal Delete */}
      <Modal
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
      </Modal>
    </Div>
  );
};

export default DetailCard;
