"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import {
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface RowData {
  id: number;
  name: string;
}

const dummyData: RowData[] = [
  { id: 1, name: "Manager 1" },
  { id: 2, name: "Manager 2" },
  { id: 3, name: "Manager 3" },
];

export default function FormAddPM({ row }: { row: RowData }) {
  const [managers, setManagers] = React.useState<string[]>([]);
  const [submittedData, setSubmittedData] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState(false);
  const [deleteIndex, setDeleteIndex] = React.useState<number | null>(null);

  React.useEffect(() => {
    const initialManagers = dummyData.map((item) => String(item.id));
    setManagers(initialManagers);
  }, []);

  const handleChange = (event: SelectChangeEvent<string>, index: number) => {
    const newManagers = [...managers];
    newManagers[index] = event.target.value;
    setManagers(newManagers);
  };

  const handleAddManager = () => {
    setManagers([...managers, ""]);
  };

  const handleDeleteManager = (index: number) => {
    setDeleteIndex(index);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const newManagers = managers.filter((_, i) => i !== deleteIndex);
      setManagers(newManagers);
      setDeleteIndex(null);
      setOpenDialog(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteIndex(null);
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    setSubmittedData(managers.join(", "));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <Typography variant="h4">Thêm quản lí dự án</Typography>
      {managers.map((manager, index) => (
        <Box
          display="flex"
          alignItems="center"
          key={index}
          style={{ marginTop: 20 }}
        >
          <FormControl fullWidth>
            <InputLabel id={`demo-simple-select-label-${index}`}>
              Manager
            </InputLabel>
            <Select
              labelId={`demo-simple-select-label-${index}`}
              id={`demo-simple-select-${index}`}
              value={manager}
              label="Manager"
              onChange={(event) => handleChange(event, index)}
            >
              {dummyData.map((item) => (
                <MenuItem key={item.id} value={String(item.id)}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton
            aria-label="delete"
            onClick={() => handleDeleteManager(index)}
          >
            <DeleteIcon style={{ color: "red" }} />
          </IconButton>
        </Box>
      ))}
      <Button
        // variant="contained"
        onClick={handleAddManager}
        style={{
          marginTop: 20,
          width: "100%",
          backgroundColor: "#94a3b8",
          color: "#334155",
        }}
        startIcon={<AddIcon></AddIcon>}
      >
        Thêm quản lí
      </Button>

      <Button
        variant="contained"
        onClick={handleSubmit}
        style={{ marginTop: 20, float: "right" }}
      >
        Xác nhận
      </Button>
      {submittedData && <p>Submitted data: {submittedData}</p>}

      <Dialog
        open={openDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận xóa"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn xóa quản lí này?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Hủy bỏ
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
